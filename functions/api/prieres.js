// Mur de prière — déposer (POST) et lister les prières publiées (GET)
// Base : Cloudflare D1 (binding "DB")

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
  if (!env.DB) return json({ prieres: [], stats: { requests: 0, praying: 0 } });
  const { results } = await env.DB.prepare(
    "SELECT id, name, category, text, count, created_at FROM prieres WHERE status = 'approved' ORDER BY created_at DESC LIMIT 100"
  ).all();
  const totals = await env.DB.prepare(
    "SELECT COUNT(*) AS requests, COALESCE(SUM(count), 0) AS praying FROM prieres WHERE status = 'approved'"
  ).first();
  return json({
    prieres: results || [],
    stats: { requests: (totals && totals.requests) || 0, praying: (totals && totals.praying) || 0 },
  });
}

export async function onRequestPost({ env, request }) {
  if (!env.DB) return json({ error: 'Base non configurée' }, 500);
  let body;
  try { body = await request.json(); } catch (e) { return json({ error: 'Requête invalide' }, 400); }

  // Honeypot anti-robot : si ce champ caché est rempli, on ignore (en faisant semblant d'accepter).
  if (body.website) return json({ ok: true });

  // Best-effort : on vérifie le jeton Turnstile s'il est fourni (et on refuse s'il est invalide).
  // S'il n'y en a pas (widget non chargé chez le visiteur), on laisse passer : honeypot + modération protègent déjà.
  if (env.TURNSTILE_SECRET && body.turnstileToken) {
    const ok = await verifyTurnstile(body.turnstileToken, env.TURNSTILE_SECRET, request);
    if (!ok) return json({ error: 'Vérification anti-robot échouée. Réessaie.' }, 400);
  }

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
