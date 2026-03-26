import { useState, useCallback } from 'react';
import { UserIcon } from '@libcss/components/atoms/Icon';
import { InlineEditor } from '@libcss/components/atoms/InlineEditor';
import type { CellValue } from '@libcss/common';
import type { DatabaseViewProps } from '../types';
import { displayValue } from '../types';

/**
 * Feed view — social-feed style: avatar + content + timestamp.
 * Click a title or body to edit inline.
 * BEM root: `.db-feed`
 *
 * SCSS classes used:
 *   __item, __avatar, __content, __title, __meta, __body
 */
export function FeedView({
  schema,
  records,
  onCellChange,
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
  const personProp = schema.properties.find((p) => p.type === 'person')?.id;
  const dateProp = schema.properties.find((p) => p.type === 'date')?.id;
  const descProp = schema.properties.find(
    (p) => p.type === 'text' && p.id !== primaryProp,
  )?.id;

  const statusProp = schema.properties.find(
    (p) => p.type === 'status' || p.type === 'select',
  );

  return (
    <div className="db-feed">
      {records.map((record) => {
        const person = personProp ? record.values[personProp] : null;
        const dateVal = dateProp ? record.values[dateProp] : null;
        const desc = descProp ? record.values[descProp] : null;
        const statusVal = statusProp
          ? record.values[statusProp.id]
          : null;

        // Get status color
        let statusColor: string | undefined;
        let statusLabel: string | undefined;
        if (statusProp && statusVal) {
          const options =
            statusProp.type === 'status'
              ? statusProp.config?.statusOptions
              : statusProp.config?.options;
          const opt = options?.find(
            (o) => o.id === statusVal || o.label === statusVal,
          );
          statusColor = opt?.color;
          statusLabel = opt?.label ?? String(statusVal);
        }

        // Avatar initials
        const initials =
          typeof person === 'string'
            ? person
                .split(' ')
                .map((w) => w[0])
                .join('')
                .toUpperCase()
                .slice(0, 2)
            : null;

        return (
          <div className="db-feed__item" key={record.id}>
            {/* Avatar — SCSS: __avatar */}
            <div className="db-feed__avatar">
              {initials ?? <UserIcon size="sm" />}
            </div>

            {/* Content — SCSS: __content */}
            <div className="db-feed__content">
              {/* Title — SCSS: __title */}
              <div
                className="db-feed__title"
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

              {/* Meta line (person + date) — SCSS: __meta */}
              <div className="db-feed__meta">
                {person ? displayValue(person) : 'Unknown'}
                {dateVal && (
                  <>
                    {' · '}
                    {typeof dateVal === 'string'
                      ? new Date(dateVal).toLocaleDateString()
                      : ''}
                  </>
                )}
              </div>

              {/* Body text — SCSS: __body */}
              {descProp && (
                <div
                  className="db-feed__body"
                  onClick={() => handleClick(record.id, descProp)}
                >
                  {editingCell?.recordId === record.id &&
                  editingCell?.property === descProp ? (
                    <InlineEditor
                      value={desc}
                      property={schema.properties.find((p) => p.id === descProp)!}
                      onCommit={(v) => handleCommit(record.id, descProp, v)}
                      onCancel={handleCancel}
                    />
                  ) : (
                    displayValue(desc)
                  )}
                </div>
              )}

              {statusLabel && (
                <span
                  className="db-feed__badge"
                  style={{
                    display: 'inline-block',
                    marginTop: 6,
                    padding: '2px 8px',
                    borderRadius: 12,
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    ...(statusColor
                      ? { background: statusColor, color: '#fff' }
                      : {}),
                  }}
                >
                  {statusLabel}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
