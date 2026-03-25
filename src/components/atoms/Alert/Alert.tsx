import { useState } from 'react';

export interface AlertProps {
  children: React.ReactNode;
  variant?: 'info' | 'success' | 'warning' | 'danger';
  title?: string;
  icon?: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
}

export function Alert({
  children,
  variant = 'info',
  title,
  icon,
  dismissible = false,
  onDismiss,
  className,
}: AlertProps) {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  const cls = ['alert', `alert--${variant}`, className].filter(Boolean).join(' ');

  return (
    <div className={cls} role="alert">
      {icon && <span className="alert__icon">{icon}</span>}
      <div className="alert__content">
        {title && <strong className="alert__title">{title}</strong>}
        <div className="alert__body">{children}</div>
      </div>
      {dismissible && (
        <button
          type="button"
          className="alert__dismiss"
          onClick={() => {
            setVisible(false);
            onDismiss?.();
          }}
          aria-label="Dismiss"
        >
          ×
        </button>
      )}
    </div>
  );
}
