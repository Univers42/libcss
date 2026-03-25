import type { JSX } from 'react';
import { cn } from '../../lib/cn';
import type { EquationProps } from './Equation.types';

export function Equation({
  expression,
  inline = false,
  label,
  number,
  className = '',
}: EquationProps): JSX.Element {
  const classes = cn(
    'prisma-equation',
    inline && 'prisma-equation--inline',
    number != null && 'prisma-equation--numbered',
    className,
  );

  if (inline) {
    return <span className={classes}>{expression}</span>;
  }

  return (
    <div className={classes}>
      <span className="prisma-equation__content">{expression}</span>
      {number != null && <span className="prisma-equation__number">({number})</span>}
      {label && <span className="prisma-equation__label">{label}</span>}
    </div>
  );
}
