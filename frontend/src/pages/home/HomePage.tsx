import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Play, Star, ShieldCheck, Calendar, MapPin, Clock } from 'lucide-react';
import { testimonialsService } from '../../core/services/testimonials.service';
import { Testimonial, GoogleReviewsSummary } from '../../core/models/testimonial.model';
import { ArrowIcon } from '../../shared/ui/ArrowIcon';
import './HomePage.scss';

const METHOD_POINTS = [
  {
    num: '01',
    title: 'Valutazione logopedica su misura',
    desc: 'Ogni percorso nasce dall’ascolto della storia individuale del bambino o dell’adulto, integrando test standardizzati ed esperienza clinica.',
  },
  {
    num: '02',
    title: 'Metodo basato su evidenze scientifiche',
    desc: 'Utilizziamo protocolli clinici aggiornati (EBP) in logopedia pediatrica, miofunzionale, vocale e neuropsicologica.',
  },
  {
    num: '03',
    title: 'Coordinamento con famiglia, scuola e specialisti',
    desc: 'Lavoriamo in rete con genitori, insegnanti, pediatri, ortodontisti e otorinolaringoiatri per consolidare i progressi nella vita quotidiana.',
  },
];

const CLINICAL_STEPS = [
  {
    num: '01',
    title: 'Contatto telefonico e orientamento',
    desc: 'Una telefonata dedicata per raccogliere la tua richiesta e individuare la sede o la modalità più adatta.',
    meta: 'Ancona · Jesi · Sassoferrato',
  },
  {
    num: '02',
    title: 'Valutazione in studio',
    desc: 'Incontro clinico individuale con somministrazione di prove mirate sul linguaggio, apprendimento o funzione vocale.',
    meta: 'Seduta diagnostica',
  },
  {
    num: '03',
    title: 'Restituzione e progetto terapeutico',
    desc: 'Condivisione chiara del profilo emerso, degli obiettivi prioritari e della frequenza consigliata con la famiglia.',
    meta: 'Piano condiviso',
  },
  {
    num: '04',
    title: 'Ciclo di trattamento riabilitativo',
    desc: 'Sedute attive settimanali con materiali calibrati sull’età e attività pratiche da riportare a casa.',
    meta: 'Terapia in studio',
  },
  {
    num: '05',
    title: 'Consolidamento e autonomia',
    desc: 'Monitoraggio periodico fino al raggiungimento degli obiettivi comunicativi, scolastici o professionali.',
    meta: 'Follow-up',
  },
];

const WEEKLY_SCHEDULE_PREVIEW = [
  { day: 'Lun – Mar', city: 'Jesi', clinic: 'Poliambulatorio Fisiomedica', hours: '08:30 – 19:30' },
  { day: 'Mer & Ven', city: 'Ancona', clinic: 'Polispecialistico San Paolo', hours: '08:30 – 19:30' },
  { day: 'Giovedì', city: 'Sassoferrato', clinic: 'Poliambulatorio Appennino', hours: '08:30 – 19:30' },
];

const CHAPTER_MEDIA = [
  {
    id: 'sassoferrato',
    num: '01',
    label: 'Studio di Sassoferrato',
    city: 'Poliambulatorio Appennino',
    desc: 'Un ambiente riservato e luminoso per valutazioni iniziali, terapia evolutiva e colloqui familiari nel territorio montano.',
    image: '/assets/images/ImmagineEle.jpeg',
    alt: 'Dott.ssa Eleonora Mariotti nello studio logopedico di Sassoferrato',
  },
  {
    id: 'bambini',
    num: '02',
    label: 'Materiali per l’età evolutiva',
    city: 'Sedute attive e gioco clinico',
    desc: 'Strumenti strutturati, tavole fonologiche e prove validate per il potenziamento del linguaggio orale, letto-scrittura e comprensione.',
    image: '/assets/images/foto-eleonora-doc1.png',
    alt: 'Seduta con strumenti riabilitativi per il linguaggio infantile',
  },
  {
    id: 'ricerca',
    num: '03',
    label: 'Ricerca applicata e formazione',
    city: 'Università degli Studi di Perugia',
    desc: 'Aggiornamento continuo in deglutizione disfunzionale, fluenza, voce artistica e strumenti tecnologici in ambito scolastico.',
    image: '/assets/images/foto-eleonora-doc2.png',
    alt: 'Documentazione scientifica e attività clinica in logopedia',
  },
];

export function HomePage() {
  const [reviews, setReviews] = useState<Testimonial[]>(() => testimonialsService.list());
  const [summary, setSummary] = useState<GoogleReviewsSummary>(() => testimonialsService.getSummary());
  const [activeChapter, setActiveChapter] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    let active = true;
    testimonialsService
      .getReviews()
      .then((data) => {
        if (!active) return;
        if (data?.reviews?.length) {
          setReviews(data.reviews);
        }
        if (data?.summary) {
          setSummary(data.summary);
        }
      })
      .catch((err) => console.error('Impossibile caricare le recensioni Google:', err));
    return () => {
      active = false;
    };
  }, []);

  const overallRating = summary.rating || 5.0;
  const totalReviewsCount = summary.totalReviews || reviews.length;
  const writeReviewUrl = summary.writeReviewUrl || 'https://g.page/r/CS64g2t2N6sFEBM/review';

  const handlePlayInterview = () => {
    setIsVideoPlaying(true);
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play().catch(() => {});
      }
    }, 60);
  };

  const chapter = CHAPTER_MEDIA[activeChapter] || CHAPTER_MEDIA[0];
  const visibleReviews = reviews.slice(0, 3);

  return (
    <>
      {/* 1. HERO (film-split on base ground: never upscales poster, never covers face) */}
      <section className="ts-hero ground-base" aria-labelledby="hero-h">
        <div className="wrap ts-hero__split">
          <div className="ts-hero__text">
            <span className="eyebrow-label hero-enter-eyebrow">
              Dott.ssa Eleonora Mariotti · Logopedista
            </span>
            <h1 id="hero-h" className="hero-enter-title">
              Logopedia per linguaggio, voce e apprendimento nelle Marche.
            </h1>
            <p className="ts-hero__sub hero-enter-sub">
              Percorsi di valutazione e riabilitazione basati su evidenze scientifiche (EBP) per bambini, ragazzi e adulti
              negli studi di Ancona, Jesi e Sassoferrato.
            </p>
            <div className="ts-hero__actions hero-enter-actions">
              <Link to="/contatti" className="ts-btn ts-btn--primary">
                <span>Prenota una Valutazione</span>
                <ArrowIcon />
              </Link>
              <Link to="/chi-sono" className="ts-btn ts-btn--secondary">
                <span>Chi sono e formazione</span>
                <ArrowIcon />
              </Link>
            </div>
            <ul className="ts-hero__facts" aria-label="Dati essenziali dello studio">
              <li>Albo TSRM-PSTRP AN-AP-FM-MC n. 415</li>
              <li>Ancona · Jesi · Sassoferrato</li>
              <li>Lun – Ven · 08:30 – 19:30</li>
            </ul>
          </div>

          <div className="ts-hero__media">
            <div className="ts-hero__frame">
              {!isVideoPlaying ? (
                <>
                  <img
                    className="ts-hero__poster"
                    src="/assets/videos/intervista-eleonora-poster.jpg?v=3"
                    alt="Dott.ssa Eleonora Mariotti ospite in studio televisivo"
                    width={848}
                    height={478}
                    fetchPriority="high"
                  />
                  <button
                    type="button"
                    className="ts-btn ts-btn--primary ts-play"
                    onClick={handlePlayInterview}
                    aria-label="Riproduci l'intervista video della Dott.ssa Eleonora Mariotti"
                  >
                    <Play size={15} fill="currentColor" strokeWidth={0} aria-hidden="true" />
                    <span>Guarda l’intervista</span>
                  </button>
                </>
              ) : (
                <video
                  ref={videoRef}
                  className="ts-hero__video"
                  controls
                  autoPlay
                  playsInline
                  poster="/assets/videos/intervista-eleonora-poster.jpg?v=3"
                  src="/assets/videos/intervista-eleonora.mp4"
                >
                  Il tuo browser non supporta la riproduzione video HTML5.
                </video>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 2. METODO CLINICO (ground-surface, shared 12-col split: cols 1-5 / 6-12) */}
      <section className="ts-method ground-surface" aria-labelledby="method-h">
        <div className="wrap ts-split">
          <div className="ts-split__left ts-method__intro">
            <span className="eyebrow-label">Approccio Clinico</span>
            <h2 id="method-h">Metodo Clinico in Studio.</h2>
            <p className="reading-prose">
              La logopedia non si riduce alla correzione isolata di un suono o di un esercizio: significa accompagnare la
              persona nello sviluppo della propria autonomia comunicativa, relazionale e scolastica in un clima sereno.
            </p>
            <div className="ts-method__portrait">
              <img
                src="/assets/images/EleLogopedista.jpg"
                alt="Dott.ssa Eleonora Mariotti, Logopedista ad Ancona, Jesi e Sassoferrato"
                loading="lazy"
              />
            </div>
          </div>

          <div className="ts-split__right">
            <div className="ts-method__list">
              {METHOD_POINTS.map((pt) => (
                <article key={pt.num} className="ts-method-row">
                  <span className="ts-method-row__num">{pt.num}</span>
                  <div className="ts-method-row__body">
                    <h3>{pt.title}</h3>
                    <p>{pt.desc}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. COME SI SVOLGE UN PERCORSO + SCHEDULE UI FRAGMENT (ground-inverse, shared 12-col split) */}
      <section className="ts-steps ground-inverse" aria-labelledby="steps-h">
        <div className="wrap ts-split">
          <div className="ts-split__left ts-steps__intro">
            <span className="eyebrow-label eyebrow-label--inverse">Iter Diagnostico &amp; Terapeutico</span>
            <h2 id="steps-h">Percorso Terapeutico: 5 Fasi.</h2>
            <p className="reading-prose">
              Un iter clinico chiaro e condiviso dal primo contatto telefonico fino all’autonomia, attraverso gli studi
              di Ancona, Jesi e Sassoferrato.
            </p>

            <div className="ts-steps__panel" aria-label="Calendario settimanale studi nelle Marche">
              <div className="ts-steps__panel-head">
                <Calendar size={16} strokeWidth={1.8} />
                <span>Presenza Settimanale negli Studi</span>
              </div>
              <ul className="ts-steps__schedule">
                {WEEKLY_SCHEDULE_PREVIEW.map((slot) => (
                  <li key={slot.day} className="ts-steps__slot">
                    <span className="ts-steps__day">{slot.day}</span>
                    <span className="ts-steps__place">
                      <MapPin size={14} strokeWidth={1.8} />
                      <strong>{slot.city}</strong> · {slot.clinic}
                    </span>
                    <span className="ts-steps__hours">
                      <Clock size={14} strokeWidth={1.8} />
                      {slot.hours}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="ts-steps__cta">
              <Link to="/contatti" className="ts-btn ts-btn--primary">
                <span>Prenota una Valutazione</span>
                <ArrowIcon />
              </Link>
              <Link to="/servizi" className="ts-btn ts-btn--secondary ts-btn--on-dark">
                <span>Esplora i servizi</span>
                <ArrowIcon />
              </Link>
            </div>
          </div>

          <div className="ts-split__right">
            <ol className="ts-steps__list">
              {CLINICAL_STEPS.map((st) => (
                <li key={st.num} className="ts-step-row">
                  <div className="ts-step-row__num">{st.num}</div>
                  <div className="ts-step-row__content">
                    <div className="ts-step-row__head">
                      <h3>{st.title}</h3>
                      <span className="ts-step-row__tag">{st.meta}</span>
                    </div>
                    <p>{st.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* 4. MOMENT: PHOTO-CHAPTERS STUDIO SHOWCASE (ground-base, shared 12-col split) */}
      <section className="ts-chapters ground-base" aria-labelledby="chapters-h">
        <div className="wrap ts-split">
          <div className="ts-split__left ts-chapters__nav">
            <span className="eyebrow-label">Gli Ambienti di Lavoro</span>
            <h2 id="chapters-h">Studi e Strumentazione Clinica.</h2>
            <p className="ts-chapters__lead">
              Spazi dedicati, materiale clinico aggiornato e ricerca continua sul territorio marchigiano.
            </p>

            <div className="ts-chapters__list" role="tablist" aria-label="Capitoli dello studio">
              {CHAPTER_MEDIA.map((item, idx) => {
                const isActive = idx === activeChapter;
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`ts-chapter-tab${isActive ? ' is-active' : ''}`}
                    onClick={() => setActiveChapter(idx)}
                  >
                    <span className="ts-chapter-tab__num">{item.num}</span>
                    <span className="ts-chapter-tab__title">{item.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="ts-chapters__detail" aria-live="polite">
              <strong>{chapter.city}</strong>
              <p>{chapter.desc}</p>
            </div>

            <Link to="/sedi" className="ts-btn ts-btn--secondary">
              <span>Scopri sedi e mappe</span>
              <ArrowIcon />
            </Link>
          </div>

          <div className="ts-split__right ts-chapters__stage">
            <figure className="ts-chapters__frame">
              <img
                src={chapter.image}
                alt={chapter.alt}
                className="ts-chapters__img"
              />
            </figure>
          </div>
        </div>
      </section>

      {/* 5. TESTIMONIANZE GOOGLE (ground-surface, stars + verified icons + closing CTA) */}
      {visibleReviews.length > 0 && (
        <section className="ts-reviews ground-surface" aria-labelledby="reviews-h">
          <div className="wrap">
            <div className="ts-reviews__head">
              <div>
                <span className="eyebrow-label">Esperienze dei Pazienti</span>
                <h2 id="reviews-h">Recensioni Verificate su Google.</h2>
              </div>
              <div className="ts-reviews__summary">
                <div className="ts-reviews__score" aria-label={`Valutazione media ${overallRating.toFixed(1)} su 5`}>
                  <Star size={18} fill="#d99b26" color="#d99b26" />
                  <strong>{overallRating.toFixed(1)} / 5</strong>
                  <span>· {totalReviewsCount} recensioni verificate</span>
                </div>
                <a
                  href={writeReviewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ts-reviews__google-link"
                >
                  Lascia una recensione su Google
                  <ArrowIcon />
                </a>
              </div>
            </div>

            <div className="ts-reviews__grid">
              {visibleReviews.map((r, idx) => (
                <article key={idx} className="ts-review-card">
                  <div className="ts-review-card__top">
                    <div className="ts-review-card__stars" aria-label={`${r.rating || 5} stelle su 5`}>
                      {Array.from({ length: r.rating || 5 }).map((_, sIdx) => (
                        <Star key={sIdx} size={15} fill="#d99b26" color="#d99b26" />
                      ))}
                    </div>
                    <span className="ts-review-card__tag">
                      <ShieldCheck size={14} strokeWidth={1.8} />
                      <span>{r.tag || 'Google'}</span>
                    </span>
                  </div>
                  <blockquote>“{r.text}”</blockquote>
                  <footer className="ts-review-card__author">
                    <strong>{r.author}</strong>
                    <span>{r.role || 'Paziente verificato Google'}</span>
                  </footer>
                </article>
              ))}
            </div>

            <div className="ts-reviews__actions">
              <Link to="/contatti" className="ts-btn ts-btn--primary">
                <span>Prenota una Valutazione</span>
                <ArrowIcon />
              </Link>
              <Link to="/testimonianze" className="ts-btn ts-btn--secondary">
                <span>Leggi tutte le testimonianze</span>
                <ArrowIcon />
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
