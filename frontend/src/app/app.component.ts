import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LucideMoon, LucideSun } from '@lucide/angular';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet, 
    RouterLink, 
    RouterLinkActive,
    MatToolbarModule, 
    MatButtonModule, 
    MatIconModule,
    LucideMoon,
    LucideSun
  ],
  template: `
  <div class="app-container">
    <mat-toolbar color="primary" class="toolbar">
      <button class="brand" routerLink="/">
        <mat-icon style="font-size: 20px; color: #ffffff;">🏠</mat-icon>
        <span>Esprimi te stesso</span>
      </button>
      <span class="spacer"></span>
      <nav class="nav">
        <a mat-button routerLink="/chi-sono" routerLinkActive="active">Chi sono</a>
        <a mat-button routerLink="/servizi" routerLinkActive="active">Servizi</a>
        <a mat-button routerLink="/faq" routerLinkActive="active">FAQ</a>
        <a mat-button routerLink="/testimonianze" routerLinkActive="active">Cosa dicono di me</a>
        <a mat-raised-button class="contact-btn" routerLink="/contatti" routerLinkActive="active">Contatti</a>
        
        <!-- Toggle Modalità Scura / Chiara -->
        <button mat-icon-button class="theme-toggle-btn" (click)="toggleTheme()" 
                [attr.aria-label]="isDarkMode ? 'Passa alla modalità chiara' : 'Passa alla modalità scura'"
                [title]="isDarkMode ? 'Passa alla modalità chiara' : 'Passa alla modalità scura'">
          @if (isDarkMode) {
            <svg lucideSun [size]="20" style="color: #fbbf24;"></svg>
          } @else {
            <svg lucideMoon [size]="20" style="color: #ffffff;"></svg>
          }
        </button>
      </nav>

      <!-- Toggle rapido su Mobile -->
      <button mat-icon-button class="mobile-theme-btn" (click)="toggleTheme()" 
              [attr.aria-label]="isDarkMode ? 'Passa alla modalità chiara' : 'Passa alla modalità scura'"
              [title]="isDarkMode ? 'Passa alla modalità chiara' : 'Passa alla modalità scura'">
        @if (isDarkMode) {
          <svg lucideSun [size]="20" style="color: #fbbf24;"></svg>
        } @else {
          <svg lucideMoon [size]="20" style="color: #ffffff;"></svg>
        }
      </button>

      <button class="mobile-menu" mat-icon-button aria-label="Menu" (click)="open = !open">
        <mat-icon style="color: #ffffff;">menu</mat-icon>
      </button>
    </mat-toolbar>
  
    @if (open) {
      <nav class="mobile-drawer">
        <a routerLink="/chi-sono" (click)="open=false">Chi sono</a>
        <a routerLink="/servizi" (click)="open=false">Servizi</a>
        <a routerLink="/faq" (click)="open=false">FAQ</a>
        <a routerLink="/testimonianze" (click)="open=false">Cosa dicono di me</a>
        <a routerLink="/contatti" (click)="open=false" class="mobile-contact-link">Contatti</a>
      </nav>
    }
  
    <main class="main-content">
      <router-outlet/>
    </main>
  
    <footer class="footer">
      <div class="footer-content">
        © {{year}} Studio di Logopedia — Provincia di Ancona
      </div>
      <div class="footer-icons">
        <a href="https://www.instagram.com/logopedista_eleonora_mariotti?igsh=OGI2NzF1ZG92bmhm" target="_blank" rel="noopener" aria-label="Instagram">
          <img src="assets/images/instagram.png" alt="Instagram" width="24" height="24">
        </a>
        <a href="mailto:mariotti.eleonora14@gmail.com" aria-label="Email">
          <img src="assets/images/gmail.png" alt="Email" width="24" height="24">
        </a>
      </div>
    </footer>
  </div>
  `,
  styles: [`
    .toolbar { 
      position: sticky; top:0; z-index:100;
      background: var(--toolbar-bg) !important;
      backdrop-filter: blur(12px);
      border-bottom: 1px solid rgba(255,255,255,0.12);
      color: #ffffff !important;
      transition: background 0.3s ease;
    }
    .brand { 
      display:flex; align-items:center; gap:8px; 
      color: #ffffff !important; 
      background:none; border:0; cursor:pointer; 
    }
    .brand span { 
      font-family: 'Outfit', sans-serif; 
      font-weight: 700; 
      font-size: 1.15rem; 
      letter-spacing: 0.5px;
      color: #ffffff !important;
    }
    .spacer { flex:1; }
    .nav { display:flex; align-items:center; gap:8px; }
    .nav a { 
      font-family: 'Inter', sans-serif; 
      font-weight: 600; 
      color: #ffffff !important;
      --mdc-text-button-label-text-color: #ffffff !important;
      transition: all 0.25s ease;
      border-radius: 8px;
      cursor: pointer !important;

      &:hover { 
        background: rgba(255, 255, 255, 0.15) !important; 
        color: #ffffff !important;
      }

      &.active:not(.contact-btn) { 
        background: rgba(255, 255, 255, 0.22) !important; 
        color: #ffffff !important;
        text-decoration: none !important;
      }
    }

    .nav .contact-btn {
      background: #e76f51 !important;
      color: #ffffff !important;
      --mdc-filled-button-label-text-color: #ffffff !important;
      border-radius: 999px !important;
      font-weight: 700 !important;
      box-shadow: 0 4px 14px rgba(231, 111, 81, 0.4) !important;
      padding: 0 20px !important;
      cursor: pointer !important;
      display: inline-flex !important;
      align-items: center !important;
      text-decoration: none !important;

      &:hover {
        background: #d65f42 !important;
        transform: translateY(-1px);
        box-shadow: 0 6px 18px rgba(231, 111, 81, 0.5) !important;
      }

      &.active {
        background: #d65f42 !important;
        box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.4), 0 4px 14px rgba(231, 111, 81, 0.6) !important;
        text-decoration: none !important;
      }
    }

    .theme-toggle-btn {
      display: inline-flex !important;
      align-items: center;
      justify-content: center;
      width: 40px !important;
      height: 40px !important;
      border-radius: 50% !important;
      background: rgba(255, 255, 255, 0.12) !important;
      margin-left: 6px;
      transition: all 0.2s ease !important;

      &:hover {
        background: rgba(255, 255, 255, 0.24) !important;
        transform: scale(1.08);
      }
    }

    .mobile-theme-btn {
      display: none;
      align-items: center;
      justify-content: center;
      width: 40px !important;
      height: 40px !important;
      border-radius: 50% !important;
      background: rgba(255, 255, 255, 0.12) !important;
      margin-right: 4px;
    }

    .mobile-menu { display:none; }
    .mobile-drawer {
      display:none;
      background: #fff; 
      border-bottom:1px solid rgba(0,0,0,0.06);
      padding: 12px 20px;
    }
    .mobile-drawer a { 
      display:block; 
      padding:12px 8px; 
      color: var(--ink); 
      text-decoration:none; 
      font-family: 'Inter', sans-serif; 
      font-weight: 600; 
      border-bottom: 1px solid rgba(0,0,0,0.04);
    }
    .mobile-drawer .mobile-contact-link {
      color: #e76f51;
      font-weight: 700;
    }

    .footer {
      background: var(--footer-bg);
      color: #e8f0ef;
      border-top: none;
      padding: 32px 24px;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
      transition: background 0.3s ease;
    }
    .footer-content { display: flex; align-items: center; justify-content: center; gap: 12px; }
    .footer-icons { display: flex; gap: 16px; }
    .footer-icons img { filter: brightness(0) invert(1); opacity: 0.8; transition: opacity 0.3s; }
    .footer-icons a:hover img { opacity: 1; }

    @media (max-width: 800px) {
      .nav { display:none; }
      .mobile-theme-btn { display: inline-flex; }
      .mobile-menu { display:inline-flex; color: #ffffff; }
      .mobile-drawer { display:block; }
    }
  `]
})
export class AppComponent implements OnInit {
  year = new Date().getFullYear();
  open = false;
  isDarkMode = true;

  ngOnInit() {
    // Default to dark mode unless user previously explicitly selected light mode
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      this.isDarkMode = false;
      document.body.classList.remove('dark-mode');
    } else {
      this.isDarkMode = true;
      document.body.classList.add('dark-mode');
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
