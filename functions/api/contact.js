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

export async function onRequestPost({ env, request }) {
  if (!env.DB) return json({ error: 'Base non configurée' }, 500);
  let body;
  try { body = await request.json(); } catch (e) { return json({ error: 'Requête invalide' }, 400); }
  if (body.website) return json({ ok: true }); // honeypot

  if (env.TURNSTILE_SECRET) {
    const ok = await verifyTurnstile(body.turnstileToken, env.TURNSTILE_SECRET, request);
    if (!ok) return json({ error: 'Vérification anti-robot échouée. Réessaie.' }, 400);
  }

  const name = (body.name || '').toString().trim().slice(0, 80);
  const email = (body.email || '').toString().trim().slice(0, 120);
  const subject = (body.subject || '').toString().trim().slice(0, 80);
  const message = (body.message || '').toString().trim().slice(0, 3000);

  if (!email || email.indexOf('@') < 1) return json({ error: 'Indique une adresse e-mail valide.' }, 400);
  if (message.length < 10) return json({ error: 'Ton message doit faire au moins 10 caractères.' }, 400);

  const id = crypto.randomUUID();
  await env.DB.prepare(
    "INSERT INTO contact_messages (id, name, email, subject, message, status, created_at) VALUES (?, ?, ?, ?, ?, 'pending', ?)"
  ).bind(id, name, email, subject, message, Date.now()).run();

  return json({ ok: true });
}
