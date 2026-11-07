import React from 'react';

interface MatCheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  children?: React.ReactNode;
}

export const MatCheckbox = React.forwardRef<HTMLInputElement, MatCheckboxProps>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <label
        className={`mat-mdc-checkbox ${className}`}
        style={{
          display: 'inline-flex',
          alignItems: 'flex-start',
          gap: 10,
          cursor: 'pointer',
          userSelect: 'none',
        }}
      >
        <input
          ref={ref}
          type="checkbox"
          style={{
            marginTop: 3,
            accentColor: 'var(--accent-primary)',
            width: 18,
            height: 18,
            cursor: 'pointer',
          }}
          {...props}
        />
        <div style={{ flex: 1 }}>{children}</div>
      </label>
    );
  }
);
MatCheckbox.displayName = 'MatCheckbox';
