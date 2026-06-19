// Crée une session Stripe Checkout (don ponctuel = payment, mensuel = subscription).
// Nécessite la variable d'environnement secrète STRIPE_SECRET_KEY (Cloudflare → Settings → Variables).
// Aucune donnée bancaire ne transite par le site : tout se passe sur la page sécurisée Stripe.

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });
}

// Devises sans décimales (le montant n'est pas multiplié par 100).
const ZERO_DECIMAL = ['BIF','CLP','DJF','GNF','JPY','KMF','KRW','MGA','PYG','RWF','UGX','VND','VUV','XAF','XOF','XPF'];
const ALLOWED_CUR = ['EUR','USD','CAD','GBP','CHF','XOF'];

export async function onRequestPost({ env, request }) {
  if (!env.STRIPE_SECRET_KEY) return json({ error: 'stripe_non_configure' }, 503);

  let body;
  try { body = await request.json(); } catch (e) { return json({ error: 'Requête invalide' }, 400); }
  if (body.website) return json({ error: 'bad' }, 400); // honeypot

  const amount = Math.floor(Number(body.amount));
  const currency = String(body.currency || 'EUR').toUpperCase();
  const monthly = body.freq === 'monthly';
  const email = String(body.email || '').trim().slice(0, 120);
  const name = String(body.name || '').trim().slice(0, 120);
  const country = String(body.country || '').trim().slice(0, 60);
  const phone = String(body.phone || '').trim().slice(0, 30);

  if (!(amount > 0) || amount > 1000000) return json({ error: 'Montant invalide.' }, 400);
  if (ALLOWED_CUR.indexOf(currency) === -1) return json({ error: 'Devise non prise en charge.' }, 400);
  if (email.indexOf('@') < 1) return json({ error: 'E-mail invalide.' }, 400);

  const unit = ZERO_DECIMAL.indexOf(currency) !== -1 ? amount : amount * 100;
  const origin = new URL(request.url).origin;

  // Construction des paramètres x-www-form-urlencoded attendus par l'API Stripe.
  const p = new URLSearchParams();
  p.set('mode', monthly ? 'subscription' : 'payment');
  p.set('locale', 'auto'); // page de paiement auto-traduite
  p.set('success_url', origin + '/don-merci?ok=1');
  p.set('cancel_url', origin + '/faire-un-don?annule=1');
  if (email) p.set('customer_email', email);

  p.set('line_items[0][quantity]', '1');
  p.set('line_items[0][price_data][currency]', currency.toLowerCase());
  p.set('line_items[0][price_data][unit_amount]', String(unit));
  p.set('line_items[0][price_data][product_data][name]', monthly ? 'Don mensuel — CMN' : 'Don — CMN');
  if (monthly) p.set('line_items[0][price_data][recurring][interval]', 'month');

  // Informations utiles côté Stripe (reçu / suivi).
  p.set('metadata[nom]', name);
  p.set('metadata[pays]', country);
  p.set('metadata[telephone]', phone);
  p.set('metadata[frequence]', monthly ? 'mensuel' : 'ponctuel');
  p.set('metadata[source]', 'site CMN');
  if (!monthly) p.set('submit_type', 'donate');

  try {
    const r = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + env.STRIPE_SECRET_KEY,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: p.toString(),
    });
    const data = await r.json();
    if (!r.ok) {
      return json({ error: (data && data.error && data.error.message) || 'Erreur Stripe.' }, 502);
    }
    return json({ url: data.url });
  } catch (e) {
    return json({ error: 'Connexion à Stripe impossible. Réessaie.' }, 502);
  }
}
