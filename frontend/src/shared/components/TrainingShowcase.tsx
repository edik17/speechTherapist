import React, { useMemo, useState } from 'react';
import {
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  FileText,
} from 'lucide-react';
import './TrainingShowcase.scss';

export type TrainingGroup = 'ecm' | 'specialist';
export type TrainingCategory = 'fonologia' | 'miofunzionale' | 'fluenza' | 'voce-evolutiva';
export type TrainingFilterValue = 'all' | TrainingCategory;

export interface TrainingCourseItem {
  id: string;
  title: string;
  docente: string;
  date?: string;
  group: TrainingGroup;
  category: TrainingCategory;
  categoryLabel: string;
  focus: string;
}

export interface TrainingShowcaseProps {
  courses: TrainingCourseItem[];
  cvUrl?: string;
}

interface FilterOption {
  value: TrainingFilterValue;
  label: string;
}

const FILTER_OPTIONS: FilterOption[] = [
  { value: 'all', label: 'Tutti i corsi' },
  { value: 'fonologia', label: 'Fonologia & Metodo ARM' },
  { value: 'miofunzionale', label: 'Motricità Orofacciale' },
  { value: 'fluenza', label: 'Balbuzie & Fluenza' },
  { value: 'voce-evolutiva', label: 'Voce & Età Evolutiva' },
];

/**
 * Sezione ad-hoc Liquid Glass dedicata ai corsi di formazione, seminari e
 * convegni clinici svolti, con filtri interattivi per area specialistica.
 */
export function TrainingShowcase({ courses, cvUrl }: TrainingShowcaseProps) {
  const [selectedFilter, setSelectedFilter] = useState<TrainingFilterValue>('all');

  const categoryCounts = useMemo(() => {
    const counts: Record<TrainingFilterValue, number> = {
      all: courses.length,
      fonologia: 0,
      miofunzionale: 0,
      fluenza: 0,
      'voce-evolutiva': 0,
    };
    courses.forEach((course) => {
      counts[course.category] += 1;
    });
    return counts;
  }, [courses]);

  const filteredCourses = useMemo(() => {
    if (selectedFilter === 'all') return courses;
    return courses.filter((course) => course.category === selectedFilter);
  }, [courses, selectedFilter]);

  return (
    <section
      className="training-showcase-section editorial-section"
      aria-labelledby="training-showcase-heading"
    >
      <div className="section-intro">
        <h2 id="training-showcase-heading">
          Corsi di Formazione, Seminari &amp; Aggiornamento Continuo
        </h2>

        <p className="section-intro-sub">
          Seminari ECM, convegni specialistici e corsi di perfezionamento clinico per
          offrire protocolli aggiornati ed efficaci in età evolutiva e adulta.
        </p>

        {cvUrl && (
          <div className="training-cv-inline">
            <a
              href={cvUrl}
              target="_blank"
              rel="noopener"
              className="training-cv-link"
              title="Apri il Curriculum Vitae completo in formato PDF"
            >
              <FileText size={16} />
              <span>Consulta anche il CV Ufficiale (PDF)</span>
            </a>
          </div>
        )}
      </div>

      {/* Barra filtri Liquid Glass per area clinica */}
      <div
        className="training-filter-bar"
        role="tablist"
        aria-label="Filtra i corsi per area clinica"
      >
        {FILTER_OPTIONS.map((opt) => {
          const isActive = selectedFilter === opt.value;
          const count = categoryCounts[opt.value];
          return (
            <button
              key={opt.value}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`training-filter-pill ${isActive ? 'is-active' : ''}`}
              onClick={() => setSelectedFilter(opt.value)}
            >
              <span>
                {opt.value === 'all' ? `${opt.label} (${count})` : opt.label}
              </span>
              {opt.value !== 'all' && <span className="pill-count">{count}</span>}
            </button>
          );
        })}
      </div>

      {/* Griglia corsi */}
      <div className="training-showcase-grid">
        {filteredCourses.map((course) => (
          <article
            key={course.id}
            className={`training-showcase-card category-${course.category}`}
          >
            <div className="card-top-meta">
              <span
                className={`date-badge ${course.date ? 'has-date' : 'is-specialist'}`}
              >
                {course.date ? (
                  <>
                    <Calendar size={13} />
                    <span>{course.date}</span>
                  </>
                ) : (
                  <>
                    <Award size={13} />
                    <span>Perfezionamento Clinico</span>
                  </>
                )}
              </span>

              <span className="category-chip">
                {course.group === 'ecm' ? (
                  <CheckCircle2 size={13} />
                ) : (
                  <BookOpen size={13} />
                )}
                <span>{course.categoryLabel}</span>
              </span>
            </div>

            <h3 className="course-title">{course.title}</h3>
            <span className="course-docente">Docente / Ente: {course.docente}</span>
            <p className="course-focus">{course.focus}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
