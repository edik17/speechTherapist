import React, { useState, useEffect, useRef } from 'react';
import {
  Leaf,
  Snowflake,
  Flower2,
  Sparkles,
  EyeOff,
  Check,
  LucideIcon,
} from 'lucide-react';
import { SeasonType } from './SeasonalOverlay';
import './SeasonalControl.scss';

interface SeasonOption {
  value: SeasonType;
  label: string;
  description: string;
  icon: LucideIcon;
}

const SEASON_OPTIONS: SeasonOption[] = [
  {
    value: 'autumn',
    label: 'Autunno',
    description: 'Foglie che cadono',
    icon: Leaf,
  },
  {
    value: 'winter',
    label: 'Inverno',
    description: 'Neve e cristalli',
    icon: Snowflake,
  },
  {
    value: 'spring',
    label: 'Primavera',
    description: 'Petali nella brezza',
    icon: Flower2,
  },
  {
    value: 'summer',
    label: 'Estate',
    description: 'Luci dorate',
    icon: Sparkles,
  },
  {
    value: 'off',
    label: 'Disattivato',
    description: 'Nessun effetto',
    icon: EyeOff,
  },
];

export interface SeasonalControlProps {
  season: SeasonType;
  onChange: (season: SeasonType) => void;
  className?: string;
}

/**
 * Controllo stagionale Liquid Glass ad-hoc con popover interattivo
 * per visualizzare o cambiare l'effetto atmosferico full-screen.
 */
export function SeasonalControl({
  season,
  onChange,
  className = '',
}: SeasonalControlProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const activeOption =
    SEASON_OPTIONS.find((opt) => opt.value === season) ?? SEASON_OPTIONS[0];
  const ActiveIcon = season === 'off' ? Sparkles : activeOption.icon;

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const handleSelect = (nextSeason: SeasonType) => {
    onChange(nextSeason);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className={`seasonal-control ${className}`.trim()}>
      <button
        type="button"
        className={`season-trigger-btn season-${season} ${isOpen ? 'is-open' : ''}`}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label={`Atmosfera stagionale: ${activeOption.label}`}
        title={`Atmosfera stagionale: ${activeOption.label}`}
      >
        <ActiveIcon size={18} className="season-icon" />
      </button>

      {isOpen && (
        <div
          className="season-popover"
          role="menu"
          aria-label="Seleziona effetto stagionale"
        >
          <div className="popover-header">
            <span className="popover-title">Atmosfera Stagionale</span>
            <span className="popover-subtitle">Disattivata di default · Scegli un tema</span>
          </div>

          <div className="popover-options">
            {SEASON_OPTIONS.map((opt) => {
              const OptionIcon = opt.icon;
              const isSelected = opt.value === season;
              return (
                <button
                  key={opt.value}
                  type="button"
                  role="menuitemradio"
                  aria-checked={isSelected}
                  className={`season-option-btn season-${opt.value} ${
                    isSelected ? 'is-active' : ''
                  }`}
                  onClick={() => handleSelect(opt.value)}
                >
                  <span className="option-icon-wrap" aria-hidden="true">
                    <OptionIcon size={16} />
                  </span>
                  <span className="option-text">
                    <strong>{opt.label}</strong>
                    <small>{opt.description}</small>
                  </span>
                  {isSelected && <Check size={14} className="option-check" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
