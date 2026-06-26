// Proxy d'images Storyblok mis en cache par Cloudflare.
// But : ne solliciter Storyblok qu'UNE seule fois par image. Les visiteurs
// reçoivent ensuite l'image depuis le cache edge de Cloudflare (bande passante
// gratuite et généreuse), ce qui ramène le trafic Storyblok à presque rien.
//
// URL servie au navigateur :  /img/f/<space>/<dim>/<hash>/<fichier>/m/...
// -> on reconstruit  https://a.storyblok.com/f/<space>/.../m/...  et on met en cache.

export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);

  // Tout ce qui suit "/img/" est le chemin de l'asset Storyblok.
  const path = url.pathname.replace(/^\/img\//, '');

  // Sécurité : on ne sert QUE des assets Storyblok (chemin commençant par "f/").
  // Impossible de transformer ce proxy en proxy ouvert vers d'autres domaines.
  if (!path || !/^f\//.test(path)) {
    return new Response('Not found', { status: 404 });
  }

  const target = 'https://a.storyblok.com/' + path + url.search;

  // 1) On tente le cache edge de Cloudflare.
  const cache = caches.default;
  const cacheKey = new Request(target, { method: 'GET' });
  let resp = await cache.match(cacheKey);
  if (resp) return resp;

  // 2) Cache miss -> on va chercher chez Storyblok (une seule fois).
  const upstream = await fetch(target, {
    cf: { cacheEverything: true, cacheTtl: 31536000 },
    headers: { Accept: request.headers.get('Accept') || 'image/*' },
  });

  if (!upstream.ok) {
    return new Response('Image upstream error', { status: upstream.status });
  }

  // 3) On renvoie l'image avec un cache très long et on la stocke côté edge.
  resp = new Response(upstream.body, upstream);
  resp.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  resp.headers.set('X-CMN-Img-Cache', 'storyblok-proxy');
  resp.headers.delete('Set-Cookie');

  context.waitUntil(cache.put(cacheKey, resp.clone()));
  return resp;
}
