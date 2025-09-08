import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common'; 

@Component({
  standalone: true,
  selector: 'app-services',
  imports: [MatIconModule, MatChipsModule, CommonModule],
  template: `
  <section class="card">
    <h1>Servizi di Logopedia</h1>
    <div class="services">
      <article *ngFor="let s of services" class="service">
        <mat-icon aria-hidden="true">{{s.icon || 'spa'}}</mat-icon>
        <div>
          <h3>{{s.title}}</h3>
          <p>{{s.description}}</p>
          <mat-chip-set *ngIf="s.tags?.length">
            <mat-chip *ngFor="let t of s.tags">{{t}}</mat-chip>
          </mat-chip-set>
        </div>
      </article>
    </div>
  </section>
  `,
  styles:[`
    .services { display:grid; gap:16px; grid-template-columns: 1fr 1fr; }
    .service { display:flex; gap:16px; align-items:flex-start; }
    .service mat-icon { font-size: 36px; width:36px; height:36px; color: var(--muted); }
    @media (max-width: 900px){ .services { grid-template-columns: 1fr; } }
  `]
})
export class ServicesComponent {
  services = [
    { title:'Disturbi del linguaggio', description:'Valutazione e trattamento di ritardi e disturbi del linguaggio in età prescolare e scolare.', icon:'record_voice_over', tags:['Bambini','Età prescolare','Scolari'] },
    { title:'Apprendimento (DSA)', description:'Interventi su lettura, scrittura e ortografia, strategie di studio e potenziamento.', icon:'menu_book', tags:['DSA','Scuola','Adolescenti'] },
    { title:'Voce', description:'Igiene vocale, rieducazione della voce, supporto a professionisti vocali.', icon:'mic', tags:['Adulti','Insegnanti'] },
    { title:'Deglutizione', description:'Valutazione e terapia delle disfagie e degli squilibri orofacciali.', icon:'local_hospital', tags:['Bambini','Adulti'] },
    { title:'Fluenza', description:'Percorsi per la balbuzie e altri disturbi della fluenza, con coinvolgimento della famiglia.', icon:'waves', tags:['Bambini','Adolescenti','Adulti'] },
  ];
}