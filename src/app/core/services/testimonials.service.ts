import { Injectable } from '@angular/core';
import { Testimonial } from '../models/testimonial.model';

@Injectable({ providedIn:'root' })
export class TestimonialsService {
  list(): Testimonial[] {
    return [
      { author:'Mamma di G.', text:'Professionale e dolcissima, risultati visibili in poche settimane.', role:'Genitore' },
      { author:'Marco R.', text:'Mi ha aiutato tantissimo con la voce. Consigliata!', role:'Paziente adulto' }
    ];
  }
}
