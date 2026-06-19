// Contact — réception d'un message (POST) -> D1 (contact_messages)
function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });
}
async function verifyTurnstile(token, secret, request) {
  if (!token) return false;
  const form = new FormData();
  form.append('secret', secret);
  form.append('response', token);
  const ip = request.headers.get('CF-Connecting-IP');
  if (ip) form.append('remoteip', ip);
  try {
    const r = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body: form });
    const data = await r.json();
    return !!data.success;
  } catch (e) { return false; }
}

// Validation syntaxique stricte
const EMAIL_RE = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/;

// Vérifie que le domaine de l'e-mail peut recevoir du courrier (MX, sinon A).
// "Fail open" : en cas d'erreur réseau on n'empêche pas l'envoi.
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
  if (mx === null) return true; // DNS indisponible -> on laisse passer
  if (mx.Answer && mx.Answer.some((a) => a.type === 15)) return true;
  const a = await dns('A');
  if (a === null) return true;
  return !!(a.Answer && a.Answer.length);
}

export async function onRequestPost({ env, request }) {
  if (!env.DB) return json({ error: 'Base non configurée' }, 500);
  let body;
  try { body = await request.json(); } catch (e) { return json({ error: 'Requête invalide' }, 400); }
  if (body.website) return json({ ok: true }); // honeypot

  // Anti-spam best-effort : si un jeton Turnstile est fourni, on le vérifie (et on refuse s'il est invalide).
  // S'il n'y en a pas (widget non chargé chez le visiteur), on laisse passer : la protection repose alors
  // sur le honeypot + la validation du domaine e-mail + la modération manuelle.
  if (env.TURNSTILE_SECRET && body.turnstileToken) {
    const ok = await verifyTurnstile(body.turnstileToken, env.TURNSTILE_SECRET, request);
    if (!ok) return json({ error: 'Vérification anti-robot échouée. Réessaie.' }, 400);
  }

  const name = (body.name || '').toString().trim().slice(0, 80);
  const email = (body.email || '').toString().trim().slice(0, 120);
  const subject = (body.subject || '').toString().trim().slice(0, 80);
  const message = (body.message || '').toString().trim().slice(0, 3000);

  if (!EMAIL_RE.test(email)) return json({ error: 'Indique une adresse e-mail valide.' }, 400);
  if (message.length < 10) return json({ error: 'Ton message doit faire au moins 10 caractères.' }, 400);

  // Vérifie que le domaine existe et peut recevoir du courrier
  const domain = email.split('@')[1].toLowerCase();
  const reachable = await domainCanReceiveMail(domain);
  if (!reachable) return json({ error: "Le domaine de cet e-mail ne semble pas exister. Vérifie l'adresse." }, 400);

  const id = crypto.randomUUID();
  await env.DB.prepare(
    "INSERT INTO contact_messages (id, name, email, subject, message, status, created_at) VALUES (?, ?, ?, ?, ?, 'pending', ?)"
  ).bind(id, name, email, subject, message, Date.now()).run();

  return json({ ok: true });
}
