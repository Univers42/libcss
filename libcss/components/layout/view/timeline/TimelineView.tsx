import { useMemo, useState } from 'react';
import type { DatabaseViewProps } from '../types';
import { displayValue } from '../types';

type Zoom = 'day' | 'week' | 'month';

function daysBetween(a: Date, b: Date) {
  return Math.round((b.getTime() - a.getTime()) / 86_400_000);
}

/**
 * Timeline view — horizontal bars on a time scale.
 * BEM root: `.db-timeline`
 *
 * SCSS classes used:
 *   __header
 *   __scale, __scale-unit
 *   __rows, __row, __bar
 */
export function TimelineView({
  schema,
  records,
  viewConfig,
}: DatabaseViewProps) {
  const startProp =
    viewConfig?.timelineOptions?.startProperty ??
    schema.properties.find((p) => p.type === 'date')?.id ??
    '';
  const endProp = viewConfig?.timelineOptions?.endProperty ?? '';
  const primaryProp = schema.primaryProperty;

  const [zoom, setZoom] = useState<Zoom>(
    viewConfig?.timelineOptions?.zoom ?? 'week',
  );

  // Determine date range across all records
  const { items, minDate, totalDays: _totalDays, units } = useMemo(() => {
    const items: {
      record: (typeof records)[0];
      start: Date;
      end: Date;
    }[] = [];

    for (const r of records) {
      const sv = r.values[startProp];
      if (!sv || typeof sv !== 'string') continue;
      const start = new Date(sv);
      if (isNaN(start.getTime())) continue;

      let end: Date;
      if (endProp) {
        const ev = r.values[endProp];
        end =
          typeof ev === 'string' && !isNaN(new Date(ev).getTime())
            ? new Date(ev)
            : new Date(start.getTime() + 7 * 86_400_000);
      } else {
        end = new Date(start.getTime() + 7 * 86_400_000);
      }
      items.push({ record: r, start, end });
    }

    if (items.length === 0) {
      return {
        items,
        minDate: new Date(),
        totalDays: 30,
        units: [] as string[],
      };
    }

    const allDates = items.flatMap((i) => [i.start, i.end]);
    const min = new Date(Math.min(...allDates.map((d) => d.getTime())));
    const max = new Date(Math.max(...allDates.map((d) => d.getTime())));
    min.setDate(min.getDate() - 2);
    max.setDate(max.getDate() + 2);

    const total = daysBetween(min, max) || 1;

    const units: string[] = [];
    const step = zoom === 'day' ? 1 : zoom === 'week' ? 7 : 30;
    const cursor = new Date(min);
    while (cursor <= max) {
      units.push(
        cursor.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
        }),
      );
      cursor.setDate(cursor.getDate() + step);
    }

    return { items, minDate: min, totalDays: total, units };
  }, [records, startProp, endProp, zoom]);

  const colWidth = zoom === 'day' ? 32 : zoom === 'week' ? 80 : 120;

  return (
    <div className="db-timeline">
      {/* Header with zoom controls — SCSS: __header */}
      <div className="db-timeline__header">
        {(['day', 'week', 'month'] as Zoom[]).map((z) => (
          <button
            key={z}
            className={[
              'db-timeline__zoom-btn',
              z === zoom && 'db-timeline__zoom-btn--active',
            ]
              .filter(Boolean)
              .join(' ')}
            onClick={() => setZoom(z)}
            style={{
              background: z === zoom ? 'var(--color-primary, #3b82f6)' : 'none',
              color: z === zoom ? '#fff' : 'inherit',
              border: '1px solid var(--db-border, #e5e7eb)',
              borderRadius: 4,
              padding: '4px 12px',
              fontSize: '0.75rem',
              cursor: 'pointer',
            }}
          >
            {z}
          </button>
        ))}
      </div>

      {/* Scale — SCSS: __scale, __scale-unit */}
      <div
        className="db-timeline__scale"
        style={{ width: units.length * colWidth }}
      >
        {units.map((u, i) => (
          <div
            className="db-timeline__scale-unit"
            key={i}
            style={{ width: colWidth }}
          >
            {u}
          </div>
        ))}
      </div>

      {/* Rows with bars — SCSS: __rows, __row, __bar */}
      <div
        className="db-timeline__rows"
        style={{ width: units.length * colWidth }}
      >
        {items.map(({ record, start, end }) => {
          const offsetDays = daysBetween(minDate, start);
          const spanDays = Math.max(daysBetween(start, end), 1);
          const pxPerDay =
            colWidth / (zoom === 'day' ? 1 : zoom === 'week' ? 7 : 30);
          const left = offsetDays * pxPerDay;
          const width = spanDays * pxPerDay;

          return (
            <div className="db-timeline__row" key={record.id}>
              <div
                className="db-timeline__bar"
                style={{ left, width }}
                title={`${displayValue(record.values[primaryProp])}: ${start.toLocaleDateString()} - ${end.toLocaleDateString()}`}
              >
                {displayValue(record.values[primaryProp])}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
