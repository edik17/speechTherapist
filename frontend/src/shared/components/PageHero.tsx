import React from 'react';
import './PageHero.scss';

interface PageHeroProps {
  badge?: string;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

export function PageHero({ badge, title, subtitle, children }: PageHeroProps) {
  return (
    <div className="page-hero-wrapper">
      <section className="page-hero">
        <div className="hero-inner">
          {badge && <span className="hero-badge">{badge}</span>}
          <h1 className="hero-title">{title}</h1>
          {subtitle && <p className="hero-subtitle">{subtitle}</p>}
          {children && <div className="hero-slot">{children}</div>}
        </div>
      </section>
    </div>
  );
}
