import React, { useState, useEffect, Suspense } from 'react';
import { NavLink, Link, Outlet, useLocation } from 'react-router-dom';
import { Sun, Moon, CalendarCheck } from 'lucide-react';
import { MatSnackBarContainer } from './shared/ui/MatSnackBar';
import './App.scss';

// Scroll to top and title update on navigation
export function ScrollToTopAndTitle() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // Route title update
    if (pathname === '/') {
      document.title = 'Home – Logopedista';
    } else if (pathname === '/chi-sono') {
      document.title = 'Chi sono – Logopedista';
    } else if (pathname === '/servizi') {
      document.title = 'Servizi – Logopedia';
    } else if (pathname === '/faq') {
      document.title = 'FAQ – Logopedia';
    } else if (pathname === '/contatti') {
      document.title = 'Contatti & Sedi – Logopedista';
    } else if (pathname.startsWith('/blog/')) {
      document.title = 'Tesi & Approfondimento – Logopedista';
    } else if (pathname === '/blog') {
      document.title = 'Le mie tesi – Logopedista';
    } else if (pathname === '/testimonianze') {
      document.title = 'Cosa dicono di me – Logopedista';
    } else {
      document.title = 'Dott.ssa Eleonora Mariotti – Logopedista';
    }
  }, [pathname]);

  return null;
}

export default function App() {
  const [open, setOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const year = new Date().getFullYear();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      setIsDarkMode(false);
      document.body.classList.remove('dark-mode');
      document.documentElement.classList.remove('dark-mode');
    } else {
      setIsDarkMode(true);
      document.body.classList.add('dark-mode');
      document.documentElement.classList.add('dark-mode');
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const next = !prev;
      if (next) {
        document.body.classList.add('dark-mode');
        document.documentElement.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
      } else {
        document.body.classList.remove('dark-mode');
        document.documentElement.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
      }
      return next;
    });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  return (
    <div className="app-container">
      <ScrollToTopAndTitle />
      <header className="navbar-wrapper">
        <nav className="editorial-nav" aria-label="Navigazione principale">
          {/* Logo / Brand con stile editoriale */}
          <Link
            to="/"
            onClick={scrollToTop}
            className="brand-link"
            aria-label="Home page Dott.ssa Eleonora Mariotti"
          >
            <div className="brand-text">
              <span className="brand-name">Dott.ssa Eleonora Mariotti</span>
              <span className="brand-tagline">Logopedista • Sassoferrato • Ancona • Jesi</span>
            </div>
          </Link>

          {/* Menu Desktop */}
          <div className="nav-links">
            <NavLink
              to="/"
              end
              onClick={scrollToTop}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              Home
            </NavLink>
            <NavLink
              to="/chi-sono"
              onClick={scrollToTop}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              Chi sono
            </NavLink>
            <NavLink
              to="/servizi"
              onClick={scrollToTop}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              Servizi
            </NavLink>
            <NavLink
              to="/blog"
              onClick={scrollToTop}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              Le mie tesi
            </NavLink>
            <NavLink
              to="/testimonianze"
              onClick={scrollToTop}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              Cosa dicono di me
            </NavLink>
            <NavLink
              to="/faq"
              onClick={scrollToTop}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              FAQ
            </NavLink>

            {/* CTA Prenota un colloquio in Terracotta */}
            <NavLink
              to="/contatti"
              onClick={scrollToTop}
              className={({ isActive }) => `cta-colloquio-btn ${isActive ? 'active' : ''}`}
            >
              <CalendarCheck size={16} className="btn-icon" />
              <span>Prenota un colloquio</span>
            </NavLink>

            {/* Theme toggle */}
            <button
              type="button"
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={isDarkMode ? 'Passa alla modalità chiara' : 'Passa alla modalità scura'}
              title={isDarkMode ? 'Passa alla modalità chiara' : 'Passa alla modalità scura'}
            >
              {isDarkMode ? (
                <Sun size={18} className="sun-icon" />
              ) : (
                <Moon size={18} className="moon-icon" />
              )}
            </button>
          </div>

          {/* Mobile controls */}
          <div className="mobile-actions">
            <button
              type="button"
              className="theme-toggle mobile-theme"
              onClick={toggleTheme}
              aria-label={isDarkMode ? 'Passa alla modalità chiara' : 'Passa alla modalità scura'}
              title={isDarkMode ? 'Passa alla modalità chiara' : 'Passa alla modalità scura'}
            >
              {isDarkMode ? (
                <Sun size={18} className="sun-icon" />
              ) : (
                <Moon size={18} className="moon-icon" />
              )}
            </button>

            <button
              type="button"
              className="hamburger-btn"
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-label="Apri menu di navigazione"
            >
              <span className={`bar ${open ? 'open' : ''}`}></span>
              <span className={`bar ${open ? 'open' : ''}`}></span>
              <span className={`bar ${open ? 'open' : ''}`}></span>
            </button>
          </div>
        </nav>

        {/* Mobile drawer con transizione fluida */}
        {open && (
          <div className="mobile-menu-drawer" role="dialog" aria-modal="true" aria-label="Menu da mobile">
            <NavLink
              to="/"
              end
              onClick={() => { setOpen(false); scrollToTop(); }}
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              Home
            </NavLink>
            <NavLink
              to="/chi-sono"
              onClick={() => { setOpen(false); scrollToTop(); }}
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              Chi sono
            </NavLink>
            <NavLink
              to="/servizi"
              onClick={() => { setOpen(false); scrollToTop(); }}
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              Servizi &amp; Metodo
            </NavLink>
            <NavLink
              to="/blog"
              onClick={() => { setOpen(false); scrollToTop(); }}
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              Le mie tesi
            </NavLink>
            <NavLink
              to="/testimonianze"
              onClick={() => { setOpen(false); scrollToTop(); }}
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              Cosa dicono di me
            </NavLink>
            <NavLink
              to="/faq"
              onClick={() => { setOpen(false); scrollToTop(); }}
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              Domande Frequenti
            </NavLink>
            <NavLink
              to="/contatti"
              onClick={() => { setOpen(false); scrollToTop(); }}
              className="mobile-cta-link"
            >
              <span>Prenota un colloquio</span>
              <CalendarCheck size={16} />
            </NavLink>
          </div>
        )}
      </header>

      <main className="main-content" id="main-content">
        <Suspense fallback={<div style={{ minHeight: '60vh' }}></div>}>
          <Outlet />
        </Suspense>
      </main>

      <MatSnackBarContainer />

      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <h3>Dott.ssa Eleonora Mariotti</h3>
            <p>Logopedista iscritta all'albo TSRM-PSTRP. Percorsi clinici personalizzati a Sassoferrato, Ancona e Jesi.</p>
          </div>

          <div className="footer-links-col">
            <span className="col-title">Navigazione</span>
            <Link to="/chi-sono" onClick={scrollToTop}>Chi sono</Link>
            <Link to="/servizi" onClick={scrollToTop}>Aree di intervento</Link>
            <Link to="/blog" onClick={scrollToTop}>Le mie tesi</Link>
            <Link to="/contatti" onClick={scrollToTop}>Sedi e Orari</Link>
          </div>

          <div className="footer-links-col">
            <span className="col-title">Contatto Rapido</span>
            <a href="tel:+393661460520">+39 366 146 0520</a>
            <a href="mailto:mariotti.eleonora14@gmail.com">mariotti.eleonora14&#64;gmail.com</a>
            <span>Lun - Ven: 09:00 - 20:00</span>
          </div>
        </div>

        <div className="footer-bottom">
          <span>&copy; {year} Dott.ssa Eleonora Mariotti — P.IVA 02062460429 — Tutti i diritti riservati</span>
          <div className="social-links">
            <a
              href="https://www.instagram.com/logopedista_eleonora_mariotti?igsh=OGI2NzF1ZG92bmhm"
              target="_blank"
              rel="noopener"
              aria-label="Segui su Instagram"
            >
              <img src="/assets/images/instagram.png" alt="Instagram" width="20" height="20" />
            </a>
            <a
              href="mailto:mariotti.eleonora14@gmail.com"
              aria-label="Scrivi un'email"
            >
              <img src="/assets/images/gmail.png" alt="Gmail" width="20" height="20" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
