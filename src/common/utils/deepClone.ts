/**
 * @file deepClone
 * @description Deep clone utility with structuredClone + JSON fallback.
 */
export function deepClone<T>(value: T): T {
  if (typeof structuredClone === 'function') {
    return structuredClone(value);
  }
  return JSON.parse(JSON.stringify(value));
}
