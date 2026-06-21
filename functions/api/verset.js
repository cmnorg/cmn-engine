// Récupère un verset dans la version gratuite correspondant à la langue, via l'API getBible (sans clé).
// Versets fournis : b=livre(1-66), c=chapitre, v1=verset début, v2=verset fin (optionnel).
// Si l'API échoue, on renvoie un texte vide -> Gaby affiche le repli français (Louis Segond).

// Langue -> traduction getBible (versions libres / domaine public)
const TRANS = {
  fr: 'segond',      // Louis Segond (français)
  en: 'kjv',         // King James Version (anglais)
  es: 'rv1909',      // Reina-Valera 1909 (espagnol)
  zh: 'cus',         // Chinese Union Simplified 和合本 (chinois)
  id: 'tb',          // Terjemahan Baru (indonésien)
};
// Noms des versions (pour l'affichage)
const NAMES = {
  segond: 'Louis Segond', kjv: 'King James Version', rv1909: 'Reina-Valera 1909',
  cus: '和合本', tb: 'Terjemahan Baru',
};

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'public, max-age=86400' },
  });
}

export async function onRequestGet({ request }) {
  const url = new URL(request.url);
  const lang = (url.searchParams.get('lang') || 'fr').toLowerCase();
  const b = parseInt(url.searchParams.get('b'), 10);
  const c = parseInt(url.searchParams.get('c'), 10);
  const v1 = parseInt(url.searchParams.get('v1'), 10);
  const v2 = parseInt(url.searchParams.get('v2'), 10) || v1;
  const trans = TRANS[lang];

  if (!trans || !b || !c || !v1) return json({ text: '', version: '' });

  try {
    const r = await fetch(`https://api.getbible.net/v2/${trans}/${b}/${c}.json`, { cf: { cacheTtl: 86400 } });
    if (!r.ok) return json({ text: '', version: '' });
    const data = await r.json();
    const verses = (data && data.verses) || [];
    const parts = [];
    for (let n = v1; n <= v2; n++) {
      const vv = verses.find((x) => Number(x.verse) === n);
      if (vv && vv.text) parts.push(String(vv.text).replace(/\s+/g, ' ').trim());
    }
    return json({ text: parts.join(' '), version: NAMES[trans] || trans });
  } catch (e) {
    return json({ text: '', version: '' });
  }
}
