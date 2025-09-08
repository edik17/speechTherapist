import { Component } from '@angular/core';
import { PageHeroComponent } from '../../shared/components/page-hero/page-hero.component';

@Component({
  standalone: true,
  selector: 'app-about',
  imports: [PageHeroComponent],
  template: `
    <app-page-hero title="Chi sono" subtitle="Logopedista – formazione, esperienza e valori"/>
    <section class="card">
      <h2>Formazione</h2>
      <ul>
        <li>Laurea in Logopedia — Università …</li>
        <li>Master/Corso di perfezionamento in …</li>
      </ul>
      <h2>Approccio clinico</h2>
      <p>Descrizione breve dell’approccio, linguaggio semplice, rassicurante.</p>
    </section>
  `
})
export class AboutComponent {}
