// Détection automatique de la langue selon le pays du visiteur (via Cloudflare).
// Sur la page d'accueil "/" : si la langue officielle du pays est disponible -> redirige vers /<lang>/ ;
// sinon anglais. Le français reste à la racine. Un cookie "cmn_lang" mémorise le choix (manuel ou auto).

const NON_FR = ['en', 'id', 'es', 'zh'];

// Pays -> langue du site. Tout pays non listé tombe sur l'anglais.
const C2L = {
  // Francophones -> fr (racine)
  FR: 'fr', BE: 'fr', CH: 'fr', LU: 'fr', MC: 'fr', HT: 'fr',
  CI: 'fr', SN: 'fr', ML: 'fr', BF: 'fr', NE: 'fr', TG: 'fr', BJ: 'fr',
  GA: 'fr', CG: 'fr', CD: 'fr', CM: 'fr', TD: 'fr', GN: 'fr', MG: 'fr',
  // Départements / territoires français d'outre-mer -> fr
  GP: 'fr', MQ: 'fr', RE: 'fr', GF: 'fr', YT: 'fr', PM: 'fr',
  BL: 'fr', MF: 'fr', WF: 'fr', PF: 'fr', NC: 'fr',
  // Indonésien
  ID: 'id',
  // Hispanophones
  ES: 'es', MX: 'es', AR: 'es', CO: 'es', PE: 'es', VE: 'es', CL: 'es',
  EC: 'es', GT: 'es', CU: 'es', BO: 'es', DO: 'es', HN: 'es', PY: 'es',
  SV: 'es', NI: 'es', CR: 'es', PA: 'es', UY: 'es', PR: 'es',
  // Sinophones
  CN: 'zh', TW: 'zh', HK: 'zh', MO: 'zh',
  // Anglophones (et par défaut, tout le reste)
  US: 'en', GB: 'en', CA: 'en', AU: 'en', NZ: 'en', IE: 'en', ZA: 'en',
  NG: 'en', KE: 'en', GH: 'en', IN: 'en', PH: 'en', SG: 'en',
};

function countryToLang(cc) {
  return C2L[cc] || 'en';
}

export async function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);

  // On n'agit que sur la page d'accueil racine.
  if (url.pathname !== '/') return next();

  const cookie = request.headers.get('Cookie') || '';
  const m = cookie.match(/(?:^|;\s*)cmn_lang=([a-zA-Z-]+)/);

  let lang;
  if (m) {
    lang = m[1];
  } else {
    const cc = (request.cf && request.cf.country) || '';
    lang = countryToLang(cc);
  }

  // Langue non-française disponible -> on redirige vers /<lang>/
  if (lang && lang !== 'fr' && NON_FR.indexOf(lang) !== -1) {
    return Response.redirect(url.origin + '/' + lang + '/', 302);
  }

  // Français (ou inconnu) : on sert la racine et on mémorise le choix si pas déjà fait.
  const res = await next();
  if (!m) {
    const r = new Response(res.body, res);
    r.headers.append('Set-Cookie', 'cmn_lang=fr;path=/;max-age=31536000;SameSite=Lax');
    return r;
  }
  return res;
}
