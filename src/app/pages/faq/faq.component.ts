import { Component } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  standalone: true,
  selector: 'app-faq',
  imports: [MatExpansionModule],
  template: `
  <section class="card">
    <h1>Domande frequenti</h1>
    <mat-accordion multi>
      <mat-expansion-panel *ngFor="let f of faqs">
        <mat-expansion-panel-header>
          <span>{{f.q}}</span>
        </mat-expansion-panel-header>
        <p>{{f.a}}</p>
      </mat-expansion-panel>
    </mat-accordion>
  </section>
  `
})
export class FaqComponent {
  faqs = [
    { q:'Serve l’impegnativa?', a:'…' },
    { q:'Quanto dura una seduta?', a:'…' },
    { q:'Fate colloqui online?', a:'…' },
    { q:'Come avviene la valutazione?', a:'…' },
  ];
}
