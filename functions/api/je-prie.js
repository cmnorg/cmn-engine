// "Je prie" : incrémente le compteur d'une prière publiée
function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });
}

export async function onRequestPost({ env, request }) {
  if (!env.DB) return json({ error: 'Base non configurée' }, 500);
  let body;
  try { body = await request.json(); } catch (e) { return json({ error: 'bad' }, 400); }
  const id = (body.id || '').toString();
  if (!id) return json({ error: 'bad' }, 400);

  await env.DB.prepare("UPDATE prieres SET count = count + 1 WHERE id = ? AND status = 'approved'").bind(id).run();
  const row = await env.DB.prepare("SELECT count FROM prieres WHERE id = ?").bind(id).first();
  return json({ count: row ? row.count : 0 });
}
