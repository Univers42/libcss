import type { JSX } from 'react';
import { cn } from '../../lib/cn';

interface StrengthBarSegmentProps {
  isActive: boolean;
  level: number;
}

export function StrengthBarSegment({ isActive, level }: StrengthBarSegmentProps): JSX.Element {
  const colorLevel = Math.min(level, 3);

  const className = cn(
    'prisma-strength-bar__item',
    isActive && `prisma-strength-bar__item--active-${colorLevel}`,
  );

  return <div className={className} />;
}
