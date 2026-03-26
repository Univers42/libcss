import { useCallback } from 'react';
import type { SortRule } from '@libcss/common';
import type { SortMenuProps } from './SortMenu.types';

/**
 * Drop-down panel for managing sort rules.
 * BEM root: `.sort-menu`
 */
export function SortMenu({
  sorts,
  properties,
  onChange,
  className,
}: SortMenuProps) {
  const addSort = useCallback(() => {
    const firstAvailable = properties.find(
      (p) => !sorts.some((s) => s.property === p.id),
    );
    if (!firstAvailable) return;
    onChange([
      ...sorts,
      { property: firstAvailable.id, direction: 'asc' as const },
    ]);
  }, [sorts, properties, onChange]);

  const removeSort = useCallback(
    (idx: number) => {
      onChange(sorts.filter((_, i) => i !== idx));
    },
    [sorts, onChange],
  );

  const updateSort = useCallback(
    (idx: number, patch: Partial<SortRule>) => {
      onChange(sorts.map((s, i) => (i === idx ? { ...s, ...patch } : s)));
    },
    [sorts, onChange],
  );

  const cls = ['sort-menu', className].filter(Boolean).join(' ');

  return (
    <div className={cls}>
      <div className="sort-menu__header">
        <span className="sort-menu__title">Sort</span>
        <button className="sort-menu__add" onClick={addSort}>
          + Add sort
        </button>
      </div>

      {sorts.length === 0 && (
        <p className="sort-menu__empty">No sorts applied</p>
      )}

      {sorts.map((rule, idx) => (
        <div key={idx} className="sort-menu__rule">
          <select
            className="sort-menu__prop"
            value={rule.property}
            onChange={(e) => updateSort(idx, { property: e.target.value })}
          >
            {properties.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>

          <select
            className="sort-menu__dir"
            value={rule.direction}
            onChange={(e) =>
              updateSort(idx, {
                direction: e.target.value as 'asc' | 'desc',
              })
            }
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>

          <button
            className="sort-menu__remove"
            onClick={() => removeSort(idx)}
            aria-label="Remove sort"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
