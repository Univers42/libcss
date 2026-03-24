/**
 * @file StackedShell
 * @description Vertical stack layout: sticky header + contained main + footer.
 * Perfect for: marketing sites, docs, blogs, landing pages.
 *
 * ┌───────────────────────────────────┐
 * │          Sticky Header            │
 * ├───────────────────────────────────┤
 * │                                   │
 * │     ┌─── max-width ────┐         │
 * │     │  Main content     │         │
 * │     └───────────────────┘         │
 * │                                   │
 * ├───────────────────────────────────┤
 * │            Footer                 │
 * └───────────────────────────────────┘
 */

import type { StackedShellProps } from './shell.types';

export function StackedShell({
  nav,
  header,
  children,
  footer,
  colorScheme = 'dark',
  className = '',
  stickyHeader = true,
  contained = true,
  maxWidth = '1280px',
}: StackedShellProps) {
  const rootClass = [
    'shell-stacked',
    `shell-stacked--${colorScheme}`,
    stickyHeader ? 'shell-stacked--sticky' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={rootClass}
      style={{ '--shell-max-w': maxWidth } as React.CSSProperties}
    >
      {/* Header */}
      <header className="shell-stacked__header">
        <div className={contained ? 'shell-stacked__container' : ''}>
          {nav && <nav className="shell-stacked__nav">{nav}</nav>}
          {header}
        </div>
      </header>

      {/* Main */}
      <main className="shell-stacked__main">
        <div className={contained ? 'shell-stacked__container' : ''}>
          {children}
        </div>
      </main>

      {/* Footer */}
      {footer && (
        <footer className="shell-stacked__footer">
          <div className={contained ? 'shell-stacked__container' : ''}>
            {footer}
          </div>
        </footer>
      )}
    </div>
  );
}
