export interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  label?: string;
  variant?: 'solid' | 'dashed' | 'dotted';
  spacing?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Divider({ orientation = 'horizontal', label, variant = 'solid', spacing = 'md', className }: DividerProps) {
  const cls = [
    'divider',
    `divider--${orientation}`,
    `divider--${variant}`,
    `divider--${spacing}`,
    label && 'divider--labelled',
    className,
  ].filter(Boolean).join(' ');

  if (label) {
    return (
      <div className={cls} role="separator">
        <span className="divider__line" />
        <span className="divider__label">{label}</span>
        <span className="divider__line" />
      </div>
    );
  }

  return <hr className={cls} />;
}
