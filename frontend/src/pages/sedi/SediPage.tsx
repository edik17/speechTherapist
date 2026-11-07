import React from 'react';
import {
  MapPin,
  Clock,
  Calendar,
  Navigation,
  ExternalLink,
  CalendarCheck,
  Building2,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';
import { PageHero } from '../../shared/components/PageHero';
import { FadeUp } from '../../shared/directives/FadeUp';
import { MatButton } from '../../shared/ui/MatButton';
import './SediPage.scss';

export interface SedeLocation {
  city: string;
  facility: string;
  accreditation?: string;
  address: string;
  days: string;
  hours: string;
  dayIndices: number[];
  role: string;
  focus?: string;
  desc?: string;
  mapEmbedUrl: string;
  osmUrl: string;
}

const SEDI: SedeLocation[] = [
  {
    city: 'Ancona',
    facility: 'Centro multispecialistico DSA E NON SOLO',
    accreditation: 'Centro ACCREDITATO DALLA REGIONE MARCHE per la diagnosi e la certificazione dei Disturbi Specifici dell’Apprendimento (DSA) in età evolutiva e adulta.',
    address: 'Via Rossa Guido, 8, 60131 Ancona AN',
    days: 'Martedì & Venerdì',
    hours: '09:00 - 20:00',
    dayIndices: [2, 5],
    role: 'Logopedista in Equipe Multidisciplinare',
    mapEmbedUrl: 'https://www.openstreetmap.org/export/embed.html?bbox=13.5020%2C43.5649%2C13.5120%2C43.5709&layer=mapnik&marker=43.5679%2C13.5070',
    osmUrl: 'https://www.openstreetmap.org/?mlat=43.5679&mlon=13.5070#map=17/43.5679/13.5070',
  },
  {
    city: 'Jesi',
    facility: 'e-Movere, Centro Pedagogico Ludico Formativo',
    address: 'Viale Gallodoro, 70/a, 60035 Jesi AN',
    days: 'Mercoledì',
    hours: '09:00 - 20:00',
    dayIndices: [3],
    role: 'Logopedista Clinica Referente',
    mapEmbedUrl: 'https://www.openstreetmap.org/export/embed.html?bbox=13.2384%2C43.5152%2C13.2484%2C43.5212&layer=mapnik&marker=43.5182%2C13.2434',
    osmUrl: 'https://www.openstreetmap.org/?mlat=43.5182&mlon=13.2434#map=17/43.5182/13.2434',
  },
  {
    city: 'Sassoferrato',
    facility: 'Studio a Modo Mio',
    address: 'Via Roma 39, 60041 Sassoferrato (AN)',
    days: 'Lunedì & Giovedì',
    hours: '09:00 - 20:00',
    dayIndices: [1, 4],
    role: 'Logopedista Titolare del Servizio',
    mapEmbedUrl: 'https://www.openstreetmap.org/export/embed.html?bbox=12.8514%2C43.4232%2C12.8614%2C43.4292&layer=mapnik&marker=43.4262%2C12.8564',
    osmUrl: 'https://www.openstreetmap.org/?mlat=43.4262&mlon=12.8564#map=17/43.4262/12.8564',
  },
];

const WEEKLY_PLAN = [
  { day: 'Lunedì', city: 'Sassoferrato', studio: 'Studio a Modo Mio', hours: '09:00 - 20:00', dayIndex: 1 },
  { day: 'Martedì', city: 'Ancona', studio: 'DSA E NON SOLO', hours: '09:00 - 20:00', dayIndex: 2 },
  { day: 'Mercoledì', city: 'Jesi', studio: 'e-Movere', hours: '09:00 - 20:00', dayIndex: 3 },
  { day: 'Giovedì', city: 'Sassoferrato', studio: 'Studio a Modo Mio', hours: '09:00 - 20:00', dayIndex: 4 },
  { day: 'Venerdì', city: 'Ancona', studio: 'DSA E NON SOLO', hours: '09:00 - 20:00', dayIndex: 5 },
];

export function SediPage() {
  const todayDayIndex = new Date().getDay();

  return (
    <div className="sedi-page-container">
      {/* ============================================ */}
      {/* 1. HERO DELLA PAGINA SEDI                    */}
      {/* ============================================ */}
      <PageHero
        title="Le Mie Sedi sul Territorio"
        subtitle="Credo fermamente in una sanità di prossimità: ricevo su appuntamento ad Ancona, Jesi e Sassoferrato in strutture specializzate, accoglienti e pensate per il benessere di ogni persona."
        badge="SANITA' DI PROSSIMITA'"
      />

      {/* Trust bar */}
      <FadeUp className="sedi-trust-bar card">
        <div className="trust-col">
          <Building2 size={20} className="trust-icon" />
          <div>
            <strong>3 Strutture Dedicate</strong>
            <span>Ancona, Jesi e Sassoferrato</span>
          </div>
        </div>
        <div className="trust-col">
          <Calendar size={20} className="trust-icon" />
          <div>
            <strong>Ricevimento Programmato</strong>
            <span>Dal lunedì al venerdì su appuntamento</span>
          </div>
        </div>
        <div className="trust-col">
          <ShieldCheck size={20} className="trust-icon" />
          <div>
            <strong>Spazi Protetti &amp; Accoglienti</strong>
            <span>Massima riservatezza ed ergonomia clinica</span>
          </div>
        </div>
      </FadeUp>

      {/* ============================================ */}
      {/* 2. LE 3 SCHEDE SEDE CON MAPPE GOOGLE         */}
      {/* ============================================ */}
      <section className="sedi-list-section editorial-section">
        <div className="sedi-grid">
          {SEDI.map((sede) => (
            <FadeUp as="article" key={sede.city} className="sede-card card">
              <div className="sede-card-top">
                <div className="city-pill">
                  <MapPin size={16} />
                  <span>{sede.city}</span>
                </div>
                <span className="role-pill">{sede.role}</span>
              </div>

              <h2 className="facility-title">{sede.facility}</h2>
              {sede.accreditation && (
                <div className="facility-accreditation">
                  <ShieldCheck size={16} className="accreditation-icon" />
                  <span>{sede.accreditation}</span>
                </div>
              )}
              <p className="facility-address">{sede.address}</p>

              <div className="schedule-meta-box">
                <div className="schedule-row">
                  <Calendar size={15} />
                  <span><strong>{sede.dayIndices?.length === 1 ? 'Giorno:' : 'Giorni:'}</strong> {sede.days}</span>
                </div>
                <div className="schedule-row">
                  <Clock size={15} />
                  <span><strong>Orario:</strong> {sede.hours} (su appuntamento)</span>
                </div>
              </div>

              {/* Mappa OpenStreetMap Interattiva */}
              <div className="sede-map-wrapper">
                <iframe
                  title={`Mappa OpenStreetMap - ${sede.city} - ${sede.facility}`}
                  src={sede.mapEmbedUrl}
                  className="sede-map-iframe"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <div className="sede-card-actions">
                <a
                  href={sede.osmUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-directions"
                  title={`Apri ${sede.facility} su OpenStreetMap`}
                >
                  <Navigation size={15} />
                  <span>Apri su OpenStreetMap</span>
                  <ExternalLink size={13} />
                </a>

                <MatButton
                  variant="raised"
                  to={`/contatti?sede=${encodeURIComponent(sede.city)}`}
                  className="btn-book-here"
                >
                  <CalendarCheck size={15} />
                  <span>Prenota a {sede.city}</span>
                </MatButton>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ============================================ */}
      {/* 3. GLI SPAZI DELLO STUDIO: ACCOGLIENZA E CURA */}
      {/* ============================================ */}
      <FadeUp as="section" className="studio-showcase-section card">
        <div className="showcase-content">
          <div className="showcase-header">
            <span className="showcase-badge">SPAZI DI ASCOLTO E RIABILITAZIONE</span>
            <h2>Uno Sguardo all'Interno dello Studio</h2>
            <p className="showcase-desc">
              Gli ambienti terapeutici di Sassoferrato, Ancona e Jesi sono pensati per accogliere ogni persona in un clima protetto, privo di giudizio e stimolante. Ogni dettaglio — dai materiali per il potenziamento degli apprendimenti alla lavagna per la precisione fono-articolatoria — è studiato per costruire un'alleanza terapeutica solida ed efficace.
            </p>
          </div>

          <div className="showcase-gallery">
            <div className="gallery-card">
              <div className="gallery-img-wrap">
                <img
                  src="/assets/images/foto-eleonora-doc1.png"
                  alt="Dott.ssa Eleonora Mariotti - Valutazione e potenziamento logopedico"
                  className="showcase-photo"
                  loading="lazy"
                />
                <span className="photo-tag">Attività Clinica &amp; Potenziamento</span>
              </div>
              <div className="gallery-card-body">
                <h3>Valutazione &amp; Pratica Clinica</h3>
                <p>
                  Dalla motricità orofacciale al potenziamento dei prerequisiti scolastici: attività mirate e personalizzate svolte con il supporto di materiali visuo-spaziali e strumenti standardizzati.
                </p>
              </div>
            </div>

            <div className="gallery-card">
              <div className="gallery-img-wrap">
                <img
                  src="/assets/images/foto-eleonora-doc2.png"
                  alt="Dott.ssa Eleonora Mariotti nel suo studio di logopedia"
                  className="showcase-photo"
                  loading="lazy"
                />
                <span className="photo-tag">Ambiente Accogliente &amp; Protetto</span>
              </div>
              <div className="gallery-card-body">
                <h3>Setting Terapeutico Su Misura</h3>
                <p>
                  Uno spazio rilassante e luminoso dove bambini, adolescenti e adulti possono sentirsi liberi di esprimersi, sperimentare il successo comunicativo e consolidare nuovi traguardi.
                </p>
              </div>
            </div>
          </div>
        </div>
      </FadeUp>

      {/* ============================================ */}
      {/* 4. CALENDARIO SETTIMANALE DI PRESENZA        */}
      {/* ============================================ */}
      <FadeUp as="section" className="weekly-calendar-section card">
        <div className="calendar-header">
          <div className="icon-wrap">
            <Calendar size={22} />
          </div>
          <div>
            <h2>Quadro Settimanale di Presenza</h2>
            <p>La pianificazione delle giornate nei rispettivi studi professionali:</p>
          </div>
        </div>

        <div className="calendar-days-grid">
          {WEEKLY_PLAN.map((plan) => {
            const isToday = plan.dayIndex === todayDayIndex;
            return (
              <div
                key={plan.day}
                className={`calendar-day-card ${isToday ? 'is-today' : ''}`}
              >
                {isToday && <span className="today-badge">📍 OGGI IN SEDE</span>}
                <div className="day-name">{plan.day}</div>
                <strong className="day-city">{plan.city}</strong>
                <span className="day-studio">{plan.studio}</span>
                <div className="day-hours">
                  <Clock size={13} />
                  <span>{plan.hours}</span>
                </div>
              </div>
            );
          })}
        </div>
      </FadeUp>

      {/* ============================================ */}
      {/* 4. CTA FINALE                                */}
      {/* ============================================ */}
      <FadeUp as="section" className="sedi-cta-section">
        <div className="sedi-cta-card card">
          <h2>Hai individuato la sede più comoda per te?</h2>
          <p>
            Puoi contattarmi telefonicamente, inviarmi un messaggio WhatsApp o compilare il modulo per fissare il tuo primo colloquio conoscitivo nella sede prescelta.
          </p>
          <div className="cta-actions">
            <MatButton variant="raised" to="/contatti" className="btn-primary-cta">
              <CalendarCheck size={18} />
              <span>Contattami o Prenota un Colloquio</span>
            </MatButton>
            <MatButton variant="stroked" to="/chi-sono" className="btn-secondary-ghost">
              <span>Scopri il mio percorso professionale</span>
              <ArrowRight size={16} />
            </MatButton>
          </div>
        </div>
      </FadeUp>
    </div>
  );
}
