/**
 * @file Path Access Utilities
 * @description Nested object helpers — get/set by dot-path, flatten/unflatten,
 * and deep merge.  Used to bridge between the flat-key control system and the
 * nested storage format.
 *
 *   flatten({ style: { base: { color: '#fff' } } })
 *   //→ { 'style.base.color': '#fff' }
 *
 *   setPath(obj, 'style.base.color', '#000')
 *   //→ obj.style.base.color === '#000'
 */

// ─── Path get / set ────────────────────────────────────

/** Read a value from a nested object by dot-separated path. */
export function getPath(obj: Record<string, unknown>, path: string): unknown {
  const keys = path.split('.');
  let current: unknown = obj;
  for (const key of keys) {
    if (current == null || typeof current !== 'object') return undefined;
    current = (current as Record<string, unknown>)[key];
  }
  return current;
}

/** Write a value into a nested object by dot-separated path (mutates). */
export function setPath(obj: Record<string, unknown>, path: string, value: unknown): void {
  const keys = path.split('.');
  let current: Record<string, unknown> = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (current[key] == null || typeof current[key] !== 'object') {
      current[key] = {};
    }
    current = current[key] as Record<string, unknown>;
  }
  const lastKey = keys.at(-1);
  if (lastKey !== undefined) current[lastKey] = value;
}

// ─── Flatten / Unflatten ───────────────────────────────

/**
 * Recursively flatten a nested object into a flat `{ 'a.b.c': value }` map.
 * Stops at primitives, null, undefined, and arrays (arrays are leaf values).
 */
export function flatten(
  obj: Record<string, unknown>,
  prefix = '',
  result: Record<string, unknown> = {},
): Record<string, unknown> {
  for (const [key, value] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (value !== null && value !== undefined && typeof value === 'object' && !Array.isArray(value)) {
      flatten(value as Record<string, unknown>, path, result);
    } else {
      result[path] = value;
    }
  }
  return result;
}

/**
 * Convert a flat `{ 'a.b.c': value }` map back into a nested object.
 */
export function unflatten(flat: Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const [path, value] of Object.entries(flat)) {
    setPath(result, path, value);
  }
  return result;
}

// ─── Deep Merge ────────────────────────────────────────

/**
 * Recursively merge `source` into `target` (returns a new object).
 * Objects are merged recursively; everything else (primitives, arrays, null)
 * is overwritten by the source value.
 */
export function deepMerge(
  target: Record<string, unknown>,
  source: Record<string, unknown>,
): Record<string, unknown> {
  const result: Record<string, unknown> = { ...target };
  for (const [key, srcVal] of Object.entries(source)) {
    const tgtVal = result[key];
    if (
      srcVal !== null &&
      srcVal !== undefined &&
      typeof srcVal === 'object' &&
      !Array.isArray(srcVal) &&
      tgtVal !== null &&
      tgtVal !== undefined &&
      typeof tgtVal === 'object' &&
      !Array.isArray(tgtVal)
    ) {
      result[key] = deepMerge(
        tgtVal as Record<string, unknown>,
        srcVal as Record<string, unknown>,
      );
    } else {
      result[key] = srcVal;
    }
  }
  return result;
}
