/**
 * @file PieChart
 * @description Full-circle pie chart using D3 arc + pie generators.
 */

import { arc, pie, type PieArcDatum } from 'd3-shape';
import type { ProcessedPieSlice, ChartDimensions, ChartPalette, ChartStyle } from '../Chart.types';
import { CLS, ENTER_DELAY_PER_ITEM } from '../Chart.constants';

interface PieChartProps {
  data: readonly ProcessedPieSlice[];
  dimensions: ChartDimensions;
  palette: ChartPalette;
  style: Required<Pick<ChartStyle, 'animate' | 'animationDuration' | 'dataLabels'>>;
  colorScale: (key: string) => string;
  onSliceHover?: (label: string, value: number, pct: number, x: number, y: number) => void;
  onSliceLeave?: () => void;
}

export function PieChart({
  data,
  dimensions,
  style,
  colorScale,
  onSliceHover,
  onSliceLeave,
}: PieChartProps) {
  const { innerWidth, innerHeight } = dimensions;
  const { animate, animationDuration, dataLabels } = style;

  const radius = Math.min(innerWidth, innerHeight) / 2;
  const cx = innerWidth / 2;
  const cy = innerHeight / 2;

  const pieGen = pie<ProcessedPieSlice>()
    .value((d: ProcessedPieSlice) => d.value)
    .sort(null);

  const arcGen = arc<PieArcDatum<ProcessedPieSlice>>().innerRadius(0).outerRadius(radius);

  const labelArc = arc<PieArcDatum<ProcessedPieSlice>>()
    .innerRadius(radius * 0.6)
    .outerRadius(radius * 0.6);

  const arcs = pieGen(data as ProcessedPieSlice[]);

  return (
    <g className={`${CLS}__pie`} transform={`translate(${cx},${cy})`}>
      {arcs.map((a: PieArcDatum<ProcessedPieSlice>, i: number) => {
        const [lx, ly] = labelArc.centroid(a);
        return (
          <g key={a.data.label}>
            <path
              className={`${CLS}__slice`}
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
            {dataLabels && a.data.percentage > 4 && (
              <text
                className={`${CLS}__slice-label`}
                x={lx}
                y={ly}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={12}
                fill="var(--prisma-on-surface, #222)"
                pointerEvents="none"
              >
                {`${Math.round(a.data.percentage)}%`}
              </text>
            )}
          </g>
        );
      })}
    </g>
  );
}
