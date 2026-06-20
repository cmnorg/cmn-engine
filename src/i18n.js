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

// Dictionnaire de l'interface (textes fixes). Le contenu éditorial vient de Storyblok.
export const UI = {
  // Menu
  'Nous découvrir': { en: 'About us', es: 'Quiénes somos', pt: 'Quem somos', zh: '关于我们' },
  'Actualités': { en: 'News', es: 'Noticias', pt: 'Notícias', zh: '新闻' },
  'Médias': { en: 'Media', es: 'Medios', pt: 'Mídia', zh: '媒体' },
  'Academy': { en: 'Academy', es: 'Academia', pt: 'Academia', zh: '学院' },
  'Mur de prière': { en: 'Prayer Wall', es: 'Muro de oración', pt: 'Mural de oração', zh: '祷告墙' },
  'Connect': { en: 'Connect', es: 'Conectar', pt: 'Conectar', zh: '社群' },
  'Partenaires': { en: 'Partners', es: 'Socios', pt: 'Parceiros', zh: '伙伴' },
  'Contact': { en: 'Contact', es: 'Contacto', pt: 'Contato', zh: '联系' },
  'Faire un don': { en: 'Donate', es: 'Donar', pt: 'Doar', zh: '捐赠' },
  // Bandeau newsletter
  'Restez informé de la mission': { en: 'Stay informed about the mission', es: 'Mantente informado de la misión', pt: 'Fique informado sobre a missão', zh: '关注使命动态' },
  'Nouvelles du terrain, prières exaucées et temps forts — directement dans votre boîte mail.': { en: 'Field news, answered prayers and highlights — straight to your inbox.', es: 'Noticias del terreno, oraciones contestadas y momentos destacados, directamente en tu correo.', pt: 'Notícias do campo, orações respondidas e destaques — direto no seu e-mail.', zh: '前线消息、蒙应允的祷告与精彩时刻，直接发送到您的邮箱。' },
  'Votre adresse email': { en: 'Your email address', es: 'Tu correo electrónico', pt: 'Seu e-mail', zh: '您的邮箱地址' },
  "S'inscrire": { en: 'Subscribe', es: 'Suscribirse', pt: 'Inscrever-se', zh: '订阅' },
  "J'accepte de recevoir la newsletter de CMN et je peux me désinscrire à tout moment (voir la politique de confidentialité).": { en: 'I agree to receive the CMN newsletter and can unsubscribe at any time (see the privacy policy).', es: 'Acepto recibir el boletín de CMN y puedo darme de baja en cualquier momento (ver la política de privacidad).', pt: 'Aceito receber a newsletter da CMN e posso cancelar a qualquer momento (ver a política de privacidade).', zh: '我同意接收 CMN 的通讯，并可随时取消订阅（见隐私政策）。' },
  // Pied de page
  "Agir pour transformer, inspirer l'espoir.": { en: 'Acting to transform, inspiring hope.', es: 'Actuar para transformar, inspirar esperanza.', pt: 'Agir para transformar, inspirar esperança.', zh: '行动以转化，激发希望。' },
  'Confidentialité': { en: 'Privacy', es: 'Privacidad', pt: 'Privacidade', zh: '隐私政策' },
  'Mentions légales': { en: 'Legal notice', es: 'Aviso legal', pt: 'Aviso legal', zh: '法律声明' },
  'Gérer mes cookies': { en: 'Manage cookies', es: 'Gestionar cookies', pt: 'Gerenciar cookies', zh: '管理 Cookie' },
  '© CMN — Tous droits réservés.': { en: '© CMN — All rights reserved.', es: '© CMN — Todos los derechos reservados.', pt: '© CMN — Todos os direitos reservados.', zh: '© CMN — 版权所有。' },
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
