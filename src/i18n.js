// Configuration multilingue partagée (français à la racine, autres langues préfixées).
export const LANGS = [
  { code: 'fr', label: 'FR' },
  { code: 'en', label: 'EN' },
  { code: 'es', label: 'ES' },
  { code: 'pt', label: 'PT' },
  { code: 'zh', label: '中文' },
];
export const NON_FR = ['en', 'es', 'pt', 'zh'];

// Pages autonomes (formulaires interactifs) pas encore localisées : elles restent en français.
export const STANDALONE = ['contact', 'connect', 'mur-de-priere', 'partenaires', 'faire-un-don', 'don-merci', 'admin-prieres'];

// Détecte la langue depuis le chemin de l'URL.
export function localeFromPath(pathname) {
  const m = (pathname || '').match(/^\/(en|es|pt|zh)(\/|$)/);
  return m ? m[1] : 'fr';
}

// Retourne le "slug nu" (sans préfixe de langue, sans slash autour). '' = accueil.
export function barePath(pathname) {
  let p = (pathname || '/').replace(/^\/(en|es|pt|zh)(?=\/|$)/, '');
  return p.replace(/^\/+/, '').replace(/\/+$/, '');
}

// Construit l'URL d'un slug nu dans une langue donnée.
export function localizedHref(bare, lang) {
  const slug = (bare || '').split('/')[0];
  if (STANDALONE.indexOf(slug) !== -1) {
    // pages autonomes : non encore traduites -> on garde la version française (racine)
    return bare ? '/' + bare : '/';
  }
  if (lang === 'fr') return bare ? '/' + bare : '/';
  return bare ? '/' + lang + '/' + bare : '/' + lang + '/';
}
