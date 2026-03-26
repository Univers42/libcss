import { useMemo } from 'react';
import { Chart } from '../chart';
import type { ChartConfig, DataRecord } from '../chart';
import type { DatabaseViewProps } from '../types';

/**
 * Chart view — wraps the D3-based `<Chart />` component from the library.
 * Adapts database records into `DataRecord[]` and auto-configures axes.
 * BEM root: `.db-chart`
 */
export function ChartView({
  schema,
  records,
  viewConfig,
}: DatabaseViewProps) {
  const xAxisId =
    viewConfig?.chartOptions?.xAxis ??
    schema.properties.find(
      (p) => p.type === 'select' || p.type === 'status',
    )?.id ??
    '';
  const yAxisId =
    viewConfig?.chartOptions?.yAxis ??
    schema.properties.find((p) => p.type === 'number')?.id ??
    '';

  const xProp = schema.properties.find((p) => p.id === xAxisId);
  const yProp = schema.properties.find((p) => p.id === yAxisId);

  // Convert DatabaseRecord[] → DataRecord[] for the Chart component
  const data = useMemo<DataRecord[]>(() => {
    return records.map((r) => {
      const row: Record<string, string | number | boolean | null> = {};
      for (const prop of schema.properties) {
        const raw = r.values[prop.id];
        if (raw == null) {
          row[prop.id] = null;
        } else if (typeof raw === 'string' || typeof raw === 'number' || typeof raw === 'boolean') {
          row[prop.id] = raw;
        } else if (Array.isArray(raw)) {
          row[prop.id] = raw.join(', ');
        } else {
          row[prop.id] = String(raw);
        }
      }
      return row;
    });
  }, [records, schema.properties]);

  // Resolve the chart type from viewConfig, default to 'bar'
  const chartType = viewConfig?.chartOptions?.chartType ?? 'bar';

  // Build the ChartConfig for the D3 Chart component
  const config = useMemo<ChartConfig>(() => {
    return {
      type: chartType as ChartConfig['type'],
      data,
      xAxis: xProp
        ? {
            field: xProp.id,
            label: xProp.name,
            aggregate: 'sum',
          }
        : undefined,
      yAxis: yProp
        ? {
            field: yProp.id,
            label: yProp.name,
          }
        : undefined,
      categoryField: xProp?.id,
      valueField: yProp?.id,
      style: {
        palette: 'prisma',
        height: 'md',
        gridLines: 'horizontal',
        showLegend: true,
        showTooltip: true,
        animate: true,
      },
    };
  }, [data, xProp, yProp, chartType]);

  return (
    <div className="db-chart">
      <Chart config={config} />
    </div>
  );
}
