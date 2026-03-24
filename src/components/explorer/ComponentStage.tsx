interface ComponentStageProps {
  children: React.ReactNode;
  bgMode: 'light' | 'dark' | 'checker';
  onBgModeChange: (mode: 'light' | 'dark' | 'checker') => void;
}

const BG_OPTIONS: { value: ComponentStageProps['bgMode']; label: string }[] = [
  { value: 'light', label: '☀' },
  { value: 'dark', label: '🌙' },
  { value: 'checker', label: '▦' },
];

export function ComponentStage({ children, bgMode, onBgModeChange }: ComponentStageProps) {
  return (
    <div className="shell-stage">
      <div className="shell-stage__toolbar">
        {BG_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            className={`shell-stage__bg-btn ${
              bgMode === opt.value ? 'shell-stage__bg-btn--active' : ''
            }`}
            onClick={() => onBgModeChange(opt.value)}
            title={`${opt.value} background`}
          >
            {opt.label}
          </button>
        ))}
      </div>
      <div className={`shell-stage__canvas shell-stage__canvas--${bgMode}`}>
        <div className="shell-stage__spotlight" />
        <div className="shell-stage__content">{children}</div>
      </div>
    </div>
  );
}
