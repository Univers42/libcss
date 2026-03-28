/**
 * @file Button.tsx
 * @description Polymorphic button component (button | anchor | RouterLink).
 * Uses prisma-btn BEM classes from libcss SCSS.
 */

import { Link } from 'react-router-dom';
import { cn } from '../../lib/cn';
import { ButtonContent } from './ButtonContent';
import { DEFAULT_VARIANT, DEFAULT_SIZE } from './Button.constants';
import type {
  ButtonProps,
  RouterLinkButtonProps,
  AnchorButtonProps,
  StandardButtonProps,
} from './Button.types';

export function Button({
  label,
  children,
  leftIcon,
  rightIcon,
  className = '',
  variant = DEFAULT_VARIANT,
  size = DEFAULT_SIZE,
  fullWidth = false,
  isBlock = false,
  isLoading = false,
  ...props
}: ButtonProps) {
  const combinedClasses = cn(
    'prisma-btn',
    `prisma-btn--${variant}`,
    size !== 'md' && `prisma-btn--${size}`,
    (isBlock || fullWidth) && 'prisma-btn--block',
    isLoading && 'prisma-btn--loading',
    className,
  );

  const content = (
    <ButtonContent label={label} leftIcon={leftIcon} rightIcon={rightIcon}>
      {children}
    </ButtonContent>
  );

  if ('to' in props && props.to) {
    const { to, ...linkProps } = props as RouterLinkButtonProps;
    return (
      <Link to={to} className={combinedClasses} {...linkProps}>
        {content}
      </Link>
    );
  }

  if ('href' in props && props.href) {
    const { href, ...anchorProps } = props as AnchorButtonProps;
    return (
      <a href={href} className={combinedClasses} {...anchorProps}>
        {content}
      </a>
    );
  }

  const { disabled, type = 'button', ...buttonProps } = props as StandardButtonProps;
  return (
    <button
      type={type}
      className={combinedClasses}
      disabled={isLoading || disabled}
      {...buttonProps}
    >
      {content}
    </button>
  );
}
