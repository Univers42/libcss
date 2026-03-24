/**
 * @file PanelShell
 * @description 3-panel IDE-style layout with optional bottom panel.
 * Perfect for: code editors, design tools, studio apps, data explorers.
 *
 * ┌──────────────────────────────────────┐
 * │  Brand   │     Toolbar               │
 * ├──────────┼───────────────┬───────────┤
 * │          │               │           │
 * │   Left   │    Main       │   Right   │
 * │  Panel   │   Content     │   Panel   │
 * │          │               │           │
 * │          ├───────────────┤           │
 * │          │  Bottom Panel │           │
 * └──────────┴───────────────┴───────────┘
 */

import { useState } from 'react';
import type { PanelShellProps } from './shell.types';

export function PanelShell({
  brand,
  toolbar,
  header,
  children,
  leftPanel,
  rightPanel,
  bottomPanel,
  showBottom = false,
  colorScheme = 'dark',
  className = '',
  leftWidth = '260px',
  rightWidth = '320px',
  collapsedOnMobile = true,
}: PanelShellProps) {
  const [leftOpen, setLeftOpen] = useState(!collapsedOnMobile);
  const [rightOpen, setRightOpen] = useState(!collapsedOnMobile);

  const rootClass = [
    'shell-panel',
    `shell-panel--${colorScheme}`,
    leftOpen && leftPanel ? 'shell-panel--left-open' : '',
    rightOpen && rightPanel ? 'shell-panel--right-open' : '',
    showBottom && bottomPanel ? 'shell-panel--bottom-open' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={rootClass}
      style={{
        '--shell-left-w': leftWidth,
        '--shell-right-w': rightWidth,
      } as React.CSSProperties}
    >
      {/* Header / toolbar bar */}
      <header className="shell-panel__header">
        <div className="shell-panel__header-left">
          {brand && <div className="shell-panel__brand">{brand}</div>}
          {leftPanel && (
            <button
              type="button"
              className="shell-panel__toggle"
              onClick={() => setLeftOpen((v) => !v)}
              aria-label="Toggle left panel"
            >
              ☰
            </button>
          )}
        </div>
        <div className="shell-panel__header-center">
          {toolbar ?? header}
        </div>
        <div className="shell-panel__header-right">
          {rightPanel && (
            <button
              type="button"
              className="shell-panel__toggle"
              onClick={() => setRightOpen((v) => !v)}
              aria-label="Toggle right panel"
            >
              ⚙
            </button>
          )}
        </div>
      </header>

      {/* Body: left + main + right */}
      <div className="shell-panel__body">
        {leftPanel && (
          <aside className="shell-panel__left">{leftPanel}</aside>
        )}

        <div className="shell-panel__center">
          <main className="shell-panel__main">{children}</main>
          {showBottom && bottomPanel && (
            <div className="shell-panel__bottom">{bottomPanel}</div>
          )}
        </div>

        {rightPanel && (
          <aside className="shell-panel__right">{rightPanel}</aside>
        )}
      </div>
    </div>
  );
}
