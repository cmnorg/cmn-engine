// Cache des appels Storyblok PENDANT LE BUILD.
// Objectif : réduire le nombre de requêtes API Storyblok. Un même appel
// (mêmes paramètres) n'est exécuté qu'UNE seule fois, puis réutilisé pour
// toutes les pages et toutes les langues du build. Ex. les listes (vidéos,
// événements, programmes…) qui n'ont pas de paramètre de langue étaient
// rechargées 5 fois (une par langue) — désormais une seule fois.
//
// Le cache vit le temps du processus de build (process Node unique), il est
// donc automatiquement vide à chaque nouveau build (toujours du contenu frais).
import { useStoryblokApi } from '@storyblok/astro';

const _cache = new Map();

export function sbGet(slug, params = {}) {
  const key = slug + '::' + JSON.stringify(params);
  if (_cache.has(key)) return _cache.get(key);
  const api = useStoryblokApi();
  // On met en cache la promesse (déduplique aussi les appels simultanés).
  const promise = api.get(slug, params).catch((e) => {
    _cache.delete(key); // un échec ne doit pas rester en cache
    throw e;
  });
  _cache.set(key, promise);
  return promise;
}
