import { useMemo } from 'react';
import type { DatabaseViewProps } from '../types';

/**
 * Dashboard view — stats widgets auto-fit grid.
 * BEM root: `.db-dashboard`
 *
 * SCSS classes used:
 *   __widget, __widget-title, __stat, __stat-label
 */
export function DashboardView({
  schema,
  records,
}: DatabaseViewProps) {
  // Build stats from schema
  const widgets = useMemo(() => {
    const w: {
      id: string;
      title: string;
      value: string;
      subtitle?: string;
      color?: string;
    }[] = [];

    // Total records
    w.push({
      id: 'total',
      title: 'Total Records',
      value: String(records.length),
      color: '#2383e2',
    });

    // For each select/status → count breakdown
    for (const prop of schema.properties) {
      if (prop.type === 'status' || prop.type === 'select') {
        const options =
          prop.type === 'status'
            ? prop.config?.statusOptions
            : prop.config?.options;
        if (!options) continue;

        for (const opt of options) {
          const count = records.filter((r) => {
            const v = r.values[prop.id];
            return v === opt.id || v === opt.label;
          }).length;
          if (count > 0) {
            w.push({
              id: `${prop.id}_${opt.id}`,
              title: opt.label,
              value: String(count),
              subtitle: prop.name,
              color: opt.color,
            });
          }
        }
      }

      // For number props → sum + average
      if (prop.type === 'number') {
        const values = records
          .map((r) => r.values[prop.id])
          .filter((v): v is number => typeof v === 'number');
        if (values.length > 0) {
          const sum = values.reduce((a, b) => a + b, 0);
          const avg = sum / values.length;

          const fmt =
            prop.config?.numberFormat === 'currency'
              ? (n: number) =>
                  `${prop.config?.currency ?? '$'}${n.toLocaleString()}`
              : prop.config?.numberFormat === 'percent'
                ? (n: number) => `${n}%`
                : (n: number) => n.toLocaleString();

          w.push({
            id: `${prop.id}_sum`,
            title: `Total ${prop.name}`,
            value: fmt(sum),
            subtitle: `Sum of ${values.length} values`,
            color: '#6c8ebf',
          });
          w.push({
            id: `${prop.id}_avg`,
            title: `Avg ${prop.name}`,
            value: fmt(Math.round(avg * 100) / 100),
            subtitle: 'Average',
            color: '#82b366',
          });
        }
      }

      // Checkbox → completion rate
      if (prop.type === 'checkbox') {
        const checked = records.filter(
          (r) => r.values[prop.id] === true,
        ).length;
        const pct =
          records.length > 0
            ? Math.round((checked / records.length) * 100)
            : 0;
        w.push({
          id: `${prop.id}_check`,
          title: prop.name,
          value: `${pct}%`,
          subtitle: `${checked} / ${records.length} checked`,
          color: '#d6a23e',
        });
      }
    }

    return w;
  }, [records, schema]);

  return (
    <div className="db-dashboard">
      {widgets.map((widget) => (
        <div className="db-dashboard__widget" key={widget.id}>
          <div className="db-dashboard__widget-title">{widget.title}</div>
          <div
            className="db-dashboard__stat"
            style={widget.color ? { color: widget.color } : undefined}
          >
            {widget.value}
          </div>
          {widget.subtitle && (
            <div className="db-dashboard__stat-label">
              {widget.subtitle}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
