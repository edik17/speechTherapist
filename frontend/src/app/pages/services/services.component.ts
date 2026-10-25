import { Component } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { FadeUpDirective } from '../../shared/directives/fade-up.directive';
import { 
  LucideMic, 
  LucideBookOpen, 
  LucideActivity, 
  LucideAudioWaveform, 
  LucideMessageCircle,
  LucideCalendarCheck
} from '@lucide/angular';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [
    MatChipsModule, 
    MatButtonModule, 
    RouterLink,
    FadeUpDirective,
    LucideMic, 
    LucideBookOpen, 
    LucideActivity, 
    LucideAudioWaveform,
    LucideMessageCircle,
    LucideCalendarCheck
  ],
  template: `
  <section class="services-page" appFadeUp>
    <header class="services-header">
      <span class="badge-evidence">Aree di Intervento Clinico</span>
      <h1>I Nostri Servizi & Metodologia</h1>
      <p>Percorsi terapeutici personalizzati, basati sulle evidenze scientifiche e progettati nel rispetto dei tempi e dei bisogni di ogni persona.</p>
    </header>

    <div class="services-grid">
      @for (s of services; track s.title) {
        <article class="service-card card" appFadeUp>
          <div class="service-icon-wrapper">
            @if (s.iconType === 'speech') {
              <svg lucideMessageCircle [size]="28" class="service-icon"></svg>
            } @else if (s.iconType === 'book') {
              <svg lucideBookOpen [size]="28" class="service-icon"></svg>
            } @else if (s.iconType === 'mic') {
              <svg lucideMic [size]="28" class="service-icon"></svg>
            } @else if (s.iconType === 'activity') {
              <svg lucideActivity [size]="28" class="service-icon"></svg>
            } @else {
              <svg lucideAudioWaveform [size]="28" class="service-icon"></svg>
            }
          </div>

          <div class="service-body">
            <h3>{{s.title}}</h3>
            <p>{{s.description}}</p>
            
            @if (s.tags?.length) {
              <div class="tags-container">
                @for (t of s.tags; track t) {
                  <span class="service-chip">{{t}}</span>
                }
              </div>
            }
          </div>
        </article>
      }
    </div>

    <!-- CTA Finale -->
    <div class="services-cta card" appFadeUp>
      <div class="cta-text">
        <h3>Desideri una valutazione o un consiglio specialistico?</h3>
        <p>Durante il primo colloquio analizzeremo le necessità specifiche e definiremo insieme gli obiettivi del percorso.</p>
      </div>
      <a mat-raised-button routerLink="/contatti" class="cta-btn">
        <svg lucideCalendarCheck [size]="18"></svg>
        <span>Prenota un Colloquio</span>
      </a>
    </div>
  </section>
  `,
  styles: [`
    .services-page {
      max-width: 1100px;
      margin: 0 auto 50px;
    }

    .services-header {
      text-align: center;
      margin-bottom: 44px;

      h1 {
        font-size: clamp(2.2rem, 4.5vw, 3.25rem);
        color: var(--text-primary);
        margin: 12px 0 14px;
      }

      p {
        color: var(--text-secondary);
        font-size: 1.15rem;
        max-width: 650px;
        margin: 0 auto;
        line-height: 1.65;
      }
    }

    .services-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 28px;
      margin-bottom: 48px;
    }

    .service-card {
      display: flex;
      gap: 20px;
      padding: 28px;
      border-radius: var(--radius-md);
      background: var(--bg-elevated);
      border: 1px solid var(--border-subtle);
      transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1),
                  box-shadow 0.3s cubic-bezier(0.22, 1, 0.36, 1);

      &:hover {
        transform: translateY(-4px);
        box-shadow: 0 16px 36px -8px rgba(27, 59, 54, 0.12);

        .service-icon-wrapper {
          background: var(--accent-primary);
          color: #FAF7F2;
          transform: scale(1.05);
        }
      }

      .service-icon-wrapper {
        width: 54px;
        height: 54px;
        border-radius: 16px;
        background: rgba(124, 157, 142, 0.15);
        color: #2D5A4C;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        transition: all 0.3s ease;
      }

      .service-body {
        display: flex;
        flex-direction: column;
        flex-grow: 1;

        h3 {
          margin: 0 0 10px;
          font-size: 1.35rem;
          color: var(--text-primary);
        }

        p {
          color: var(--text-secondary);
          line-height: 1.6;
          margin: 0 0 16px;
          font-size: 0.95rem;
        }

        .tags-container {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: auto;
        }

        .service-chip {
          background: var(--bg-surface);
          color: var(--text-secondary);
          padding: 4px 10px;
          border-radius: 999px;
          font-size: 0.78rem;
          font-weight: 600;
        }
      }
    }

    .services-cta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 28px;
      padding: clamp(28px, 4vw, 40px);
      background: radial-gradient(circle at right, rgba(212, 106, 78, 0.15), transparent 70%), var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-lg);

      .cta-text {
        h3 {
          margin: 0 0 8px;
          font-size: 1.55rem;
          color: var(--text-primary);
        }
        p {
          margin: 0;
          color: var(--text-secondary);
          font-size: 1.05rem;
          max-width: 580px;
        }
      }

      .cta-btn {
        background: var(--accent-primary) !important;
        color: #FAF7F2 !important;
        font-weight: 700 !important;
        padding: 12px 28px !important;
        border-radius: 999px !important;
        display: inline-flex !important;
        align-items: center !important;
        gap: 8px !important;
        flex-shrink: 0;
        box-shadow: 0 4px 14px rgba(212, 106, 78, 0.35) !important;

        &:hover {
          background: var(--accent-primary-hover) !important;
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(212, 106, 78, 0.45) !important;
        }
      }

      @media (max-width: 768px) {
        flex-direction: column;
        text-align: center;

        .cta-btn {
          width: 100%;
          justify-content: center;
        }
      }
    }

    body.dark-mode {
      .service-card .service-icon-wrapper {
        background: rgba(142, 175, 159, 0.2);
        color: #A8D5C2;
      }
    }
  `]
})
export class ServicesComponent {
  services = [
    { 
      title: 'Disturbi del Linguaggio & Parola', 
      description: 'Valutazione e trattamento di ritardi di linguaggio, parlatori tardivi (Late Talkers), disturbi fonetico-fonologici e difficoltà di comprensione in età evolutiva.', 
      iconType: 'speech', 
      tags: ['Bambini', 'Età Prescolare', 'Scolari'] 
    },
    { 
      title: 'Apprendimento (DSA)', 
      description: 'Interventi personalizzati su lettura, scrittura, ortografia e calcolo (Dislessia, Disortografia, Disgrafia, Discalculia) con potenziamento delle strategie di studio e autonomia con strumenti compensativi.', 
      iconType: 'book', 
      tags: ['DSA', 'Scuola Primaria', 'Adolescenti'] 
    },
    { 
      title: 'Voce e Disfonia', 
      description: 'Igiene vocale, educazione e riabilitazione della voce per noduli, polipi, sforzo fonatorio o supporto specifico a insegnanti, cantanti e professionisti della voce.', 
      iconType: 'mic', 
      tags: ['Adulti', 'Insegnanti', 'Professionisti'] 
    },
    { 
      title: 'Deglutizione & Miofunzionale (SMOF)', 
      description: 'Valutazione e terapia degli squilibri muscolari orofacciali, deglutizione atipica/deviata, respirazione orale e postura linguale in stretta sinergia con l\'ortodonzia.', 
      iconType: 'activity', 
      tags: ['Bambini', 'Adulti', 'Ortodonzia'] 
    },
    { 
      title: 'Fluenza e Balbuzie', 
      description: 'Percorsi mirati alla gestione dell\'eloquio e dell\'ansia da prestazione comunicativa, con coinvolgimento attivo di famiglia e scuola per un clima sereno.', 
      iconType: 'waves', 
      tags: ['Bambini', 'Adolescenti', 'Adulti'] 
    },
  ];
}
