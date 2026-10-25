import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Testimonial, ReviewsApiResponse, GoogleReviewsSummary } from '../models/testimonial.model';

@Injectable({ providedIn: 'root' })
export class TestimonialsService {
  private defaultReviews: Testimonial[] = [
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

  private defaultSummary: GoogleReviewsSummary = {
    rating: 5.0,
    totalReviews: 4,
    placeUrl: 'https://www.google.com/maps/search/?api=1&query=Logopedista+Eleonora+Mariotti',
    writeReviewUrl: 'https://www.google.com/maps/search/?api=1&query=Logopedista+Eleonora+Mariotti'
  };

  constructor(private http: HttpClient) {}

  list(): Testimonial[] {
    return this.defaultReviews;
  }

  getReviews(): Observable<ReviewsApiResponse> {
    const isLocalhost = typeof window !== 'undefined' && 
      (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
    const apiUrl = isLocalhost ? 'http://localhost:8080/api/reviews' : '/api/reviews';

    return this.http.get<ReviewsApiResponse>(apiUrl).pipe(
      map(res => {
        if (!res || !res.reviews || res.reviews.length === 0) {
          return { summary: this.defaultSummary, reviews: this.defaultReviews };
        }
        return res;
      }),
      catchError(() => {
        return of({
          summary: this.defaultSummary,
          reviews: this.defaultReviews
        });
      })
    );
  }
}
