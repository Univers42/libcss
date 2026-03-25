/**
 * @file Chart Types
 * @description Complete type system for the metadata-driven chart layout.
 * Charts consume a `ChartConfig` object that declares everything:
 * data source, axes, grouping, filtering, and visual style.
 */

import type { ReactNode } from 'react';

// ─── Chart Variants ────────────────────────────────────
export type ChartType =
  | 'bar'
  | 'horizontal-bar'
  | 'stacked-bar'
  | 'grouped-bar'
  | 'line'
  | 'area'
  | 'pie'
  | 'donut'
  | 'scatter'
  | 'combo';

// ─── Palette ───────────────────────────────────────────
export type PaletteName =
  | 'prisma'
  | 'ocean'
  | 'forest'
  | 'sunset'
  | 'neon'
  | 'pastel'
  | 'earth'
  | 'monochrome'
  | 'corporate'
  | 'contrast';

export interface ChartPalette {
  readonly name: PaletteName;
  readonly colors: readonly string[];
  readonly background?: string;
  readonly gridColor?: string;
  readonly axisColor?: string;
  readonly textColor?: string;
}

// ─── Aggregation ───────────────────────────────────────
export type AggregateFunction = 'sum' | 'count' | 'average' | 'min' | 'max' | 'median';

export type SortDirection = 'ascending' | 'descending' | 'none';

// ─── Axis Configuration ────────────────────────────────
export interface AxisConfig {
  /** Database field / attribute to display on this axis. */
  readonly field: string;
  /** Sort direction for axis values. */
  readonly sort?: SortDirection;
  /** Whether to omit data points where value is zero. */
  readonly omitZeroValues?: boolean;
  /** Custom label for the axis. Falls back to `field` name. */
  readonly label?: string;
  /** Date format string if the field is temporal. */
  readonly dateFormat?: string;
}

export interface YAxisConfig extends AxisConfig {
  /** How to compute the Y value from grouped data. */
  readonly aggregate?: AggregateFunction;
  /** Field to group data by before aggregation. */
  readonly groupBy?: string;
  /** Whether to display cumulative values. */
  readonly cumulative?: boolean;
  /** Range mode: 'auto' calculates from data; or set explicit min/max. */
  readonly range?: 'auto' | { min: number; max: number };
  /** Show a horizontal reference line at this value. */
  readonly referenceLine?: number | { value: number; label?: string; color?: string };
}

// ─── Data Filtering ────────────────────────────────────
export type FilterOperator =
  | 'eq'
  | 'neq'
  | 'gt'
  | 'gte'
  | 'lt'
  | 'lte'
  | 'contains'
  | 'in'
  | 'not-in';

export interface ChartFilter {
  readonly field: string;
  readonly operator: FilterOperator;
  readonly value: unknown;
}

// ─── Style Configuration ───────────────────────────────
export type ChartHeight = 'sm' | 'md' | 'lg' | 'xl';
export type GridLineMode = 'horizontal' | 'vertical' | 'both' | 'none';
export type AxisNameMode = 'both' | 'x-axis' | 'y-axis' | 'none';
export type CurveType = 'linear' | 'monotone' | 'step' | 'natural';

export interface ChartStyle {
  /** Color palette name. */
  readonly palette?: PaletteName;
  /** Chart container height preset. */
  readonly height?: ChartHeight;
  /** Which grid lines to display. */
  readonly gridLines?: GridLineMode;
  /** Which axis labels to show. */
  readonly axisNames?: AxisNameMode;
  /** Show value labels on data elements. */
  readonly dataLabels?: boolean;
  /** Figure caption below the chart. */
  readonly caption?: string;
  /** Enable enter/update animations. */
  readonly animate?: boolean;
  /** Animation duration in ms. */
  readonly animationDuration?: number;
  /** Curve interpolation for line/area charts. */
  readonly curveType?: CurveType;
  /** Show legend. */
  readonly showLegend?: boolean;
  /** Show tooltip on hover. */
  readonly showTooltip?: boolean;
  /** Inner radius ratio for donut charts (0–1). */
  readonly donutRatio?: number;
  /** Corner radius for bars. */
  readonly barRadius?: number;
  /** Gap between bars as ratio (0–1). */
  readonly barGap?: number;
  /** Point radius for scatter/line charts. */
  readonly pointRadius?: number;
}

// ─── Combo Chart Series ────────────────────────────────
export interface ComboSeries {
  readonly field: string;
  readonly type: 'bar' | 'line';
  readonly label?: string;
  readonly color?: string;
  readonly yAxisSide?: 'left' | 'right';
}

// ─── Main Chart Configuration ──────────────────────────

/** A single data record — keys are field names, values are primitives. */
export type DataRecord = Record<string, string | number | boolean | null | undefined>;

export interface ChartConfig {
  /** Which chart type to render. */
  readonly type: ChartType;
  /** Raw data array. Each record is a row from the source. */
  readonly data: readonly DataRecord[];
  /** X-axis configuration. Not used by pie/donut. */
  readonly xAxis?: AxisConfig;
  /** Y-axis configuration. Not used by pie/donut. */
  readonly yAxis?: YAxisConfig;
  /** Field for category in pie/donut, or for color-grouping in bar/line. */
  readonly categoryField?: string;
  /** Field for value in pie/donut. */
  readonly valueField?: string;
  /** Filters to apply before rendering. */
  readonly filters?: readonly ChartFilter[];
  /** Visual style overrides. */
  readonly style?: ChartStyle;
  /** Series definitions for combo charts. */
  readonly series?: readonly ComboSeries[];
}

// ─── Internal Processed Types ──────────────────────────

/** Data after transforms (filter, sort, aggregate, cumulative). */
export interface ProcessedDataPoint {
  readonly label: string;
  readonly value: number;
  readonly group?: string;
  readonly raw?: DataRecord;
}

export interface ProcessedGroupedData {
  readonly label: string;
  readonly groups: ReadonlyMap<string, number>;
  readonly total: number;
}

export interface ProcessedPieSlice {
  readonly label: string;
  readonly value: number;
  readonly percentage: number;
}

export interface ProcessedScatterPoint {
  readonly x: number;
  readonly y: number;
  readonly label?: string;
  readonly group?: string;
  readonly raw?: DataRecord;
}

// ─── Chart Dimensions ──────────────────────────────────
export interface ChartMargins {
  readonly top: number;
  readonly right: number;
  readonly bottom: number;
  readonly left: number;
}

export interface ChartDimensions {
  readonly width: number;
  readonly height: number;
  readonly margins: ChartMargins;
  readonly innerWidth: number;
  readonly innerHeight: number;
}

// ─── Component Props ───────────────────────────────────
export interface ChartProps {
  /** Full chart configuration metadata. */
  readonly config: ChartConfig;
  /** Additional CSS class. */
  readonly className?: string;
  /** Explicit width override (default: 100% responsive). */
  readonly width?: number;
  /** Explicit height override (overrides style.height). */
  readonly height?: number;
  /** Called when a data element is clicked. */
  readonly onDataClick?: (
    point: ProcessedDataPoint | ProcessedPieSlice | ProcessedScatterPoint,
  ) => void;
  /** Render prop for custom tooltip content. */
  readonly renderTooltip?: (
    point: ProcessedDataPoint | ProcessedPieSlice | ProcessedScatterPoint,
  ) => ReactNode;
}

/** Props passed internally to each chart variant renderer. */
export interface ChartVariantProps {
  readonly data: readonly ProcessedDataPoint[];
  readonly groupedData?: readonly ProcessedGroupedData[];
  readonly pieData?: readonly ProcessedPieSlice[];
  readonly scatterData?: readonly ProcessedScatterPoint[];
  readonly dimensions: ChartDimensions;
  readonly palette: ChartPalette;
  readonly style: Required<
    Pick<
      ChartStyle,
      | 'animate'
      | 'animationDuration'
      | 'dataLabels'
      | 'curveType'
      | 'donutRatio'
      | 'barRadius'
      | 'barGap'
      | 'pointRadius'
      | 'showLegend'
    >
  >;
  readonly xScale: any;
  readonly yScale: any;
  readonly colorScale: (key: string) => string;
  readonly onDataClick?: ChartProps['onDataClick'];
  readonly renderTooltip?: ChartProps['renderTooltip'];
}
