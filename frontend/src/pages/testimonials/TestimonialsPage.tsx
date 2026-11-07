import React, { useState, useEffect, useRef } from 'react';
import Swiper from 'swiper/bundle';
import { Star, Quote, ExternalLink } from 'lucide-react';
import { FadeUp } from '../../shared/directives/FadeUp';
import { testimonialsService } from '../../core/services/testimonials.service';
import { Testimonial, GoogleReviewsSummary } from '../../core/models/testimonial.model';
import './TestimonialsPage.scss';

export function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(testimonialsService.list());
  const [summary, setSummary] = useState<GoogleReviewsSummary>(testimonialsService.getSummary());
  const swiperRef = useRef<HTMLDivElement>(null);
  const swiperInstanceRef = useRef<Swiper | null>(null);

  useEffect(() => {
    testimonialsService.getReviews().then((res) => {
      if (res && res.reviews) {
        setTestimonials(res.reviews);
        setSummary(res.summary);
      }
    });
  }, []);

  useEffect(() => {
    if (!swiperRef.current) return;

    if (swiperInstanceRef.current) {
      swiperInstanceRef.current.destroy(true, true);
    }

    try {
      swiperInstanceRef.current = new Swiper(swiperRef.current, {
        slidesPerView: 1,
        spaceBetween: 24,
        loop: testimonials.length > 2,
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
          },
        },
      });
    } catch (e) {
      console.warn('Swiper init warning:', e);
    }

    return () => {
      if (swiperInstanceRef.current) {
        swiperInstanceRef.current.destroy(true, true);
        swiperInstanceRef.current = null;
      }
    };
  }, [testimonials]);

  return (
    <FadeUp as="section" className="testimonials-container">
      <div className="testimonials-header">
        <h1>Cosa dicono di me</h1>
        <p>
          La soddisfazione e i progressi di bambini, genitori e adulti che hanno intrapreso un percorso di crescita comunicativa insieme a me.
        </p>
      </div>

      {/* Swiper Carousel Recensioni Reali da Google */}
      <div ref={swiperRef} className="swiper testimonials-swiper">
        <div className="swiper-wrapper">
          {testimonials.map((t) => (
            <div key={t.author + t.text} className="swiper-slide">
              <div className="testimonial-card card">
                <div className="card-top">
                  <div className="stars" aria-label="5 stelle su 5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} size={18} className="star-icon" fill="currentColor" />
                    ))}
                  </div>
                  {t.tag ? (
                    <span className="tag-chip">{t.tag}</span>
                  ) : t.isGoogleVerified ? (
                    <span className="google-chip">Recensione Google</span>
                  ) : null}
                </div>

                <div className="quote-wrapper">
                  <Quote size={28} className="quote-icon" />
                  <p className="quote-text">“{t.text}”</p>
                </div>

                <div className="author-info">
                  <div className={`author-avatar ${t.authorPhotoUrl ? 'has-photo' : ''}`}>
                    {t.authorPhotoUrl ? (
                      <img src={t.authorPhotoUrl} alt={t.author} className="google-avatar-img" />
                    ) : (
                      <span>{t.author.charAt(0)}</span>
                    )}
                  </div>
                  <div className="author-details">
                    <div className="author-name-row">
                      <strong className="author-name">{t.author}</strong>
                      {t.isGoogleVerified && (
                        <span className="google-verified-badge" title="Recensione verificata su Google">
                          <svg viewBox="0 0 24 24" width="13" height="13">
                            <path fill="#4285F4" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                          </svg>
                          <span>Google</span>
                        </span>
                      )}
                    </div>
                    {t.role && <span className="author-role">{t.role}</span>}
                    {(t.relativeTime || t.date) && (
                      <span className="review-date">{t.relativeTime || t.date}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Controlli di navigazione */}
        <div className="swiper-controls">
          <div className="swiper-button-prev custom-nav-btn" aria-label="Recensione precedente"></div>
          <div className="swiper-pagination"></div>
          <div className="swiper-button-next custom-nav-btn" aria-label="Recensione successiva"></div>
        </div>
      </div>

      {/* Banner Recensioni Google con Dati Live e CTA */}
      <FadeUp className="google-reviews-banner card">
        <div className="google-badge-left">
          <div className="google-icon-wrapper">
            <svg viewBox="0 0 24 24" width="28" height="28">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
          </div>
          <div className="google-text">
            <div className="google-score">
              <strong>{summary.rating.toFixed(1)}</strong>
              <div className="stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={16} className="star-icon" fill="currentColor" />
                ))}
              </div>
              <span>({summary.totalReviews} recensioni verificate su Google)</span>
            </div>
            <p className="google-sub">Recensioni autentiche lasciate spontaneamente dai pazienti e dalle loro famiglie.</p>
          </div>
        </div>

        <div className="google-cta">
          <a
            href={summary.writeReviewUrl || summary.placeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="google-review-btn"
          >
            <span>Lascia una recensione su Google</span>
            <ExternalLink size={16} />
          </a>
        </div>
      </FadeUp>
    </FadeUp>
  );
}
