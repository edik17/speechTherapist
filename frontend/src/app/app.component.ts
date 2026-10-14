import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@Component({
    selector: 'app-root',
    imports: [RouterOutlet, RouterLink, MatToolbarModule, MatButtonModule, MatIconModule],
    template: `
  <div class="app-container">
    <mat-toolbar color="primary" class="toolbar">
      <button class="brand" routerLink="/">
        <mat-icon style="font-size: 20px;">🏠</mat-icon>
        <span>Esprimi te stesso</span>
      </button>
      <span class="spacer"></span>
      <nav class="nav">
        <a mat-button routerLink="/chi-sono" routerLinkActive="active">Chi sono</a>
        <a mat-button routerLink="/servizi" routerLinkActive="active">Servizi</a>
        <a mat-button routerLink="/faq" routerLinkActive="active">FAQ</a>
        <a mat-button routerLink="/testimonianze" routerLinkActive="active">Recensioni</a>
        <a mat-raised-button color="accent" routerLink="/contatti" routerLinkActive="active">Contatti</a>
      </nav>
      <button class="mobile-menu" mat-icon-button aria-label="Menu" (click)="open = !open">
        <mat-icon>menu</mat-icon>
      </button>
    </mat-toolbar>
  
    @if (open) {
      <nav class="mobile-drawer">
        <a routerLink="/chi-sono" (click)="open=false">Chi sono</a>
        <a routerLink="/servizi" (click)="open=false">Servizi</a>
        <a routerLink="/faq" (click)="open=false">FAQ</a>
        <a routerLink="/testimonianze" (click)="open=false">Recensioni</a>
        <a routerLink="/contatti" (click)="open=false">Contatti</a>
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
      background: rgba(15, 76, 92, 0.9) !important;
      backdrop-filter: blur(12px);
      border-bottom: 1px solid rgba(255,255,255,0.1);
      color: white;
    }
    .brand { display:flex; align-items:center; gap:8px; color:white; background:none; border:0; cursor:pointer; }
    .brand span { font-family: 'Outfit', sans-serif; font-weight: 600; font-size: 1.1rem; letter-spacing: 0.5px; }
    .spacer { flex:1; }
    .nav { display:flex; gap:8px; }
    .nav a { font-family: 'Inter', sans-serif; font-weight: 500; transition: color 0.3s ease; }
    .nav a:hover { color: var(--ring); }
    .mobile-menu { display:none; }
    .mobile-drawer {
      display:none;
      background: #fff; border-bottom:1px solid rgba(0,0,0,0.06);
      padding: 8px 16px;
    }
    .mobile-drawer a { display:block; padding:12px 6px; color: var(--ink); text-decoration:none; font-family: 'Inter', sans-serif; font-weight: 500; }

    .footer {
      background: var(--ink);
      color: #e8f0ef;
      border-top: none;
      padding: 32px 24px;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
    }
    .footer-content { display: flex; align-items: center; justify-content: center; gap: 12px; }
    .footer-icons { display: flex; gap: 16px; }
    .footer-icons img { filter: brightness(0) invert(1); opacity: 0.8; transition: opacity 0.3s; }
    .footer-icons a:hover img { opacity: 1; }

    @media (max-width: 800px) {
      .nav { display:none; }
      .mobile-menu { display:inline-flex; color: white; }
      .mobile-drawer { display:block; }
    }
  `]
})
export class AppComponent {
  year = new Date().getFullYear();
  open = false;
}
