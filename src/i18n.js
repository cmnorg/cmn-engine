// Configuration multilingue partagée (français à la racine, autres langues préfixées).
export const LANGS = [
  { code: 'fr', label: 'FR' },
  { code: 'en', label: 'EN' },
  { code: 'id', label: 'ID' },
  { code: 'es', label: 'ES' },
  { code: 'zh', label: '中文' },
];
export const NON_FR = ['en', 'id', 'es', 'zh'];

// Pages autonomes (formulaires interactifs) pas encore localisées : elles restent en français.
export const STANDALONE = ['contact', 'connect', 'mur-de-priere', 'partenaires', 'faire-un-don', 'don-merci', 'admin-prieres'];

// Détecte la langue depuis le chemin de l'URL.
export function localeFromPath(pathname) {
  const m = (pathname || '').match(/^\/(en|id|es|zh)(\/|$)/);
  return m ? m[1] : 'fr';
}

// Retourne le "slug nu" (sans préfixe de langue, sans slash autour). '' = accueil.
export function barePath(pathname) {
  let p = (pathname || '/').replace(/^\/(en|id|es|zh)(?=\/|$)/, '');
  return p.replace(/^\/+/, '').replace(/\/+$/, '');
}

// Dictionnaire de l'interface (textes fixes). Le contenu éditorial vient de Storyblok.
// NB : "mg" (malgache) est conservé pour quand Storyblok l'aura activé ; ce sont des ÉBAUCHES à faire valider.
export const UI = {
  // Menu
  'Nous découvrir': { en: 'About us', id: 'Tentang kami', es: 'Quiénes somos', zh: '关于我们', mg: 'Mahafantatra anay' },
  'Actualités': { en: 'News', id: 'Berita', es: 'Noticias', zh: '新闻', mg: 'Vaovao' },
  'Médias': { en: 'Media', id: 'Media', es: 'Medios', zh: '媒体', mg: 'Media' },
  'Academy': { en: 'Academy', id: 'Akademi', es: 'Academia', zh: '学院', mg: 'Akademia' },
  'Mur de prière': { en: 'Prayer Wall', id: 'Dinding doa', es: 'Muro de oración', zh: '祷告墙', mg: "Rindrin'ny vavaka" },
  'Connect': { en: 'Connect', id: 'Terhubung', es: 'Conectar', zh: '社群', mg: 'Mifandray' },
  'Partenaires': { en: 'Partners', id: 'Mitra', es: 'Socios', zh: '伙伴', mg: "Mpiara-miombon'antoka" },
  'Contact': { en: 'Contact', id: 'Kontak', es: 'Contacto', zh: '联系', mg: 'Fifandraisana' },
  'Faire un don': { en: 'Donate', id: 'Donasi', es: 'Donar', zh: '捐赠', mg: 'Manome' },
  // Bandeau newsletter
  'Restez informé de la mission': { en: 'Stay informed about the mission', id: 'Tetap ikuti perkembangan misi', es: 'Mantente informado de la misión', zh: '关注使命动态', mg: 'Mahazoa vaovao momba ny iraka' },
  'Nouvelles du terrain, prières exaucées et temps forts — directement dans votre boîte mail.': { en: 'Field news, answered prayers and highlights — straight to your inbox.', id: 'Berita dari lapangan, doa yang dijawab, dan momen penting — langsung ke email Anda.', es: 'Noticias del terreno, oraciones contestadas y momentos destacados, directamente en tu correo.', zh: '前线消息、蒙应允的祷告与精彩时刻，直接发送到您的邮箱。', mg: "Vaovao avy eny an-toerana, vavaka voavaly ary fotoan-dehibe — mivantana ao amin'ny mailakao." },
  'Votre adresse email': { en: 'Your email address', id: 'Alamat email Anda', es: 'Tu correo electrónico', zh: '您的邮箱地址', mg: "Ny adiresy mailakao" },
  "S'inscrire": { en: 'Subscribe', id: 'Berlangganan', es: 'Suscribirse', zh: '订阅', mg: 'Hisoratra anarana' },
  "J'accepte de recevoir la newsletter de CMN et je peux me désinscrire à tout moment (voir la politique de confidentialité).": { en: 'I agree to receive the CMN newsletter and can unsubscribe at any time (see the privacy policy).', id: 'Saya setuju menerima newsletter CMN dan dapat berhenti berlangganan kapan saja (lihat kebijakan privasi).', es: 'Acepto recibir el boletín de CMN y puedo darme de baja en cualquier momento (ver la política de privacidad).', zh: '我同意接收 CMN 的通讯，并可随时取消订阅（见隐私政策）。', mg: "Manaiky handray ny gazety CMN aho ary afaka mialà amin'ny fotoana rehetra (jereo ny politikan'ny fiarovana ny tsiambaratelo)." },
  // Pied de page
  "Agir pour transformer, inspirer l'espoir.": { en: 'Acting to transform, inspiring hope.', id: 'Bertindak untuk mengubah, menginspirasi harapan.', es: 'Actuar para transformar, inspirar esperanza.', zh: '行动以转化，激发希望。', mg: 'Miasa hanova, mamporisika fanantenana.' },
  'Confidentialité': { en: 'Privacy', id: 'Privasi', es: 'Privacidad', zh: '隐私政策', mg: 'Fiarovana ny tsiambaratelo' },
  'Mentions légales': { en: 'Legal notice', id: 'Ketentuan hukum', es: 'Aviso legal', zh: '法律声明', mg: 'Fanamarihana ara-dalàna' },
  'Gérer mes cookies': { en: 'Manage cookies', id: 'Kelola cookie', es: 'Gestionar cookies', zh: '管理 Cookie', mg: 'Hitantana ny cookies' },
  '© CMN — Tous droits réservés.': { en: '© CMN — All rights reserved.', id: '© CMN — Hak cipta dilindungi.', es: '© CMN — Todos los derechos reservados.', zh: '© CMN — 版权所有。', mg: '© CMN — Voatokana ny zo rehetra.' },
};

// Traduit un texte d'interface. Renvoie le français si pas de traduction.
export function t(locale, key) {
  if (locale === 'fr' || !key) return key;
  const row = UI[key];
  return (row && row[locale]) || key;
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
