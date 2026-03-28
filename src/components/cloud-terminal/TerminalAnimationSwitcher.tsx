/**
 * @file TerminalAnimationSwitcher.tsx
 * @description Dropdown picker for background animation effects.
 * Sits next to the theme switcher in the header.
 */

import { useState, useCallback, useRef, useEffect } from 'react';
import { cn } from '../lib/cn';
import { BG_EFFECTS, type BackgroundEffect } from './backgroundEffects';

export interface TerminalAnimationSwitcherProps {
  readonly currentEffectId: string;
  readonly onSelectEffect: (effectId: string) => void;
  readonly className?: string;
}

export function TerminalAnimationSwitcher({
  currentEffectId,
  onSelectEffect,
  className = '',
}: Readonly<TerminalAnimationSwitcherProps>) {
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
      onSelectEffect(id);
      setOpen(false);
    },
    [onSelectEffect],
  );

  const current = BG_EFFECTS.find((e) => e.id === currentEffectId);

  return (
    <div ref={ref} className={cn('ct-anim-switcher', className)}>
      <button
        type="button"
        className="ct-anim-switcher__trigger"
        onClick={toggle}
        title="Background Animation"
        aria-label="Background animation"
        aria-expanded={open}
      >
        <span className="ct-anim-switcher__icon">{current?.icon ?? '◌'}</span>
        <span className="ct-anim-switcher__label">{current?.name ?? 'Effects'}</span>
        <svg
          className="ct-anim-switcher__chevron"
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
        <div className="ct-anim-switcher__dropdown">
          {BG_EFFECTS.map((effect: BackgroundEffect) => (
            <button
              key={effect.id}
              type="button"
              className={cn(
                'ct-anim-switcher__option',
                effect.id === currentEffectId && 'ct-anim-switcher__option--active',
              )}
              onClick={() => select(effect.id)}
            >
              <span className="ct-anim-switcher__option-icon">{effect.icon}</span>
              <span className="ct-anim-switcher__option-info">
                <span className="ct-anim-switcher__option-name">{effect.name}</span>
                <span className="ct-anim-switcher__option-desc">{effect.description}</span>
              </span>
              {effect.id === currentEffectId && (
                <svg
                  className="ct-anim-switcher__check"
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
