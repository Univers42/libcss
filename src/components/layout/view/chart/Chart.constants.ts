/**
 * @file Chart Constants
 * @description Default values for all chart configuration options.
 */

import type {
  ChartStyle,
  ChartHeight,
  ChartMargins,
  AggregateFunction,
  CurveType,
} from './Chart.types';

export const CHART_HEIGHTS: Record<ChartHeight, number> = {
  sm: 240,
  md: 360,
  lg: 480,
  xl: 600,
};

export const DEFAULT_MARGINS: ChartMargins = {
  top: 20,
  right: 20,
  bottom: 40,
  left: 50,
};

export const PIE_MARGINS: ChartMargins = {
  top: 20,
  right: 20,
  bottom: 30,
  left: 20,
};

export const DEFAULT_STYLE: Required<ChartStyle> = {
  palette: 'prisma',
  height: 'md',
  gridLines: 'horizontal',
  axisNames: 'both',
  dataLabels: false,
  caption: '',
  animate: true,
  animationDuration: 600,
  curveType: 'monotone',
  showLegend: true,
  showTooltip: true,
  donutRatio: 0.55,
  barRadius: 4,
  barGap: 0.2,
  pointRadius: 4,
};

export const AGGREGATE_LABELS: Record<AggregateFunction, string> = {
  sum: 'Sum',
  count: 'Count',
  average: 'Average',
  min: 'Min',
  max: 'Max',
  median: 'Median',
};

export const CURVE_LABELS: Record<CurveType, string> = {
  linear: 'Linear',
  monotone: 'Smooth',
  step: 'Step',
  natural: 'Natural',
};

export const CLS = 'prisma-chart' as const;

export const ENTER_DELAY_PER_ITEM = 30;
export const MIN_ANIMATION_DURATION = 200;
export const MAX_ANIMATION_DURATION = 1500;

export const MAX_TICK_LABEL_LENGTH = 14;
export const TOOLTIP_OFFSET = 12;
export const LEGEND_ITEM_GAP = 16;
export const DATA_LABEL_OFFSET = 8;
