import { Component } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { 
  LucideSpeech, 
  LucideBookOpen, 
  LucideMic, 
  LucideActivity, 
  LucideAudioWaveform, 
  LucideArrowRight 
} from '@lucide/angular';

@Component({
  selector: 'app-services',
  imports: [
    MatChipsModule, 
    MatButtonModule, 
    RouterLink,
    LucideSpeech, 
    LucideBookOpen, 
    LucideMic, 
    LucideActivity, 
    LucideAudioWaveform,
    LucideArrowRight
  ],
  template: `
  <section class="services-page">
    <div class="services-header">
      <h1>Aree di Intervento & Servizi</h1>
      <p>Percorsi riabilitativi personalizzati e basati sulle più recenti evidenze scientifiche per ogni fascia d'età.</p>
    </div>

    <div class="services-grid">
      @for (s of services; track s.title) {
        <article class="service-card card">
          <div class="service-icon-wrapper">
            @if (s.iconType === 'speech') {
              <svg lucideSpeech [size]="30" class="service-icon"></svg>
            } @else if (s.iconType === 'book') {
              <svg lucideBookOpen [size]="30" class="service-icon"></svg>
            } @else if (s.iconType === 'mic') {
              <svg lucideMic [size]="30" class="service-icon"></svg>
            } @else if (s.iconType === 'activity') {
              <svg lucideActivity [size]="30" class="service-icon"></svg>
            } @else {
              <svg lucideAudioWaveform [size]="30" class="service-icon"></svg>
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

    <div class="services-cta card">
      <div class="cta-text">
        <h3>Hai bisogno di una valutazione specialistica?</h3>
        <p>Prenota un primo colloquio per analizzare le esigenze specifiche e definire gli obiettivi terapeutici.</p>
      </div>
      <a mat-raised-button color="primary" routerLink="/contatti" class="cta-btn">
        <span>Richiedi un Appuntamento</span>
        <svg lucideArrowRight [size]="18"></svg>
      </a>
    </div>
  </section>
  `,
  styles: [`
    .services-page {
      max-width: 1100px;
      margin: 0 auto 40px;
      padding: 0 16px;
    }

    .services-header {
      text-align: center;
      margin-bottom: 36px;

      h1 {
        font-size: clamp(2rem, 4vw, 2.75rem);
        color: var(--ink);
        margin-bottom: 10px;
      }

      p {
        color: var(--muted);
        font-size: 1.1rem;
        max-width: 650px;
        margin: 0 auto;
        line-height: 1.6;
      }
    }

    .services-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 24px;
      margin-bottom: 40px;
    }

    .service-card {
      display: flex;
      gap: 20px;
      padding: 24px;
      border-radius: 20px;
      background: #ffffff;
      border: 1px solid rgba(15, 76, 92, 0.08);
      box-shadow: 0 8px 24px rgba(15, 76, 92, 0.05);
      transition: transform 0.25s ease, box-shadow 0.25s ease;

      &:hover {
        transform: translateY(-4px);
        box-shadow: 0 14px 32px rgba(15, 76, 92, 0.1);
      }

      .service-icon-wrapper {
        width: 56px;
        height: 56px;
        border-radius: 16px;
        background: rgba(15, 76, 92, 0.08);
        color: var(--primary);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        transition: background 0.3s ease, transform 0.3s ease, color 0.3s ease;
      }

      &:hover .service-icon-wrapper {
        background: var(--primary);
        color: #ffffff;
        transform: scale(1.05);
      }

      .service-body {
        display: flex;
        flex-direction: column;
        flex-grow: 1;

        h3 {
          margin: 0 0 8px;
          font-size: 1.25rem;
          color: var(--primary);
        }

        p {
          color: #555;
          line-height: 1.5;
          margin: 0 0 14px;
          font-size: 0.95rem;
        }

        .tags-container {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: auto;
        }

        .service-chip {
          background: rgba(15, 76, 92, 0.06);
          color: var(--primary);
          padding: 4px 10px;
          border-radius: 999px;
          font-size: 0.75rem;
          font-weight: 500;
        }
      }
    }

    .services-cta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 24px;
      padding: 32px;
      background: var(--primary-gradient);
      color: #fff;
      border-radius: 24px;

      .cta-text {
        h3 {
          margin: 0 0 6px;
          font-size: 1.5rem;
          color: #fff;
        }
        p {
          margin: 0;
          opacity: 0.9;
          font-size: 1rem;
        }
      }

      .cta-btn {
        background: #fff !important;
        color: var(--primary) !important;
        font-weight: 600 !important;
        padding: 12px 24px !important;
        border-radius: 999px !important;
        display: inline-flex !important;
        align-items: center !important;
        gap: 8px !important;
        flex-shrink: 0;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2) !important;

        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25) !important;
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
  `]
})
export class ServicesComponent {
  services = [
    { 
      title: 'Disturbi del Linguaggio', 
      description: 'Valutazione e trattamento di ritardi di linguaggio, disturbi fonetico-fonologici e difficoltà di comprensione in età evolutiva.', 
      iconType: 'speech', 
      tags: ['Bambini', 'Età Prescolare', 'Scolari'] 
    },
    { 
      title: 'Apprendimento (DSA)', 
      description: 'Interventi personalizzati su lettura, scrittura, ortografia e calcolo (Dislessia, Disortografia, Discalculia) con potenziamento delle strategie di studio.', 
      iconType: 'book', 
      tags: ['DSA', 'Scuola Primaria', 'Adolescenti'] 
    },
    { 
      title: 'Voce e Disfonia', 
      description: 'Igiene vocale, educazione e riabilitazione della voce per noduli, polipi, sforzo fonatorio o supporto specifico a insegnanti e cantanti.', 
      iconType: 'mic', 
      tags: ['Adulti', 'Insegnanti', 'Professionisti'] 
    },
    { 
      title: 'Deglutizione e Miofunzionale', 
      description: 'Valutazione e terapia degli squilibri muscolari orofacciali (SMOF), deglutizione atipica/deviata in sinergia con l\'ortodonzia.', 
      iconType: 'activity', 
      tags: ['Bambini', 'Adulti', 'Ortodonzia'] 
    },
    { 
      title: 'Fluenza e Balbuzie', 
      description: 'Percorsi mirati alla gestione dell\'eloquio e dell\'ansia da prestazione comunicativa, con coinvolgimento attivo di famiglia e scuola.', 
      iconType: 'waves', 
      tags: ['Bambini', 'Adolescenti', 'Adulti'] 
    },
  ];
}