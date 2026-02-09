import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, MatToolbarModule, MatButtonModule, MatIconModule, CommonModule],
  template: `
  <div class="app-container">
    <mat-toolbar color="primary" class="toolbar">
      <button class="brand" routerLink="/">
        <mat-icon style="font-size: 20px;">🏠</mat-icon> 
        <span>Studio di Logopedia</span>
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

    <nav class="mobile-drawer" *ngIf="open">
      <a routerLink="/chi-sono" (click)="open=false">Chi sono</a>
      <a routerLink="/servizi" (click)="open=false">Servizi</a>
      <a routerLink="/faq" (click)="open=false">FAQ</a>
      <a routerLink="/testimonianze" (click)="open=false">Recensioni</a>
      <a routerLink="/contatti" (click)="open=false">Contatti</a>
    </nav>

    <main class="main-content">
      <router-outlet/>
    </main>

    <footer class="footer">
      © {{year}} Studio di Logopedia — Provincia di Ancona ·
      <a href="https://www.instagram.com/logopedista_eleonora_mariotti?igsh=OGI2NzF1ZG92bmhm" target="_blank" rel="noopener">Instagram</a> ·
      <a href="mailto:mariotti.eleonora14@gmail.com">mariotti.eleonora14&#64;gmail.com</a>
    </footer>
  </div>
  `,
  styles: [`
    .toolbar { position: sticky; top:0; z-index:10; }
    .brand { display:flex; align-items:center; gap:8px; color:white; background:none; border:0; cursor:pointer; }
    .spacer { flex:1; }
    .nav { display:flex; gap:8px; }
    .mobile-menu { display:none; }
    .mobile-drawer {
      display:none;
      background:#fff; border-bottom:1px solid rgba(0,0,0,0.06);
      padding: 8px 16px;
    }
    .mobile-drawer a { display:block; padding:12px 6px; color: var(--ink); text-decoration:none; }

    @media (max-width: 800px) {
      .nav { display:none; }
      .mobile-menu { display:inline-flex; }
      .mobile-drawer { display:block; }
    }
  `]
})
export class AppComponent {
  year = new Date().getFullYear();
  open = false;
}
