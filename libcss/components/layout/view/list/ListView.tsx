import { useState, useCallback } from 'react';
import { PlusIcon } from '@libcss/components/atoms/Icon';
import { InlineEditor } from '@libcss/components/atoms/InlineEditor';
import type { CellValue } from '@libcss/common';
import type { DatabaseViewProps } from '../types';
import { displayValue } from '../types';

/**
 * List view — simple rows with title and a few props.
 * Click a title or prop to edit inline.
 * BEM root: `.db-list`
 */
export function ListView({
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

  const handleClick = useCallback(
    (recordId: string, property: string) => setEditingCell({ recordId, property }),
    [],
  );

  const handleCommit = useCallback(
    (recordId: string, property: string, value: CellValue) => {
      onCellChange(recordId, property, value);
      setEditingCell(null);
    },
    [onCellChange],
  );

  const handleCancel = useCallback(() => setEditingCell(null), []);

  const primaryProp = schema.primaryProperty;
  const secondaryProps = visibleProperties
    .filter((p) => p.id !== primaryProp)
    .slice(0, 4);

  return (
    <div className="db-list">
      {records.map((record) => (
        <div className="db-list__item" key={record.id}>
          <div
            className="db-list__title"
            onClick={() => handleClick(record.id, primaryProp)}
          >
            {editingCell?.recordId === record.id &&
            editingCell?.property === primaryProp ? (
              <InlineEditor
                value={record.values[primaryProp]}
                property={schema.properties.find((p) => p.id === primaryProp)!}
                onCommit={(v) => handleCommit(record.id, primaryProp, v)}
                onCancel={handleCancel}
              />
            ) : (
              displayValue(record.values[primaryProp])
            )}
          </div>
          <div className="db-list__props">
            {secondaryProps.map((prop) => {
              const val = record.values[prop.id];
              if (val == null || val === '') return null;
              const isEditing =
                editingCell?.recordId === record.id &&
                editingCell?.property === prop.id;
              return (
                <span
                  key={prop.id}
                  onClick={() => handleClick(record.id, prop.id)}
                >
                  {isEditing ? (
                    <InlineEditor
                      value={val}
                      property={prop}
                      onCommit={(v) => handleCommit(record.id, prop.id, v)}
                      onCancel={handleCancel}
                    />
                  ) : (
                    displayValue(val, prop)
                  )}
                </span>
              );
            })}
          </div>
        </div>
      ))}

      <button className="db-list__add-btn" onClick={onAddRecord}>
        <PlusIcon size="xs" /> New
      </button>
    </div>
  );
}
