import { forwardRef } from 'react';
import type { IconButtonProps } from './IconButton.types';

/**
 * Small icon-only button with optional tooltip.
 * Follows BEM: `.icon-btn .icon-btn--sm .icon-btn--ghost`
 */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(
    {
      icon,
      size = 'sm',
      variant = 'ghost',
      tooltip,
      className,
      ...rest
    },
    ref,
  ) {
    const cls = [
      'icon-btn',
      `icon-btn--${size}`,
      `icon-btn--${variant}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button ref={ref} className={cls} title={tooltip} type="button" {...rest}>
        <span className="icon-btn__icon">{icon}</span>
      </button>
    );
  },
);
