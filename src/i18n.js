// Configuration multilingue partagée (français à la racine, autres langues préfixées).
export const LANGS = [
  { code: 'fr', label: 'FR' },
  { code: 'en', label: 'EN' },
];
export const NON_FR = ['en'];

// Pages autonomes (formulaires interactifs) pas encore localisées : elles restent en français.
export const STANDALONE = ['mur-de-priere', 'faire-un-don', 'don-merci', 'admin-prieres', 'admin', 'mentions-legales', 'confidentialite', 'cookies'];

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
  // Actualités / Événements (libellés issus du code)
  'À venir': { en: 'Upcoming', id: 'Akan datang', es: 'Próximos', zh: '即将举行', mg: 'Ho avy' },
  'Passés': { en: 'Past', id: 'Sudah lewat', es: 'Pasados', zh: '往期', mg: 'Lasa' },
  "Je m'inscris": { en: 'Register', id: 'Daftar', es: 'Inscribirme', zh: '报名', mg: 'Hisoratra anarana' },
  '← Retour aux actualités': { en: '← Back to news', id: '← Kembali ke berita', es: '← Volver a noticias', zh: '← 返回新闻', mg: '← Hiverina amin\'ny vaovao' },
  'Aucun événement à venir pour le moment.': { en: 'No upcoming events at the moment.', id: 'Belum ada acara mendatang.', es: 'No hay eventos próximos por ahora.', zh: '暂无即将举行的活动。', mg: 'Tsy misy hetsika ho avy aloha.' },
  'Aucun événement passé.': { en: 'No past events.', id: 'Tidak ada acara yang lalu.', es: 'No hay eventos pasados.', zh: '暂无往期活动。', mg: 'Tsy misy hetsika lasa.' },
  'Quand': { en: 'When', id: 'Kapan', es: 'Cuándo', zh: '时间', mg: 'Rahoviana' },
  'Où': { en: 'Where', id: 'Di mana', es: 'Dónde', zh: '地点', mg: 'Aiza' },
  'En savoir plus': { en: 'Learn more', id: 'Selengkapnya', es: 'Saber más', zh: '了解更多', mg: 'Fantaro bebe kokoa' },
  // Page Contact (textes du code)
  'Écris-nous': { en: 'Write to us' },
  'Une question, un projet de partenariat, une demande de prière ? Notre équipe te répond avec joie.': { en: 'A question, a partnership idea, a prayer request? Our team will gladly reply.' },
  'Restons en lien': { en: "Let's stay connected" },
  'Nous lisons chaque message et répondons généralement sous 48 h.': { en: 'We read every message and usually reply within 48 hours.' },
  'Remplis le formulaire, on te répond vite.': { en: "Fill in the form and we'll reply quickly." },
  'Suis-nous': { en: 'Follow us' },
  'Accès rapides': { en: 'Quick links' },
  'Déposer une prière': { en: 'Post a prayer' },
  'Rejoindre un groupe': { en: 'Join a group' },
  'Envoie-nous un message': { en: 'Send us a message' },
  'Ton nom': { en: 'Your name' },
  'Prénom et nom': { en: 'First and last name' },
  'Ton e-mail *': { en: 'Your email *' },
  'Sujet': { en: 'Subject' },
  'Ton message *': { en: 'Your message *' },
  'Écris-nous ici…': { en: 'Write to us here…' },
  "J'accepte que CMN utilise ces informations pour me répondre.": { en: 'I agree that CMN may use this information to reply to me.' },
  'Envoyer mon message': { en: 'Send my message' },
  "🔒 Tes informations restent confidentielles et ne servent qu'à te répondre.": { en: '🔒 Your information stays confidential and is only used to reply to you.' },
  // Sujets du formulaire
  'Question générale': { en: 'General question' },
  'Partenariat': { en: 'Partnership' },
  'Demande de prière': { en: 'Prayer request' },
  'Bénévolat / Mission': { en: 'Volunteering / Mission' },
  'Proposer un groupe (Connect)': { en: 'Propose a group (Connect)' },
  'Presse & médias': { en: 'Press & media' },
  'Autre': { en: 'Other' },
  // Messages JS du formulaire
  'Écris quelques mots de plus (au moins 10 caractères).': { en: 'Please write a little more (at least 10 characters).' },
  'Merci de cocher le consentement.': { en: 'Please tick the consent box.' },
  'Envoi…': { en: 'Sending…' },
  'Merci ! Ton message a bien été envoyé. Nous te répondrons bientôt 🙏': { en: "Thank you! Your message has been sent. We'll reply soon 🙏" },
  'Une erreur est survenue.': { en: 'Something went wrong.' },
  // Page Partenaires (textes du code)
  'Deviens partenaire de la mission': { en: 'Become a partner in the mission' },
  'Un partenaire mensuel se tient à nos côtés, mois après mois. Ton soutien régulier nous permet de planifier les campagnes, former des disciples et faire vivre les projets humanitaires dans la durée.': { en: 'A monthly partner stands with us, month after month. Your regular support lets us plan campaigns, train disciples and sustain humanitarian projects over the long term.' },
  '🔒 Paiement sécurisé': { en: '🔒 Secure payment' },
  '🧾 Reçu fiscal automatique': { en: '🧾 Automatic tax receipt' },
  '✋ Résiliable à tout moment': { en: '✋ Cancel anytime' },
  'Mensuel': { en: 'Monthly' },
  'recommandé': { en: 'recommended' },
  'Ponctuel': { en: 'One-time' },
  '/mois': { en: '/month' },
  'Le plus choisi': { en: 'Most chosen' },
  'Ami': { en: 'Friend' },
  'Compagnon': { en: 'Companion' },
  'Bâtisseur': { en: 'Builder' },
  'Pilier': { en: 'Pillar' },
  '≈ 150 personnes touchées en ligne / mois': { en: '≈ 150 people reached online / month' },
  '= 1 disciple formé chaque mois': { en: '= 1 disciple trained each month' },
  '= 1 famille aidée sur le terrain': { en: '= 1 family helped in the field' },
  'contribue à une croisade complète': { en: 'helps fund a full crusade' },
  'Tu soutiens la diffusion de l’Évangile en ligne.': { en: 'You support spreading the Gospel online.' },
  'Tu aides à former un disciple chaque mois.': { en: 'You help train a disciple every month.' },
  'Tu soutiens une action humanitaire de terrain.': { en: 'You support humanitarian work in the field.' },
  'Tu portes une campagne d’évangélisation entière.': { en: 'You carry an entire evangelization campaign.' },
  'Devenir partenaire': { en: 'Become a partner' },
  'Tu préfères choisir ton montant ?': { en: 'Prefer to choose your own amount?' },
  'Montant': { en: 'Amount' },
  'Donner ce montant': { en: 'Give this amount' },
  "« Être partenaire mensuel, c'est porter la mission dans la durée. On reçoit des nouvelles du terrain et on voit concrètement l'impact. »": { en: '"Being a monthly partner means carrying the mission over time. You receive news from the field and see the impact for yourself."' },
  '— Un partenaire CMN': { en: '— A CMN partner' },
  'Ce que vivent nos partenaires': { en: 'What our partners experience' },
  'Nouvelles de la mission': { en: 'Mission news' },
  'Reçois les rapports du terrain et les prières exaucées.': { en: 'Receive field reports and answered prayers.' },
  'Prière': { en: 'Prayer' },
  'Nous prions régulièrement pour nos partenaires.': { en: 'We pray regularly for our partners.' },
  'Transparence': { en: 'Transparency' },
  'Reçu fiscal et impact détaillé de tes dons.': { en: 'Tax receipt and detailed impact of your gifts.' },
  'Voir où va ton don →': { en: 'See where your gift goes →' },
  '🙏 Partenaire de prière': { en: '🙏 Prayer partner' },
  'Pas (encore) en mesure de donner ? Deviens partenaire de prière : ton intercession est précieuse.': { en: 'Not (yet) able to give? Become a prayer partner: your intercession is precious.' },
  'Rejoindre la prière': { en: 'Join in prayer' },
  '🤝 Partenariats & organisations': { en: '🤝 Partnerships & organizations' },
  'Église, entreprise ou ONG ? Construisons un partenariat stratégique.': { en: "Church, business or NGO? Let's build a strategic partnership." },
  'Nous contacter': { en: 'Contact us' },
  'Tiens-toi à nos côtés, épaule contre épaule, pour transformer les nations.': { en: 'Stand with us, shoulder to shoulder, to transform nations.' },
  'Devenir partenaire mensuel': { en: 'Become a monthly partner' },
  'Tu as oublié de saisir ton montant 🙂': { en: 'You forgot to enter your amount 🙂' },
  'Le montant minimum est de {n} €.': { en: 'The minimum amount is {n} €.' },
  // Page Connect (textes du code)
  'Une communauté mondiale : rejoins des groupes, échange, prie et sers avec nous.': { en: 'A global community: join groups, connect, pray and serve with us.' },
  "Canal d'annonces officiel": { en: 'Official announcements channel' },
  'Reçois nouvelles, événements et sujets de prière de CMN.': { en: 'Get news, events and prayer topics from CMN.' },
  "S'abonner au canal": { en: 'Subscribe to the channel' },
  'Nouveau ici ? Rejoins-nous en 3 étapes': { en: 'New here? Join us in 3 steps' },
  'Choisis un groupe (pays ou thématique)': { en: 'Choose a group (country or topic)' },
  'Laisse tes coordonnées pour être ajouté': { en: 'Leave your details to be added' },
  'Présente-toi, prie et sers avec nous': { en: 'Introduce yourself, pray and serve with us' },
  'Rechercher un groupe…': { en: 'Search for a group…' },
  'Tous': { en: 'All' },
  'Pays': { en: 'Countries' },
  'Thématiques': { en: 'Topics' },
  'Aucun groupe ne correspond à ta recherche.': { en: 'No group matches your search.' },
  'Notre charte': { en: 'Our charter' },
  "Bienveillance, respect et valeurs chrétiennes. Pas de spam ni de polémique : on s'encourage et on prie les uns pour les autres.": { en: 'Kindness, respect and Christian values. No spam or controversy: we encourage one another and pray for each other.' },
  'Tu veux animer un groupe ?': { en: 'Want to lead a group?' },
  'Lance un groupe pour ta ville, ton pays ou ta passion.': { en: 'Start a group for your city, your country or your passion.' },
  'Proposer un groupe': { en: 'Propose a group' },
  "Laisse tes coordonnées : un responsable CMN t'accueillera et t'ajoutera au groupe.": { en: 'Leave your details: a CMN leader will welcome you and add you to the group.' },
  'Groupe choisi': { en: 'Selected group' },
  'Numéro WhatsApp': { en: 'WhatsApp number' },
  'E-mail (facultatif)': { en: 'Email (optional)' },
  'Ton message (obligatoire — présente-toi en quelques mots)': { en: 'Your message (required — introduce yourself in a few words)' },
  "Bonjour, je m'appelle… et je souhaite rejoindre ce groupe parce que…": { en: "Hello, my name is… and I'd like to join this group because…" },
  "J'accepte d'être contacté(e) par CMN pour rejoindre ce groupe.": { en: 'I agree to be contacted by CMN to join this group.' },
  'Envoyer ma demande': { en: 'Send my request' },
  "🔒 Tes coordonnées ne sont jamais publiées. Elles servent uniquement à t'accueillir dans le groupe.": { en: '🔒 Your details are never published. They are only used to welcome you into the group.' },
  'Connecte-toi à la branche CMN de ta région.': { en: 'Connect with the CMN branch in your region.' },
  'Partage et grandis autour de ce qui te passionne.': { en: 'Share and grow around what you are passionate about.' },
  'membres': { en: 'members' },
  'Rejoindre le groupe': { en: 'Join the group' },
  'Indique un numéro WhatsApp ou un e-mail.': { en: 'Enter a WhatsApp number or an email.' },
  'Merci d’écrire un petit message de présentation.': { en: 'Please write a short introduction.' },
  'Confirme que tu n’es pas un robot.': { en: "Please confirm you're not a robot." },
  'Merci ! Un responsable te contactera bientôt pour t’accueillir 🙏': { en: 'Thank you! A leader will contact you soon to welcome you 🙏' },
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
