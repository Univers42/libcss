import React from 'react';
import { registry } from '@libcss/studio';
import type { ComponentEntry, VariantPreset } from '@libcss/studio';
import { Chart, PALETTE_NAMES, CHART_HEIGHTS } from '../../../src/components/layout';
import type { ChartConfig, ChartType, PaletteName, ChartHeight, GridLineMode, CurveType, DataRecord } from '../../../src/components/layout';
import { MONTHLY_SALES, BROWSER_SHARE, REGIONAL_SALES, STUDENT_SCORES } from './chart-fixtures';

/* ------------------------------------------------------------------ */
/* Dataset mapping                                                     */
/* ------------------------------------------------------------------ */

interface DatasetMeta {
  data: DataRecord[];
  xField: string;
  yField: string;
  xLabel: string;
  yLabel: string;
  groupField?: string;
  categoryField?: string;
  valueField?: string;
}

const DATASETS: Record<string, DatasetMeta> = {
  monthly: {
    data: MONTHLY_SALES,
    xField: 'month', yField: 'revenue',
    xLabel: 'Month', yLabel: 'Revenue ($)',
  },
  browser: {
    data: BROWSER_SHARE,
    xField: 'browser', yField: 'share',
    xLabel: 'Browser', yLabel: 'Market Share (%)',
    categoryField: 'browser', valueField: 'share',
  },
  regional: {
    data: REGIONAL_SALES,
    xField: 'quarter', yField: 'sales',
    xLabel: 'Quarter', yLabel: 'Sales ($)',
    groupField: 'region',
  },
  scatter: {
    data: STUDENT_SCORES,
    xField: 'hours', yField: 'score',
    xLabel: 'Hours Studied', yLabel: 'Test Score',
    categoryField: 'course',
  },
};

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

const CHART_TYPE_OPTIONS = [
  { label: 'Bar', value: 'bar' },
  { label: 'Horizontal Bar', value: 'horizontal-bar' },
  { label: 'Stacked Bar', value: 'stacked-bar' },
  { label: 'Grouped Bar', value: 'grouped-bar' },
  { label: 'Line', value: 'line' },
  { label: 'Area', value: 'area' },
  { label: 'Pie', value: 'pie' },
  { label: 'Donut', value: 'donut' },
  { label: 'Scatter', value: 'scatter' },
  { label: 'Combo', value: 'combo' },
];

const PALETTE_OPTIONS = PALETTE_NAMES.map((n) => ({ label: n.charAt(0).toUpperCase() + n.slice(1), value: n }));

const HEIGHT_OPTIONS = Object.keys(CHART_HEIGHTS).map((k) => ({
  label: `${k.toUpperCase()} (${CHART_HEIGHTS[k as ChartHeight]}px)`,
  value: k,
}));

const GRID_OPTIONS = [
  { label: 'Horizontal', value: 'horizontal' },
  { label: 'Vertical', value: 'vertical' },
  { label: 'Both', value: 'both' },
  { label: 'None', value: 'none' },
];

const CURVE_OPTIONS = [
  { label: 'Smooth', value: 'monotone' },
  { label: 'Linear', value: 'linear' },
  { label: 'Step', value: 'step' },
  { label: 'Natural', value: 'natural' },
];

const DATASET_OPTIONS = [
  { label: 'Monthly Sales', value: 'monthly' },
  { label: 'Browser Share', value: 'browser' },
  { label: 'Regional Sales', value: 'regional' },
  { label: 'Student Scores', value: 'scatter' },
];

function buildConfig(props: Record<string, any>): ChartConfig {
  const type = (props.chartType ?? 'bar') as ChartType;
  const palette = (props.palette ?? 'prisma') as PaletteName;
  const height = (props.chartHeight ?? 'md') as ChartHeight;
  const gridLines = (props.gridLines ?? 'horizontal') as GridLineMode;
  const curveType = (props.curveType ?? 'monotone') as CurveType;
  const dataLabels = props.dataLabels ?? false;
  const animate = props.animate ?? true;
  const showLegend = props.showLegend ?? true;
  const datasetKey = props.dataset ?? 'monthly';
  const ds = DATASETS[datasetKey] ?? DATASETS.monthly;

  const isPie = type === 'pie' || type === 'donut';
  const isGrouped = type === 'stacked-bar' || type === 'grouped-bar';
  const isScatter = type === 'scatter';
  const isCombo = type === 'combo';

  // Pie / donut
  if (isPie) {
    return {
      type,
      data: ds.data,
      categoryField: ds.categoryField ?? ds.xField,
      valueField: ds.valueField ?? ds.yField,
      style: { palette, height, dataLabels: true, animate, showLegend, donutRatio: type === 'donut' ? 0.55 : undefined },
    };
  }

  // Scatter
  if (isScatter) {
    return {
      type: 'scatter',
      data: ds.data,
      xAxis: { field: ds.xField, label: ds.xLabel },
      yAxis: { field: ds.yField, label: ds.yLabel },
      categoryField: ds.categoryField,
      style: { palette, height, animate, showLegend, gridLines },
    };
  }

  // Stacked / grouped bar
  if (isGrouped) {
    const groupField = ds.groupField ?? ds.categoryField ?? 'group';
    return {
      type,
      data: ds.data,
      xAxis: { field: ds.xField, label: ds.xLabel },
      yAxis: { field: ds.yField, label: ds.yLabel, aggregate: 'sum', groupBy: groupField },
      style: { palette, height, gridLines, animate, showLegend, barRadius: 3 },
    };
  }

  // Combo
  if (isCombo) {
    // Pick 2nd numeric field if available
    const fields = Object.keys(ds.data[0] ?? {}).filter((k) => typeof ds.data[0]?.[k] === 'number');
    const f1 = fields[0] ?? ds.yField;
    const f2 = fields.length > 1 ? fields[1] : f1;
    return {
      type: 'combo',
      data: ds.data,
      xAxis: { field: ds.xField, label: ds.xLabel },
      yAxis: { field: f1, label: ds.yLabel },
      series: [
        { field: f1, type: 'bar', label: f1 },
        { field: f2, type: 'line', label: f2 },
      ],
      style: { palette, height, gridLines, animate, showLegend, curveType },
    };
  }

  // Bar, horizontal-bar, line, area
  return {
    type,
    data: ds.data,
    xAxis: { field: ds.xField, label: ds.xLabel },
    yAxis: { field: ds.yField, label: ds.yLabel, aggregate: 'sum' },
    style: { palette, height, gridLines, dataLabels, animate, showLegend, curveType, barRadius: 4 },
  };
}

/* ------------------------------------------------------------------ */
/* Presets                                                             */
/* ------------------------------------------------------------------ */

const chartPresets: VariantPreset[] = [
  { id: 'bar', label: 'Bar Chart', props: { chartType: 'bar', dataset: 'monthly' }, group: 'Chart Types' },
  { id: 'line', label: 'Line Chart', props: { chartType: 'line', dataset: 'monthly', curveType: 'monotone' }, group: 'Chart Types' },
  { id: 'area', label: 'Area Chart', props: { chartType: 'area', dataset: 'monthly' }, group: 'Chart Types' },
  { id: 'pie', label: 'Pie Chart', props: { chartType: 'pie', dataset: 'browser' }, group: 'Chart Types' },
  { id: 'donut', label: 'Donut Chart', props: { chartType: 'donut', dataset: 'browser' }, group: 'Chart Types' },
  { id: 'scatter', label: 'Scatter Plot', props: { chartType: 'scatter', dataset: 'scatter' }, group: 'Chart Types' },
  { id: 'h-bar', label: 'Horizontal Bar', props: { chartType: 'horizontal-bar', dataset: 'monthly' }, group: 'Chart Types' },
  { id: 'stacked', label: 'Stacked Bar', props: { chartType: 'stacked-bar', dataset: 'regional' }, group: 'Chart Types' },
  { id: 'grouped', label: 'Grouped Bar', props: { chartType: 'grouped-bar', dataset: 'regional' }, group: 'Chart Types' },
  { id: 'combo', label: 'Combo Chart', props: { chartType: 'combo', dataset: 'monthly' }, group: 'Chart Types' },
  { id: 'labels-on', label: 'With Data Labels', props: { chartType: 'bar', dataset: 'monthly', dataLabels: true }, group: 'Features' },
  { id: 'no-legend', label: 'No Legend', props: { chartType: 'bar', dataset: 'monthly', showLegend: false }, group: 'Features' },
  { id: 'no-grid', label: 'No Grid', props: { chartType: 'line', dataset: 'monthly', gridLines: 'none' }, group: 'Features' },
];

/* ------------------------------------------------------------------ */
/* Entry                                                               */
/* ------------------------------------------------------------------ */

const entry: ComponentEntry = {
  id: 'chart',
  name: 'Chart',
  category: 'layouts',
  description: 'Metadata-driven chart component — 10 chart types, 10 color palettes, fully configurable axes, grids, labels, tooltips, and animations.',
  tags: ['chart', 'graph', 'bar', 'line', 'pie', 'donut', 'scatter', 'area', 'combo', 'stacked', 'grouped', 'd3', 'data', 'visualization'],
  defaultProps: {
    chartType: 'bar',
    palette: 'prisma',
    chartHeight: 'md',
    gridLines: 'horizontal',
    curveType: 'monotone',
    dataLabels: false,
    animate: true,
    showLegend: true,
    dataset: 'monthly',
  },
  variantDimensions: [
    { prop: 'chartType', label: 'Chart Type', values: ['bar', 'horizontal-bar', 'stacked-bar', 'grouped-bar', 'line', 'area', 'pie', 'donut', 'scatter', 'combo'] },
  ],
  presets: chartPresets,
  controls: [
    {
      key: 'chartType',
      label: 'Chart Type',
      type: 'select',
      group: 'Chart',
      defaultValue: 'bar',
      options: CHART_TYPE_OPTIONS,
    },
    {
      key: 'palette',
      label: 'Palette',
      type: 'select',
      group: 'Appearance',
      defaultValue: 'prisma',
      options: PALETTE_OPTIONS,
    },
    {
      key: 'chartHeight',
      label: 'Height',
      type: 'select',
      group: 'Appearance',
      defaultValue: 'md',
      options: HEIGHT_OPTIONS,
    },
    {
      key: 'gridLines',
      label: 'Grid Lines',
      type: 'select',
      group: 'Appearance',
      defaultValue: 'horizontal',
      options: GRID_OPTIONS,
    },
    {
      key: 'curveType',
      label: 'Curve',
      type: 'select',
      group: 'Appearance',
      defaultValue: 'monotone',
      options: CURVE_OPTIONS,
    },
    {
      key: 'dataset',
      label: 'Dataset',
      type: 'select',
      group: 'Data',
      defaultValue: 'monthly',
      options: DATASET_OPTIONS,
    },
    {
      key: 'dataLabels',
      label: 'Data Labels',
      type: 'boolean',
      group: 'Features',
      defaultValue: false,
    },
    {
      key: 'animate',
      label: 'Animate',
      type: 'boolean',
      group: 'Features',
      defaultValue: true,
    },
    {
      key: 'showLegend',
      label: 'Show Legend',
      type: 'boolean',
      group: 'Features',
      defaultValue: true,
    },
  ],
  render: (props) => {
    const config = buildConfig(props);
    return React.createElement(Chart, { config });
  },
};

registry.register(entry.id, entry);
