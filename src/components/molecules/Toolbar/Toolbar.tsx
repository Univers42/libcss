import type { ToolbarProps } from './Toolbar.types';

export function Toolbar({ items, onAction, size = 'md', vertical = false, className }: ToolbarProps) {
  const cls = [
    'toolbar',
    `toolbar--${size}`,
    vertical && 'toolbar--vertical',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={cls} role="toolbar">
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          className={`toolbar__btn${item.active ? ' toolbar__btn--active' : ''}`}
          onClick={() => onAction(item.id)}
          disabled={item.disabled}
          title={item.label}
          aria-pressed={item.active}
        >
          {item.icon && <span className="toolbar__icon">{item.icon}</span>}
          <span className="toolbar__label">{item.label}</span>
        </button>
      ))}
    </div>
  );
}
