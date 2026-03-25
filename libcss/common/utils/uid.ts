/**
 * @file uid
 * @description Lightweight unique ID generator. Zero dependencies.
 */
export function uid(prefix = 'id'): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}
