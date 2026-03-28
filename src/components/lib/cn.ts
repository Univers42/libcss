/**
 * @file cn.ts
 * @description Utility to compose CSS class names.
 * Filters falsy values and joins with space.
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}
