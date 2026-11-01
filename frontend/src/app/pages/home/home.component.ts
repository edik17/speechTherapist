import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule, DecimalPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { TestimonialsService } from '../../core/services/testimonials.service';
import { Testimonial, GoogleReviewsSummary } from '../../core/models/testimonial.model';
import { FadeUpDirective } from '../../shared/directives/fade-up.directive';
import { 
  LucideArrowRight, 
  LucideCalendarCheck, 
  LucideHeart, 
  LucideMic, 
  LucideBookOpen, 
  LucideActivity, 
  LucideAudioWaveform,
  LucideMapPin,
  LucideCheckCircle2,
  LucideShieldCheck,
  LucidePhone,
  LucideSparkles,
  LucideStar,
  LucideExternalLink
} from '@lucide/angular';

export interface MeetingStep {
  step: string;
  title: string;
  tag: string;
  desc: string;
  icon: 'phone' | 'heart' | 'sparkles';
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    DecimalPipe,
    RouterLink,
    MatButtonModule,
    FadeUpDirective,
    LucideArrowRight,
    LucideCalendarCheck,
    LucideHeart,
    LucideMic,
    LucideBookOpen,
    LucideActivity,
    LucideAudioWaveform,
    LucideMapPin,
    LucideCheckCircle2,
    LucideShieldCheck,
    LucidePhone,
    LucideSparkles,
    LucideStar,
    LucideExternalLink
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private testimonialsService = inject(TestimonialsService);

  reviews: Testimonial[] = [];
  summary: GoogleReviewsSummary = {
    rating: 5.0,
    totalReviews: 4,
    placeUrl: 'https://www.google.com/maps/search/?api=1&query=Logopedista+Eleonora+Mariotti',
    writeReviewUrl: 'https://www.google.com/maps/search/?api=1&query=Logopedista+Eleonora+Mariotti'
  };

  // Sezione "Come funziona il primo incontro" (3 Step sereni)
  firstMeetingSteps: MeetingStep[] = [
    {
      step: '01',
      title: 'Ascolto Telefonico o via Messaggio',
      tag: 'Primo orientamento gratuito',
      desc: 'Un primo contatto informale per comprendere il motivo della richiesta. Chiariremo ogni dubbio iniziale e valuteremo insieme, senza fretta, la necessità di fissare un primo colloquio conoscitivo in studio.',
      icon: 'phone'
    },
    {
      step: '02',
      title: 'Colloquio & Valutazione Accogliente',
      tag: 'Incontro senza giudizio',
      desc: 'Uno spazio protetto, accogliente e attento ai bisogni emotivi e comunicativi. Attraverso il dialogo clinico o il gioco guidato con il bambino, identifichiamo punti di forza e risorse.',
      icon: 'heart'
    },
    {
      step: '03',
      title: 'Percorso su Misura & Obiettivi Condivisi',
      tag: 'Alleanza con famiglia e scuola',
      desc: 'Restituzione chiara della valutazione e definizione condivisa di un piano personalizzato, con strategie pratiche da vivere a casa e un costante coordinamento con gli insegnanti.',
      icon: 'sparkles'
    }
  ];

  ngOnInit(): void {
    this.reviews = this.testimonialsService.list();
    this.testimonialsService.getReviews().subscribe(res => {
      if (res && res.reviews && res.reviews.length > 0) {
        this.reviews = res.reviews;
        this.summary = res.summary;
      }
    });
  }
}
