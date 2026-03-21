import { Component } from '@angular/core';
import { TestimonialsService } from '../../core/services/testimonials.service';


@Component({
    selector: 'app-testimonials',
    imports: [],
    template: `
  <section class="card">
    <h1>Recensioni</h1>
    @for (t of testimonials; track t) {
      <blockquote class="quote">
        “{{t.text}}”
        <footer>— <strong>{{t.author}}</strong>@if (t.role) {
        <span>, {{t.role}}</span>
      }</footer>
    </blockquote>
  }
  </section>
  `,
    styles: [`
    .quote { margin: 0 0 16px; padding: 12px 16px; border-left: 4px solid var(--ring); background:#fff; }
    .quote footer { color: var(--muted); margin-top: 8px; }
  `]
})
export class TestimonialsComponent {
  testimonials = this.svc.list();
  constructor(private svc: TestimonialsService) {}
}
