import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CalendarCheck,
  Heart,
  BookOpen,
  MapPin,
  ShieldCheck,
  Phone,
  Sparkles,
  Star,
  ExternalLink,
  Users,
  FileText,
} from 'lucide-react';
import { FadeUp } from '../../shared/directives/FadeUp';
import { MatButton } from '../../shared/ui/MatButton';
import { testimonialsService } from '../../core/services/testimonials.service';
import { Testimonial, GoogleReviewsSummary } from '../../core/models/testimonial.model';
import './HomePage.scss';

export interface MeetingStep {
  step: string;
  title: string;
  tag: string;
  desc: string;
  icon: 'phone' | 'users' | 'heart' | 'file-text' | 'sparkles';
}

const FIRST_MEETING_STEPS: MeetingStep[] = [
  {
    step: '01',
    title: 'Primo Contatto & Ascolto Telefonico',
    tag: 'Orientamento iniziale',
    desc: 'Una breve telefonata per comprendere le tue necessità, accogliere i primi dubbi e concordare la sede più comoda (Sassoferrato, Ancona o Jesi).',
    icon: 'phone',
  },
  {
    step: '02',
    title: 'Incontro Conoscitivo',
    tag: 'In studio o on-line',
    desc: 'Un primo momento di confronto fondamentale per raccogliere le informazioni cliniche ed evolutive necessarie. Questo permette di inquadrare al meglio le tue esigenze e per pianificare i successivi passi da seguire.',
    icon: 'users',
  },
  {
    step: '03',
    title: 'Valutazione Clinica',
    tag: 'Osservazione & Somministrazione di test',
    desc: 'Una o più sedute dedicate all\'osservazione e alla somministrazione di test standardizzati.',
    icon: 'heart',
  },
  {
    step: '04',
    title: 'Restituzione & Piano di Trattamento',
    tag: 'Condivisione obiettivi',
    desc: 'Lettura chiara e trasparente dei risultati emersi dalla valutazione. In questa occasione viene consegnata e spiegata nel dettaglio la relazione scritta, vengono condivisi gli obiettivi terapeutici e fornite indicazioni pratiche da seguire.',
    icon: 'file-text',
  },
  {
    step: '05',
    title: 'Trattamento Logopedico',
    tag: 'Percorso personalizzato',
    desc: 'Se in seguito alla valutazione emerge la necessità di intraprendere un percorso di potenziamento, verrà concordata la frequenza delle sedute in studio. La durata complessiva del trattamento è personalizzata e varia in base agli obiettivi prefissati, alle caratteristiche e alla risposta del singolo caso.',
    icon: 'sparkles',
  },
];

export function HomePage() {
  const [reviews, setReviews] = useState<Testimonial[]>([]);
  const [summary, setSummary] = useState<GoogleReviewsSummary>(testimonialsService.getSummary());

  useEffect(() => {
    setReviews(testimonialsService.list());
    testimonialsService.getReviews().then((res) => {
      if (res && res.reviews && res.reviews.length > 0) {
        setReviews(res.reviews);
        setSummary(res.summary);
      }
    });
  }, []);

  return (
    <div className="home-page">
      {/* ============================================ */}
      {/* HERO SECTION ASIMMETRICA (7fr 5fr)           */}
      {/* ============================================ */}
      <FadeUp as="section" className="hero-asymmetric">
        <div className="hero-grid">
          {/* Colonna Testo (7fr) */}
          <div className="hero-text-col">
            <h1 className="hero-h1">Logopedia: Potenziare la Comunicazione, il Linguaggio e l'Apprendimento Insieme</h1>

            <p className="hero-lead">
              Consulenze, valutazioni e percorsi di riabilitazione e potenziamento logopedico per bambini, ragazzi e adulti. Dalla valutazione precoce del linguaggio ai disturbi dell'apprendimento e delle funzioni orali, attraverso un percorso condiviso non solo tra logopedista e paziente ma anche con la famiglia.
            </p>

            {/* Doppia CTA (Primaria solida Terracotta, Secondaria Ghost) */}
            <div className="hero-actions">
              <MatButton variant="raised" to="/contatti" className="btn-primary-terracotta">
                <CalendarCheck size={18} />
                <span>Prenota una Valutazione</span>
              </MatButton>
              <MatButton variant="stroked" to="/chi-sono" className="btn-secondary-ghost">
                <span>Scopri chi sono e di cosa mi occupo</span>
                <ArrowRight size={16} />
              </MatButton>
            </div>

            {/* Micro-punti di fiducia */}
            <div className="hero-trust-list">
              <div className="trust-item">
                <MapPin size={16} />
                <span>3 Sedi (Sassoferrato, Ancona, Jesi)</span>
              </div>
              <div className="trust-item">
                <ShieldCheck size={16} />
                <span>Iscritta all'Albo TSRM-PSTRP di Ancona, Ascoli Piceno, Fermo, Macerata</span>
              </div>
              <div className="trust-item">
                <Heart size={16} />
                <span>Alleanza e condivisione</span>
              </div>
            </div>
          </div>

          {/* Colonna Immagine con Cornice Organica (5fr) */}
          <div className="hero-media-col">
            <div className="organic-frame-wrapper">
              <div className="backdrop-organic-shape" aria-hidden="true"></div>
              <div className="photo-organic-frame">
                <img
                  src="/assets/images/EleLogopedista.jpg"
                  alt="Dott.ssa Eleonora Mariotti Logopedista"
                  className="hero-doctor-img"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>
      </FadeUp>

      {/* ============================================ */}
      {/* SEZIONE METODO & APPROCCIO                   */}
      {/* ============================================ */}
      <FadeUp as="section" className="method-section editorial-section">
        <div className="section-intro-header">
          <h2>Un percorso costruito attorno alla persona</h2>
          <p className="section-intro-p">
            La logopedia non si riduce alla correzione di un disturbo: è un percorso condiviso che valorizza le risorse di ciascun individuo, integrando la pratica basata sulle evidenze scientifiche con l'ascolto, la fiducia e l’alleanza terapeutica.
          </p>
        </div>

        <div className="pillars-grid">
          <FadeUp fadeDelay={100} className="pillar-card card">
            <div className="pillar-icon-wrap">
              <Heart size={24} />
            </div>
            <h3>Ascolto &amp; Personalizzazione</h3>
            <p>Personalizzazione delle attività in base all'età, alle caratteristiche e agli interessi di chi entra in studio. Uno spazio in cui gli obiettivi vengono raggiunti attraverso un percorso graduale pensato su misura.</p>
          </FadeUp>

          <FadeUp fadeDelay={200} className="pillar-card card">
            <div className="pillar-icon-wrap">
              <ShieldCheck size={24} />
            </div>
            <h3>Rigore Scientifico (EBP)</h3>
            <p>Valutazioni e protocolli riabilitativi standardizzati.</p>
          </FadeUp>

          <FadeUp fadeDelay={300} className="pillar-card card">
            <div className="pillar-icon-wrap">
              <BookOpen size={24} />
            </div>
            <h3>Lavoro di Rete</h3>
            <p>Collaborazione attiva e continuativa con tutte le figure che ruotano intorno alla persona (genitori, insegnanti, ortodontisti…) per un beneficio tangibile nella vita quotidiana.</p>
          </FadeUp>
        </div>
      </FadeUp>

      {/* ============================================ */}
      {/* SEZIONE VIDEO INTERVISTA STORY TIME          */}
      {/* ============================================ */}
      <FadeUp as="section" className="interview-section editorial-section">
        <div className="section-intro-header">
          <h2>La logopedia raccontata in radio</h2>
          <p className="section-intro-p">
            Ospite negli studi di <strong>Story Time su Canale Italia</strong>, racconto la mia visione: l'importanza dell'intervento precoce, l'ascolto privo di giudizio e l'alleanza fondamentale con la famiglia e la scuola.
          </p>
        </div>

        <FadeUp fadeDelay={150} className="interview-video-card card">
          <div className="video-player-wrapper">
            <video
              controls
              preload="metadata"
              poster="/assets/videos/intervista-eleonora-poster.jpg"
              className="interview-video"
            >
              <source src="/assets/videos/intervista-eleonora.mp4" type="video/mp4" />
              Il tuo browser non supporta la riproduzione video HTML5.
            </video>
          </div>

          <div className="video-card-meta">
            <p className="video-quote">
              «Parlare di logopedia significa innanzitutto parlare di relazione, accoglienza e valorizzazione della persona.»
            </p>
          </div>
        </FadeUp>
      </FadeUp>

      {/* ============================================ */}
      {/* SEZIONE: COME FUNZIONA                       */}
      {/* ============================================ */}
      <FadeUp as="section" className="first-meeting-section editorial-section">
        <div className="section-intro-header">
          <h2>Come Funziona</h2>
          <p className="section-intro-p">
            Un percorso chiaro, trasparente e strutturato attorno ai bisogni della persona e della famiglia.
          </p>
        </div>

        <div className="steps-grid">
          {FIRST_MEETING_STEPS.map((step) => (
            <FadeUp key={step.step} className="step-card card">
              <div className="step-header">
                <span className="step-number">{step.step}</span>
                <div className="step-icon-circle">
                  {step.icon === 'phone' && <Phone size={22} />}
                  {step.icon === 'users' && <Users size={22} />}
                  {step.icon === 'heart' && <Heart size={22} />}
                  {step.icon === 'file-text' && <FileText size={22} />}
                  {step.icon === 'sparkles' && <Sparkles size={22} />}
                </div>
              </div>
              <h3>{step.title}</h3>
              <span className="step-tag">{step.tag}</span>
              <p>{step.desc}</p>
            </FadeUp>
          ))}
        </div>

        <div className="steps-cta-row">
          <MatButton variant="stroked" to="/contatti" className="steps-action-btn">
            <CalendarCheck size={16} />
            <span>Contattami per un primo orientamento gratuito</span>
          </MatButton>
        </div>
      </FadeUp>

      {/* ============================================ */}
      {/* SEZIONE: RECENSIONI GOOGLE LIVE              */}
      {/* ============================================ */}
      <FadeUp as="section" className="google-reviews-section editorial-section">
        <div className="section-intro-header">
          <h2>Cosa dicono i pazienti su Google</h2>
          <p className="section-intro-p">
            L'esperienza e i traguardi condivisi di genitori, bambini e adulti che hanno intrapreso un percorso di crescita comunicativa insieme a me.
          </p>
        </div>

        {/* Google Badge Bar di Sintesi */}
        <FadeUp className="google-summary-bar card">
          <div className="google-summary-left">
            <div className="google-logo-box">
              <svg viewBox="0 0 24 24" width="28" height="28" aria-label="Google">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
            </div>
            <div className="google-score-info">
              <div className="score-line">
                <strong>{summary.rating.toFixed(1)}</strong>
                <div className="stars-row" aria-label="5 stelle su 5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={18} className="star-gold" fill="currentColor" />
                  ))}
                </div>
                <span className="rating-badge">Eccellente</span>
              </div>
              <span className="score-sub">Valutazione massima basata su recensioni verificate su Google</span>
            </div>
          </div>

          <div className="google-summary-right">
            <a href={summary.writeReviewUrl} target="_blank" rel="noopener noreferrer" className="google-cta-btn">
              <ExternalLink size={15} />
              <span>Scrivi una recensione su Google</span>
            </a>
          </div>
        </FadeUp>

        {/* Griglia Recensioni a 5 Stelle */}
        <div className="home-reviews-grid">
          {reviews.slice(0, 3).map((rev) => (
            <FadeUp as="article" key={rev.author + rev.text} className="home-review-card card">
              <div className="review-top">
                <div className="stars-row" aria-label="5 stelle">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={16} className="star-gold" fill="currentColor" />
                  ))}
                </div>
                <span className="verified-google-pill">
                  <svg viewBox="0 0 24 24" width="12" height="12">
                    <path fill="#4285F4" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                  <span>Verificata</span>
                </span>
              </div>

              <p className="review-quote">“{rev.text}”</p>

              <div className="review-author-wrap">
                <div className="author-circle">{rev.author.charAt(0)}</div>
                <div className="author-meta">
                  <strong className="author-name">{rev.author}</strong>
                  {rev.role && <span className="author-role">{rev.role}</span>}
                </div>
              </div>
            </FadeUp>
          ))}
        </div>

        <div className="reviews-bottom-action">
          <Link to="/testimonianze" className="view-all-reviews-link">
            <span>Leggi tutte le testimonianze e recensioni dei pazienti</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </FadeUp>

      {/* ============================================ */}
      {/* BANNER RASSICURANTE "ZERO-ANSIA"             */}
      {/* ============================================ */}
      <FadeUp as="section" className="reassuring-cta-section">
        <div className="reassuring-banner card">
          <div className="banner-content">
            <h2>Hai un dubbio o desideri un parere professionale?</h2>
            <p>
              Non aspettare che una difficoltà si consolidi. Una consulenza precoce permette di chiarire ogni incertezza in un clima accogliente, senza impegno e con la massima cura.
            </p>
            <div className="banner-actions">
              <MatButton variant="raised" to="/contatti" className="banner-terracotta-btn">
                <CalendarCheck size={18} />
                <span>Contattami o Prenota una Visita</span>
              </MatButton>
              <MatButton variant="basic" to="/faq" className="banner-faq-link">
                <span>Leggi le domande frequenti (FAQ)</span>
                <ArrowRight size={16} />
              </MatButton>
            </div>
          </div>
        </div>
      </FadeUp>
    </div>
  );
}
