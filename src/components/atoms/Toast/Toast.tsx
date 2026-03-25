import { useEffect, useState } from 'react';

export interface ToastProps {
  message: string;
  variant?: 'info' | 'success' | 'warning' | 'error';
  duration?: number;
  onClose?: () => void;
  className?: string;
}

export function Toast({ message, variant = 'info', duration = 4000, onClose, className }: ToastProps) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (duration <= 0) return;
    const t = setTimeout(() => setExiting(true), duration);
    return () => clearTimeout(t);
  }, [duration]);

  useEffect(() => {
    if (exiting) {
      const t = setTimeout(() => onClose?.(), 300);
      return () => clearTimeout(t);
    }
  }, [exiting, onClose]);

  const cls = [
    'toast',
    `toast--${variant}`,
    exiting && 'toast--exit',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={cls} role="status" aria-live="polite">
      <span className="toast__message">{message}</span>
      <button type="button" className="toast__close" onClick={() => setExiting(true)} aria-label="Close">×</button>
    </div>
  );
}
