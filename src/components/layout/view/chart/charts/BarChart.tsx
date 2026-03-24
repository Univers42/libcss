/**
 * @file BarChart
 * @description Vertical bar chart variant with animated entry, data labels, tooltips.
 */

import type { ScaleBand, ScaleLinear } from 'd3-scale';
import type { ProcessedDataPoint, ChartDimensions, ChartPalette, ChartStyle } from '../Chart.types';
import { CLS, ENTER_DELAY_PER_ITEM } from '../Chart.constants';
import { DataLabels } from '../core/data-labels';

interface BarChartProps {
  data: readonly ProcessedDataPoint[];
  dimensions: ChartDimensions;
  xScale: ScaleBand<string>;
  yScale: ScaleLinear<number, number>;
  palette: ChartPalette;
  style: Required<Pick<ChartStyle, 'animate' | 'animationDuration' | 'dataLabels' | 'barRadius' | 'barGap'>>;
  colorScale: (key: string) => string;
  onBarHover?: (point: ProcessedDataPoint, x: number, y: number) => void;
  onBarLeave?: () => void;
  onBarClick?: (point: ProcessedDataPoint) => void;
}

export function BarChart({
  data,
  dimensions,
  xScale,
  yScale,
  style,
  colorScale,
  onBarHover,
  onBarLeave,
  onBarClick,
}: BarChartProps) {
  const { innerHeight } = dimensions;
  const { animate, animationDuration, dataLabels, barRadius } = style;

  return (
    <g className={`${CLS}__bars`}>
      {data.map((d, i) => {
        const x = xScale(d.label) ?? 0;
        const y = yScale(d.value);
        const w = xScale.bandwidth();
        const h = Math.max(0, innerHeight - y);

        return (
          <rect
            key={d.label}
            className={`${CLS}__bar`}
            x={x}
            y={y}
            width={w}
            height={h}
            rx={barRadius}
            ry={barRadius}
            fill={colorScale(d.label)}
            onMouseEnter={(e) =>
              onBarHover?.(d, e.clientX, e.clientY)
            }
            onMouseLeave={onBarLeave}
            onClick={() => onBarClick?.(d)}
            style={
              animate
                ? {
                    animation: `prisma-chart-bar-grow ${animationDuration}ms ease-out ${i * ENTER_DELAY_PER_ITEM}ms both`,
                  }
                : undefined
            }
          />
        );
      })}

      {dataLabels && (
        <DataLabels
          items={data.map((d) => ({
            x: (xScale(d.label) ?? 0) + xScale.bandwidth() / 2,
            y: yScale(d.value),
            value: d.value,
          }))}
          color={style.animate ? undefined : undefined}
          animate={animate}
          animationDuration={animationDuration}
        />
      )}
    </g>
  );
}
