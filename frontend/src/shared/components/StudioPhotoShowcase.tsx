import React from 'react';
import { FadeUp } from '../directives/FadeUp';
import './StudioPhotoShowcase.scss';

export interface StudioPhotoItem {
  src: string;
  alt: string;
  title: string;
  description: string;
}

export interface StudioPhotoShowcaseProps {
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
  title,
  description,
  photos,
  className = '',
}: StudioPhotoShowcaseProps) {
  return (
    <FadeUp as="section" className={`studio-photo-showcase card ${className}`.trim()}>
      <div className="showcase-header">
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
