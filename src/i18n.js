// Configuration multilingue partagée (français à la racine, autres langues préfixées).
export const LANGS = [
  { code: 'fr', label: 'FR' },
  { code: 'en', label: 'EN' },
];
export const NON_FR = ['en'];

// Pages autonomes (formulaires interactifs) pas encore localisées : elles restent en français.
export const STANDALONE = ['contact', 'connect', 'mur-de-priere', 'partenaires', 'faire-un-don', 'don-merci', 'admin-prieres', 'admin', 'mentions-legales', 'confidentialite', 'cookies'];

// Détecte la langue depuis le chemin de l'URL.
export function localeFromPath(pathname) {
  const m = (pathname || '').match(/^\/(en)(\/|$)/);
  return m ? m[1] : 'fr';
}

// Retourne le "slug nu" (sans préfixe de langue, sans slash autour). '' = accueil.
export function barePath(pathname) {
  let p = (pathname || '/').replace(/^\/(en)(?=\/|$)/, '');
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
  'Thème': { en: 'Theme', id: 'Tema', es: 'Tema', zh: '主题', mg: 'Lokon-takelaka' },
  // Newsletter (messages du formulaire)
  "Merci ! Ton inscription à la newsletter est bien enregistrée.": { en: "Thanks! You're now subscribed to the newsletter.", id: 'Terima kasih! Kamu sudah berlangganan newsletter.', es: '¡Gracias! Ya estás suscrito(a) al boletín.', zh: '谢谢！您已成功订阅通讯。', mg: "Misaotra! Voasoratra anarana amin'ny gazety ianao." },
  'Indique une adresse e-mail valide.': { en: 'Please enter a valid email address.', id: 'Masukkan alamat email yang valid.', es: 'Introduce un correo electrónico válido.', zh: '请输入有效的电子邮箱地址。', mg: 'Ampidiro adiresy mailaka manan-kery.' },
  'Merci de cocher la case de consentement.': { en: 'Please tick the consent box.', id: 'Centang kotak persetujuan.', es: 'Marca la casilla de consentimiento.', zh: '请勾选同意框。', mg: 'Mariho ny efajoro fanekena.' },
  'Une erreur est survenue. Réessaie dans un instant.': { en: 'Something went wrong. Please try again shortly.', id: 'Terjadi kesalahan. Coba lagi sebentar.', es: 'Se produjo un error. Inténtalo de nuevo en un momento.', zh: '出现错误，请稍后重试。', mg: 'Nisy olana. Andramo indray afaka kelikely.' },
  // Campagne (libellés issus du code)
  'collectés sur': { en: 'raised of', id: 'terkumpul dari', es: 'recaudados de', zh: '已筹集，目标', mg: 'voaangona amin\'ny' },
  'donateurs': { en: 'donors', id: 'donatur', es: 'donantes', zh: '位捐赠者', mg: 'mpanome' },
  'jours restants': { en: 'days left', id: 'hari tersisa', es: 'días restantes', zh: '天剩余', mg: 'andro sisa' },
  // Gouvernance (libellés issus du code)
  '← Retour à la gouvernance': { en: '← Back to governance', id: '← Kembali ke tata kelola', es: '← Volver a la gobernanza', zh: '← 返回治理', mg: "← Hiverina amin'ny fitantanana" },
  '« Allez, faites de toutes les nations des disciples. »': { en: '"Go therefore and make disciples of all nations."', id: '"Karena itu pergilah, jadikanlah semua bangsa murid-Ku."', es: '"Id y haced discípulos a todas las naciones."', zh: '"所以你们要去，使万民作我的门徒。"', mg: '"Koa mandehana ianareo, ataovy mpianatra ny firenena rehetra."' },
  'Matthieu 28:19': { en: 'Matthew 28:19', id: 'Matius 28:19', es: 'Mateo 28:19', zh: '马太福音 28:19', mg: 'Matio 28:19' },
  'Contacter le bureau': { en: 'Contact the board', id: 'Hubungi pengurus', es: 'Contactar a la junta', zh: '联系理事会', mg: 'Hifandray amin\'ny birao' },
  // Bandeau cookies
  'Ce site utilise uniquement des cookies techniques nécessaires à son fonctionnement. Aucun cookie publicitaire.': { en: 'This site only uses technical cookies necessary for it to work. No advertising cookies.', id: 'Situs ini hanya memakai cookie teknis yang diperlukan agar berfungsi. Tanpa cookie iklan.', es: 'Este sitio solo usa cookies técnicas necesarias para funcionar. Sin cookies publicitarias.', zh: '本网站仅使用运行所必需的技术性 Cookie，不使用广告 Cookie。', mg: "Mampiasa cookies ara-teknika ilaina fotsiny ity tranonkala ity. Tsy misy cookie dokam-barotra." },
  "J'accepte": { en: 'I accept', id: 'Saya setuju', es: 'Acepto', zh: '我接受', mg: 'Ekeko' },
  'Refuser': { en: 'Decline', id: 'Tolak', es: 'Rechazar', zh: '拒绝', mg: 'Lavina' },
  'En savoir plus': { en: 'Learn more', id: 'Selengkapnya', es: 'Saber más', zh: '了解更多', mg: 'Fanazavana bebe kokoa' },
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
