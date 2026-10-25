import { Component } from '@angular/core';
import { PageHeroComponent } from '../../shared/components/page-hero/page-hero.component';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { FadeUpDirective } from '../../shared/directives/fade-up.directive';
import { 
  LucideHeart, 
  LucideShieldCheck, 
  LucideUsers, 
  LucideGraduationCap, 
  LucideCalendarCheck
} from '@lucide/angular';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    PageHeroComponent,
    MatButtonModule,
    RouterLink,
    FadeUpDirective,
    LucideHeart,
    LucideShieldCheck,
    LucideUsers,
    LucideGraduationCap,
    LucideCalendarCheck
  ],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  education = [
    {
      year: '2023',
      title: 'Laurea Triennale in Logopedia',
      institute: 'Università Politecnica delle Marche',
      desc: 'Valutazione 110/110 e Lode. Tesi sperimentale sui disturbi fonetico-fonologici e indicatori precoci in età evolutiva.'
    },
    {
      year: '2024',
      title: 'Alta Formazione in Deglutologia & Terapia Miofunzionale',
      institute: 'Corso di Perfezionamento Clinico',
      desc: 'Approfondimento clinico e pratico sugli squilibri muscolari orofacciali (SMOF) e deglutizione deviata.'
    },
    {
      year: 'In corso',
      title: 'Aggiornamento Continuo (ECM)',
      institute: 'Linee Guida Nazionali DSA & Fluenza Verbale',
      desc: 'Partecipazione continua a convegni specialistici su DSA, balbuzie e riabilitazione vocale artistica e professionale.'
    }
  ];

  values = [
    { 
      type: 'heart',
      title: 'Empatia & Centralità della Persona', 
      text: 'Accolgo ogni persona senza fretta, creando uno spazio protetto in cui sentirsi compresi e valorizzati.' 
    },
    { 
      type: 'science',
      title: 'Evidenza Scientifica (EBP)', 
      text: 'Ogni valutazione e piano terapeutico si fonda sulla letteratura scientifica più recente e su standard clinici rigorosi.' 
    },
    { 
      type: 'users',
      title: 'Alleanza con Famiglia & Rete', 
      text: 'I progressi più stabili nascono dal lavoro condiviso con genitori, insegnanti, ortodontisti e medici curanti.' 
    }
  ];
}
