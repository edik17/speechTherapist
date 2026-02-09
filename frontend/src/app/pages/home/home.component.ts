import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common'; // Serve per *ngFor
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card'; // Nuovo
import { MatIconModule } from '@angular/material/icon'; // Nuovo
import { PageHeroComponent } from '../../shared/components/page-hero/page-hero.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink, 
    MatButtonModule, 
    MatCardModule, 
    MatIconModule, 
    PageHeroComponent
  ],
  templateUrl: './home.component.html', // Spostiamo l'HTML in un file separato
  styleUrls: ['./home.component.scss']   // Spostiamo il CSS in un file separato
})
export class HomeComponent {
  // Dati per le card dei servizi (facile da modificare in futuro)
  services = [
    {
      title: 'Linguaggio e Parola',
      desc: 'Ritardi di linguaggio, disturbi fonetico-fonologici e balbuzie.',
      icon: 'record_voice_over'
    },
    {
      title: 'Apprendimento (DSA)',
      desc: 'Valutazione e trattamento per Dislessia, Disortografia, Disgrafia e Discalculia.',
      icon: 'school'
    },
    {
      title: 'Deglutizione e Voce',
      desc: 'Terapia miofunzionale, disfonia e deglutizione atipica in età evolutiva e adulta.',
      icon: 'restaurant' // o 'graphic_eq' per la voce
    }
  ];
}