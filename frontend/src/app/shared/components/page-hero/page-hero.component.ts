import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-hero',
  standalone: true,
  template: `
  <section class="page-hero">
    <div class="hero-inner">
      @if (badge) {
        <span class="hero-badge">{{ badge }}</span>
      }
      <h1 class="hero-title">{{ title }}</h1>
      @if (subtitle) {
        <p class="hero-subtitle">{{ subtitle }}</p>
      }
      <div class="hero-slot">
        <ng-content></ng-content>
      </div>
    </div>
  </section>
  `,
  styles: [`
    .page-hero {
      text-align: center;
      padding: clamp(3rem, 6vw, 4.5rem) 1.5rem clamp(2rem, 4vw, 3rem);
      background: radial-gradient(circle at 50% 20%, rgba(124, 157, 142, 0.12) 0%, transparent 70%);
      border-radius: var(--radius-lg);
      margin-bottom: 2rem;
      border: 1px solid var(--border-subtle);
    }

    .hero-inner {
      max-width: 800px;
      margin: 0 auto;
    }

    .hero-badge {
      display: inline-block;
      background: rgba(124, 157, 142, 0.15);
      color: #2D5A4C;
      border: 1px solid rgba(124, 157, 142, 0.3);
      padding: 4px 14px;
      border-radius: 999px;
      font-size: 0.82rem;
      font-weight: 600;
      letter-spacing: 0.03em;
      margin-bottom: 16px;
    }

    .hero-title {
      font-family: 'Fraunces', Georgia, serif;
      font-size: clamp(2.2rem, 4.5vw, 3.25rem);
      line-height: 1.2;
      color: var(--text-primary);
      margin: 0 0 16px;
    }

    .hero-subtitle {
      font-size: clamp(1.05rem, 2vw, 1.25rem);
      color: var(--text-secondary);
      line-height: 1.6;
      max-width: 650px;
      margin: 0 auto 24px;
    }

    .hero-slot:empty {
      display: none;
    }

    body.dark-mode {
      .hero-badge {
        color: #A8D5C2;
        background: rgba(142, 175, 159, 0.2);
      }
    }
  `]
})
export class PageHeroComponent {
  @Input() badge?: string;
  @Input() title = '';
  @Input() subtitle = '';
}
