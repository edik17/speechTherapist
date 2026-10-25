import { Directive, ElementRef, OnInit, OnDestroy, Input } from '@angular/core';

@Directive({
  selector: '[appFadeUp]',
  standalone: true
})
export class FadeUpDirective implements OnInit, OnDestroy {
  @Input() fadeDelay: number = 0;
  private observer?: IntersectionObserver;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const nativeEl = this.el.nativeElement;

    if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
      return;
    }

    nativeEl.classList.add('fade-up-init');
    if (this.fadeDelay > 0) {
      nativeEl.style.transitionDelay = `${this.fadeDelay}ms`;
    }

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          nativeEl.classList.add('fade-up-active');
          this.observer?.unobserve(nativeEl);
        }
      });
    }, {
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.1
    });

    this.observer.observe(nativeEl);
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
