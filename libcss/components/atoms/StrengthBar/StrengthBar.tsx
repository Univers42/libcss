import type { JSX } from 'react';
import { cn } from '../../lib/cn';
import { StrengthBarSegment } from './StrengthBarSegment';
import { DEFAULT_MAX_LEVEL } from './StrengthBar.constants';
import type { StrengthBarProps } from './StrengthBar.types';

export function StrengthBar({
  level,
  maxLevel = DEFAULT_MAX_LEVEL,
  label,
  className = '',
}: StrengthBarProps): JSX.Element {
  const segments = Array.from({ length: maxLevel }, (_, i) => i + 1);
  const colorLevel = Math.min(level, 3);

  return (
    <div
      className={cn('prisma-strength-bar', className)}
      role="progressbar"
      aria-valuenow={level}
      aria-valuemin={0}
      aria-valuemax={maxLevel}
      aria-label={label ?? 'Strength indicator'}
    >
      <div className="prisma-strength-bar__indicators">
        {segments.map((i) => (
          <StrengthBarSegment key={i} isActive={i <= level} level={level} />
        ))}
      </div>

      {label && (
        <span
          className={cn(
            'prisma-strength-bar__label',
            level > 0 && `prisma-strength-bar__label--${colorLevel}`,
          )}
        >
          {label}
        </span>
      )}
    </div>
  );
}
