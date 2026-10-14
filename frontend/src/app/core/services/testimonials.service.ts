import { Injectable } from '@angular/core';
import { Testimonial } from '../models/testimonial.model';

@Injectable({ providedIn: 'root' })
export class TestimonialsService {
  list(): Testimonial[] {
    return [
      {
        author: 'Chiara M.',
        role: 'Mamma di Leonardo (5 anni)',
        text: 'La Dottoressa Eleonora ha conquistato nostro figlio sin dal primo incontro attraverso il gioco. In soli 4 mesi i progressi fonetici sono stati straordinari!',
        rating: 5,
        tag: 'Linguaggio & Parola',
        date: 'Settembre 2025'
      },
      {
        author: 'Marco R.',
        role: 'Insegnante di scuola primaria',
        text: 'Soffrivo di disfonia e cali di voce costanti dopo poche ore di lezione. Il percorso di rieducazione vocale mi ha insegnato la corretta respirazione ed emissione. Risultato eccellente!',
        rating: 5,
        tag: 'Terapia della Voce',
        date: 'Novembre 2025'
      },
      {
        author: 'Sara & Valerio',
        role: 'Genitori di Tommaso (8 anni)',
        text: 'Ci siamo rivolti alla Dottoressa per un supporto specifico sulla disortografia. Approccio strutturato, motivante e grande sinergia con gli insegnanti di classe.',
        rating: 5,
        tag: 'DSA e Apprendimento',
        date: 'Gennaio 2026'
      },
      {
        author: 'Alessia G.',
        role: 'Paziente adulta',
        text: 'Ho seguito la terapia miofunzionale per la deglutizione atipica prima dell\'apparecchio ortodontico. Professionale, chiara ed estremamente paziente.',
        rating: 5,
        tag: 'Deglutizione Atipica',
        date: 'Marzo 2026'
      }
    ];
  }
}
