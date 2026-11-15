import React from 'react';

/** Freccia direzionale Taste Skill (.m-arrow) che trasla di 3px all'hover del pulsante */
export function ArrowIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      className={`m-arrow ${className}`.trim()}
      viewBox="0 0 12 12"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M1 6h8.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M6 2.5 9.5 6 6 9.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Marchio geometrico "arc" estratto dal deal system per header e footer */
export function ArcMark({ className = '' }: { className?: string }) {
  return (
    <svg
      className={`ts-mark ${className}`.trim()}
      viewBox="0 0 24 24"
      width="22"
      height="22"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M4 16.5a8 8 0 0 1 16 0"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="12" cy="16.5" r="2.2" fill="var(--p-accent)" />
    </svg>
  );
}
