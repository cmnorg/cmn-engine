// Modération : lister les prières (GET) et valider/refuser/supprimer (POST)
// Protégé par la variable d'environnement ADMIN_KEY
function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });
}
function authorized(env, request) {
  const url = new URL(request.url);
  const key = url.searchParams.get('key') || request.headers.get('x-admin-key');
  return key && env.ADMIN_KEY && key === env.ADMIN_KEY;
}

export async function onRequestGet({ env, request }) {
  if (!authorized(env, request)) return json({ error: 'unauthorized' }, 401);
  if (!env.DB) return json({ prieres: [] });
  const url = new URL(request.url);
  const filter = url.searchParams.get('status') || 'pending';
  const { results } = await env.DB.prepare(
    "SELECT id, name, category, text, status, count, created_at FROM prieres WHERE status = ? ORDER BY created_at DESC LIMIT 300"
  ).bind(filter).all();
  return json({ prieres: results || [] });
}

export async function onRequestPost({ env, request }) {
  if (!authorized(env, request)) return json({ error: 'unauthorized' }, 401);
  if (!env.DB) return json({ error: 'Base non configurée' }, 500);
  let body;
  try { body = await request.json(); } catch (e) { return json({ error: 'bad' }, 400); }
  const id = (body.id || '').toString();
  const action = (body.action || '').toString();
  if (!id) return json({ error: 'bad' }, 400);

  if (action === 'approve') await env.DB.prepare("UPDATE prieres SET status = 'approved' WHERE id = ?").bind(id).run();
  else if (action === 'reject') await env.DB.prepare("UPDATE prieres SET status = 'rejected' WHERE id = ?").bind(id).run();
  else if (action === 'delete') await env.DB.prepare("DELETE FROM prieres WHERE id = ?").bind(id).run();
  else return json({ error: 'action inconnue' }, 400);

  return json({ ok: true });
}
