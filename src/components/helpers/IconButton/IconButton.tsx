/**
 * IconButton - Button with icon only
 * Used for compact actions like close, edit, delete
 */

import './IconButton.css';

type IconButtonVariant = 'ghost' | 'subtle' | 'danger';
type IconButtonSize = 'sm' | 'md' | 'lg';

interface IconButtonProps {
  icon: React.ReactNode;
  ariaLabel: string;
  onClick: (e?: React.MouseEvent) => void;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  disabled?: boolean;
  className?: string;
}

export function IconButton({
  icon,
  ariaLabel,
  onClick,
  variant = 'ghost',
  size = 'md',
  disabled = false,
  className,
}: IconButtonProps) {
  const classes = buildClasses(variant, size, className);

  return (
    <button
      type="button"
      className={classes}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {icon}
    </button>
  );
}

function buildClasses(
  variant: IconButtonVariant,
  size: IconButtonSize,
  className?: string,
): string {
  const base = ['icon-btn', `icon-btn-${variant}`, `icon-btn-${size}`];
  if (className) base.push(className);
  return base.join(' ');
}
