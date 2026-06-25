// Optimisation des images Storyblok via le service d'images intégré.
// Objectif : réduire fortement le trafic CDN (Storyblok facture le trafic des
// images servies). On redimensionne à la largeur d'affichage, on convertit en
// WebP et on compresse — gain typique de 80 à 90 % de poids, rendu identique.
//
// sbImg('https://a.storyblok.com/f/.../photo.jpg', 800)
//   -> 'https://a.storyblok.com/f/.../photo.jpg/m/800x0/filters:format%28webp%29:quality%2875%29'
//
// IMPORTANT : les parenthèses des filtres sont ENCODÉES (%28 / %29). Sans cela,
// elles cassent le CSS background-image:url(...) (le « ) » ferme le url() trop tôt)
// et toutes les images de fond de bloc disparaissent.
export function sbImg(url, width = 1200, quality = 75) {
  if (!url || typeof url !== 'string') return url || '';
  // Seules les images du CDN Storyblok passent par le service.
  if (url.indexOf('a.storyblok.com') === -1) return url;
  // Déjà transformée, ou format vectoriel/animé : on ne touche pas.
  if (url.indexOf('/m/') !== -1) return url;
  if (/\.(svg|gif)(\?|$)/i.test(url)) return url;
  return url + '/m/' + Math.round(width) + 'x0/filters:format%28webp%29:quality%28' + quality + '%29';
}
