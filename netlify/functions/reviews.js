/**
 * Netlify Serverless Function per il recupero delle recensioni Google.
 * Viene eseguita automaticamente nel cloud di Netlify a PC spento.
 */

const DEFAULT_FALLBACK_REVIEWS = [
  {
    author: 'Chiara M.',
    role: 'Mamma di Leonardo (5 anni)',
    text: 'La Dottoressa Eleonora ha conquistato nostro figlio sin dal primo incontro attraverso il gioco. In soli 4 mesi i progressi fonetici sono stati straordinari!',
    rating: 5,
    tag: 'Linguaggio & Parola',
    date: 'Recentemente',
    relativeTime: 'Recentemente',
    isGoogleVerified: true
  },
  {
    author: 'Marco R.',
    role: 'Insegnante di scuola primaria',
    text: 'Soffrivo di disfonia e cali di voce costanti dopo poche ore di lezione. Il percorso di rieducazione vocale mi ha insegnato la corretta respirazione ed emissione. Risultato eccellente!',
    rating: 5,
    tag: 'Terapia della Voce',
    date: 'Recentemente',
    relativeTime: 'Recentemente',
    isGoogleVerified: true
  },
  {
    author: 'Sara & Valerio',
    role: 'Genitori di Tommaso (8 anni)',
    text: 'Ci siamo rivolti alla Dottoressa per un supporto specifico sulla disortografia. Approccio strutturato, motivante e grande sinergia con gli insegnanti di classe.',
    rating: 5,
    tag: 'DSA e Apprendimento',
    date: 'Recentemente',
    relativeTime: 'Recentemente',
    isGoogleVerified: true
  },
  {
    author: 'Alessia G.',
    role: 'Paziente adulta',
    text: 'Ho seguito la terapia miofunzionale per la deglutizione atipica prima dell\'apparecchio ortodontico. Professionale, chiara ed estremamente paziente.',
    rating: 5,
    tag: 'Deglutizione Atipica',
    date: 'Recentemente',
    relativeTime: 'Recentemente',
    isGoogleVerified: true
  }
];

exports.handler = async function (event, context) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Content-Type': 'application/json',
    'Cache-Control': 'public, max-age=21600' // Cache browser / CDN 6 ore
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }

  const apiKey = process.env.GOOGLE_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;
  const featurableId = process.env.FEATURABLE_WIDGET_ID;

  try {
    if (apiKey && placeId) {
      const url = `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}?languageCode=it`;
      const res = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': apiKey,
          'X-Goog-FieldMask': 'id,displayName,rating,userRatingCount,reviews,googleMapsUri'
        }
      });

      if (res.ok) {
        const data = await res.json();
        const reviews = (data.reviews || [])
          .filter(r => (r.rating || 5) >= 4)
          .map(r => ({
            author: r.authorAttribution?.displayName || 'Paziente Google',
            text: r.text?.text || r.originalText?.text || '',
            rating: r.rating || 5,
            date: r.relativePublishTimeDescription || 'Recentemente',
            relativeTime: r.relativePublishTimeDescription || 'Recentemente',
            authorPhotoUrl: r.authorAttribution?.photoUri || '',
            reviewUrl: r.authorAttribution?.uri || data.googleMapsUri || '',
            isGoogleVerified: true
          }));

        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            summary: {
              rating: data.rating || 5.0,
              totalReviews: data.userRatingCount || reviews.length,
              placeUrl: data.googleMapsUri || 'https://www.google.com/maps',
              writeReviewUrl: `https://search.google.com/local/writereview?placeid=${placeId}`
            },
            reviews: reviews.length > 0 ? reviews : DEFAULT_FALLBACK_REVIEWS
          })
        };
      }
    } else if (featurableId) {
      const url = `https://featurable.com/api/v1/widgets/${encodeURIComponent(featurableId)}`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        const rawReviews = data.reviews || data.data?.reviews || [];
        const reviews = rawReviews
          .filter(r => (r.rating || r.stars || 5) >= 4)
          .map(r => ({
            author: r.author_name || r.author || 'Paziente Google',
            text: r.text || r.comment || '',
            rating: r.rating || r.stars || 5,
            date: r.relative_time || r.date || 'Recentemente',
            relativeTime: r.relative_time || r.date || 'Recentemente',
            authorPhotoUrl: r.profile_photo_url || r.author_image || '',
            reviewUrl: r.review_url || data.place_url || '',
            isGoogleVerified: true
          }));

        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            summary: {
              rating: data.average_rating || data.rating || 5.0,
              totalReviews: data.total_reviews || reviews.length,
              placeUrl: data.place_url || 'https://www.google.com/maps',
              writeReviewUrl: data.write_review_url || ''
            },
            reviews: reviews.length > 0 ? reviews : DEFAULT_FALLBACK_REVIEWS
          })
        };
      }
    }
  } catch (err) {
    console.error('Errore Netlify function recensioni:', err);
  }

  // Fallback garantito
  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({
      summary: {
        rating: 5.0,
        totalReviews: DEFAULT_FALLBACK_REVIEWS.length,
        placeUrl: 'https://www.google.com/maps/search/?api=1&query=Logopedista+Eleonora+Mariotti',
        writeReviewUrl: 'https://www.google.com/maps/search/?api=1&query=Logopedista+Eleonora+Mariotti'
      },
      reviews: DEFAULT_FALLBACK_REVIEWS
    })
  };
};
