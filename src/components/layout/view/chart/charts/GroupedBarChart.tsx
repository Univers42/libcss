/**
 * @file GroupedBarChart
 * @description Side-by-side grouped vertical bar chart — one sub-bar per group key.
 */

import { scaleBand } from 'd3-scale';
import type { ScaleBand, ScaleLinear } from 'd3-scale';
import type { ProcessedGroupedData, ChartDimensions, ChartPalette, ChartStyle } from '../Chart.types';
import { CLS, ENTER_DELAY_PER_ITEM } from '../Chart.constants';

interface GroupedBarChartProps {
  data: readonly ProcessedGroupedData[];
  groupKeys: string[];
  dimensions: ChartDimensions;
  xScale: ScaleBand<string>;
  yScale: ScaleLinear<number, number>;
  palette: ChartPalette;
  style: Required<Pick<ChartStyle, 'animate' | 'animationDuration' | 'barRadius' | 'barGap'>>;
  colorScale: (key: string) => string;
  onBarHover?: (label: string, group: string, value: number, x: number, y: number) => void;
  onBarLeave?: () => void;
}

export function GroupedBarChart({
  data,
  groupKeys,
  dimensions,
  xScale,
  yScale,
  style,
  colorScale,
  onBarHover,
  onBarLeave,
}: GroupedBarChartProps) {
  const { innerHeight } = dimensions;
  const { animate, animationDuration, barRadius, barGap } = style;

  // nested band scale within each category
  const x1 = scaleBand()
    .domain(groupKeys)
    .rangeRound([0, xScale.bandwidth()])
    .padding(barGap);

  return (
    <g className={`${CLS}__grouped-bars`}>
      {data.map((d, di) => {
        const xBase = xScale(d.label) ?? 0;

        return (
          <g key={d.label} transform={`translate(${xBase},0)`}>
            {groupKeys.map((gk, gi) => {
              const val = d.groups.get(gk) ?? 0;
              const bx = x1(gk) ?? 0;
              const bw = x1.bandwidth();
              const by = yScale(val);
              const bh = Math.max(0, innerHeight - by);

              return (
                <rect
                  key={gk}
                  className={`${CLS}__bar ${CLS}__bar--grouped`}
                  x={bx}
                  y={by}
                  width={bw}
                  height={bh}
                  rx={barRadius}
                  ry={barRadius}
                  fill={colorScale(gk)}
                  onMouseEnter={(e) => onBarHover?.(d.label, gk, val, e.clientX, e.clientY)}
                  onMouseLeave={onBarLeave}
                  style={
                    animate
                      ? {
                          animation: `prisma-chart-bar-grow ${animationDuration}ms ease-out ${(di * groupKeys.length + gi) * ENTER_DELAY_PER_ITEM}ms both`,
                        }
                      : undefined
                  }
                />
              );
            })}
          </g>
        );
      })}
    </g>
  );
}
