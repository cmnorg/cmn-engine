// Newsletter — inscription (POST) -> D1 (newsletter_subscribers) + Brevo (best-effort).
// - Sauvegarde locale dans D1 (gratuit, export possible via l'admin).
// - Ajout du contact à une liste Brevo si BREVO_API_KEY est configurée (Cloudflare Secret).
function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });
}

// Validation syntaxique stricte
const EMAIL_RE = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/;

// Vérifie que le domaine de l'e-mail peut recevoir du courrier (MX, sinon A). "Fail open".
async function domainCanReceiveMail(domain) {
  async function dns(type) {
    try {
      const r = await fetch(
        'https://cloudflare-dns.com/dns-query?name=' + encodeURIComponent(domain) + '&type=' + type,
        { headers: { accept: 'application/dns-json' } }
      );
      return await r.json();
    } catch (e) { return null; }
  }
  const mx = await dns('MX');
  if (mx === null) return true;
  if (mx.Answer && mx.Answer.some((a) => a.type === 15)) return true;
  const a = await dns('A');
  if (a === null) return true;
  return !!(a.Answer && a.Answer.length);
}

// Ajoute / met à jour le contact dans Brevo. Best-effort : n'empêche jamais l'inscription locale.
async function addToBrevo(env, email, lang) {
  if (!env.BREVO_API_KEY) return 'skipped';
  try {
    const payload = { email: email, updateEnabled: true, attributes: { OPTIN: true } };
    if (lang) payload.attributes.LANGUE = lang;
    if (env.BREVO_LIST_ID) payload.listIds = [Number(env.BREVO_LIST_ID)];
    const r = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'api-key': env.BREVO_API_KEY,
        'content-type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });
    // 201 = créé, 204 = mis à jour. 400 (contact déjà existant) est acceptable.
    if (r.ok || r.status === 204 || r.status === 400) return 'ok';
    return 'error:' + r.status;
  } catch (e) { return 'error'; }
}

export async function onRequestPost({ env, request }) {
  let body;
  try { body = await request.json(); } catch (e) { return json({ error: 'Requête invalide' }, 400); }
  if (body.website) return json({ ok: true }); // honeypot

  const email = (body.email || '').toString().trim().slice(0, 120).toLowerCase();
  const lang = (body.lang || '').toString().trim().slice(0, 5);
  const consent = body.consent === true || body.consent === 'true' || body.consent === 1;

  if (!EMAIL_RE.test(email)) return json({ error: 'invalid_email' }, 400);
  if (!consent) return json({ error: 'consent_required' }, 400);

  const domain = email.split('@')[1].toLowerCase();
  const reachable = await domainCanReceiveMail(domain);
  if (!reachable) return json({ error: 'invalid_domain' }, 400);

  // Ajout à Brevo (n'empêche pas la sauvegarde locale en cas d'échec).
  const brevo = await addToBrevo(env, email, lang);

  // Sauvegarde locale (idempotent : un même e-mail n'est enregistré qu'une fois).
  if (env.DB) {
    try {
      const id = crypto.randomUUID();
      await env.DB.prepare(
        "INSERT INTO newsletter_subscribers (id, email, lang, consent, status, source, brevo, created_at) " +
        "VALUES (?, ?, ?, 1, 'active', 'site', ?, ?) " +
        "ON CONFLICT(email) DO UPDATE SET status='active', consent=1, brevo=excluded.brevo"
      ).bind(id, email, lang, brevo, Date.now()).run();
    } catch (e) {
      // Si la table n'existe pas encore ou autre souci DB, on n'échoue pas l'inscription
      // tant que Brevo a fonctionné.
      if (brevo !== 'ok') return json({ error: 'server' }, 500);
    }
  } else if (brevo !== 'ok') {
    return json({ error: 'server' }, 500);
  }

  return json({ ok: true });
}
