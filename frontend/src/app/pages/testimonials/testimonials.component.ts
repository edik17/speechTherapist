import { Component, AfterViewInit } from '@angular/core';
import { TestimonialsService } from '../../core/services/testimonials.service';
import Swiper from 'swiper/bundle';
import { LucideStar, LucideHeart, LucideQuote } from '@lucide/angular';

@Component({
  selector: 'app-testimonials',
  imports: [LucideStar, LucideHeart, LucideQuote],
  template: `
  <section class="testimonials-container">
    <div class="testimonials-header">
      <div class="subtitle-badge">
        <svg lucideHeart [size]="16" class="badge-icon"></svg>
        <span>Feedback & Esperienze</span>
      </div>
      <h1>Dicono del Mio Studio</h1>
      <p>La soddisfazione e i progressi di bambini, genitori e adulti che hanno intrapreso un percorso di crescita comunicativa insieme a me.</p>
    </div>

    <!-- Swiper Carousel -->
    <div class="swiper testimonials-swiper">
      <div class="swiper-wrapper">
        @for (t of testimonials; track t.author) {
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
                }
              </div>

              <div class="quote-wrapper">
                <svg lucideQuote [size]="28" class="quote-icon"></svg>
                <p class="quote-text">“{{t.text}}”</p>
              </div>

              <div class="author-info">
                <div class="author-avatar">{{t.author.charAt(0)}}</div>
                <div class="author-details">
                  <strong class="author-name">{{t.author}}</strong>
                  @if (t.role) {
                    <span class="author-role">{{t.role}}</span>
                  }
                  @if (t.date) {
                    <span class="review-date">{{t.date}}</span>
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
    }

    .author-details {
      display: flex;
      flex-direction: column;

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
  `]
})
export class TestimonialsComponent implements AfterViewInit {
  testimonials = this.svc.list();

  constructor(private svc: TestimonialsService) {}

  ngAfterViewInit(): void {
    new Swiper('.testimonials-swiper', {
      slidesPerView: 1,
      spaceBetween: 24,
      loop: true,
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
  }
}
