import { Component, Input, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { createTimeline } from 'animejs';

@Component({
  selector: 'app-page-hero',
  standalone: true,
  template: `
  <section class="hero card" #heroSection>
    <div class="hero-content" #heroContent>
      <h1 class="hero-title">{{title}}</h1>
      <p class="hero-subtitle">{{subtitle}}</p>
      <div class="hero-slot">
        <ng-content/>
      </div>
    </div>
  </section>
  `,
  styles: [`
    .hero {
      position: relative;
      text-align: center;
      padding: clamp(40px, 6vw, 80px) 24px;
      background: var(--primary-gradient);
      color: white;
      border-radius: 0 0 32px 32px;
      margin: -clamp(16px, 2vw, 32px) -clamp(16px, 2vw, 32px) 40px -clamp(16px, 2vw, 32px);
      box-shadow: 0 20px 40px rgba(15, 76, 92, 0.15);
      border: none;
      overflow: hidden;
    }
    
    .hero::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 60%);
      animation: rotate 20s linear infinite;
      pointer-events: none;
    }

    @keyframes rotate {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    .hero-content {
      position: relative;
      z-index: 1;
      max-width: 800px;
      margin: 0 auto;
    }

    .hero-title { 
      margin: 0 0 16px; 
      font-size: clamp(2rem, 5vw, 3.5rem);
      line-height: 1.1;
      color: #ffffff !important;
      text-shadow: 0 2px 12px rgba(0,0,0,0.3);
    }
    
    .hero-subtitle { 
      margin: 0 auto 32px; 
      font-size: clamp(1rem, 2vw, 1.25rem);
      color: #ffffff !important;
      line-height: 1.6;
      opacity: 0.95;
    }

    .hero-slot {
      opacity: 0;
    }
  `]
})
export class PageHeroComponent implements AfterViewInit {
  @Input() title = '';
  @Input() subtitle = '';

  @ViewChild('heroContent') heroContent!: ElementRef;

  ngAfterViewInit() {
    const el = this.heroContent.nativeElement;
    
    createTimeline()
    .add(el.querySelector('.hero-title'), {
      translateY: [30, 0],
      opacity: [0, 1],
      duration: 1000,
      delay: 200,
      ease: 'easeOutExpo'
    })
    .add(el.querySelector('.hero-subtitle'), {
      translateY: [20, 0],
      opacity: [0, 1],
      duration: 800
    }, '-=600')
    .add(el.querySelector('.hero-slot'), {
      translateY: [20, 0],
      opacity: [0, 1],
      duration: 800
    }, '-=600');
  }
}
