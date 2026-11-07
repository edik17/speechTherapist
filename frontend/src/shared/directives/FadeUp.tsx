import React, { useEffect, useRef } from 'react';

export function useFadeUp<T extends HTMLElement = HTMLDivElement>(fadeDelay: number = 0) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
      return;
    }

    el.classList.add('fade-up-init');
    if (fadeDelay > 0) {
      el.style.transitionDelay = `${fadeDelay}ms`;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add('fade-up-active');
            observer.unobserve(el);
          }
        });
      },
      {
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.1,
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [fadeDelay]);

  return ref;
}

interface FadeUpProps extends React.HTMLAttributes<HTMLDivElement> {
  fadeDelay?: number;
  children: React.ReactNode;
  as?: React.ElementType;
}

export function FadeUp({
  fadeDelay = 0,
  children,
  className = '',
  as: Component = 'div',
  ...rest
}: FadeUpProps) {
  const ref = useFadeUp<HTMLDivElement>(fadeDelay);

  return (
    <Component ref={ref} className={className} {...rest}>
      {children}
    </Component>
  );
}
