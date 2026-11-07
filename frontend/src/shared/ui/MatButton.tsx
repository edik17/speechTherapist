import React from 'react';
import { Link } from 'react-router-dom';

export interface MatButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'raised' | 'stroked' | 'flat' | 'basic' | 'icon';
  color?: 'primary' | 'accent' | 'warn';
  to?: string;
  href?: string;
  target?: string;
  rel?: string;
  children: React.ReactNode;
}

export const MatButton = React.forwardRef<any, MatButtonProps>(({
  variant = 'basic',
  color = 'primary',
  to,
  href,
  className = '',
  children,
  ...props
}, ref) => {
  const variantClass = variant === 'raised'
    ? 'mat-mdc-raised-button'
    : variant === 'stroked'
    ? 'mat-mdc-outlined-button'
    : variant === 'flat'
    ? 'mat-mdc-unelevated-button'
    : 'mat-mdc-button';

  const colorClass = color ? `mat-${color}` : '';
  const fullClassName = `mat-mdc-button-base ${variantClass} ${colorClass} ${className}`.trim();

  const content = <span className="mdc-button__label">{children}</span>;

  if (to) {
    return (
      <Link to={to} className={fullClassName} ref={ref} {...(props as any)}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={fullClassName} ref={ref} {...(props as any)}>
        {content}
      </a>
    );
  }

  return (
    <button type={props.type || 'button'} className={fullClassName} ref={ref} {...props}>
      {content}
    </button>
  );
});

MatButton.displayName = 'MatButton';
