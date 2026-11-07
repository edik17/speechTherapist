import React, { useState } from 'react';
import {
  Mic,
  BookOpen,
  Activity,
  AudioWaveform,
  MessageCircle,
  CalendarCheck,
  Baby,
  User,
  Sparkles,
} from 'lucide-react';
import { FadeUp } from '../../shared/directives/FadeUp';
import { MatButton } from '../../shared/ui/MatButton';
import './ServicesPage.scss';

export interface ServiceItem {
  id: string;
  category: 'evolutiva' | 'adulta';
  categoryLabel: string;
  title: string;
  description: string;
  iconType: 'speech' | 'book' | 'mic' | 'activity' | 'waves';
  tags: string[];
}

const SERVICES_EVOLUTIVA: ServiceItem[] = [
  {
    id: 'linguaggio',
    category: 'evolutiva',
    categoryLabel: 'Età Evolutiva',
    title: 'Disturbi del Linguaggio',
    description:
      'Valutazione e trattamento di ritardi di linguaggio, parlatori tardivi (Late Talkers), disturbi fonetico-fonologici e difficoltà di comprensione in età evolutiva.',
    iconType: 'speech',
    tags: ['Bambini', 'Età Prescolare', 'Scolari'],
  },
  {
    id: 'apprendimento',
    category: 'evolutiva',
    categoryLabel: 'Età Evolutiva',
    title: 'Apprendimento (DSA)',
    description:
      'Interventi personalizzati su lettura, scrittura, ortografia e calcolo (Dislessia, Disortografia, Disgrafia, Discalculia) con potenziamento delle strategie di studio e autonomia con strumenti compensativi.',
    iconType: 'book',
    tags: ['DSA', 'Scuola Primaria', 'Adolescenti'],
  },
  {
    id: 'funzioni-orali-evolutiva',
    category: 'evolutiva',
    categoryLabel: 'Età Evolutiva',
    title: 'Funzioni Orali & Deglutizione',
    description:
      'Valutazione e terapia degli squilibri muscolari orofacciali, deglutizione atipica/deviata, respirazione orale e postura linguale in stretta sinergia con l\'ortodonzia.',
    iconType: 'activity',
    tags: ['Bambini', 'Età Evolutiva', 'Ortodonzia'],
  },
  {
    id: 'fluenza-evolutiva',
    category: 'evolutiva',
    categoryLabel: 'Età Evolutiva',
    title: 'Fluenza e Balbuzie',
    description:
      'Percorsi mirati alla gestione dell\'eloquio e dell\'ansia da prestazione comunicativa, con coinvolgimento attivo di famiglia e scuola per un clima sereno.',
    iconType: 'waves',
    tags: ['Bambini', 'Adolescenti', 'Famiglia'],
  },
];

const SERVICES_ADULTI: ServiceItem[] = [
  {
    id: 'funzioni-orali-adulti',
    category: 'adulta',
    categoryLabel: 'Età Adulta',
    title: 'Funzioni Orali & Deglutizione',
    description:
      'Valutazione e terapia degli squilibri muscolari orofacciali, deglutizione disfunzionale, respirazione orale, difficoltà masticatorie e postura linguale in stretta sinergia con l\'ortodonzia.',
    iconType: 'activity',
    tags: ['Adulti', 'Ortodonzia', 'Deglutizione'],
  },
  {
    id: 'fluenza-adulti',
    category: 'adulta',
    categoryLabel: 'Età Adulta',
    title: 'Fluenza e Balbuzie',
    description:
      'Percorsi specialistici mirati alla gestione dell\'eloquio, della tensione comunicativa e dei blocchi nell\'adulto, con attenzione specifica alla dimensione emotiva.',
    iconType: 'waves',
    tags: ['Adulti', 'Comunicazione', 'Fluenza'],
  },
  {
    id: 'voce-reflusso',
    category: 'adulta',
    categoryLabel: 'Età Adulta',
    title: 'Voce e Reflusso Faringo-Laringeo',
    description:
      'Igiene vocale, educazione e riabilitazione della voce per noduli, polipi, sforzo fonatorio, reflusso faringo-laringeo o supporto specifico a insegnanti, cantanti e professionisti della voce.',
    iconType: 'mic',
    tags: ['Adulti', 'Insegnanti', 'Professionisti'],
  },
];

export function ServicesPage() {
  const [filter, setFilter] = useState<'all' | 'evolutiva' | 'adulta'>('all');

  return (
    <FadeUp as="section" className="services-page">
      <header className="services-header">
        <h1>Di cosa mi occupo</h1>
        <p>
          Percorsi terapeutici personalizzati, basati sulle evidenze scientifiche e progettati nel rispetto dei tempi e dei bisogni di ciascuno.
        </p>

        {/* Switch / Filtro per Età */}
        <div className="services-filter-tabs" role="tablist">
          <button
            type="button"
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            <Sparkles size={16} />
            <span>Tutti i percorsi</span>
          </button>
          <button
            type="button"
            className={`filter-btn ${filter === 'evolutiva' ? 'active' : ''}`}
            onClick={() => setFilter('evolutiva')}
          >
            <Baby size={16} />
            <span>Età Evolutiva (Bambini &amp; Ragazzi)</span>
          </button>
          <button
            type="button"
            className={`filter-btn ${filter === 'adulta' ? 'active' : ''}`}
            onClick={() => setFilter('adulta')}
          >
            <User size={16} />
            <span>Età Adulta (Adulti &amp; Professionisti)</span>
          </button>
        </div>
      </header>

      {/* SEZIONE 1: ETÀ EVOLUTIVA */}
      {(filter === 'all' || filter === 'evolutiva') && (
        <div className="category-section">
          <div className="category-header">
            <div className="category-badge evolutiva">
              <Baby size={18} />
              <span>Età Evolutiva</span>
            </div>
            <h2>Bambini, Ragazzi &amp; Supporto Familiare</h2>
            <p>
              Prevenzione precoce, potenziamento degli apprendimenti scolastici e percorsi educativi condivisi passo dopo passo con la famiglia e la scuola.
            </p>
          </div>

          <div className="services-grid">
            {SERVICES_EVOLUTIVA.map((s) => (
              <FadeUp as="article" key={s.id} className="service-card card">
                <div className="service-icon-wrapper">
                  {s.iconType === 'speech' && <MessageCircle size={28} className="service-icon" />}
                  {s.iconType === 'book' && <BookOpen size={28} className="service-icon" />}
                  {s.iconType === 'activity' && <Activity size={28} className="service-icon" />}
                  {s.iconType === 'waves' && <AudioWaveform size={28} className="service-icon" />}
                </div>

                <div className="service-body">
                  <div className="card-top-category">
                    <span className="category-tag-mini">{s.categoryLabel}</span>
                  </div>
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
        </div>
      )}

      {/* SEZIONE 2: ETÀ ADULTA */}
      {(filter === 'all' || filter === 'adulta') && (
        <div className="category-section">
          <div className="category-header">
            <div className="category-badge adulta">
              <User size={18} />
              <span>Età Adulta</span>
            </div>
            <h2>Adulti &amp; Professionisti della Voce</h2>
            <p>
              Interventi mirati per la funzionalità dell'apparato fono-articolatorio, rieducazione miofunzionale occlusale e igiene vocale avanzata.
            </p>
          </div>

          <div className="services-grid">
            {SERVICES_ADULTI.map((s) => (
              <FadeUp as="article" key={s.id} className="service-card card">
                <div className="service-icon-wrapper">
                  {s.iconType === 'activity' && <Activity size={28} className="service-icon" />}
                  {s.iconType === 'waves' && <AudioWaveform size={28} className="service-icon" />}
                  {s.iconType === 'mic' && <Mic size={28} className="service-icon" />}
                </div>

                <div className="service-body">
                  <div className="card-top-category">
                    <span className="category-tag-mini">{s.categoryLabel}</span>
                  </div>
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
        </div>
      )}

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
