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
}

const SERVICES_EVOLUTIVA: ServiceItem[] = [
  {
    id: 'linguaggio',
    category: 'evolutiva',
    categoryLabel: 'Età Evolutiva',
    title: 'Disturbi del Linguaggio',
    description:
      'Consulenza, valutazione e trattamento in caso di: ritardo nello sviluppo del linguaggio, disturbo di linguaggio e difficoltà di pronuncia dei suoni.',
    iconType: 'speech',
  },
  {
    id: 'apprendimento',
    category: 'evolutiva',
    categoryLabel: 'Età Evolutiva',
    title: 'Apprendimento (DSA)',
    description:
      'Valutazione e potenziamento delle abilità di apprendimento (lettura, scrittura e calcolo).',
    iconType: 'book',
  },
  {
    id: 'funzioni-orali-evolutiva',
    category: 'evolutiva',
    categoryLabel: 'Età Evolutiva',
    title: 'Funzioni Orali & Deglutizione',
    description:
      'Valutazione e terapia degli squilibri muscolari orofacciali: deglutizione disfunzionale, respirazione orale e postura linguale inadeguata.',
    iconType: 'activity',
  },
  {
    id: 'fluenza-evolutiva',
    category: 'evolutiva',
    categoryLabel: 'Età Evolutiva',
    title: 'Balbuzie e disturbi della fluenza',
    description:
      'Percorso mirato per migliorare la fluenza verbale con coinvolgimento attivo della famiglia e della scuola per favorire il benessere comunicativo.',
    iconType: 'waves',
  },
];

const SERVICES_ADULTI: ServiceItem[] = [
  {
    id: 'funzioni-orali-adulti',
    category: 'adulta',
    categoryLabel: 'Età Adulta',
    title: 'Funzioni Orali & Deglutizione',
    description:
      'Valutazione e terapia degli squilibri muscolari orofacciali: deglutizione disfunzionale, respirazione orale, postura linguale inadeguata e difficoltà masticatorie.',
    iconType: 'activity',
  },
  {
    id: 'fluenza-adulti',
    category: 'adulta',
    categoryLabel: 'Età Adulta',
    title: 'Balbuzie e disturbi della fluenza',
    description:
      'Percorso mirato per migliorare la fluenza verbale, per ridurre l’impatto emotivo nei confronti della comunicazione e favorire il benessere e l’efficacia comunicativa.',
    iconType: 'waves',
  },
  {
    id: 'voce-reflusso',
    category: 'adulta',
    categoryLabel: 'Età Adulta',
    title: 'Voce e Reflusso Faringo-Laringeo',
    description:
      'Igiene vocale, educazione e riabilitazione della voce per noduli, polipi, sforzo fonatorio o supporto specifico a insegnanti, cantanti e professionisti della voce.',
    iconType: 'mic',
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
            <span>Età Adulta</span>
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
