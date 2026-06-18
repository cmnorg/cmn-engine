// Témoignages (prières exaucées) — déposer (POST) et lister les publiés (GET)
const BLOCK = ['connard', 'salope', 'enculé', 'pute', 'nègre', 'fuck', 'bitch', 'nigger', 'asshole'];

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

export async function onRequestGet({ env }) {
  if (!env.DB) return json({ temoignages: [] });
  const { results } = await env.DB.prepare(
    "SELECT id, name, location, category, text, created_at FROM temoignages WHERE status = 'approved' ORDER BY created_at DESC LIMIT 100"
  ).all();
  return json({ temoignages: results || [] });
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

  const text = (body.text || '').toString().trim();
  const name = (body.name || '').toString().trim().slice(0, 60);
  const location = (body.location || '').toString().trim().slice(0, 80);
  const category = (body.category || '').toString().trim().slice(0, 40);

  if (text.length < 5 || text.length > 1500) return json({ error: 'Ton témoignage doit faire entre 5 et 1500 caractères.' }, 400);

  const low = text.toLowerCase();
  const status = BLOCK.some((w) => low.includes(w)) ? 'pending' : 'pending'; // témoignages : toujours relus avant publication

  const id = crypto.randomUUID();
  await env.DB.prepare(
    "INSERT INTO temoignages (id, name, location, category, text, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)"
  ).bind(id, name, location, category, text, status, Date.now()).run();

  return json({ ok: true, status });
}
