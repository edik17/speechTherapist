import React, { useEffect, useState, Suspense, lazy } from 'react';
import { Routes, Route, Link, NavLink, useLocation, Navigate } from 'react-router-dom';
import { Phone, Menu, X } from 'lucide-react';
import { MatSnackBarContainer } from './shared/ui/MatSnackBar';
import { ArrowIcon, ArcMark } from './shared/ui/ArrowIcon';
import './App.scss';

const HomePage = lazy(() => import('./pages/home/HomePage').then((m) => ({ default: m.HomePage })));
const AboutPage = lazy(() => import('./pages/about/AboutPage').then((m) => ({ default: m.AboutPage })));
const ServicesPage = lazy(() => import('./pages/services/ServicesPage').then((m) => ({ default: m.ServicesPage })));
const TestimonialsPage = lazy(() => import('./pages/testimonials/TestimonialsPage').then((m) => ({ default: m.TestimonialsPage })));
const BlogPage = lazy(() => import('./pages/blog/BlogPage').then((m) => ({ default: m.BlogPage })));
const FaqPage = lazy(() => import('./pages/faq/FaqPage').then((m) => ({ default: m.FaqPage })));
const ContattiPage = lazy(() => import('./pages/contatti/ContattiPage').then((m) => ({ default: m.ContattiPage })));
const SediPage = lazy(() => import('./pages/sedi/SediPage').then((m) => ({ default: m.SediPage })));

const PAGE_TITLES: Record<string, string> = {
  '/': 'Dott.ssa Eleonora Mariotti: Logopedia per bambini, ragazzi e adulti nelle Marche',
  '/chi-sono': 'Chi Sono e Formazione Clinica | Dott.ssa Eleonora Mariotti',
  '/servizi': 'Ambiti Clinici e Servizi di Logopedia | Dott.ssa Eleonora Mariotti',
  '/sedi': 'Sedi e Orari di Ricevimento: Ancona, Jesi, Sassoferrato',
  '/testimonianze': 'Testimonianze e Recensioni dei Pazienti | Dott.ssa Eleonora Mariotti',
  '/blog': 'Tesi, Ricerche ed Evidenze Cliniche | Dott.ssa Eleonora Mariotti',
  '/faq': 'Domande Frequenti sulla Logopedia | Dott.ssa Eleonora Mariotti',
  '/contatti': 'Contatti e Prenotazioni | Dott.ssa Eleonora Mariotti',
};

const NAV_LINKS_LEFT = [
  { to: '/chi-sono', label: 'Chi sono' },
  { to: '/servizi', label: 'Servizi' },
  { to: '/sedi', label: 'Sedi' },
  { to: '/blog', label: 'Tesi & Ricerca' },
];

const NAV_LINKS_RIGHT = [
  { to: '/testimonianze', label: 'Recensioni' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contatti', label: 'Contatti' },
];

const ALL_MOBILE_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/chi-sono', label: 'Chi sono e formazione' },
  { to: '/servizi', label: 'Ambiti di intervento' },
  { to: '/sedi', label: 'Sedi e orari (Ancona, Jesi, Sassoferrato)' },
  { to: '/testimonianze', label: 'Testimonianze e recensioni' },
  { to: '/blog', label: 'Tesi ed evidenze cliniche' },
  { to: '/faq', label: 'Domande frequenti' },
  { to: '/contatti', label: 'Contatti e prenotazione' },
];

export function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    document.body.classList.remove('dark-mode');
    document.documentElement.classList.remove('dark-mode');
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    setMobileMenuOpen(false);

    const exact = PAGE_TITLES[location.pathname];
    if (exact) {
      document.title = exact;
    } else if (location.pathname.startsWith('/blog/')) {
      document.title = 'Approfondimento Clinico | Dott.ssa Eleonora Mariotti';
    } else {
      document.title = PAGE_TITLES['/'];
    }
  }, [location.pathname]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [mobileMenuOpen]);

  const isHome = location.pathname === '/';

  return (
    <>
      <a className="skip-link" href="#main-content">
        Vai al contenuto
      </a>

      <header className="ts-nav">
        <div className="wrap ts-nav__bar">
          <div className="ts-nav__left">
            <button
              type="button"
              className="ts-nav__burger"
              aria-label={mobileMenuOpen ? 'Chiudi menu di navigazione' : 'Apri menu di navigazione'}
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((prev) => !prev)}
            >
              {mobileMenuOpen ? <X size={20} strokeWidth={1.8} /> : <Menu size={20} strokeWidth={1.8} />}
            </button>

            <nav className="ts-nav__links" aria-label="Sezioni principali">
              {NAV_LINKS_LEFT.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) => `ts-nav__link${isActive ? ' is-active' : ''}`}
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>

          <Link to="/" className="ts-nav__logo" aria-label="Dott.ssa Eleonora Mariotti, Logopedista - Torna alla Home">
            <ArcMark className="ts-nav__mark" />
            <span className="ts-nav__brand-name">Eleonora Mariotti</span>
          </Link>

          <div className="ts-nav__actions">
            <nav className="ts-nav__links ts-nav__links--right" aria-label="Informazioni e contatti">
              {NAV_LINKS_RIGHT.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) => `ts-nav__link${isActive ? ' is-active' : ''}`}
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <Link to="/contatti" className="ts-btn ts-btn--primary ts-btn--sm ts-nav__cta">
              <span>Prenota una Valutazione</span>
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="ts-drawer" role="dialog" aria-modal="true" aria-label="Menu di navigazione">
          <div className="ts-drawer__head wrap">
            <span className="ts-drawer__title">Dott.ssa Eleonora Mariotti · Logopedista</span>
            <button
              type="button"
              className="ts-drawer__close"
              aria-label="Chiudi menu"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X size={20} strokeWidth={1.8} />
            </button>
          </div>

          <nav className="ts-drawer__nav wrap" aria-label="Menu mobile completo">
            {ALL_MOBILE_LINKS.map((item, idx) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) => `ts-drawer__link${isActive ? ' is-active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="ts-drawer__num">{String(idx + 1).padStart(2, '0')}</span>
                <span>{item.label}</span>
                <ArrowIcon />
              </NavLink>
            ))}
          </nav>

          <div className="ts-drawer__foot wrap">
            <div className="ts-drawer__visit">
              <strong>Sedi &amp; Orari</strong>
              <span>Lun – Ven · 08:30 – 19:30</span>
              <span>Jesi · Ancona · Sassoferrato</span>
            </div>
            <Link
              to="/contatti"
              className="ts-btn ts-btn--primary ts-drawer__cta"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>Prenota una Valutazione</span>
              <ArrowIcon />
            </Link>
          </div>
        </div>
      )}

      <main id="main-content" className={`main-content${isHome ? ' main-content--home' : ''}`}>
        <Suspense
          fallback={
            <div className="route-loading" role="status" aria-live="polite">
              <span>Caricamento della pagina...</span>
            </div>
          }
        >
          {isHome ? (
            <Routes>
              <Route path="/" element={<HomePage />} />
            </Routes>
          ) : (
            <div className="subpage-shell">
              <Routes>
                <Route path="/chi-sono" element={<AboutPage />} />
                <Route path="/servizi" element={<ServicesPage />} />
                <Route path="/sedi" element={<SediPage />} />
                <Route path="/testimonianze" element={<TestimonialsPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:id" element={<BlogPage />} />
                <Route path="/faq" element={<FaqPage />} />
                <Route path="/contatti" element={<ContattiPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
          )}
        </Suspense>
      </main>

      <footer className="ts-footer ground-inverse">
        <div className="wrap">
          <div className="ts-close">
            <div className="ts-close__text">
              <span className="eyebrow-label eyebrow-label--inverse">Primo Colloquio Conoscitivo</span>
              <h2 className="ts-close__heading">Prenota una valutazione logopedica in studio.</h2>
              <p className="ts-close__lead">
                Ricevo su appuntamento ad Ancona, Jesi e Sassoferrato dal lunedì al venerdì (08:30 – 19:30). Il primo
                colloquio telefonico serve a inquadrare il bisogno clinico senza impegno.
              </p>
              <div className="ts-close__actions">
                <Link to="/contatti" className="ts-btn ts-btn--primary">
                  <span>Prenota una Valutazione</span>
                  <ArrowIcon />
                </Link>
                <a href="tel:+393661460520" className="ts-btn ts-btn--secondary ts-btn--on-dark">
                  <Phone size={16} strokeWidth={1.8} />
                  <span>Chiama lo studio</span>
                </a>
              </div>
            </div>

            <div className="ts-close__media">
              <img
                src="/assets/images/foto-eleonora-doc1.png"
                alt="Seduta di valutazione logopedica presso lo studio della Dott.ssa Eleonora Mariotti"
                loading="lazy"
              />
            </div>
          </div>

          <div className="ts-footer__directory">
            <div className="ts-footer__brand">
              <Link to="/" className="ts-footer__mark">
                <ArcMark className="ts-nav__mark" />
                <span>Dott.ssa Eleonora Mariotti</span>
              </Link>
              <p>
                Logopedista · Albo TSRM-PSTRP AN-AP-FM-MC n. 415. Percorsi riabilitativi ed educativi basati su evidenze
                scientifiche (EBP) per età evolutiva, adolescenti e adulti.
              </p>
              <div className="ts-footer__socials">
                <a
                  href="https://www.instagram.com/eleonora.logopedista?igsh=ZDFnbDJ1czJ2YWRh"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram Dott.ssa Eleonora Mariotti"
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.9">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=eleonoramariottilogopedista@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Scrivi email via Gmail"
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.9">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="ts-footer__col">
              <h3>Navigazione</h3>
              <ul>
                <li><Link to="/chi-sono">Chi Sono e Formazione</Link></li>
                <li><Link to="/servizi">Ambiti Clinici e Servizi</Link></li>
                <li><Link to="/blog">Tesi ed Evidenze Cliniche</Link></li>
                <li><Link to="/testimonianze">Testimonianze</Link></li>
                <li><Link to="/faq">Domande Frequenti</Link></li>
              </ul>
            </div>

            <div className="ts-footer__col">
              <h3>Studi &amp; Orari</h3>
              <ul>
                <li>
                  <span className="ts-footer__item-label">Lun – Mar · Jesi (Fisiomedica)</span>
                </li>
                <li>
                  <span className="ts-footer__item-label">Mer &amp; Ven · Ancona (San Paolo)</span>
                </li>
                <li>
                  <span className="ts-footer__item-label">Giovedì · Sassoferrato (Appennino)</span>
                </li>
                <li>
                  <Link to="/sedi">Vedi mappe e dettagli</Link>
                </li>
              </ul>
            </div>

            <div className="ts-footer__col">
              <h3>Contatti Diretti</h3>
              <ul>
                <li>
                  <a href="tel:+393661460520">Tel. +39 366 146 0520</a>
                </li>
                <li>
                  <a href="mailto:eleonoramariottilogopedista@gmail.com">eleonoramariottilogopedista@gmail.com</a>
                </li>
                <li>
                  <Link to="/contatti">Modulo di richiesta colloquio</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="ts-footer__legal">
            <span>© {currentYear} Dott.ssa Eleonora Mariotti · Logopedista · P.IVA 02062460429</span>
            <span>Prestazioni sanitarie detraibili ai sensi di legge · Dati trattati ai sensi del GDPR</span>
          </div>
        </div>
      </footer>

      <MatSnackBarContainer />
    </>
  );
}

export default App;
