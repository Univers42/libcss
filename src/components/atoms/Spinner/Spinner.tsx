export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  label?: string;
  className?: string;
}

export function Spinner({ size = 'md', color, label = 'Loading…', className }: SpinnerProps) {
  const cls = ['spinner', `spinner--${size}`, className].filter(Boolean).join(' ');
  return (
    <span
      className={cls}
      role="status"
      aria-label={label}
      style={color ? { borderTopColor: color } : undefined}
    >
      <span className="sr-only">{label}</span>
    </span>
  );
}
