/**
 * @file Data Transforms
 * @description Pure functions that convert raw ChartConfig + DataProvider
 * into processed data structures ready for rendering.
 */

import { DataProvider } from './data-provider';
import type {
  ChartConfig,
  ProcessedDataPoint,
  ProcessedGroupedData,
  ProcessedPieSlice,
  ProcessedScatterPoint,
} from '../Chart.types';

/** Run all transforms: filter → sort → omitZeros → aggregate → cumulative. */
export function processCartesianData(config: ChartConfig): ProcessedDataPoint[] {
  const { data, xAxis, yAxis, filters } = config;
  let dp = new DataProvider(data);

  // Filter
  if (filters?.length) dp = dp.filter(filters);

  // Sort
  if (xAxis?.sort && xAxis.sort !== 'none') {
    dp = dp.sort(xAxis.field, xAxis.sort);
  }

  // Omit zeros
  if (xAxis?.omitZeroValues && yAxis?.field) {
    dp = dp.omitZeros(yAxis.field);
  }

  // Aggregate
  const xField = xAxis?.field ?? 'x';
  const yField = yAxis?.field ?? 'y';
  const fn = yAxis?.aggregate ?? 'sum';
  let points = dp.aggregate(xField, yField, fn);

  // Cumulative
  if (yAxis?.cumulative) {
    points = DataProvider.toCumulative(points);
  }

  return points;
}

/** Process grouped data for stacked/grouped bars. */
export function processGroupedData(config: ChartConfig): ProcessedGroupedData[] {
  const { data, xAxis, yAxis, filters } = config;
  let dp = new DataProvider(data);

  if (filters?.length) dp = dp.filter(filters);
  if (xAxis?.sort && xAxis.sort !== 'none') {
    dp = dp.sort(xAxis.field, xAxis.sort);
  }

  const xField = xAxis?.field ?? 'x';
  const yField = yAxis?.field ?? 'y';
  const groupField = yAxis?.groupBy ?? config.categoryField ?? 'group';
  const fn = yAxis?.aggregate ?? 'sum';

  return dp.groupBy(xField, yField, groupField, fn);
}

/** Process pie/donut data. */
export function processPieData(config: ChartConfig): ProcessedPieSlice[] {
  const { data, filters, categoryField, valueField } = config;
  let dp = new DataProvider(data);

  if (filters?.length) dp = dp.filter(filters);

  const catField = categoryField ?? 'category';
  const valField = valueField ?? 'value';
  const fn = config.yAxis?.aggregate ?? 'sum';

  return dp.toPieSlices(catField, valField, fn);
}

/** Process scatter data. */
export function processScatterData(config: ChartConfig): ProcessedScatterPoint[] {
  const { data, xAxis, yAxis, filters, categoryField } = config;
  let dp = new DataProvider(data);

  if (filters?.length) dp = dp.filter(filters);
  if (xAxis?.sort && xAxis.sort !== 'none') {
    dp = dp.sort(xAxis.field, xAxis.sort);
  }

  return dp.toScatterPoints(xAxis?.field ?? 'x', yAxis?.field ?? 'y', categoryField);
}

/** Get all unique group keys from grouped data. */
export function getGroupKeys(grouped: readonly ProcessedGroupedData[]): string[] {
  const keys = new Set<string>();
  for (const d of grouped) {
    for (const k of d.groups.keys()) {
      keys.add(k);
    }
  }
  return [...keys];
}
