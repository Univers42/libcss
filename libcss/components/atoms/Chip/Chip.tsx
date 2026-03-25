import type { ChipProps } from './Chip.types';

export function Chip({
  label,
  variant = 'filled',
  color = 'default',
  icon,
  removable = false,
  onRemove,
  onClick,
  disabled = false,
  className,
}: ChipProps) {
  const cls = [
    'chip',
    `chip--${variant}`,
    `chip--${color}`,
    onClick && 'chip--clickable',
    disabled && 'chip--disabled',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span
      className={cls}
      onClick={!disabled ? onClick : undefined}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {icon && <span className="chip__icon">{icon}</span>}
      <span className="chip__label">{label}</span>
      {removable && (
        <button
          type="button"
          className="chip__remove"
          onClick={(e) => {
            e.stopPropagation();
            onRemove?.();
          }}
          disabled={disabled}
          aria-label={`Remove ${label}`}
        >
          ×
        </button>
      )}
    </span>
  );
}
