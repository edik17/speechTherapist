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
    :host {
      display: block;
      margin-bottom: 2.5rem;
    }

    .page-hero {
      position: relative;
      text-align: center;
      padding: clamp(3.5rem, 6vw, 4.8rem) clamp(1.5rem, 5vw, 3.5rem);
      border-radius: 28px;
      overflow: hidden;

      /* Sfumature di vetro (Glassmorphism satinato) */
      background: linear-gradient(
        135deg, 
        rgba(255, 255, 255, 0.85) 0%, 
        rgba(250, 246, 240, 0.65) 45%, 
        rgba(240, 248, 245, 0.8) 100%
      );
      backdrop-filter: blur(24px) saturate(190%);
      -webkit-backdrop-filter: blur(24px) saturate(190%);

      /* Bordo effetto vetro con doppia rifrazione */
      border: 1.5px solid rgba(124, 157, 142, 0.35);
      outline: 1.5px solid rgba(255, 255, 255, 0.95);
      outline-offset: -3px;

      /* Ombra di elevazione vetro e riflessi interni */
      box-shadow: 
        0 24px 50px -12px rgba(27, 59, 54, 0.12),
        0 8px 24px -4px rgba(212, 106, 78, 0.08),
        inset 0 2px 4px 0 rgba(255, 255, 255, 0.95),
        inset 0 -2px 4px 0 rgba(124, 157, 142, 0.08);

      /* Sfumature di vetro: fascio di luce salvia (in alto a sinistra) */
      &::before {
        content: '';
        position: absolute;
        top: -30%;
        left: -15%;
        width: 65%;
        height: 140%;
        background: radial-gradient(circle at 30% 30%, rgba(124, 157, 142, 0.32) 0%, rgba(124, 157, 142, 0.1) 50%, transparent 75%);
        pointer-events: none;
        filter: blur(40px);
        z-index: 0;
      }

      /* Sfumature di vetro: fascio di luce terracotta/pesca (in basso a destra) */
      &::after {
        content: '';
        position: absolute;
        bottom: -30%;
        right: -15%;
        width: 65%;
        height: 140%;
        background: radial-gradient(circle at 70% 70%, rgba(212, 106, 78, 0.25) 0%, rgba(226, 125, 96, 0.08) 50%, transparent 75%);
        pointer-events: none;
        filter: blur(40px);
        z-index: 0;
      }
    }

    .hero-inner {
      position: relative;
      z-index: 1;
      max-width: 820px;
      margin: 0 auto;
    }

    .hero-badge {
      display: inline-block;
      background: rgba(124, 157, 142, 0.18);
      color: #2D5A4C;
      border: 1px solid rgba(124, 157, 142, 0.35);
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
      line-height: 1.22;
      color: var(--text-primary);
      margin: 0 0 16px;
      text-shadow: 0 1px 2px rgba(255, 255, 255, 0.5);
    }

    .hero-subtitle {
      font-size: clamp(1.05rem, 2vw, 1.25rem);
      color: var(--text-secondary);
      line-height: 1.65;
      max-width: 680px;
      margin: 0 auto 24px;
    }

    .hero-slot:empty {
      display: none;
    }

    /* Modalità Scura (Dark Mode) */
    :host-context(body.dark-mode) .page-hero {
      background: linear-gradient(
        135deg, 
        rgba(29, 55, 49, 0.8) 0%, 
        rgba(21, 43, 39, 0.65) 50%, 
        rgba(15, 30, 27, 0.85) 100%
      );
      border: 1.5px solid rgba(142, 175, 159, 0.28);
      outline: 1.5px solid rgba(250, 247, 242, 0.08);
      outline-offset: -3px;
      box-shadow: 
        0 24px 50px -12px rgba(0, 0, 0, 0.55),
        inset 0 1px 2px rgba(255, 255, 255, 0.15);

      &::before {
        background: radial-gradient(circle at 30% 30%, rgba(142, 175, 159, 0.22) 0%, transparent 70%);
      }

      &::after {
        background: radial-gradient(circle at 70% 70%, rgba(226, 125, 96, 0.18) 0%, transparent 70%);
      }

      .hero-title {
        text-shadow: none;
      }

      .hero-badge {
        color: #A8D5C2;
        background: rgba(142, 175, 159, 0.2);
        border-color: rgba(142, 175, 159, 0.35);
      }
    }
  `]
})
export class PageHeroComponent {
  @Input() badge?: string;
  @Input() title = '';
  @Input() subtitle = '';
}
