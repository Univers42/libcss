/**
 * @file InspectorPanel
 * @description Polymorphic property inspector that dynamically builds itself
 * from a ParameterSchema.  Supports both the new schema system and legacy
 * PropControl[] arrays (auto-converted via adapter).
 *
 * Architecture
 * ────────────
 * ComponentEntry
 *   ├─ .parameters  (new ParameterSchema — preferred)
 *   └─ .controls    (legacy PropControl[] — auto-adapted)
 *          ↓
 *   legacyControlsToSchema()
 *          ↓
 *   ParameterSchema { groups[] }
 *          ↓
 *   <ParameterGroup>   ←  collapsible, styled per category
 *     └─ <ControlFactory>  ←  resolves the polymorphic control widget
 *          ↓
 *   onChange(key, value)  →  ParameterChangeEvent  →  onParameterChange()
 */

import { useMemo, useCallback, useRef } from 'react';
import type { ComponentEntry } from '../../core/types';
import type {
  ParameterSchema,
  ParameterChangeEvent,
  ParameterChangeHandler,
} from '../controls/types';
import { legacyControlsToSchema } from '../controls/schema';
import { ParameterGroup } from '../controls/ParameterGroup';

interface InspectorPanelProps {
  entry: ComponentEntry;
  props: Record<string, unknown>;
  onChange: (key: string, value: unknown) => void;
  onReset: () => void;
  /** Rich event callback — receives full context about the change. */
  onParameterChange?: ParameterChangeHandler;
}

export function InspectorPanel({
  entry,
  props,
  onChange,
  onReset,
  onParameterChange,
}: InspectorPanelProps) {
  const prevProps = useRef(props);

  // Resolve the schema: prefer new `parameters` field, fallback to legacy adapter
  const schema: ParameterSchema = useMemo(() => {
    if ((entry as any).parameters) return (entry as any).parameters;
    return legacyControlsToSchema(entry.controls);
  }, [entry]);

  // Wrap onChange to also fire rich event
  const handleChange = useCallback(
    (key: string, value: unknown) => {
      const previousValue = prevProps.current[key];
      onChange(key, value);

      if (onParameterChange) {
        // Find which group this key belongs to
        let groupId = 'unknown';
        let controlType: ParameterChangeEvent['controlType'] = 'text';
        for (const g of schema.groups) {
          const param = g.parameters.find((p) => p.key === key);
          if (param) {
            groupId = g.id;
            controlType = param.type;
            break;
          }
        }
        onParameterChange({ key, value, previousValue, groupId, controlType });
      }

      prevProps.current = { ...prevProps.current, [key]: value };
    },
    [onChange, onParameterChange, schema],
  );

  return (
    <aside className="shell-inspector">
      {/* ── Header ── */}
      <div className="shell-inspector__header">
        <div className="shell-inspector__title-row">
          <h3 className="shell-inspector__title">{entry.name}</h3>
          <span className="shell-inspector__badge">{entry.category}</span>
        </div>
        <p className="shell-inspector__desc">{entry.description}</p>
        <button type="button" className="shell-inspector__reset" onClick={onReset}>
          Reset to defaults
        </button>
      </div>

      {/* ── Dynamic parameter groups ── */}
      <div className="shell-inspector__controls">
        {schema.groups.map((group) => (
          <ParameterGroup key={group.id} group={group} values={props} onChange={handleChange} />
        ))}
      </div>

      {/* ── Tags footer ── */}
      {entry.tags.length > 0 && (
        <div className="shell-inspector__tags">
          {entry.tags.map((tag) => (
            <span key={tag} className="shell-inspector__tag">
              {tag}
            </span>
          ))}
        </div>
      )}
    </aside>
  );
}
