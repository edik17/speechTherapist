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
        <mat-icon style="font-size: 20px; color: #ffffff;">🏠</mat-icon>
        <span>Esprimi te stesso</span>
      </button>
      <span class="spacer"></span>
      <nav class="nav">
        <a mat-button routerLink="/chi-sono" routerLinkActive="active">Chi sono</a>
        <a mat-button routerLink="/servizi" routerLinkActive="active">Servizi</a>
        <a mat-button routerLink="/faq" routerLinkActive="active">FAQ</a>
        <a mat-button routerLink="/testimonianze" routerLinkActive="active">Recensioni</a>
        <a mat-raised-button class="contact-btn" routerLink="/contatti" routerLinkActive="active">Contatti</a>
      </nav>
      <button class="mobile-menu" mat-icon-button aria-label="Menu" (click)="open = !open">
        <mat-icon style="color: #ffffff;">menu</mat-icon>
      </button>
    </mat-toolbar>
  
    @if (open) {
      <nav class="mobile-drawer">
        <a routerLink="/chi-sono" (click)="open=false">Chi sono</a>
        <a routerLink="/servizi" (click)="open=false">Servizi</a>
        <a routerLink="/faq" (click)="open=false">FAQ</a>
        <a routerLink="/testimonianze" (click)="open=false">Recensioni</a>
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
      background: rgba(15, 76, 92, 0.95) !important;
      backdrop-filter: blur(12px);
      border-bottom: 1px solid rgba(255,255,255,0.15);
      color: #ffffff !important;
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

      &:hover { 
        background: rgba(255, 255, 255, 0.15) !important; 
        color: #ffffff !important;
      }

      &.active { 
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

      &:hover {
        background: #d65f42 !important;
        transform: translateY(-1px);
      }
    }

    .mobile-menu { display:none; }
    .mobile-drawer {
      display:none;
      background: #fff; border-bottom:1px solid rgba(0,0,0,0.06);
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
      .mobile-menu { display:inline-flex; color: #ffffff; }
      .mobile-drawer { display:block; }
    }
  `]
})
export class AppComponent {
  year = new Date().getFullYear();
  open = false;
}
