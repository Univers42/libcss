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
    <div className="studio-stage">
      <div className="studio-stage__toolbar">
        {BG_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            className={`studio-stage__bg-btn ${
              bgMode === opt.value ? 'studio-stage__bg-btn--active' : ''
            }`}
            onClick={() => onBgModeChange(opt.value)}
            title={`${opt.value} background`}
          >
            {opt.label}
          </button>
        ))}
      </div>
      <div className={`studio-stage__canvas studio-stage__canvas--${bgMode}`}>
        <div className="studio-stage__spotlight" />
        <div className="studio-stage__content">{children}</div>
      </div>
    </div>
  );
}
