import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeroComponent } from '../../shared/components/page-hero/page-hero.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    CommonModule,
    PageHeroComponent,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    RouterLink
  ],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  // Dati strutturati per la formazione (facili da aggiornare)
  education = [
    {
      year: '2023',
      title: 'Laurea in Logopedia',
      institute: 'Università Politecnica delle Marche',
      desc: 'Valutazione 110/110 e Lode. Tesi sperimentale sui disturbi del linguaggio in età evolutiva.'
    },
    {
      year: '2024',
      title: 'Master in Deglutologia',
      institute: 'Università di Pisa',
      desc: 'Approfondimento sulla disfagia e deglutizione atipica.'
    }
    // Aggiungi altri corsi qui
  ];

  // I tuoi valori cardine
  values = [
    { icon: 'favorite', title: 'Empatia', text: 'Accolgo ogni paziente con ascolto attivo, creando un ambiente sereno e privo di giudizio.' },
    { icon: 'science', title: 'Evidenza Scientifica', text: 'Ogni intervento si basa sulle più recenti linee guida internazionali e studi clinici.' },
    { icon: 'groups', title: 'Collaborazione', text: 'Lavoro in rete con scuola, famiglia e altri specialisti per un supporto a 360°.' }
  ];
}