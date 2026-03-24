/**
 * @file ComboChart
 * @description Dual-axis combo chart — bar series + line overlay.
 *
 * Uses the primary Y axis for bars and optionally the same or a
 * separate scale for each line series.
 */

import { line, curveMonotoneX } from 'd3-shape';
import type { ScaleBand, ScaleLinear } from 'd3-scale';
import type { ChartDimensions, ChartPalette, ChartStyle, ComboSeries } from '../Chart.types';
import { CLS, ENTER_DELAY_PER_ITEM } from '../Chart.constants';

/* ------------------------------------------------------------------ */

interface ComboDataPoint {
  label: string;
  values: Record<string, number>;
}

interface ComboChartProps {
  data: readonly ComboDataPoint[];
  series: ComboSeries[];
  dimensions: ChartDimensions;
  xScale: ScaleBand<string>;
  yScale: ScaleLinear<number, number>;
  palette: ChartPalette;
  style: Required<Pick<ChartStyle, 'animate' | 'animationDuration' | 'barRadius' | 'pointRadius'>>;
  colorScale: (key: string) => string;
  onHover?: (label: string, series: string, value: number, x: number, y: number) => void;
  onLeave?: () => void;
}

export function ComboChart({
  data,
  series,
  dimensions,
  xScale,
  yScale,
  style,
  colorScale,
  onHover,
  onLeave,
}: ComboChartProps) {
  const { innerHeight, innerWidth } = dimensions;
  const { animate, animationDuration, barRadius, pointRadius } = style;
  const halfBand = xScale.bandwidth() / 2;

  const barSeries = series.filter((s) => s.type === 'bar');
  const lineSeries = series.filter((s) => s.type === 'line');

  // If multiple bar series → split width evenly
  const barWidth = barSeries.length > 0 ? xScale.bandwidth() / barSeries.length : 0;

  return (
    <g className={`${CLS}__combo`}>
      {/* Bars */}
      {barSeries.map((bs, si) =>
        data.map((d, di) => {
          const val = d.values[bs.field] ?? 0;
          const x = (xScale(d.label) ?? 0) + si * barWidth;
          const y = yScale(val);
          const h = Math.max(0, innerHeight - y);

          return (
            <rect
              key={`bar-${bs.field}-${d.label}`}
              className={`${CLS}__bar ${CLS}__bar--combo`}
              x={x}
              y={y}
              width={barWidth}
              height={h}
              rx={barRadius}
              ry={barRadius}
              fill={colorScale(bs.field)}
              onMouseEnter={(e) => onHover?.(d.label, bs.field, val, e.clientX, e.clientY)}
              onMouseLeave={onLeave}
              style={
                animate
                  ? { animation: `prisma-chart-bar-grow ${animationDuration}ms ease-out ${(si * data.length + di) * ENTER_DELAY_PER_ITEM}ms both` }
                  : undefined
              }
            />
          );
        }),
      )}

      {/* Lines */}
      {lineSeries.map((ls, li) => {
        const pts = data.map((d) => ({
          label: d.label,
          value: d.values[ls.field] ?? 0,
        }));

        type Pt = { label: string; value: number };

        const lineGen = line<Pt>()
          .x((d: Pt) => (xScale(d.label) ?? 0) + halfBand)
          .y((d: Pt) => yScale(d.value))
          .curve(curveMonotoneX);

        const pathD = lineGen(pts) ?? '';

        return (
          <g key={`line-${ls.field}`}>
            <path
              className={`${CLS}__line ${CLS}__line--combo`}
              d={pathD}
              fill="none"
              stroke={colorScale(ls.field)}
              strokeWidth={2.5}
              style={
                animate
                  ? { strokeDasharray: innerWidth, strokeDashoffset: innerWidth, animation: `prisma-chart-draw ${animationDuration}ms ease-out ${li * 200}ms forwards` }
                  : undefined
              }
            />
            {pts.map((pt, pi) => (
              <circle
                key={pt.label}
                className={`${CLS}__point ${CLS}__point--combo`}
                cx={(xScale(pt.label) ?? 0) + halfBand}
                cy={yScale(pt.value)}
                r={pointRadius}
                fill={colorScale(ls.field)}
                onMouseEnter={(e) => onHover?.(pt.label, ls.field, pt.value, e.clientX, e.clientY)}
                onMouseLeave={onLeave}
                style={
                  animate
                    ? { opacity: 0, animation: `prisma-chart-fade-in 200ms ease-out ${(li * pts.length + pi) * ENTER_DELAY_PER_ITEM}ms forwards` }
                    : undefined
                }
              />
            ))}
          </g>
        );
      })}
    </g>
  );
}
