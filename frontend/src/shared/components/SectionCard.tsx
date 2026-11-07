import React from 'react';

export function SectionCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <section className={`card ${className}`}>{children}</section>;
}
