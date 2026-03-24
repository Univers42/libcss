/**
 * @file CenteredShell
 * @description Centered card layout with decorative background.
 * Perfect for: auth pages, onboarding flows, single-form pages, error pages.
 *
 * ┌───────────────────────────────────┐
 * │         ╭ background ╮           │
 * │         │             │           │
 * │         │    Brand    │           │
 * │         │  ┌───────┐  │           │
 * │         │  │ Card  │  │           │
 * │         │  │       │  │           │
 * │         │  └───────┘  │           │
 * │         │   Footer    │           │
 * │         ╰─────────────╯           │
 * └───────────────────────────────────┘
 */

import type { CenteredShellProps } from './shell.types';

export function CenteredShell({
  children,
  brand,
  footer,
  colorScheme = 'dark',
  className = '',
  cardWidth = '480px',
  bgVariant = 'mesh',
}: CenteredShellProps) {
  const rootClass = [
    'shell-centered',
    `shell-centered--${colorScheme}`,
    `shell-centered--bg-${bgVariant}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={rootClass}
      style={{ '--shell-card-w': cardWidth } as React.CSSProperties}
    >
      <div className="shell-centered__wrapper">
        {brand && <div className="shell-centered__brand">{brand}</div>}

        <div className="shell-centered__card">
          {children}
        </div>

        {footer && <div className="shell-centered__footer">{footer}</div>}
      </div>
    </div>
  );
}
