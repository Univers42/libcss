/**
 * @file Chart Gallery Datasets
 * @description Rich, realistic fake datasets that simulate production databases.
 * Each dataset is paired with a ChartConfig showcasing a different chart type
 * and demonstrating advanced capabilities (aggregation, groupBy, filtering,
 * cumulative, reference lines, curve types, etc.).
 */

import type { ChartConfig, DataRecord } from '../../../src/components/layout';

// ═══════════════════════════════════════════════════════
//  1. BAR — Department Revenue (aggregate sum + reference line)
// ═══════════════════════════════════════════════════════
const DEPARTMENT_REVENUE: DataRecord[] = [
  { department: 'Engineering', revenue: 482000 },
  { department: 'Sales', revenue: 371000 },
  { department: 'Marketing', revenue: 245000 },
  { department: 'Operations', revenue: 198000 },
  { department: 'Finance', revenue: 167000 },
  { department: 'HR', revenue: 89000 },
  { department: 'Legal', revenue: 112000 },
  { department: 'Support', revenue: 156000 },
];

export const BAR_CONFIG: ChartConfig = {
  type: 'bar',
  data: DEPARTMENT_REVENUE,
  xAxis: { field: 'department', label: 'Department' },
  yAxis: {
    field: 'revenue',
    label: 'Revenue ($)',
    referenceLine: { value: 250000, label: 'Target', color: '#ef4444' },
  },
  style: {
    palette: 'prisma',
    height: 'md',
    gridLines: 'horizontal',
    dataLabels: false,
    animate: true,
    showLegend: false,
    barRadius: 4,
  },
};

// ═══════════════════════════════════════════════════════
//  2. HORIZONTAL BAR — Programming Language Popularity (sorted desc)
// ═══════════════════════════════════════════════════════
const LANGUAGE_POPULARITY: DataRecord[] = [
  { language: 'JavaScript', developers: 17400 },
  { language: 'Python', developers: 15800 },
  { language: 'TypeScript', developers: 12600 },
  { language: 'Java', developers: 11200 },
  { language: 'C#', developers: 8900 },
  { language: 'Go', developers: 7100 },
  { language: 'Rust', developers: 5400 },
  { language: 'Kotlin', developers: 4800 },
  { language: 'Swift', developers: 3900 },
  { language: 'Ruby', developers: 3200 },
];

export const HORIZONTAL_BAR_CONFIG: ChartConfig = {
  type: 'horizontal-bar',
  data: LANGUAGE_POPULARITY,
  xAxis: { field: 'language', label: 'Language', sort: 'descending' },
  yAxis: { field: 'developers', label: 'Active Developers (K)' },
  style: {
    palette: 'ocean',
    height: 'md',
    gridLines: 'vertical',
    animate: true,
    barRadius: 3,
    barGap: 0.3,
  },
};

// ═══════════════════════════════════════════════════════
//  3. STACKED BAR — E-Commerce Revenue by Category × Quarter (groupBy)
// ═══════════════════════════════════════════════════════
const ECOMMERCE_REVENUE: DataRecord[] = [
  { quarter: 'Q1', category: 'Electronics', revenue: 84200 },
  { quarter: 'Q1', category: 'Clothing', revenue: 62100 },
  { quarter: 'Q1', category: 'Home', revenue: 38500 },
  { quarter: 'Q1', category: 'Sports', revenue: 27800 },
  { quarter: 'Q2', category: 'Electronics', revenue: 91500 },
  { quarter: 'Q2', category: 'Clothing', revenue: 74300 },
  { quarter: 'Q2', category: 'Home', revenue: 42100 },
  { quarter: 'Q2', category: 'Sports', revenue: 35600 },
  { quarter: 'Q3', category: 'Electronics', revenue: 103800 },
  { quarter: 'Q3', category: 'Clothing', revenue: 58200 },
  { quarter: 'Q3', category: 'Home', revenue: 51200 },
  { quarter: 'Q3', category: 'Sports', revenue: 48900 },
  { quarter: 'Q4', category: 'Electronics', revenue: 127400 },
  { quarter: 'Q4', category: 'Clothing', revenue: 89100 },
  { quarter: 'Q4', category: 'Home', revenue: 56800 },
  { quarter: 'Q4', category: 'Sports', revenue: 31200 },
];

export const STACKED_BAR_CONFIG: ChartConfig = {
  type: 'stacked-bar',
  data: ECOMMERCE_REVENUE,
  xAxis: { field: 'quarter', label: 'Quarter' },
  yAxis: {
    field: 'revenue',
    label: 'Revenue ($)',
    aggregate: 'sum',
    groupBy: 'category',
  },
  style: {
    palette: 'sunset',
    height: 'md',
    gridLines: 'horizontal',
    animate: true,
    showLegend: true,
    barRadius: 2,
  },
};

// ═══════════════════════════════════════════════════════
//  4. GROUPED BAR — Team Performance Metrics (multi-series groupBy)
// ═══════════════════════════════════════════════════════
const TEAM_PERFORMANCE: DataRecord[] = [
  { team: 'Alpha', metric: 'Velocity', score: 87 },
  { team: 'Alpha', metric: 'Quality', score: 92 },
  { team: 'Alpha', metric: 'Delivery', score: 78 },
  { team: 'Beta', metric: 'Velocity', score: 74 },
  { team: 'Beta', metric: 'Quality', score: 85 },
  { team: 'Beta', metric: 'Delivery', score: 91 },
  { team: 'Gamma', metric: 'Velocity', score: 95 },
  { team: 'Gamma', metric: 'Quality', score: 80 },
  { team: 'Gamma', metric: 'Delivery', score: 83 },
  { team: 'Delta', metric: 'Velocity', score: 68 },
  { team: 'Delta', metric: 'Quality', score: 96 },
  { team: 'Delta', metric: 'Delivery', score: 88 },
];

export const GROUPED_BAR_CONFIG: ChartConfig = {
  type: 'grouped-bar',
  data: TEAM_PERFORMANCE,
  xAxis: { field: 'team', label: 'Team' },
  yAxis: {
    field: 'score',
    label: 'Score',
    aggregate: 'sum',
    groupBy: 'metric',
    referenceLine: { value: 85, label: 'Benchmark', color: '#10b981' },
  },
  style: {
    palette: 'neon',
    height: 'md',
    gridLines: 'horizontal',
    animate: true,
    showLegend: true,
    barRadius: 3,
    barGap: 0.15,
  },
};

// ═══════════════════════════════════════════════════════
//  5. LINE — Website Traffic (cumulative + monotone curve)
// ═══════════════════════════════════════════════════════
const WEBSITE_TRAFFIC: DataRecord[] = [
  { day: 'Mon', visitors: 2840 },
  { day: 'Tue', visitors: 3120 },
  { day: 'Wed', visitors: 4510 },
  { day: 'Thu', visitors: 3980 },
  { day: 'Fri', visitors: 5230 },
  { day: 'Sat', visitors: 6100 },
  { day: 'Sun', visitors: 4750 },
];

export const LINE_CONFIG: ChartConfig = {
  type: 'line',
  data: WEBSITE_TRAFFIC,
  xAxis: { field: 'day', label: 'Day of Week' },
  yAxis: {
    field: 'visitors',
    label: 'Unique Visitors',
    cumulative: true,
    referenceLine: { value: 20000, label: 'Weekly Goal', color: '#f59e0b' },
  },
  style: {
    palette: 'forest',
    height: 'md',
    gridLines: 'both',
    curveType: 'monotone',
    animate: true,
    showLegend: false,
    pointRadius: 4,
  },
};

// ═══════════════════════════════════════════════════════
//  6. AREA — Server Metrics (multi-series grouped, natural curve)
// ═══════════════════════════════════════════════════════
const SERVER_METRICS: DataRecord[] = [
  { time: '00:00', metric: 'CPU', usage: 23 },
  { time: '00:00', metric: 'Memory', usage: 45 },
  { time: '04:00', metric: 'CPU', usage: 18 },
  { time: '04:00', metric: 'Memory', usage: 42 },
  { time: '08:00', metric: 'CPU', usage: 52 },
  { time: '08:00', metric: 'Memory', usage: 58 },
  { time: '12:00', metric: 'CPU', usage: 78 },
  { time: '12:00', metric: 'Memory', usage: 71 },
  { time: '16:00', metric: 'CPU', usage: 85 },
  { time: '16:00', metric: 'Memory', usage: 76 },
  { time: '20:00', metric: 'CPU', usage: 62 },
  { time: '20:00', metric: 'Memory', usage: 68 },
  { time: '23:59', metric: 'CPU', usage: 31 },
  { time: '23:59', metric: 'Memory', usage: 49 },
];

export const AREA_CONFIG: ChartConfig = {
  type: 'area',
  data: SERVER_METRICS,
  xAxis: { field: 'time', label: 'Time' },
  yAxis: {
    field: 'usage',
    label: 'Usage (%)',
    aggregate: 'sum',
    groupBy: 'metric',
    referenceLine: { value: 80, label: 'Alert Threshold', color: '#ef4444' },
  },
  style: {
    palette: 'corporate',
    height: 'md',
    gridLines: 'horizontal',
    curveType: 'natural',
    animate: true,
    showLegend: true,
  },
};

// ═══════════════════════════════════════════════════════
//  7. PIE — Annual Budget Allocation
// ═══════════════════════════════════════════════════════
const BUDGET_ALLOCATION: DataRecord[] = [
  { category: 'R&D', amount: 2400000 },
  { category: 'Marketing', amount: 1850000 },
  { category: 'Operations', amount: 1620000 },
  { category: 'Salaries', amount: 3100000 },
  { category: 'Infrastructure', amount: 980000 },
  { category: 'Training', amount: 420000 },
  { category: 'Legal', amount: 310000 },
];

export const PIE_CONFIG: ChartConfig = {
  type: 'pie',
  data: BUDGET_ALLOCATION,
  categoryField: 'category',
  valueField: 'amount',
  style: {
    palette: 'pastel',
    height: 'md',
    dataLabels: true,
    animate: true,
    showLegend: true,
  },
};

// ═══════════════════════════════════════════════════════
//  8. DONUT — Customer Satisfaction Survey
// ═══════════════════════════════════════════════════════
const SATISFACTION_SURVEY: DataRecord[] = [
  { rating: 'Very Satisfied', count: 412 },
  { rating: 'Satisfied', count: 287 },
  { rating: 'Neutral', count: 156 },
  { rating: 'Dissatisfied', count: 68 },
  { rating: 'Very Dissatisfied', count: 27 },
];

export const DONUT_CONFIG: ChartConfig = {
  type: 'donut',
  data: SATISFACTION_SURVEY,
  categoryField: 'rating',
  valueField: 'count',
  style: {
    palette: 'earth',
    height: 'md',
    dataLabels: true,
    animate: true,
    showLegend: true,
    donutRatio: 0.55,
  },
};

// ═══════════════════════════════════════════════════════
//  9. SCATTER — Employee Experience vs Salary (grouped by dept)
// ═══════════════════════════════════════════════════════
const EMPLOYEE_DATA: DataRecord[] = [
  { experience: 1.2, salary: 48000, department: 'Engineering' },
  { experience: 2.5, salary: 62000, department: 'Engineering' },
  { experience: 4.0, salary: 78000, department: 'Engineering' },
  { experience: 6.3, salary: 95000, department: 'Engineering' },
  { experience: 8.1, salary: 118000, department: 'Engineering' },
  { experience: 10.5, salary: 142000, department: 'Engineering' },
  { experience: 1.0, salary: 42000, department: 'Marketing' },
  { experience: 2.8, salary: 55000, department: 'Marketing' },
  { experience: 4.5, salary: 68000, department: 'Marketing' },
  { experience: 7.2, salary: 85000, department: 'Marketing' },
  { experience: 9.0, salary: 98000, department: 'Marketing' },
  { experience: 1.8, salary: 52000, department: 'Sales' },
  { experience: 3.2, salary: 64000, department: 'Sales' },
  { experience: 5.5, salary: 82000, department: 'Sales' },
  { experience: 7.8, salary: 105000, department: 'Sales' },
  { experience: 11.0, salary: 135000, department: 'Sales' },
  { experience: 2.0, salary: 45000, department: 'Design' },
  { experience: 3.5, salary: 61000, department: 'Design' },
  { experience: 5.0, salary: 76000, department: 'Design' },
  { experience: 8.5, salary: 102000, department: 'Design' },
];

export const SCATTER_CONFIG: ChartConfig = {
  type: 'scatter',
  data: EMPLOYEE_DATA,
  xAxis: { field: 'experience', label: 'Years of Experience' },
  yAxis: { field: 'salary', label: 'Annual Salary ($)' },
  categoryField: 'department',
  style: {
    palette: 'contrast',
    height: 'md',
    gridLines: 'both',
    animate: true,
    showLegend: true,
    pointRadius: 5,
  },
};

// ═══════════════════════════════════════════════════════
//  10. COMBO — Monthly Revenue (bar) vs Growth Rate (line)
// ═══════════════════════════════════════════════════════
const REVENUE_GROWTH: DataRecord[] = [
  { month: 'Jan', revenue: 145000, growth: 2.1 },
  { month: 'Feb', revenue: 152000, growth: 4.8 },
  { month: 'Mar', revenue: 168000, growth: 10.5 },
  { month: 'Apr', revenue: 159000, growth: -5.4 },
  { month: 'May', revenue: 183000, growth: 15.1 },
  { month: 'Jun', revenue: 201000, growth: 9.8 },
  { month: 'Jul', revenue: 194000, growth: -3.5 },
  { month: 'Aug', revenue: 212000, growth: 9.3 },
  { month: 'Sep', revenue: 238000, growth: 12.3 },
  { month: 'Oct', revenue: 251000, growth: 5.5 },
  { month: 'Nov', revenue: 275000, growth: 9.6 },
  { month: 'Dec', revenue: 298000, growth: 8.4 },
];

export const COMBO_CONFIG: ChartConfig = {
  type: 'combo',
  data: REVENUE_GROWTH,
  xAxis: { field: 'month', label: 'Month' },
  yAxis: { field: 'revenue', label: 'Revenue ($)' },
  series: [
    { field: 'revenue', type: 'bar', label: 'Revenue', yAxisSide: 'left' },
    { field: 'growth', type: 'line', label: 'Growth %', color: '#f59e0b', yAxisSide: 'right' },
  ],
  style: {
    palette: 'monochrome',
    height: 'md',
    gridLines: 'horizontal',
    animate: true,
    showLegend: true,
    barRadius: 3,
    curveType: 'monotone',
  },
};

// ═══════════════════════════════════════════════════════
//  Gallery index — ordered list for rendering
// ═══════════════════════════════════════════════════════
export interface GalleryItem {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly config: ChartConfig;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'bar',
    title: 'Bar Chart',
    description: 'Department revenue with target reference line. Classic vertical bars for categorical comparison.',
    config: BAR_CONFIG,
  },
  {
    id: 'horizontal-bar',
    title: 'Horizontal Bar',
    description: 'Programming language popularity ranked by developer count. Sorted descending for readability.',
    config: HORIZONTAL_BAR_CONFIG,
  },
  {
    id: 'stacked-bar',
    title: 'Stacked Bar',
    description: 'E-commerce revenue grouped by product category per quarter. Shows part-to-whole composition.',
    config: STACKED_BAR_CONFIG,
  },
  {
    id: 'grouped-bar',
    title: 'Grouped Bar',
    description: 'Team performance across velocity, quality, and delivery metrics with benchmark line.',
    config: GROUPED_BAR_CONFIG,
  },
  {
    id: 'line',
    title: 'Line Chart',
    description: 'Weekly website traffic with cumulative accumulation and goal reference line.',
    config: LINE_CONFIG,
  },
  {
    id: 'area',
    title: 'Area Chart',
    description: 'Server CPU and memory usage over 24 hours with alert threshold indicator.',
    config: AREA_CONFIG,
  },
  {
    id: 'pie',
    title: 'Pie Chart',
    description: 'Annual budget allocation across departments. Data labels show proportional distribution.',
    config: PIE_CONFIG,
  },
  {
    id: 'donut',
    title: 'Donut Chart',
    description: 'Customer satisfaction survey results. Hollow center with configurable ratio.',
    config: DONUT_CONFIG,
  },
  {
    id: 'scatter',
    title: 'Scatter Plot',
    description: 'Employee experience vs salary colored by department. Reveals correlation patterns.',
    config: SCATTER_CONFIG,
  },
  {
    id: 'combo',
    title: 'Combo Chart',
    description: 'Monthly revenue bars with growth rate line overlay. Dual-axis visualization.',
    config: COMBO_CONFIG,
  },
];
