import React, { useState } from 'react';

interface MatAccordionContextType {
  openIndex: number | null;
  toggleIndex: (index: number) => void;
  multi?: boolean;
}

const MatAccordionContext = React.createContext<MatAccordionContextType | null>(null);

export function MatAccordion({
  children,
  className = '',
  multi = false,
}: {
  children: React.ReactNode;
  className?: string;
  multi?: boolean;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <MatAccordionContext.Provider value={{ openIndex, toggleIndex, multi }}>
      <div className={`mat-accordion ${className}`}>{children}</div>
    </MatAccordionContext.Provider>
  );
}

interface MatExpansionPanelProps {
  children: React.ReactNode;
  className?: string;
  index?: number;
  expanded?: boolean;
  onToggle?: () => void;
}

export function MatExpansionPanel({
  children,
  className = '',
  index = 0,
  expanded: controlledExpanded,
  onToggle,
}: MatExpansionPanelProps) {
  const ctx = React.useContext(MatAccordionContext);
  const [internalExpanded, setInternalExpanded] = useState(false);

  const isExpanded = controlledExpanded !== undefined
    ? controlledExpanded
    : ctx
    ? ctx.openIndex === index
    : internalExpanded;

  const handleToggle = () => {
    if (onToggle) {
      onToggle();
    } else if (ctx) {
      ctx.toggleIndex(index);
    } else {
      setInternalExpanded(!internalExpanded);
    }
  };

  // Separiamo header e content
  let header: React.ReactNode = null;
  const content: React.ReactNode[] = [];

  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child) && child.type === MatExpansionPanelHeader) {
      header = React.cloneElement(child as React.ReactElement<any>, {
        isExpanded,
        onClick: handleToggle,
      });
    } else {
      content.push(child);
    }
  });

  return (
    <div className={`mat-expansion-panel ${isExpanded ? 'mat-expanded' : ''} ${className}`}>
      {header}
      {isExpanded && (
        <div className="mat-expansion-panel-content">
          <div className="mat-expansion-panel-body">{content}</div>
        </div>
      )}
    </div>
  );
}

export function MatExpansionPanelHeader({
  children,
  className = '',
  isExpanded = false,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  isExpanded?: boolean;
  onClick?: () => void;
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      aria-expanded={isExpanded}
      className={`mat-expansion-panel-header ${className}`}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
      style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}
    >
      <div style={{ flex: 1 }}>{children}</div>
      <span className="mat-expansion-indicator" aria-hidden="true" style={{ marginLeft: 16 }}>
        <svg
          viewBox="0 0 24 24"
          width="20"
          height="20"
          style={{
            transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.25s ease',
          }}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </span>
    </div>
  );
}

export function MatPanelTitle({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`mat-panel-title ${className}`}>{children}</div>;
}
