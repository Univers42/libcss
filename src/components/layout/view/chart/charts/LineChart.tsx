/**
 * @file LineChart
 * @description Single / multi-series line chart with optional curve interpolation.
 */

import { line, curveMonotoneX, curveLinear, curveStep, curveNatural, curveCatmullRom } from 'd3-shape';
import type { ScaleBand, ScaleLinear } from 'd3-scale';
import type {
  ProcessedDataPoint,
  ProcessedGroupedData,
  ChartDimensions,
  ChartPalette,
  ChartStyle,
  CurveType,
} from '../Chart.types';
import { CLS, ENTER_DELAY_PER_ITEM } from '../Chart.constants';

/* ------------------------------------------------------------------ */

const CURVE_MAP = {
  monotone: curveMonotoneX,
  linear: curveLinear,
  step: curveStep,
  natural: curveNatural,
  catmullRom: curveCatmullRom,
} as const;

/* ------------------------------------------------------------------ */

interface LineChartProps {
  /** Simple single-series data OR grouped multi-series data */
  data: readonly ProcessedDataPoint[] | readonly ProcessedGroupedData[];
  groupKeys?: string[];
  dimensions: ChartDimensions;
  xScale: ScaleBand<string>;
  yScale: ScaleLinear<number, number>;
  palette: ChartPalette;
  style: Required<Pick<ChartStyle, 'animate' | 'animationDuration' | 'curveType' | 'pointRadius'>>;
  colorScale: (key: string) => string;
  onPointHover?: (label: string, group: string | null, value: number, x: number, y: number) => void;
  onPointLeave?: () => void;
}

function isSingle(d: readonly unknown[]): d is readonly ProcessedDataPoint[] {
  return d.length === 0 || !('groups' in (d[0] as object));
}

export function LineChart({
  data,
  groupKeys,
  dimensions,
  xScale,
  yScale,
  style,
  colorScale,
  onPointHover,
  onPointLeave,
}: LineChartProps) {
  const { innerWidth } = dimensions;
  const { animate, animationDuration, curveType, pointRadius } = style;
  const curve = CURVE_MAP[curveType as CurveType] ?? curveMonotoneX;
  const halfBand = xScale.bandwidth() / 2;

  // -- Single series -------------------------------------------------------
  if (isSingle(data)) {
    const gen = line<ProcessedDataPoint>()
      .x((d: ProcessedDataPoint) => (xScale(d.label) ?? 0) + halfBand)
      .y((d: ProcessedDataPoint) => yScale(d.value))
      .curve(curve);

    const pathD = gen(data as ProcessedDataPoint[]) ?? '';

    return (
      <g className={`${CLS}__line-series`}>
        <path
          className={`${CLS}__line`}
          d={pathD}
          fill="none"
          stroke={colorScale('default')}
          strokeWidth={2}
          style={animate ? { strokeDasharray: innerWidth, strokeDashoffset: innerWidth, animation: `prisma-chart-draw ${animationDuration}ms ease-out forwards` } : undefined}
        />
        {data.map((pt, i) => (
          <circle
            key={pt.label}
            className={`${CLS}__point`}
            cx={(xScale(pt.label) ?? 0) + halfBand}
            cy={yScale(pt.value)}
            r={pointRadius}
            fill={colorScale('default')}
            onMouseEnter={(e) => onPointHover?.(pt.label, null, pt.value, e.clientX, e.clientY)}
            onMouseLeave={onPointLeave}
            style={animate ? { opacity: 0, animation: `prisma-chart-fade-in 200ms ease-out ${i * ENTER_DELAY_PER_ITEM}ms forwards` } : undefined}
          />
        ))}
      </g>
    );
  }

  // -- Multi-series (grouped data) -----------------------------------------
  const keys = groupKeys ?? [];

  return (
    <g className={`${CLS}__line-series`}>
      {keys.map((gk, ki) => {
        const points = (data as readonly ProcessedGroupedData[]).map((d) => ({
          label: d.label,
          value: d.groups.get(gk) ?? 0,
        }));

        const gen = line<{ label: string; value: number }>()
          .x((d: { label: string; value: number }) => (xScale(d.label) ?? 0) + halfBand)
          .y((d: { label: string; value: number }) => yScale(d.value))
          .curve(curve);

        const pathD = gen(points) ?? '';

        return (
          <g key={gk}>
            <path
              className={`${CLS}__line`}
              d={pathD}
              fill="none"
              stroke={colorScale(gk)}
              strokeWidth={2}
              style={animate ? { strokeDasharray: innerWidth, strokeDashoffset: innerWidth, animation: `prisma-chart-draw ${animationDuration}ms ease-out ${ki * 100}ms forwards` } : undefined}
            />
            {points.map((pt, pi) => (
              <circle
                key={pt.label}
                className={`${CLS}__point`}
                cx={(xScale(pt.label) ?? 0) + halfBand}
                cy={yScale(pt.value)}
                r={pointRadius}
                fill={colorScale(gk)}
                onMouseEnter={(e) => onPointHover?.(pt.label, gk, pt.value, e.clientX, e.clientY)}
                onMouseLeave={onPointLeave}
                style={animate ? { opacity: 0, animation: `prisma-chart-fade-in 200ms ease-out ${(ki * points.length + pi) * ENTER_DELAY_PER_ITEM}ms forwards` } : undefined}
              />
            ))}
          </g>
        );
      })}
    </g>
  );
}
