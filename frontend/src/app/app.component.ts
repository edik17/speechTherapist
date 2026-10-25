import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LucideMoon, LucideSun, LucideSparkles, LucideCalendarCheck } from '@lucide/angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    RouterLink, 
    RouterLinkActive,
    MatToolbarModule, 
    MatButtonModule, 
    MatIconModule,
    LucideMoon,
    LucideSun,
    LucideCalendarCheck
  ],
  template: `
  <div class="app-container">
    <header class="navbar-wrapper">
      <nav class="editorial-nav" aria-label="Navigazione principale">
        
        <!-- Logo / Brand con stile editoriale -->
        <a class="brand-link" routerLink="/" aria-label="Home page Dott.ssa Eleonora Mariotti">
          <span class="brand-monogram">EM</span>
          <div class="brand-text">
            <span class="brand-name">Dott.ssa Eleonora Mariotti</span>
            <span class="brand-tagline">Logopedista • Sassoferrato • Ancona • Jesi</span>
          </div>
        </a>

        <!-- Menu Desktop -->
        <div class="nav-links">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" class="nav-item">Home</a>
          <a routerLink="/chi-sono" routerLinkActive="active" class="nav-item">Chi sono</a>
          <a routerLink="/servizi" routerLinkActive="active" class="nav-item">Servizi</a>
          <a routerLink="/blog" routerLinkActive="active" class="nav-item">Blog & Ricerca</a>
          <a routerLink="/testimonianze" routerLinkActive="active" class="nav-item">Cosa dicono di me</a>
          <a routerLink="/faq" routerLinkActive="active" class="nav-item">FAQ</a>

          <!-- CTA Prenota un colloquio distinta in Terracotta -->
          <a routerLink="/contatti" routerLinkActive="active" class="cta-colloquio-btn">
            <svg lucideCalendarCheck [size]="16" class="btn-icon"></svg>
            <span>Prenota un colloquio</span>
          </a>

          <!-- Theme toggle -->
          <button 
            type="button" 
            class="theme-toggle" 
            (click)="toggleTheme()" 
            [attr.aria-label]="isDarkMode ? 'Passa alla modalità chiara' : 'Passa alla modalità scura'"
            [title]="isDarkMode ? 'Passa alla modalità chiara' : 'Passa alla modalità scura'">
            @if (isDarkMode) {
              <svg lucideSun [size]="18" class="sun-icon"></svg>
            } @else {
              <svg lucideMoon [size]="18" class="moon-icon"></svg>
            }
          </button>
        </div>

        <!-- Mobile controls -->
        <div class="mobile-actions">
          <button 
            type="button" 
            class="theme-toggle mobile-theme" 
            (click)="toggleTheme()" 
            [attr.aria-label]="isDarkMode ? 'Passa alla modalità chiara' : 'Passa alla modalità scura'">
            @if (isDarkMode) {
              <svg lucideSun [size]="18" class="sun-icon"></svg>
            } @else {
              <svg lucideMoon [size]="18" class="moon-icon"></svg>
            }
          </button>

          <button 
            type="button" 
            class="hamburger-btn" 
            (click)="open = !open" 
            [attr.aria-expanded]="open"
            aria-label="Apri menu di navigazione">
            <span class="bar" [class.open]="open"></span>
            <span class="bar" [class.open]="open"></span>
            <span class="bar" [class.open]="open"></span>
          </button>
        </div>

      </nav>

      <!-- Mobile drawer con transizione fluida -->
      @if (open) {
        <div class="mobile-menu-drawer" role="dialog" aria-modal="true" aria-label="Menu da mobile">
          <a routerLink="/" (click)="open=false" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Home</a>
          <a routerLink="/chi-sono" (click)="open=false" routerLinkActive="active">Chi sono</a>
          <a routerLink="/servizi" (click)="open=false" routerLinkActive="active">Servizi & Metodo</a>
          <a routerLink="/blog" (click)="open=false" routerLinkActive="active">Blog & Divulgazione</a>
          <a routerLink="/testimonianze" (click)="open=false" routerLinkActive="active">Cosa dicono di me</a>
          <a routerLink="/faq" (click)="open=false" routerLinkActive="active">Domande Frequenti</a>
          <a routerLink="/contatti" (click)="open=false" class="mobile-cta-link">
            <span>Prenota un colloquio</span>
            <svg lucideCalendarCheck [size]="16"></svg>
          </a>
        </div>
      }
    </header>

    <main class="main-content" id="main-content">
      <router-outlet/>
    </main>

    <footer class="footer">
      <div class="footer-inner">
        <div class="footer-brand">
          <h3>Dott.ssa Eleonora Mariotti</h3>
          <p>Logopedista iscritta all'albo TSRM-PSTRP. Percorsi clinici personalizzati a Sassoferrato, Ancona e Jesi.</p>
        </div>

        <div class="footer-links-col">
          <span class="col-title">Navigazione</span>
          <a routerLink="/chi-sono">Chi sono</a>
          <a routerLink="/servizi">Aree di intervento</a>
          <a routerLink="/blog">Blog & Ricerca</a>
          <a routerLink="/contatti">Sedi e Orari</a>
        </div>

        <div class="footer-links-col">
          <span class="col-title">Contatto Rapido</span>
          <a href="tel:+393661460520">+39 366 146 0520</a>
          <a href="mailto:mariotti.eleonora14@gmail.com">mariotti.eleonora14&#64;gmail.com</a>
          <span>Lun - Ven: 09:00 - 19:30</span>
        </div>
      </div>

      <div class="footer-bottom">
        <span>© {{year}} Dott.ssa Eleonora Mariotti — Tutti i diritti riservati</span>
        <div class="social-links">
          <a href="https://www.instagram.com/logopedista_eleonora_mariotti?igsh=OGI2NzF1ZG92bmhm" target="_blank" rel="noopener" aria-label="Segui su Instagram">
            <img src="assets/images/instagram.png" alt="Instagram" width="20" height="20">
          </a>
          <a href="mailto:mariotti.eleonora14@gmail.com" aria-label="Scrivi un'email">
            <img src="assets/images/gmail.png" alt="Gmail" width="20" height="20">
          </a>
        </div>
      </div>
    </footer>
  </div>
  `,
  styles: [`
    .navbar-wrapper {
      position: sticky;
      top: 0;
      z-index: 1000;
      background: var(--toolbar-bg);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border-bottom: 1px solid var(--border-subtle);
      transition: background 0.3s ease, border-color 0.3s ease;
    }

    .editorial-nav {
      max-width: 1200px;
      margin: 0 auto;
      padding: 12px clamp(1rem, 3vw, 2.5rem);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
    }

    .brand-link {
      display: flex;
      align-items: center;
      gap: 12px;
      text-decoration: none;
      color: inherit;

      .brand-monogram {
        width: 38px;
        height: 38px;
        border-radius: 12px;
        background: var(--primary-gradient);
        color: #FAF7F2;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: 'Fraunces', serif;
        font-weight: 700;
        font-size: 1.1rem;
        box-shadow: 0 4px 10px rgba(27, 59, 54, 0.15);
      }

      .brand-text {
        display: flex;
        flex-direction: column;

        .brand-name {
          font-family: 'Fraunces', Georgia, serif;
          font-weight: 600;
          font-size: 1.1rem;
          color: var(--text-primary);
          line-height: 1.2;
        }

        .brand-tagline {
          font-size: 0.72rem;
          color: var(--text-secondary);
          letter-spacing: 0.02em;
        }
      }
    }

    .nav-links {
      display: flex;
      align-items: center;
      gap: 6px;

      .nav-item {
        color: var(--text-secondary);
        text-decoration: none;
        font-size: 0.92rem;
        font-weight: 600;
        padding: 8px 14px;
        border-radius: 999px;
        position: relative;
        transition: color 0.2s ease, background 0.2s ease;

        &:hover {
          color: var(--text-primary);
          background: rgba(124, 157, 142, 0.12);
        }

        &.active {
          color: var(--text-primary);
          background: rgba(124, 157, 142, 0.18);

          &::after {
            content: '';
            position: absolute;
            bottom: 4px;
            left: 50%;
            transform: translateX(-50%);
            width: 14px;
            height: 2px;
            border-radius: 2px;
            background: var(--accent-primary);
          }
        }
      }
    }

    .cta-colloquio-btn {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      background: var(--accent-primary);
      color: #FAF7F2 !important;
      text-decoration: none;
      font-size: 0.9rem;
      font-weight: 700;
      padding: 9px 20px;
      border-radius: 999px;
      margin-left: 8px;
      box-shadow: 0 4px 14px rgba(212, 106, 78, 0.35);
      transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;

      &:hover {
        background: var(--accent-primary-hover);
        transform: translateY(-2px);
        box-shadow: 0 6px 18px rgba(212, 106, 78, 0.45);
      }

      &.active {
        box-shadow: 0 0 0 2px var(--accent-secondary), 0 4px 14px rgba(212, 106, 78, 0.35);
      }
    }

    .theme-toggle {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      border: 1px solid var(--border-subtle);
      background: var(--bg-surface);
      color: var(--text-primary);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      margin-left: 6px;
      transition: all 0.2s ease;

      &:hover {
        background: var(--bg-elevated);
        transform: scale(1.06);
      }

      .sun-icon {
        color: #FBBF24;
      }
      .moon-icon {
        color: var(--text-secondary);
      }
    }

    .mobile-actions {
      display: none;
      align-items: center;
      gap: 8px;
    }

    .hamburger-btn {
      background: none;
      border: none;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 5px;
      width: 36px;
      height: 36px;
      padding: 6px;

      .bar {
        height: 2px;
        width: 100%;
        background-color: var(--text-primary);
        border-radius: 2px;
        transition: transform 0.25s ease, opacity 0.25s ease;
      }
    }

    .mobile-menu-drawer {
      display: flex;
      flex-direction: column;
      background: var(--bg-primary);
      border-bottom: 1px solid var(--border-subtle);
      padding: 16px 24px 24px;
      gap: 8px;

      a {
        text-decoration: none;
        color: var(--text-primary);
        font-size: 1rem;
        font-weight: 600;
        padding: 10px 12px;
        border-radius: var(--radius-sm);
        transition: background 0.2s ease;

        &:hover, &.active {
          background: var(--bg-surface);
        }

        &.mobile-cta-link {
          background: var(--accent-primary);
          color: #FAF7F2;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 8px;
          padding: 12px 18px;
        }
      }
    }

    /* Editorial Footer */
    .footer {
      background: var(--footer-bg);
      color: #FAF7F2;
      padding: clamp(3rem, 6vw, 4.5rem) clamp(1rem, 3vw, 2.5rem) 2rem;
      border-top: 1px solid rgba(250, 247, 242, 0.08);

      .footer-inner {
        max-width: 1200px;
        margin: 0 auto;
        display: grid;
        grid-template-columns: 2fr 1fr 1.5fr;
        gap: 40px;
        padding-bottom: 40px;
        border-bottom: 1px solid rgba(250, 247, 242, 0.1);

        .footer-brand {
          h3 {
            color: #FAF7F2;
            font-size: 1.35rem;
            margin-bottom: 12px;
          }
          p {
            color: #A0BDB5;
            font-size: 0.95rem;
            line-height: 1.6;
            max-width: 40ch;
          }
        }

        .footer-links-col {
          display: flex;
          flex-direction: column;
          gap: 10px;

          .col-title {
            font-family: 'Fraunces', serif;
            font-size: 1rem;
            color: #FAF7F2;
            margin-bottom: 4px;
          }

          a {
            color: #A0BDB5;
            text-decoration: none;
            font-size: 0.92rem;
            transition: color 0.2s ease;

            &:hover {
              color: var(--accent-primary);
            }
          }

          span {
            color: #A0BDB5;
            font-size: 0.9rem;
          }
        }
      }

      .footer-bottom {
        max-width: 1200px;
        margin: 24px auto 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 16px;
        color: #7C9D8E;
        font-size: 0.85rem;

        .social-links {
          display: flex;
          align-items: center;
          gap: 14px;

          img {
            filter: brightness(0) invert(1);
            opacity: 0.8;
            transition: opacity 0.2s ease, transform 0.2s ease;

            &:hover {
              opacity: 1;
              transform: translateY(-2px);
            }
          }
        }
      }
    }

    @media (max-width: 960px) {
      .nav-links {
        display: none;
      }
      .mobile-actions {
        display: flex;
      }
      .footer .footer-inner {
        grid-template-columns: 1fr;
        gap: 30px;
      }
    }
  `]
})
export class AppComponent implements OnInit {
  year = new Date().getFullYear();
  open = false;
  isDarkMode = false; // Default to warm light alabaster for healthcare editorial, but preserves user choice

  ngOnInit() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      this.isDarkMode = true;
      document.body.classList.add('dark-mode');
    } else {
      this.isDarkMode = false;
      document.body.classList.remove('dark-mode');
    }
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
  }
}
