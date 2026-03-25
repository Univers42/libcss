import type { BadgeProps } from './Badge.types';

export function Badge({
  children,
  variant = 'default',
  size = 'md',
  pill = false,
  outline = false,
  dot = false,
  className,
}: BadgeProps) {
  const cls = [
    'badge',
    `badge--${variant}`,
    `badge--${size}`,
    pill && 'badge--pill',
    outline && 'badge--outline',
    dot && 'badge--dot',
    className,
  ].filter(Boolean).join(' ');

  return (
    <span className={cls}>
      {dot && <span className="badge__dot" />}
      {children}
    </span>
  );
}
