import React from 'react';
import { FadeUp } from '../directives/FadeUp';
import './StudioPhotoShowcase.scss';

export interface StudioPhotoItem {
  src: string;
  alt: string;
  tag: string;
  title: string;
  description: string;
}

export interface StudioPhotoShowcaseProps {
  badge: string;
  title: string;
  description: string;
  photos: StudioPhotoItem[];
  className?: string;
}

/**
 * Galleria fotografica editoriale in stile Liquid Glass per presentare
 * momenti di attività clinica e ricerca applicata in studio.
 */
export function StudioPhotoShowcase({
  badge,
  title,
  description,
  photos,
  className = '',
}: StudioPhotoShowcaseProps) {
  return (
    <FadeUp as="section" className={`studio-photo-showcase card ${className}`.trim()}>
      <div className="showcase-header">
        <span className="showcase-badge">{badge}</span>
        <h2>{title}</h2>
        <p className="showcase-desc">{description}</p>
      </div>

      <div className="showcase-grid">
        {photos.map((photo) => (
          <div key={photo.src} className="showcase-card">
            <div className="showcase-img-wrap">
              <img
                src={photo.src}
                alt={photo.alt}
                className="showcase-photo"
                loading="lazy"
              />
              <span className="showcase-tag">{photo.tag}</span>
            </div>
            <div className="showcase-card-body">
              <h3>{photo.title}</h3>
              <p>{photo.description}</p>
            </div>
          </div>
        ))}
      </div>
    </FadeUp>
  );
}
