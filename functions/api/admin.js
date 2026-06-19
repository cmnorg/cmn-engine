// Modération : prières (par défaut) et témoignages (type=temoignages)
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
function tableFor(type) {
  if (type === 'temoignages') return 'temoignages';
  if (type === 'connect') return 'connect_requests';
  if (type === 'contact') return 'contact_messages';
  return 'prieres';
}

export async function onRequestGet({ env, request }) {
  if (!authorized(env, request)) return json({ error: 'unauthorized' }, 401);
  if (!env.DB) return json({ items: [] });
  const url = new URL(request.url);
  const status = url.searchParams.get('status') || 'pending';
  const tbl = tableFor(url.searchParams.get('type'));
  const { results } = await env.DB.prepare(
    "SELECT * FROM " + tbl + " WHERE status = ? ORDER BY created_at DESC LIMIT 300"
  ).bind(status).all();
  return json({ items: results || [] });
}

export async function onRequestPost({ env, request }) {
  if (!authorized(env, request)) return json({ error: 'unauthorized' }, 401);
  if (!env.DB) return json({ error: 'Base non configurée' }, 500);
  let body;
  try { body = await request.json(); } catch (e) { return json({ error: 'bad' }, 400); }
  const id = (body.id || '').toString();
  const action = (body.action || '').toString();
  const tbl = tableFor(body.type);
  if (!id) return json({ error: 'bad' }, 400);

  if (action === 'approve') await env.DB.prepare("UPDATE " + tbl + " SET status = 'approved' WHERE id = ?").bind(id).run();
  else if (action === 'reject') await env.DB.prepare("UPDATE " + tbl + " SET status = 'rejected' WHERE id = ?").bind(id).run();
  else if (action === 'delete') await env.DB.prepare("DELETE FROM " + tbl + " WHERE id = ?").bind(id).run();
  else return json({ error: 'action inconnue' }, 400);

  return json({ ok: true });
}
