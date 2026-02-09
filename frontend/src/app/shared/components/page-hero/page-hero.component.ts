import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-hero',
  standalone: true,
  template: `
  <section class="hero card">
    <h1>{{title}}</h1>
    <p>{{subtitle}}</p>
    <ng-content/>
  </section>
  `,
  styles: [`
    .hero {
      text-align: center;
      padding: clamp(24px, 4vw, 48px);
      background: linear-gradient(180deg, rgba(255,255,255,0.7), #fff);
    }
    h1 { margin: 0 0 8px; }
    p { margin: 0 auto; max-width: 60ch; color: var(--muted); }
  `]
})
export class PageHeroComponent {
  @Input() title = '';
  @Input() subtitle = '';
}
