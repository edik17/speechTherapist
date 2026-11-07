import React, { useState, useEffect } from 'react';

interface SnackBarState {
  message: string;
  action?: string;
  duration?: number;
  open: boolean;
}

let snackBarListener: ((state: SnackBarState) => void) | null = null;

export const matSnackBar = {
  open(message: string, action = 'OK', options?: { duration?: number }) {
    if (snackBarListener) {
      snackBarListener({
        message,
        action,
        duration: options?.duration || 4000,
        open: true,
      });
    }
  },
};

export function MatSnackBarContainer() {
  const [snack, setSnack] = useState<SnackBarState>({
    message: '',
    open: false,
  });

  useEffect(() => {
    snackBarListener = (state) => {
      setSnack(state);
    };
    return () => {
      snackBarListener = null;
    };
  }, []);

  useEffect(() => {
    if (snack.open && snack.duration) {
      const timer = setTimeout(() => {
        setSnack((prev) => ({ ...prev, open: false }));
      }, snack.duration);
      return () => clearTimeout(timer);
    }
  }, [snack.open, snack.duration]);

  if (!snack.open) return null;

  return (
    <div
      className="mat-mdc-snack-bar-container custom-snackbar"
      style={{
        position: 'fixed',
        bottom: 24,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 9999,
        background: '#1B3B36',
        color: '#FAF7F2',
        padding: '12px 24px',
        borderRadius: 12,
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)',
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        fontSize: '0.95rem',
        maxWidth: '90vw',
        animation: 'fadeInUp 0.3s ease',
      }}
    >
      <span>{snack.message}</span>
      {snack.action && (
        <button
          type="button"
          onClick={() => setSnack((prev) => ({ ...prev, open: false }))}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--accent-primary)',
            fontWeight: 700,
            cursor: 'pointer',
            padding: '4px 8px',
            fontSize: '0.9rem',
          }}
        >
          {snack.action}
        </button>
      )}
    </div>
  );
}
