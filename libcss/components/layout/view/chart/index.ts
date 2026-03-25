// Chart layout — public API
export { Chart } from './Chart';
export { DataProvider } from './core/data-provider';
export { DataProviderScope, useDataProvider } from './core/data-context';
export { getPalette, getColor, PALETTE_NAMES, PALETTES } from './palettes';

// Types
export type {
  ChartConfig,
  ChartProps,
  ChartType,
  ChartStyle,
  ChartPalette,
  PaletteName,
  ChartHeight,
  GridLineMode,
  AxisNameMode,
  CurveType,
  AxisConfig,
  YAxisConfig,
  ChartFilter,
  FilterOperator,
  AggregateFunction,
  SortDirection,
  ComboSeries,
  DataRecord,
  ProcessedDataPoint,
  ProcessedGroupedData,
  ProcessedPieSlice,
  ProcessedScatterPoint,
  ChartDimensions,
  ChartMargins,
} from './Chart.types';

// Constants
export {
  CHART_HEIGHTS,
  DEFAULT_MARGINS,
  DEFAULT_STYLE,
  AGGREGATE_LABELS,
  CURVE_LABELS,
} from './Chart.constants';
