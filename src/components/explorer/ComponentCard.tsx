import type { ComponentEntry } from '../../core/types';

interface ComponentCardProps {
  entry: ComponentEntry;
  onClick: () => void;
}

export function ComponentCard({ entry, onClick }: ComponentCardProps) {
  return (
    <button type="button" className="shell-card" onClick={onClick}>
      <div className="shell-card__preview">
        <div className="shell-card__preview-inner">
          {entry.render(entry.defaultProps)}
        </div>
      </div>
      <div className="shell-card__info">
        <h3 className="shell-card__name">{entry.name}</h3>
        <p className="shell-card__desc">{entry.description}</p>
      </div>
    </button>
  );
}
