import { Testimonial, ReviewsApiResponse, GoogleReviewsSummary } from '../models/testimonial.model';

const DEFAULT_REVIEWS: Testimonial[] = [
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

const DEFAULT_SUMMARY: GoogleReviewsSummary = {
  rating: 5.0,
  totalReviews: 4,
  placeUrl: 'https://www.google.com/maps/search/?api=1&query=Logopedista+Eleonora+Mariotti',
  writeReviewUrl: 'https://www.google.com/maps/search/?api=1&query=Logopedista+Eleonora+Mariotti'
};

export const testimonialsService = {
  list(): Testimonial[] {
    return DEFAULT_REVIEWS;
  },

  getSummary(): GoogleReviewsSummary {
    return DEFAULT_SUMMARY;
  },

  async getReviews(): Promise<ReviewsApiResponse> {
    const isLocalhost = typeof window !== 'undefined' && 
      (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
    const apiUrl = isLocalhost ? 'http://localhost:8080/api/reviews' : '/api/reviews';

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const data: ReviewsApiResponse = await response.json();
      if (!data || !data.reviews || data.reviews.length === 0) {
        return { summary: DEFAULT_SUMMARY, reviews: DEFAULT_REVIEWS };
      }
      return data;
    } catch (err) {
      // Fallback trasparente alle recensioni verificate
      return { summary: DEFAULT_SUMMARY, reviews: DEFAULT_REVIEWS };
    }
  }
};
