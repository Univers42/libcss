import { useMemo, useState, useCallback } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@libcss/components/atoms/Icon';
import type { DatabaseViewProps } from '../types';
import { displayValue } from '../types';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

function startOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}
function endOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth() + 1, 0);
}
function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

/**
 * Calendar view — month grid with events placed on their date.
 * BEM root: `.db-calendar`
 *
 * SCSS classes used:
 *   __header, __nav, __month-label
 *   __grid, __day-header
 *   __day, __day--today, __day--outside
 *   __day-number, __event
 */
export function CalendarView({
  schema,
  records,
  viewConfig,
}: DatabaseViewProps) {
  const [current, setCurrent] = useState(() => startOfMonth(new Date()));

  const dateProp =
    viewConfig?.calendarOptions?.dateProperty ??
    schema.properties.find((p) => p.type === 'date')?.id ??
    '';

  const primaryProp = schema.primaryProperty;

  // Build calendar grid cells
  const cells = useMemo(() => {
    const first = startOfMonth(current);
    const last = endOfMonth(current);
    const startDay = first.getDay();

    const cells: { date: Date; inMonth: boolean }[] = [];

    // Padding before
    for (let i = startDay - 1; i >= 0; i--) {
      const d = new Date(first);
      d.setDate(d.getDate() - i - 1);
      cells.push({ date: d, inMonth: false });
    }
    // Days of month
    for (let d = 1; d <= last.getDate(); d++) {
      cells.push({
        date: new Date(current.getFullYear(), current.getMonth(), d),
        inMonth: true,
      });
    }
    // Padding after
    while (cells.length % 7 !== 0) {
      const d = new Date(last);
      d.setDate(
        d.getDate() + (cells.length - (startDay + last.getDate())) + 1,
      );
      cells.push({ date: d, inMonth: false });
    }

    return cells;
  }, [current]);

  // Map records to dates
  const dateMap = useMemo(() => {
    const map = new Map<string, typeof records>();
    for (const record of records) {
      const raw = record.values[dateProp];
      if (!raw || typeof raw !== 'string') continue;
      const date = new Date(raw);
      if (isNaN(date.getTime())) continue;
      const key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
      const list = map.get(key) ?? [];
      list.push(record);
      map.set(key, list);
    }
    return map;
  }, [records, dateProp]);

  const prevMonth = useCallback(() => {
    setCurrent((c) => new Date(c.getFullYear(), c.getMonth() - 1, 1));
  }, []);

  const nextMonth = useCallback(() => {
    setCurrent((c) => new Date(c.getFullYear(), c.getMonth() + 1, 1));
  }, []);

  const today = new Date();

  return (
    <div className="db-calendar">
      {/* Header — SCSS: __header, __nav, __month-label */}
      <div className="db-calendar__header">
        <div className="db-calendar__nav">
          <button onClick={prevMonth} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <ChevronLeftIcon size="sm" />
          </button>
          <span className="db-calendar__month-label">
            {MONTHS[current.getMonth()]} {current.getFullYear()}
          </span>
          <button onClick={nextMonth} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <ChevronRightIcon size="sm" />
          </button>
        </div>
      </div>

      {/* Grid — SCSS: __grid, __day-header, __day */}
      <div className="db-calendar__grid">
        {/* Day column headers */}
        {DAYS.map((d) => (
          <div className="db-calendar__day-header" key={d}>
            {d}
          </div>
        ))}

        {/* Day cells */}
        {cells.map((cell, i) => {
          const key = `${cell.date.getFullYear()}-${cell.date.getMonth()}-${cell.date.getDate()}`;
          const events = dateMap.get(key) ?? [];
          const isToday = isSameDay(cell.date, today);

          return (
            <div
              key={i}
              className={[
                'db-calendar__day',
                !cell.inMonth && 'db-calendar__day--outside',
                isToday && 'db-calendar__day--today',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <span className="db-calendar__day-number">
                {cell.date.getDate()}
              </span>
              {events.slice(0, 3).map((record) => (
                <div className="db-calendar__event" key={record.id}>
                  {displayValue(record.values[primaryProp])}
                </div>
              ))}
              {events.length > 3 && (
                <div className="db-calendar__event" style={{ opacity: 0.6 }}>
                  +{events.length - 3} more
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
