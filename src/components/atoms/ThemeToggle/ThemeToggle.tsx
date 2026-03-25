import type { JSX } from 'react';
import { cn } from '../../lib/cn';
import { THEME_LABELS } from './ThemeToggle.constants';
import type { ThemeToggleProps } from './ThemeToggle.types';

/**
 * ThemeToggle button.
 * Requires lucide-react's Sun/Moon icons to be passed as children
 * or uses a default text fallback.
 */
export function ThemeToggle({ isDark, onToggle, className = '' }: ThemeToggleProps): JSX.Element {
  const combinedClasses = cn(
    'prisma-theme-toggle',
    isDark && 'prisma-theme-toggle--dark',
    className,
  );

  const ariaLabel = isDark ? THEME_LABELS.ACTIVATE_LIGHT : THEME_LABELS.ACTIVATE_DARK;

  return (
    <button
      type="button"
      onClick={onToggle}
      className={combinedClasses}
      aria-label={ariaLabel}
      aria-pressed={isDark}
    >
      <span className="prisma-theme-toggle__icon">{isDark ? '☀️' : '🌙'}</span>
    </button>
  );
}
