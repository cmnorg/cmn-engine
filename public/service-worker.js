// Service worker CMN — PWA installable + hors-ligne, SANS contenu périmé.
// Stratégie : RÉSEAU D'ABORD pour tout (toujours la dernière version), repli sur le cache uniquement hors-ligne.
const CACHE = 'cmn-engine-v3';

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.add('/')).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  // Jamais de cache pour les API et l'admin.
  if (url.pathname.startsWith('/api/') || url.pathname.startsWith('/admin-prieres')) return;

  // Réseau d'abord : on sert toujours la version fraîche ; on ne met en cache que pour le mode hors-ligne.
  e.respondWith(
    fetch(req)
      .then((resp) => {
        const copy = resp.clone();
        caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
        return resp;
      })
      .catch(() => caches.match(req).then((c) => c || caches.match('/')))
  );
});
