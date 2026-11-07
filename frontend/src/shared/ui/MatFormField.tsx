import React, { useState } from 'react';

interface MatFormFieldProps {
  label: string;
  error?: string | null;
  className?: string;
  children: React.ReactNode;
}

export function MatFormField({
  label,
  error,
  className = '',
  children,
}: MatFormFieldProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      className={`mat-mdc-form-field mat-form-field-appearance-outline ${
        isFocused ? 'mat-focused' : ''
      } ${error ? 'mat-form-field-invalid' : ''} ${className}`}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      style={{ display: 'flex', flexDirection: 'column', width: '100%', marginBottom: 16 }}
    >
      <label
        className="mat-mdc-floating-label"
        style={{
          fontSize: '0.88rem',
          fontWeight: 600,
          color: isFocused ? 'var(--accent-secondary)' : 'var(--text-secondary)',
          marginBottom: 6,
          transition: 'color 0.2s ease',
        }}
      >
        {label}
      </label>

      <div
        className="mat-mdc-text-field-wrapper"
        style={{
          position: 'relative',
          borderRadius: 14,
          border: `1.5px solid ${
            error
              ? '#D32F2F'
              : isFocused
              ? 'var(--accent-secondary)'
              : 'var(--border-subtle)'
          }`,
          background: 'var(--bg-elevated)',
          padding: '10px 14px',
          boxShadow: isFocused ? '0 0 0 3px rgba(124, 157, 142, 0.25)' : 'none',
          transition: 'all 0.2s ease',
        }}
      >
        {children}
      </div>

      {error && (
        <span
          className="mat-error"
          role="alert"
          style={{
            color: '#D32F2F',
            fontSize: '0.8rem',
            marginTop: 4,
            fontWeight: 500,
          }}
        >
          {error}
        </span>
      )}
    </div>
  );
}

export const MatInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className = '', style, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={`mat-mdc-input-element ${className}`}
      style={{
        width: '100%',
        border: 'none',
        outline: 'none',
        background: 'transparent',
        color: 'var(--text-primary)',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: '0.98rem',
        ...style,
      }}
      {...props}
    />
  );
});
MatInput.displayName = 'MatInput';

export const MatTextarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className = '', style, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={`mat-mdc-input-element ${className}`}
      style={{
        width: '100%',
        border: 'none',
        outline: 'none',
        background: 'transparent',
        color: 'var(--text-primary)',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: '0.98rem',
        resize: 'vertical',
        ...style,
      }}
      {...props}
    />
  );
});
MatTextarea.displayName = 'MatTextarea';

export const MatSelect = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(({ className = '', style, children, ...props }, ref) => {
  return (
    <select
      ref={ref}
      className={`mat-mdc-select ${className}`}
      style={{
        width: '100%',
        border: 'none',
        outline: 'none',
        background: 'transparent',
        color: 'var(--text-primary)',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        fontSize: '0.98rem',
        cursor: 'pointer',
        ...style,
      }}
      {...props}
    >
      {children}
    </select>
  );
});
MatSelect.displayName = 'MatSelect';
