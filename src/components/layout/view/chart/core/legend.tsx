/**
 * @file ChartLegend
 * @description Color-keyed legend component for chart series.
 */

import { CLS, LEGEND_ITEM_GAP } from '../Chart.constants';

interface LegendItem {
  label: string;
  color: string;
}

interface ChartLegendProps {
  items: LegendItem[];
  textColor?: string;
}

export function ChartLegend({ items, textColor }: ChartLegendProps) {
  if (items.length === 0) return null;

  return (
    <div className={`${CLS}__legend`}>
      {items.map((item) => (
        <span
          key={item.label}
          className={`${CLS}__legend-item`}
          style={{ marginRight: LEGEND_ITEM_GAP }}
        >
          <span className={`${CLS}__legend-swatch`} style={{ backgroundColor: item.color }} />
          <span className={`${CLS}__legend-label`} style={{ color: textColor }}>
            {item.label}
          </span>
        </span>
      ))}
    </div>
  );
}
