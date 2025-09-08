import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { PageHeroComponent } from '../../shared/components/page-hero/page-hero.component';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [RouterLink, MatButtonModule, PageHeroComponent],
  template: `
    <app-page-hero
      title="Logopedia per bambini, ragazzi e adulti"
      subtitle="Supporto professionale con approccio empatico e basato sull’evidenza, in provincia di Ancona.">
      <div style="margin-top:16px">
        <a mat-raised-button color="accent" routerLink="/contatti">Prenota un colloquio</a>
      </div>
    </app-page-hero>

    <section class="grid">
      <article class="card">
        <h3>Mission</h3>
        <p>Accompagnare il paziente e la famiglia in un percorso chiaro e sereno, con obiettivi condivisi.</p>
      </article>
      <article class="card">
        <h3>Approccio</h3>
        <p>Valutazione accurata, piano terapeutico personalizzato, collaborazione con scuola e specialisti.</p>
      </article>
      <article class="card">
        <h3>Ambiti</h3>
        <p>Linguaggio, apprendimento (DSA), voce, deglutizione, fluenza, comunicazione.</p>
      </article>
    </section>

    <section class="cta card" style="margin-top:16px; text-align:center">
      <h3>Hai dubbi o domande?</h3>
      <p>Consulta le <a routerLink="/faq">FAQ</a> o scrivimi senza impegno.</p>
      <a mat-stroked-button routerLink="/contatti">Contatti</a>
    </section>
  `,
  styles: [`
    .grid {
      display: grid;
      gap: 16px;
      grid-template-columns: repeat(3, 1fr);
    }
    @media (max-width: 900px) {
      .grid { grid-template-columns: 1fr; }
    }
  `]
})
export class HomeComponent {}
