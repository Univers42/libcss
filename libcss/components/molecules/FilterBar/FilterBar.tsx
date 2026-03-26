import { useState, useCallback } from 'react';
import {
  OPERATORS_BY_CATEGORY,
  PROPERTY_TYPE_CATEGORY,
  OPERATOR_LABELS,
} from '@libcss/common';
import type { FilterRule, FilterOperator } from '@libcss/common';
import type { FilterBarProps } from './FilterBar.types';

/**
 * A horizontal bar showing active filter chips with an "Add filter" dropdown.
 * BEM root: `.filter-bar`
 */
export function FilterBar({
  filters,
  properties,
  onChange,
  className,
}: FilterBarProps) {
  const [showAdd, setShowAdd] = useState(false);

  const removeFilter = useCallback(
    (idx: number) => {
      const next = filters.filter((_, i) => i !== idx);
      onChange(next);
    },
    [filters, onChange],
  );

  const addFilter = useCallback(
    (propId: string) => {
      const prop = properties.find((p) => p.id === propId);
      if (!prop) return;
      const cat = PROPERTY_TYPE_CATEGORY[prop.type] ?? 'text';
      const ops = OPERATORS_BY_CATEGORY[cat] ?? OPERATORS_BY_CATEGORY.text;
      const rule: FilterRule = {
        property: propId,
        operator: ops[0] as FilterOperator,
        value: '',
      };
      onChange([...filters, rule]);
      setShowAdd(false);
    },
    [properties, filters, onChange],
  );

  const updateFilter = useCallback(
    (idx: number, patch: Partial<FilterRule>) => {
      const next = filters.map((f, i) => (i === idx ? { ...f, ...patch } : f));
      onChange(next);
    },
    [filters, onChange],
  );

  const cls = ['filter-bar', className].filter(Boolean).join(' ');

  return (
    <div className={cls}>
      {filters.map((rule, idx) => {
        const prop = properties.find((p) => p.id === rule.property);
        const cat = prop
          ? PROPERTY_TYPE_CATEGORY[prop.type] ?? 'text'
          : 'text';
        const ops = OPERATORS_BY_CATEGORY[cat] ?? OPERATORS_BY_CATEGORY.text;

        return (
          <div key={idx} className="filter-bar__chip">
            {/* Property selector */}
            <select
              className="filter-bar__prop"
              value={rule.property}
              onChange={(e) => updateFilter(idx, { property: e.target.value })}
            >
              {properties.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>

            {/* Operator selector */}
            <select
              className="filter-bar__op"
              value={rule.operator}
              onChange={(e) =>
                updateFilter(idx, {
                  operator: e.target.value as FilterOperator,
                })
              }
            >
              {ops.map((op) => (
                <option key={op} value={op}>
                  {OPERATOR_LABELS[op as FilterOperator] ?? op}
                </option>
              ))}
            </select>

            {/* Value input (skip for is_empty / is_not_empty) */}
            {rule.operator !== 'is_empty' &&
              rule.operator !== 'is_not_empty' && (
                <input
                  className="filter-bar__value"
                  type="text"
                  value={String(rule.value ?? '')}
                  placeholder="value"
                  onChange={(e) => updateFilter(idx, { value: e.target.value })}
                />
              )}

            <button
              className="filter-bar__remove"
              onClick={() => removeFilter(idx)}
              aria-label="Remove filter"
            >
              ×
            </button>
          </div>
        );
      })}

      <div className="filter-bar__add-wrap">
        <button
          className="filter-bar__add"
          onClick={() => setShowAdd((s) => !s)}
        >
          + Add filter
        </button>
        {showAdd && (
          <div className="filter-bar__dropdown">
            {properties.map((p) => (
              <button
                key={p.id}
                className="filter-bar__dropdown-item"
                onClick={() => addFilter(p.id)}
              >
                {p.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
