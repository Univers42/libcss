/**
 * @file TerminalThemeSwitcher.tsx
 * @description Theme picker dropdown for CloudTerminal.
 * Shows gradient swatches for each available theme.
 */

import { useState, useCallback, useRef, useEffect } from 'react';
import { cn } from '../lib/cn';
import { TERMINAL_THEMES, type TerminalThemeDef } from './themes';

export interface TerminalThemeSwitcherProps {
  readonly currentThemeId: string;
  readonly onSelectTheme: (themeId: string) => void;
  readonly className?: string;
}

export function TerminalThemeSwitcher({
  currentThemeId,
  onSelectTheme,
  className = '',
}: Readonly<TerminalThemeSwitcherProps>) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  /* Close on outside click */
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const toggle = useCallback(() => setOpen((v) => !v), []);
  const select = useCallback(
    (id: string) => {
      onSelectTheme(id);
      setOpen(false);
    },
    [onSelectTheme],
  );

  const current = TERMINAL_THEMES.find((t) => t.id === currentThemeId);

  return (
    <div ref={ref} className={cn('ct-theme-switcher', className)}>
      <button
        type="button"
        className="ct-theme-switcher__trigger"
        onClick={toggle}
        title="Change Theme"
        aria-label="Change theme"
        aria-expanded={open}
      >
        <span
          className="ct-theme-switcher__swatch"
          style={{ background: current?.preview ?? '#333' }}
        />
        <span className="ct-theme-switcher__label">{current?.name ?? 'Theme'}</span>
        <svg
          className="ct-theme-switcher__chevron"
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div className="ct-theme-switcher__dropdown">
          {TERMINAL_THEMES.map((theme: TerminalThemeDef) => (
            <button
              key={theme.id}
              type="button"
              className={cn(
                'ct-theme-switcher__option',
                theme.id === currentThemeId && 'ct-theme-switcher__option--active',
              )}
              onClick={() => select(theme.id)}
            >
              <span
                className="ct-theme-switcher__option-swatch"
                style={{ background: theme.preview }}
              />
              <span className="ct-theme-switcher__option-info">
                <span className="ct-theme-switcher__option-name">{theme.name}</span>
                <span className="ct-theme-switcher__option-desc">{theme.description}</span>
              </span>
              {theme.id === currentThemeId && (
                <svg
                  className="ct-theme-switcher__check"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
