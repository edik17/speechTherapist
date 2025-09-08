import { Component } from '@angular/core';
import { TestimonialsService } from '../../core/services/testimonials.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-testimonials',
  imports: [CommonModule],
  template: `
  <section class="card">
    <h1>Testimonianze</h1>
    <blockquote *ngFor="let t of testimonials" class="quote">
      “{{t.text}}”
      <footer>— <strong>{{t.author}}</strong><span *ngIf="t.role">, {{t.role}}</span></footer>
    </blockquote>
  </section>
  `,
  styles:[`
    .quote { margin: 0 0 16px; padding: 12px 16px; border-left: 4px solid var(--ring); background:#fff; }
    .quote footer { color: var(--muted); margin-top: 8px; }
  `]
})
export class TestimonialsComponent {
  testimonials = this.svc.list();
  constructor(private svc: TestimonialsService) {}
}
