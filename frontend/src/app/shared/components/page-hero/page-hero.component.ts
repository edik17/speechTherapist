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
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.78) 0%, rgba(255, 255, 255, 0.45) 100%),
                  radial-gradient(circle at 50% 12%, rgba(124, 157, 142, 0.16) 0%, rgba(212, 106, 78, 0.05) 55%, transparent 85%);
      backdrop-filter: blur(16px) saturate(180%);
      -webkit-backdrop-filter: blur(16px) saturate(180%);
      border-radius: var(--radius-lg);
      margin-bottom: 2.5rem;
      border: 1px solid rgba(255, 255, 255, 0.85);
      box-shadow: 0 20px 48px -12px rgba(27, 59, 54, 0.08),
                  0 2px 6px rgba(27, 59, 54, 0.03),
                  inset 0 1px 3px rgba(255, 255, 255, 0.95),
                  inset 0 -1px 2px rgba(124, 157, 142, 0.08);
      position: relative;
      overflow: hidden;
    }

    .hero-inner {
      max-width: 800px;
      margin: 0 auto;
      position: relative;
      z-index: 1;
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
      .page-hero {
        background: linear-gradient(135deg, rgba(29, 55, 49, 0.75) 0%, rgba(21, 43, 39, 0.5) 100%),
                    radial-gradient(circle at 50% 20%, rgba(142, 175, 159, 0.15) 0%, transparent 70%);
        border: 1px solid rgba(250, 247, 242, 0.1);
        box-shadow: 0 20px 48px -12px rgba(0, 0, 0, 0.5),
                    inset 0 1px 2px rgba(255, 255, 255, 0.1);
      }

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
