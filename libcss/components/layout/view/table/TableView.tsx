import { useState, useCallback } from 'react';
import { InlineEditor } from '@libcss/components/atoms/InlineEditor';
import { CheckSquareIcon, SquareIcon } from '@libcss/components/atoms/Icon';
import type { CellValue, PropertyDef } from '@libcss/common';
import type { DatabaseViewProps } from '../types';
import { displayValue } from '../types';

/**
 * Table view — real HTML `<table>` with thead / tbody / tfoot.
 * Double-click a cell to edit inline via `<InlineEditor>`.
 * BEM root: `.db-table`
 */
export function TableView({
  schema,
  records,
  visibleProperties,
  onCellChange,
  onAddRecord,
}: DatabaseViewProps) {
  const [editingCell, setEditingCell] = useState<{
    recordId: string;
    property: string;
  } | null>(null);

  const handleDoubleClick = useCallback(
    (recordId: string, property: string) => {
      setEditingCell({ recordId, property });
    },
    [],
  );

  const handleCommit = useCallback(
    (recordId: string, property: string, value: CellValue) => {
      onCellChange(recordId, property, value);
      setEditingCell(null);
    },
    [onCellChange],
  );

  const handleCancel = useCallback(() => {
    setEditingCell(null);
  }, []);

  const primaryProp = schema.primaryProperty;

  return (
    <table className="db-table">
      {/* ── Header ── */}
      <thead className="db-table__head">
        <tr className="db-table__header-row">
          {visibleProperties.map((prop) => (
            <th
              key={prop.id}
              className="db-table__th"
              style={prop.config?.width ? { width: prop.config.width } : undefined}
            >
              {prop.name}
            </th>
          ))}
        </tr>
      </thead>

      {/* ── Body ── */}
      <tbody className="db-table__body">
        {records.map((record) => (
          <tr className="db-table__row" key={record.id}>
            {visibleProperties.map((prop) => {
              const isEditing =
                editingCell?.recordId === record.id &&
                editingCell?.property === prop.id;
              const value = record.values[prop.id];

              return (
                <td
                  key={prop.id}
                  className={[
                    'db-table__cell',
                    prop.id === primaryProp && 'db-table__cell--primary',
                    prop.type === 'number' && 'db-table__cell--number',
                    prop.type === 'checkbox' && 'db-table__cell--checkbox',
                    isEditing && 'db-table__cell--editing',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  style={
                    prop.config?.width ? { width: prop.config.width } : undefined
                  }
                  onDoubleClick={() => handleDoubleClick(record.id, prop.id)}
                >
                  {isEditing ? (
                    <InlineEditor
                      value={value}
                      property={prop}
                      onCommit={(v) => handleCommit(record.id, prop.id, v)}
                      onCancel={handleCancel}
                    />
                  ) : (
                    <CellDisplay value={value} property={prop} />
                  )}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>

      {/* ── Footer (add row) ── */}
      <tfoot className="db-table__foot">
        <tr className="db-table__row db-table__row--add">
          <td
            colSpan={visibleProperties.length}
            className="db-table__cell db-table__cell--add"
          >
            <button className="db-table__add-btn" onClick={onAddRecord}>
              + New
            </button>
          </td>
        </tr>
      </tfoot>
    </table>
  );
}

// ── Cell display helper ──

function CellDisplay({
  value,
  property,
}: {
  value: CellValue;
  property: PropertyDef;
}) {
  // Checkbox
  if (property.type === 'checkbox') {
    return (
      <span className="db-table__checkbox">
        {value ? <CheckSquareIcon size="sm" /> : <SquareIcon size="sm" />}
      </span>
    );
  }

  // Select / status chips
  if (
    (property.type === 'select' || property.type === 'status') &&
    typeof value === 'string'
  ) {
    const options =
      property.type === 'status'
        ? property.config?.statusOptions
        : property.config?.options;
    const opt = options?.find((o) => o.id === value || o.label === value);
    return (
      <span
        className="db-table__chip"
        style={opt ? { background: opt.color, color: '#fff' } : undefined}
      >
        {opt?.label ?? value}
      </span>
    );
  }

  // Multi-select
  if (property.type === 'multi_select' && Array.isArray(value)) {
    return (
      <span className="db-table__chips">
        {value.map((v) => {
          const opt = property.config?.options?.find(
            (o) => o.id === v || o.label === v,
          );
          return (
            <span
              key={String(v)}
              className="db-table__chip"
              style={
                opt ? { background: opt.color, color: '#fff' } : undefined
              }
            >
              {opt?.label ?? String(v)}
            </span>
          );
        })}
      </span>
    );
  }

  // URL
  if (property.type === 'url' && typeof value === 'string' && value) {
    return (
      <a
        className="db-table__link"
        href={value}
        target="_blank"
        rel="noopener noreferrer"
      >
        {value}
      </a>
    );
  }

  // Default
  return <>{displayValue(value, property)}</>;
}
