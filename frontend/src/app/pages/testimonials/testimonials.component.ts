import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { TestimonialsService } from '../../core/services/testimonials.service';
import { Testimonial, GoogleReviewsSummary } from '../../core/models/testimonial.model';
import Swiper from 'swiper/bundle';
import { LucideStar, LucideHeart, LucideQuote, LucideExternalLink } from '@lucide/angular';

@Component({
  selector: 'app-testimonials',
  imports: [LucideStar, LucideHeart, LucideQuote, LucideExternalLink, DecimalPipe],
  template: `
  <section class="testimonials-container">
    <div class="testimonials-header">
      <div class="subtitle-badge">
        <svg lucideHeart [size]="16" class="badge-icon"></svg>
        <span>Feedback & Esperienze</span>
      </div>
      <h1>Cosa dicono di me</h1>
      <p>La soddisfazione e i progressi di bambini, genitori e adulti che hanno intrapreso un percorso di crescita comunicativa insieme a me.</p>
    </div>

    @if (elfsightWidgetId) {
      <!-- Widget Automatico Google Reviews (Elfsight) -->
      <div class="elfsight-widget-wrapper card">
        <div [class]="'elfsight-app-' + elfsightWidgetId" data-elfsight-app-lazy></div>
      </div>
    } @else {
      <!-- Swiper Carousel Recensioni Reali da Google -->
      <div class="swiper testimonials-swiper">
        <div class="swiper-wrapper">
          @for (t of testimonials; track (t.author + t.text)) {
            <div class="swiper-slide">
              <div class="testimonial-card card">
                <div class="card-top">
                  <div class="stars">
                    @for (star of [1,2,3,4,5]; track star) {
                      <svg lucideStar [size]="18" class="star-icon" fill="currentColor"></svg>
                    }
                  </div>
                  @if (t.tag) {
                    <span class="tag-chip">{{t.tag}}</span>
                  } @else if (t.isGoogleVerified) {
                    <span class="google-chip">Recensione Google</span>
                  }
                </div>

                <div class="quote-wrapper">
                  <svg lucideQuote [size]="28" class="quote-icon"></svg>
                  <p class="quote-text">“{{t.text}}”</p>
                </div>

                <div class="author-info">
                  <div class="author-avatar" [class.has-photo]="!!t.authorPhotoUrl">
                    @if (t.authorPhotoUrl) {
                      <img [src]="t.authorPhotoUrl" [alt]="t.author" class="google-avatar-img" (error)="t.authorPhotoUrl = ''" />
                    } @else {
                      <span>{{t.author.charAt(0)}}</span>
                    }
                  </div>
                  <div class="author-details">
                    <div class="author-name-row">
                      <strong class="author-name">{{t.author}}</strong>
                      @if (t.isGoogleVerified) {
                        <span class="google-verified-badge" title="Recensione verificata su Google">
                          <svg viewBox="0 0 24 24" width="13" height="13">
                            <path fill="#4285F4" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                          </svg>
                          <span>Google</span>
                        </span>
                      }
                    </div>
                    @if (t.role) {
                      <span class="author-role">{{t.role}}</span>
                    }
                    @if (t.relativeTime || t.date) {
                      <span class="review-date">{{t.relativeTime || t.date}}</span>
                    }
                  </div>
                </div>
              </div>
            </div>
          }
        </div>

        <!-- Controlli di navigazione -->
        <div class="swiper-controls">
          <div class="swiper-button-prev custom-nav-btn"></div>
          <div class="swiper-pagination"></div>
          <div class="swiper-button-next custom-nav-btn"></div>
        </div>
      </div>
    }

    <!-- Banner Recensioni Google con Dati Live e CTA -->
    <div class="google-reviews-banner card">
      <div class="google-badge-left">
        <div class="google-icon-wrapper">
          <svg viewBox="0 0 24 24" width="28" height="28">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
          </svg>
        </div>
        <div class="google-text">
          <div class="google-score">
            <strong>{{summary.rating | number:'1.1-1'}}</strong>
            <div class="stars">
              @for (star of [1,2,3,4,5]; track star) {
                <svg lucideStar [size]="16" class="star-icon" fill="currentColor"></svg>
              }
            </div>
            <span>({{summary.totalReviews}} recensioni su Google Maps)</span>
          </div>
          <p class="google-sub">Recensioni verificate lasciate spontaneamente dai pazienti e dalle famiglie seguite.</p>
        </div>
      </div>

      <div class="google-cta">
        <a [href]="summary.writeReviewUrl || summary.placeUrl" target="_blank" rel="noopener noreferrer" class="google-review-btn">
          <span>Lascia una recensione su Google</span>
          <svg lucideExternalLink [size]="16"></svg>
        </a>
      </div>
    </div>
  </section>
  `,
  styles: [`
    .testimonials-container {
      max-width: 1100px;
      margin: 0 auto 50px;
      padding: 0 16px;
    }

    .testimonials-header {
      text-align: center;
      margin-bottom: 36px;

      .subtitle-badge {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        background: rgba(15, 76, 92, 0.1);
        color: var(--primary);
        padding: 6px 16px;
        border-radius: 999px;
        font-size: 0.85rem;
        font-weight: 600;
        margin-bottom: 12px;

        .badge-icon {
          color: var(--accent, #e76f51);
        }
      }

      h1 {
        font-size: clamp(2rem, 4vw, 2.75rem);
        color: var(--ink);
        margin: 0 0 12px;
      }

      p {
        color: var(--muted);
        font-size: 1.1rem;
        max-width: 650px;
        margin: 0 auto;
        line-height: 1.6;
      }
    }

    .testimonials-swiper {
      padding: 16px 8px 56px !important;
    }

    .testimonial-card {
      height: 100%;
      min-height: 280px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 28px;
      background: #ffffff;
      border-radius: 24px;
      border: 1px solid rgba(15, 76, 92, 0.08);
      box-shadow: 0 12px 32px rgba(15, 76, 92, 0.06);
      transition: transform 0.3s ease, box-shadow 0.3s ease;

      &:hover {
        transform: translateY(-4px);
        box-shadow: 0 16px 40px rgba(15, 76, 92, 0.1);
      }
    }

    .card-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 18px;
    }

    .stars {
      display: flex;
      gap: 3px;
      color: #ffb703;
    }

    .tag-chip {
      background: rgba(15, 76, 92, 0.08);
      color: var(--primary);
      padding: 4px 12px;
      border-radius: 999px;
      font-size: 0.75rem;
      font-weight: 600;
      letter-spacing: 0.02em;
    }

    .google-chip {
      background: rgba(66, 133, 244, 0.1);
      color: #1a73e8;
      padding: 4px 12px;
      border-radius: 999px;
      font-size: 0.75rem;
      font-weight: 600;
      letter-spacing: 0.02em;
    }

    .quote-wrapper {
      position: relative;
      margin-bottom: 24px;
      flex-grow: 1;

      .quote-icon {
        color: rgba(15, 76, 92, 0.12);
        position: absolute;
        top: -8px;
        left: -4px;
      }

      .quote-text {
        position: relative;
        z-index: 1;
        font-size: 1.05rem;
        line-height: 1.7;
        color: var(--ink);
        font-style: italic;
        margin: 0;
        padding-left: 12px;
      }
    }

    .author-info {
      display: flex;
      align-items: center;
      gap: 14px;
      border-top: 1px solid rgba(0, 0, 0, 0.05);
      padding-top: 16px;
    }

    .author-avatar {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: var(--primary-gradient);
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 1.1rem;
      box-shadow: 0 4px 10px rgba(15, 76, 92, 0.2);
      overflow: hidden;
      flex-shrink: 0;

      .google-avatar-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .author-details {
      display: flex;
      flex-direction: column;

      .author-name-row {
        display: flex;
        align-items: center;
        gap: 6px;
        flex-wrap: wrap;
      }

      .author-name {
        font-size: 1rem;
        color: var(--ink);
      }

      .author-role {
        font-size: 0.85rem;
        color: var(--muted);
      }

      .review-date {
        font-size: 0.75rem;
        color: rgba(0, 0, 0, 0.35);
      }
    }

    .google-verified-badge {
      display: inline-flex;
      align-items: center;
      gap: 3px;
      background: rgba(66, 133, 244, 0.1);
      color: #1a73e8;
      font-size: 0.72rem;
      font-weight: 700;
      padding: 2px 7px;
      border-radius: 999px;
      letter-spacing: 0.02em;

      svg path {
        fill: #1a73e8;
      }
    }

    .swiper-controls {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 20px;
      margin-top: 24px;
      position: relative;

      .swiper-pagination {
        position: static !important;
        width: auto !important;
      }

      .custom-nav-btn {
        position: static !important;
        margin: 0 !important;
        width: 38px !important;
        height: 38px !important;
        border-radius: 50%;
        background: #fff;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        color: var(--primary) !important;

        &::after {
          font-size: 14px !important;
          font-weight: 700;
        }

        &:hover {
          background: var(--primary);
          color: #fff !important;
        }
      }
    }

    .google-reviews-banner {
      margin-top: 40px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 24px;
      padding: 24px 32px;
      background: var(--card-bg);
      border-radius: 20px;
      border: 1px solid var(--card-border);
      flex-wrap: wrap;

      .google-badge-left {
        display: flex;
        align-items: center;
        gap: 16px;
      }

      .google-icon-wrapper {
        width: 48px;
        height: 48px;
        background: #ffffff;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 12px rgba(0,0,0,0.08);
      }

      .google-score {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 1.1rem;

        strong {
          font-size: 1.3rem;
          color: var(--ink);
        }

        .stars {
          display: flex;
          color: #ffb703;
        }

        span {
          color: var(--muted);
          font-weight: 500;
          font-size: 0.95rem;
        }
      }

      .google-sub {
        margin: 4px 0 0;
        font-size: 0.9rem;
        color: var(--muted);
      }

      .google-review-btn {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        background: #4285F4;
        color: #ffffff !important;
        padding: 12px 24px;
        border-radius: 999px;
        font-weight: 600;
        text-decoration: none;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
        box-shadow: 0 4px 14px rgba(66, 133, 244, 0.35);

        &:hover {
          background: #3367d6;
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(66, 133, 244, 0.45);
        }
      }
    }

    @media (max-width: 768px) {
      .google-reviews-banner {
        flex-direction: column;
        align-items: flex-start;
        .google-review-btn {
          width: 100%;
          justify-content: center;
        }
      }
    }
  `]
})
export class TestimonialsComponent implements OnInit, AfterViewInit, OnDestroy {
  testimonials: Testimonial[] = [];
  summary: GoogleReviewsSummary = {
    rating: 5.0,
    totalReviews: 4,
    placeUrl: 'https://www.google.com/maps/search/?api=1&query=Logopedista+Eleonora+Mariotti',
    writeReviewUrl: 'https://www.google.com/maps/search/?api=1&query=Logopedista+Eleonora+Mariotti'
  };

  /**
   * INCOLLA QUI L'ID DEL WIDGET ELFSIGHT (Opzione facoltativa se si preferisce Elfsight):
   * Se vuoto '', il sito usa in automatico le recensioni live integrate con la grafica nativa.
   */
  elfsightWidgetId: string = '';

  private swiperInstance?: Swiper;

  constructor(private svc: TestimonialsService) {}

  ngOnInit(): void {
    this.testimonials = this.svc.list();
    this.svc.getReviews().subscribe(res => {
      if (res && res.reviews) {
        this.testimonials = res.reviews;
        this.summary = res.summary;
        setTimeout(() => this.initSwiper(), 150);
      }
    });
  }

  ngAfterViewInit(): void {
    if (this.elfsightWidgetId) {
      this.loadElfsightScript();
    } else {
      setTimeout(() => this.initSwiper(), 200);
    }
  }

  ngOnDestroy(): void {
    if (this.swiperInstance) {
      this.swiperInstance.destroy(true, true);
    }
  }

  private loadElfsightScript(): void {
    if (!document.getElementById('elfsight-platform-script')) {
      const script = document.createElement('script');
      script.id = 'elfsight-platform-script';
      script.src = 'https://static.elfsight.com/platform/platform.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }

  private initSwiper(): void {
    try {
      if (this.swiperInstance) {
        this.swiperInstance.destroy(true, true);
      }

      this.swiperInstance = new Swiper('.testimonials-swiper', {
        slidesPerView: 1,
        spaceBetween: 24,
        loop: this.testimonials.length > 2,
        autoplay: {
          delay: 5000,
          pauseOnMouseEnter: true,
          disableOnInteraction: false,
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        breakpoints: {
          768: {
            slidesPerView: 2,
            spaceBetween: 28,
          }
        }
      });
    } catch (e) {
      console.warn('Swiper initialization skipped or already active:', e);
    }
  }
}
