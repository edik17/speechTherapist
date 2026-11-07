import React from 'react';
import {
  Mic,
  BookOpen,
  Activity,
  AudioWaveform,
  MessageCircle,
  CalendarCheck,
} from 'lucide-react';
import { FadeUp } from '../../shared/directives/FadeUp';
import { MatButton } from '../../shared/ui/MatButton';
import './ServicesPage.scss';

const SERVICES = [
  {
    title: 'Disturbi del Linguaggio & Parola',
    description:
      'Valutazione e trattamento di ritardi di linguaggio, parlatori tardivi (Late Talkers), disturbi fonetico-fonologici e difficoltà di comprensione in età evolutiva.',
    iconType: 'speech',
    tags: ['Bambini', 'Età Prescolare', 'Scolari'],
  },
  {
    title: 'Apprendimento (DSA)',
    description:
      'Interventi personalizzati su lettura, scrittura, ortografia e calcolo (Dislessia, Disortografia, Disgrafia, Discalculia) con potenziamento delle strategie di studio e autonomia con strumenti compensativi.',
    iconType: 'book',
    tags: ['DSA', 'Scuola Primaria', 'Adolescenti'],
  },
  {
    title: 'Voce e Disfonia',
    description:
      'Igiene vocale, educazione e riabilitazione della voce per noduli, polipi, sforzo fonatorio o supporto specifico a insegnanti, cantanti e professionisti della voce.',
    iconType: 'mic',
    tags: ['Adulti', 'Insegnanti', 'Professionisti'],
  },
  {
    title: 'Deglutizione & Miofunzionale (SMOF)',
    description:
      'Valutazione e terapia degli squilibri muscolari orofacciali, deglutizione atipica/deviata, respirazione orale e postura linguale in stretta sinergia con l\'ortodonzia.',
    iconType: 'activity',
    tags: ['Bambini', 'Adulti', 'Ortodonzia'],
  },
  {
    title: 'Fluenza e Balbuzie',
    description:
      'Percorsi mirati alla gestione dell\'eloquio e dell\'ansia da prestazione comunicativa, con coinvolgimento attivo di famiglia e scuola per un clima sereno.',
    iconType: 'waves',
    tags: ['Bambini', 'Adolescenti', 'Adulti'],
  },
];

export function ServicesPage() {
  return (
    <FadeUp as="section" className="services-page">
      <header className="services-header">
        <h1>I Nostri Servizi &amp; Metodologia</h1>
        <p>
          Percorsi terapeutici personalizzati, basati sulle evidenze scientifiche e progettati nel rispetto dei tempi e dei bisogni di ogni persona.
        </p>
      </header>

      <div className="services-grid">
        {SERVICES.map((s) => (
          <FadeUp as="article" key={s.title} className="service-card card">
            <div className="service-icon-wrapper">
              {s.iconType === 'speech' && <MessageCircle size={28} className="service-icon" />}
              {s.iconType === 'book' && <BookOpen size={28} className="service-icon" />}
              {s.iconType === 'mic' && <Mic size={28} className="service-icon" />}
              {s.iconType === 'activity' && <Activity size={28} className="service-icon" />}
              {s.iconType === 'waves' && <AudioWaveform size={28} className="service-icon" />}
            </div>

            <div className="service-body">
              <h3>{s.title}</h3>
              <p>{s.description}</p>

              {s.tags && s.tags.length > 0 && (
                <div className="tags-container">
                  {s.tags.map((t) => (
                    <span key={t} className="service-chip">
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </FadeUp>
        ))}
      </div>

      {/* CTA Finale */}
      <FadeUp className="services-cta card">
        <div className="cta-text">
          <h3>Desideri una valutazione o un consiglio specialistico?</h3>
          <p>
            Durante il primo colloquio analizzeremo le necessità specifiche e definiremo insieme gli obiettivi del percorso.
          </p>
        </div>
        <MatButton variant="raised" to="/contatti" className="cta-btn">
          <CalendarCheck size={18} />
          <span>Prenota un Colloquio</span>
        </MatButton>
      </FadeUp>
    </FadeUp>
  );
}
