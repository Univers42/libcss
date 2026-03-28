/**
 * @file DonutChart
 * @description Ring / donut chart — configurable hollow center with optional stat.
 */

import { arc, pie, type PieArcDatum } from 'd3-shape';
import type { ProcessedPieSlice, ChartDimensions, ChartPalette, ChartStyle } from '../Chart.types';
import { CLS, ENTER_DELAY_PER_ITEM } from '../Chart.constants';

interface DonutChartProps {
  data: readonly ProcessedPieSlice[];
  dimensions: ChartDimensions;
  palette: ChartPalette;
  style: Required<Pick<ChartStyle, 'animate' | 'animationDuration' | 'dataLabels' | 'donutRatio'>>;
  colorScale: (key: string) => string;
  /** Optional value displayed in center */
  centerLabel?: string;
  onSliceHover?: (label: string, value: number, pct: number, x: number, y: number) => void;
  onSliceLeave?: () => void;
}

export function DonutChart({
  data,
  dimensions,
  style,
  colorScale,
  centerLabel,
  onSliceHover,
  onSliceLeave,
}: DonutChartProps) {
  const { innerWidth, innerHeight } = dimensions;
  const { animate, animationDuration, dataLabels, donutRatio } = style;

  const radius = Math.min(innerWidth, innerHeight) / 2;
  const inner = radius * Math.max(0.1, Math.min(0.9, donutRatio));
  const cx = innerWidth / 2;
  const cy = innerHeight / 2;

  const pieGen = pie<ProcessedPieSlice>()
    .value((d: ProcessedPieSlice) => d.value)
    .sort(null);

  const arcGen = arc<PieArcDatum<ProcessedPieSlice>>().innerRadius(inner).outerRadius(radius);

  const labelArc = arc<PieArcDatum<ProcessedPieSlice>>()
    .innerRadius((radius + inner) / 2)
    .outerRadius((radius + inner) / 2);

  const arcs = pieGen(data as ProcessedPieSlice[]);

  return (
    <g className={`${CLS}__donut`} transform={`translate(${cx},${cy})`}>
      {arcs.map((a: PieArcDatum<ProcessedPieSlice>, i: number) => {
        const [lx, ly] = labelArc.centroid(a);
        return (
          <g key={a.data.label}>
            <path
              className={`${CLS}__slice ${CLS}__slice--donut`}
              d={arcGen(a) ?? ''}
              fill={colorScale(a.data.label)}
              stroke="var(--prisma-surface, #fff)"
              strokeWidth={2}
              onMouseEnter={(e) =>
                onSliceHover?.(a.data.label, a.data.value, a.data.percentage, e.clientX, e.clientY)
              }
              onMouseLeave={onSliceLeave}
              style={
                animate
                  ? {
                      opacity: 0,
                      animation: `prisma-chart-fade-in ${animationDuration}ms ease-out ${i * ENTER_DELAY_PER_ITEM * 2}ms forwards`,
                    }
                  : undefined
              }
            />
            {dataLabels && a.data.percentage > 5 && (
              <text
                className={`${CLS}__slice-label`}
                x={lx}
                y={ly}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={11}
                fill="var(--prisma-on-surface, #222)"
                pointerEvents="none"
              >
                {`${Math.round(a.data.percentage)}%`}
              </text>
            )}
          </g>
        );
      })}

      {/* Center label */}
      {centerLabel && (
        <text
          className={`${CLS}__donut-center`}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={Math.max(14, inner * 0.35)}
          fontWeight={600}
          fill="var(--prisma-text, #333)"
        >
          {centerLabel}
        </text>
      )}
    </g>
  );
}
