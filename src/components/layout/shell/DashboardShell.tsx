/**
 * @file DashboardShell
 * @description Classic admin dashboard layout: collapsible sidebar + header + main.
 * Perfect for: admin panels, CMS, analytics dashboards, settings pages.
 *
 * ┌─────────────────────────────────┐
 * │  ┌──────┐  Header               │
 * │  │      │────────────────────────│
 * │  │ Side │  Main content          │
 * │  │ bar  │                        │
 * │  │      │                        │
 * │  └──────┘────────────────────────│
 * └─────────────────────────────────┘
 */

import { useState } from 'react';
import type { DashboardShellProps } from './shell.types';

export function DashboardShell({
  brand,
  nav,
  header,
  children,
  aside,
  footer,
  colorScheme = 'dark',
  className = '',
  sidebarWidth = '260px',
  sidebarToggle = true,
  collapsedOnMobile = true,
}: DashboardShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(!collapsedOnMobile);

  const rootClass = [
    'shell-dashboard',
    `shell-dashboard--${colorScheme}`,
    sidebarOpen ? 'shell-dashboard--sidebar-open' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={rootClass}
      style={{ '--shell-sidebar-w': sidebarWidth } as React.CSSProperties}
    >
      {/* Sidebar */}
      <aside className="shell-dashboard__sidebar">
        {brand && <div className="shell-dashboard__brand">{brand}</div>}
        <nav className="shell-dashboard__nav">{nav}</nav>
        {footer && <div className="shell-dashboard__sidebar-footer">{footer}</div>}
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="shell-dashboard__overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Header */}
      <header className="shell-dashboard__header">
        {sidebarToggle && (
          <button
            type="button"
            className="shell-dashboard__toggle"
            onClick={() => setSidebarOpen((v) => !v)}
            aria-label="Toggle sidebar"
          >
            <span className="shell-dashboard__toggle-icon" />
          </button>
        )}
        <div className="shell-dashboard__header-content">{header}</div>
      </header>

      {/* Main */}
      <main className="shell-dashboard__main">
        {children}
      </main>

      {/* Optional aside panel */}
      {aside && (
        <aside className="shell-dashboard__aside">{aside}</aside>
      )}
    </div>
  );
}
