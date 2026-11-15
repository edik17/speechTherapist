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
  const isPrimary = variant === 'raised' || variant === 'flat';
  const tsClass = isPrimary ? 'ts-btn ts-btn--primary' : 'ts-btn ts-btn--secondary';
  const fullClassName = `${tsClass} ${className}`.trim();

  if (to) {
    return (
      <Link to={to} className={fullClassName} ref={ref} {...(props as any)}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={fullClassName} ref={ref} {...(props as any)}>
        {children}
      </a>
    );
  }

  return (
    <button type={props.type || 'button'} className={fullClassName} ref={ref} {...props}>
      {children}
    </button>
  );
});

MatButton.displayName = 'MatButton';
