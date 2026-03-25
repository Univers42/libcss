export interface ProgressProps {
  value: number;        // 0–100
  max?: number;
  label?: string;
  showValue?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'success' | 'warning' | 'danger';
  striped?: boolean;
  animated?: boolean;
  className?: string;
}

export function Progress({
  value,
  max = 100,
  label,
  showValue = false,
  size = 'md',
  color = 'primary',
  striped = false,
  animated = false,
  className,
}: ProgressProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  const cls = [
    'progress',
    `progress--${size}`,
    `progress--${color}`,
    striped && 'progress--striped',
    animated && 'progress--animated',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={cls} role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={max}>
      {label && <span className="progress__label">{label}</span>}
      <div className="progress__track">
        <div className="progress__bar" style={{ width: `${pct}%` }} />
      </div>
      {showValue && <span className="progress__value">{Math.round(pct)}%</span>}
    </div>
  );
}
