/**
 * @file Chart demo fixtures
 * @description Realistic sample datasets for the chart playground.
 */

import type { DataRecord } from '../../../src/components/layout';

// ── Monthly Sales ─────────────────────────────────────
export const MONTHLY_SALES: DataRecord[] = [
  { month: 'Jan', revenue: 12400, expenses: 8200, profit: 4200 },
  { month: 'Feb', revenue: 15800, expenses: 9100, profit: 6700 },
  { month: 'Mar', revenue: 18200, expenses: 10500, profit: 7700 },
  { month: 'Apr', revenue: 14300, expenses: 8700, profit: 5600 },
  { month: 'May', revenue: 21000, expenses: 12300, profit: 8700 },
  { month: 'Jun', revenue: 24500, expenses: 14100, profit: 10400 },
  { month: 'Jul', revenue: 22100, expenses: 13200, profit: 8900 },
  { month: 'Aug', revenue: 19800, expenses: 11800, profit: 8000 },
  { month: 'Sep', revenue: 26300, expenses: 15200, profit: 11100 },
  { month: 'Oct', revenue: 28900, expenses: 16800, profit: 12100 },
  { month: 'Nov', revenue: 31200, expenses: 18500, profit: 12700 },
  { month: 'Dec', revenue: 35000, expenses: 20100, profit: 14900 },
];

// ── Browser Market Share (pie) ────────────────────────
export const BROWSER_SHARE: DataRecord[] = [
  { browser: 'Chrome', share: 64.7 },
  { browser: 'Safari', share: 18.8 },
  { browser: 'Firefox', share: 3.2 },
  { browser: 'Edge', share: 5.2 },
  { browser: 'Opera', share: 2.4 },
  { browser: 'Other', share: 5.7 },
];

// ── Regional Sales (stacked / grouped) ────────────────
export const REGIONAL_SALES: DataRecord[] = [
  { quarter: 'Q1', region: 'North', sales: 14000 },
  { quarter: 'Q1', region: 'South', sales: 9800 },
  { quarter: 'Q1', region: 'East', sales: 11200 },
  { quarter: 'Q1', region: 'West', sales: 7600 },
  { quarter: 'Q2', region: 'North', sales: 16200 },
  { quarter: 'Q2', region: 'South', sales: 11500 },
  { quarter: 'Q2', region: 'East', sales: 13800 },
  { quarter: 'Q2', region: 'West', sales: 9200 },
  { quarter: 'Q3', region: 'North', sales: 18500 },
  { quarter: 'Q3', region: 'South', sales: 12800 },
  { quarter: 'Q3', region: 'East', sales: 15100 },
  { quarter: 'Q3', region: 'West', sales: 10400 },
  { quarter: 'Q4', region: 'North', sales: 21000 },
  { quarter: 'Q4', region: 'South', sales: 14600 },
  { quarter: 'Q4', region: 'East', sales: 17300 },
  { quarter: 'Q4', region: 'West', sales: 11800 },
];

// ── Scatter (hours studied vs. score) ─────────────────
export const STUDENT_SCORES: DataRecord[] = [
  { hours: 1.5, score: 52, course: 'Math' },
  { hours: 2.0, score: 58, course: 'Math' },
  { hours: 3.0, score: 65, course: 'Math' },
  { hours: 3.5, score: 72, course: 'Math' },
  { hours: 4.5, score: 78, course: 'Math' },
  { hours: 5.0, score: 83, course: 'Math' },
  { hours: 6.0, score: 91, course: 'Math' },
  { hours: 2.0, score: 61, course: 'Science' },
  { hours: 3.0, score: 69, course: 'Science' },
  { hours: 3.5, score: 74, course: 'Science' },
  { hours: 4.0, score: 79, course: 'Science' },
  { hours: 5.5, score: 88, course: 'Science' },
  { hours: 6.5, score: 95, course: 'Science' },
  { hours: 1.0, score: 45, course: 'Science' },
];
