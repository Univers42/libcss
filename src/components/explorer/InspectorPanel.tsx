import { useMemo } from 'react';
import type { ComponentEntry } from '../../core/types';
import { ControlFactory } from '../controls/ControlFactory';

interface InspectorPanelProps {
  entry: ComponentEntry;
  props: Record<string, unknown>;
  onChange: (key: string, value: unknown) => void;
  onReset: () => void;
}

export function InspectorPanel({ entry, props, onChange, onReset }: InspectorPanelProps) {
  const groups = useMemo(() => {
    const map = new Map<string, typeof entry.controls extends readonly (infer T)[] ? T[] : never>();
    for (const ctrl of entry.controls) {
      const group = ctrl.group ?? 'General';
      const list = map.get(group) ?? [];
      list.push(ctrl);
      map.set(group, list);
    }
    return map;
  }, [entry.controls]);

  return (
    <aside className="shell-inspector">
      <div className="shell-inspector__header">
        <div className="shell-inspector__title-row">
          <h3 className="shell-inspector__title">{entry.name}</h3>
          <span className="shell-inspector__badge">{entry.category}</span>
        </div>
        <p className="shell-inspector__desc">{entry.description}</p>
        <button
          type="button"
          className="shell-inspector__reset"
          onClick={onReset}
        >
          Reset to defaults
        </button>
      </div>

      <div className="shell-inspector__controls">
        {[...groups.entries()].map(([groupName, controls]) => (
          <div key={groupName} className="shell-inspector__group">
            <h4 className="shell-inspector__group-title">{groupName}</h4>
            {controls.map((control) => (
              <ControlFactory
                key={control.key}
                control={control}
                value={props[control.key]}
                onChange={onChange}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="shell-inspector__tags">
        {entry.tags.map((tag) => (
          <span key={tag} className="shell-inspector__tag">
            {tag}
          </span>
        ))}
      </div>
    </aside>
  );
}
