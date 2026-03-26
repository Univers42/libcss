import { useMemo } from 'react';
import { PlusIcon } from '@libcss/components/atoms/Icon';
import type { DatabaseViewProps } from '../types';
import { displayValue } from '../types';

/**
 * Board view — Kanban-style columns grouped by a select/status property.
 * BEM root: `.db-board`
 */
export function BoardView({
  schema,
  records,
  visibleProperties,
  viewConfig,
  onCellChange: _onCellChange,
  onAddRecord,
}: DatabaseViewProps) {
  const columnProperty =
    viewConfig?.boardOptions?.columnProperty ??
    schema.properties.find(
      (p) => p.type === 'status' || p.type === 'select',
    )?.id ??
    '';

  const colProp = schema.properties.find((p) => p.id === columnProperty);

  // Build columns from options
  const columns = useMemo(() => {
    if (!colProp) return [];
    const options =
      colProp.type === 'status'
        ? colProp.config?.statusOptions ?? []
        : colProp.config?.options ?? [];

    const cols = options.map((opt) => ({
      id: opt.id,
      label: opt.label,
      color: opt.color,
      records: records.filter((r) => {
        const val = r.values[columnProperty];
        return val === opt.id || val === opt.label;
      }),
    }));

    // "No value" column
    const assigned = new Set(cols.flatMap((c) => c.records.map((r) => r.id)));
    const unassigned = records.filter((r) => !assigned.has(r.id));
    if (unassigned.length > 0) {
      cols.unshift({
        id: '__none',
        label: 'No status',
        color: '#e0e0e0',
        records: unassigned,
      });
    }

    return cols;
  }, [colProp, records, columnProperty]);

  const cardProps = viewConfig?.boardOptions?.cardProperties
    ? visibleProperties.filter((p) =>
        viewConfig.boardOptions!.cardProperties!.includes(p.id),
      )
    : visibleProperties.filter((p) => p.id !== columnProperty).slice(0, 3);

  const primaryProp = schema.primaryProperty;

  return (
    <div className="db-board">
      {columns.map((col) => (
        <div className="db-board__column" key={col.id}>
          {/* Column header — matches SCSS __column-header */}
          <div className="db-board__column-header">
            <span>{col.label}</span>
            <span className="db-board__count">{col.records.length}</span>
          </div>

          {/* Cards container — matches SCSS __cards */}
          <div className="db-board__cards">
            {col.records.map((record) => (
              <div className="db-board__card" key={record.id}>
                <div className="db-board__card-title">
                  {displayValue(record.values[primaryProp])}
                </div>

                {/* Card property tags — matches SCSS __card-props */}
                <div className="db-board__card-props">
                  {cardProps.map((prop) => {
                    const val = record.values[prop.id];
                    if (val == null || val === '') return null;
                    return (
                      <span key={prop.id}>
                        {displayValue(val, prop)}
                      </span>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Add card button */}
          <button
            className="db-board__add-btn"
            onClick={() => onAddRecord()}
          >
            <PlusIcon size="xs" /> New
          </button>
        </div>
      ))}
    </div>
  );
}
