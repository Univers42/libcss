import type { ComponentEntry } from '../core/types';

interface ComponentCardProps {
  entry: ComponentEntry;
  onClick: () => void;
}

export function ComponentCard({ entry, onClick }: ComponentCardProps) {
  return (
    <button type="button" className="studio-card" onClick={onClick}>
      <div className="studio-card__preview">
        <div className="studio-card__preview-inner">
          {entry.render(entry.defaultProps)}
        </div>
      </div>
      <div className="studio-card__info">
        <h3 className="studio-card__name">{entry.name}</h3>
        <p className="studio-card__desc">{entry.description}</p>
      </div>
    </button>
  );
}
