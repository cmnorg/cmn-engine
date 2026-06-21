// Renvoie le pays du visiteur (détecté par Cloudflare) — utilisé pour pré-remplir l'indicatif téléphone.
export function onRequestGet({ request }) {
  const country = (request.cf && request.cf.country) || '';
  return new Response(JSON.stringify({ country }), {
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  });
}
