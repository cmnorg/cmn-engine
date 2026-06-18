// Mur de prière — déposer (POST) et lister les prières publiées (GET)
// Base : Cloudflare D1 (binding "DB")

const BLOCK = ['connard', 'salope', 'enculé', 'pute', 'nègre', 'fuck', 'bitch', 'nigger', 'asshole'];

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });
}

export async function onRequestGet({ env }) {
  if (!env.DB) return json({ prieres: [] });
  const { results } = await env.DB.prepare(
    "SELECT id, name, category, text, count, created_at FROM prieres WHERE status = 'approved' ORDER BY created_at DESC LIMIT 100"
  ).all();
  return json({ prieres: results || [] });
}

export async function onRequestPost({ env, request }) {
  if (!env.DB) return json({ error: 'Base non configurée' }, 500);
  let body;
  try { body = await request.json(); } catch (e) { return json({ error: 'Requête invalide' }, 400); }

  // Honeypot anti-robot : si ce champ caché est rempli, on ignore (en faisant semblant d'accepter).
  if (body.website) return json({ ok: true });

  const text = (body.text || '').toString().trim();
  const name = (body.name || '').toString().trim().slice(0, 60);
  const category = (body.category || '').toString().trim().slice(0, 40);

  if (text.length < 5 || text.length > 1500) return json({ error: 'Ta demande doit faire entre 5 et 1500 caractères.' }, 400);

  const low = text.toLowerCase();
  const flagged = BLOCK.some((w) => low.includes(w));
  const status = flagged ? 'pending' : 'approved';

  const id = crypto.randomUUID();
  await env.DB.prepare(
    "INSERT INTO prieres (id, name, category, text, count, status, created_at) VALUES (?, ?, ?, ?, 0, ?, ?)"
  ).bind(id, name, category, text, status, Date.now()).run();

  return json({ ok: true, status });
}
