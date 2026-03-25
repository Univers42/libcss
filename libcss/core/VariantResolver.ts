/**
 * @file VariantResolver
 * @description Pure functions for resolving props from layered nested configs
 * and generating CSS classes from variant data.
 *
 * Data format (nested, state-based):
 * ```json
 * {
 *   "name": "Primary",
 *   "props": { "label": "Click me" },
 *   "style": {
 *     "base":     { "backgroundColor": "#3b82f6", "padding": { "top": 10 } },
 *     "hover":    { "backgroundColor": "#2563eb" },
 *     "active":   {},
 *     "disabled": { "opacity": 0.5, "cursor": "not-allowed" }
 *   }
 * }
 * ```
 *
 * Resolution order (each layer wins via deep merge):
 *   1. Schema defaults (from the component definition)
 *   2. Variant data    (shared, named style set)
 *   3. Instance overrides (per-placement tweaks — future)
 */

import { deepMerge, flatten, unflatten } from '../common/utils/pathAccess';

// ─── Resolution ────────────────────────────────────────

/**
 * Deep-merge layers: defaults → variant → overrides.
 * All layers are nested objects (the canonical storage format).
 */
export function resolveProps(
  defaults: Record<string, unknown>,
  variant?: Record<string, unknown>,
  overrides?: Record<string, unknown>,
): Record<string, unknown> {
  let result = { ...defaults };
  if (variant) result = deepMerge(result, variant);
  if (overrides) result = deepMerge(result, overrides);
  return result;
}

/**
 * Given a resolved nested object, extract only the paths that differ
 * from defaults.  Returns a nested object with only the changed branches.
 */
export function diffFromDefaults(
  defaults: Record<string, unknown>,
  data: Record<string, unknown>,
): Record<string, unknown> {
  const flatDefaults = flatten(defaults);
  const flatData = flatten(data);
  const diff: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(flatData)) {
    if (flatDefaults[key] !== value) {
      diff[key] = value;
    }
  }
  return unflatten(diff);
}

/**
 * Which flat paths differ from defaults? Returns a Set of dot-paths.
 */
export function getChangedKeys(
  defaults: Record<string, unknown>,
  data: Record<string, unknown>,
): Set<string> {
  const flatDefaults = flatten(defaults);
  const flatData = flatten(data);
  const changed = new Set<string>();
  for (const [key, value] of Object.entries(flatData)) {
    if (flatDefaults[key] !== value) changed.add(key);
  }
  return changed;
}

// ─── CSS Generation ────────────────────────────────────

/** camelCase → kebab-case. */
function camelToKebab(s: string): string {
  return s.replaceAll(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
}

/** Base-level props that need a `px` unit suffix. */
const PX_PROPS = new Set(['fontSize', 'letterSpacing', 'minWidth']);

function cssVal(prop: string, value: unknown): string {
  if (value == null || typeof value === 'object') return '';
  if (PX_PROPS.has(prop) && typeof value === 'number') return `${value}px`;
  if (typeof value === 'string') return value;
  if (typeof value === 'number' || typeof value === 'boolean') return `${value}`;
  return '';
}

/** Emit CSS rules for padding sub-object. */
function emitPadding(pad: Record<string, unknown>, out: string[]): void {
  for (const side of ['top', 'right', 'bottom', 'left'] as const) {
    const v = pad[side];
    if (v != null && typeof v === 'number') out.push(`  padding-${side}: ${v}px;`);
  }
}

/** Emit CSS rules for border sub-object. */
function emitBorder(brd: Record<string, unknown>, out: string[]): void {
  if (typeof brd.radius === 'number') out.push(`  border-radius: ${brd.radius}px;`);
  if (typeof brd.width === 'number')  out.push(`  border-width: ${brd.width}px;`);
  if (typeof brd.color === 'string' && brd.color) out.push(`  border-color: ${brd.color};`);
  if (typeof brd.style === 'string' && brd.style) out.push(`  border-style: ${brd.style};`);
}

/** Emit CSS box-shadow from shadow sub-object. */
function emitShadow(sh: Record<string, unknown>, out: string[]): void {
  const x = typeof sh.x === 'number' ? sh.x : 0;
  const y = typeof sh.y === 'number' ? sh.y : 4;
  const b = typeof sh.blur === 'number' ? sh.blur : 6;
  const s = typeof sh.spread === 'number' ? sh.spread : 0;
  const c = typeof sh.color === 'string' ? sh.color : 'rgba(0,0,0,0.1)';
  out.push(`  box-shadow: ${x}px ${y}px ${b}px ${s}px ${c};`);
}

/** Emit CSS transform from transform sub-object. */
function emitTransform(tf: Record<string, unknown>, out: string[]): void {
  const parts: string[] = [];
  if (typeof tf.scale === 'number' && tf.scale !== 1)              parts.push(`scale(${tf.scale})`);
  if (typeof tf.rotate === 'number' && tf.rotate !== 0)            parts.push(`rotate(${tf.rotate}deg)`);
  if (typeof tf.skewX === 'number' && tf.skewX !== 0)              parts.push(`skewX(${tf.skewX}deg)`);
  if (typeof tf.skewY === 'number' && tf.skewY !== 0)              parts.push(`skewY(${tf.skewY}deg)`);
  if (typeof tf.translateX === 'number' && tf.translateX !== 0)    parts.push(`translateX(${tf.translateX}px)`);
  if (typeof tf.translateY === 'number' && tf.translateY !== 0)    parts.push(`translateY(${tf.translateY}px)`);
  if (parts.length > 0) out.push(`  transform: ${parts.join(' ')};`);
}

/** Emit CSS transition shorthand from transition sub-object. */
function emitTransition(tr: Record<string, unknown>, out: string[]): void {
  const prop = typeof tr.property === 'string' ? tr.property : 'all';
  const dur  = typeof tr.duration === 'number' ? tr.duration : 0.2;
  const tim  = typeof tr.timing   === 'string' ? tr.timing   : 'ease';
  const del  = typeof tr.delay    === 'number' ? tr.delay    : 0;
  const delaySuffix = del > 0 ? ` ${del}s` : '';
  out.push(`  transition: ${prop} ${dur}s ${tim}${delaySuffix};`);
}

/** Emit CSS rules from a flat state bucket (hover, disabled, active). */
function emitStateRules(bucket: Record<string, unknown>, out: string[]): void {
  for (const [key, value] of Object.entries(bucket)) {
    if (value == null || value === '' || value === 'none') continue;
    if (key === 'shadow' && typeof value === 'object' && value !== null) {
      emitShadow(value as Record<string, unknown>, out);
    } else if (key === 'transform' && typeof value === 'object' && value !== null) {
      emitTransform(value as Record<string, unknown>, out);
    } else {
      const v = cssVal(key, value);
      if (v) out.push(`  ${camelToKebab(key)}: ${v};`);
    }
  }
}

/** Map of sub-object keys → their emitter functions. */
const SUB_EMITTERS: Record<string, (obj: Record<string, unknown>, out: string[]) => void> = {
  padding:    emitPadding,
  border:     emitBorder,
  shadow:     emitShadow,
  transform:  emitTransform,
  transition: emitTransition,
};

/** Emit CSS rules from the base state (handles sub-objects). */
function emitBaseRules(base: Record<string, unknown>, out: string[]): void {
  for (const [key, value] of Object.entries(base)) {
    if (value == null || value === '' || value === 'none') continue;

    // Legacy string transition
    if (key === 'transition' && typeof value === 'string') {
      out.push(`  transition: ${value};`);
      continue;
    }
    // Sub-object dispatch
    const emitter = SUB_EMITTERS[key];
    if (emitter && typeof value === 'object' && value !== null) {
      emitter(value as Record<string, unknown>, out);
      continue;
    }
    // Flat property
    const v = cssVal(key, value);
    if (v) out.push(`  ${camelToKebab(key)}: ${v};`);
  }
}

/**
 * Generate a CSS class from a variant's nested data.
 *
 * Reads `data.style.base`, `data.style.hover`, `data.style.disabled`.
 * Sub-objects `padding` and `border` are expanded into individual properties.
 *
 * @param className  CSS class name (e.g. `btn-primary`)
 * @param data       Full nested variant data
 * @returns          Complete CSS rule(s)
 */
export function variantToCSS(
  className: string,
  data: Record<string, unknown>,
): string {
  const style = (data.style ?? {}) as Record<string, unknown>;
  const base = (style.base ?? {}) as Record<string, unknown>;
  const hover = (style.hover ?? {}) as Record<string, unknown>;
  const active = (style.active ?? {}) as Record<string, unknown>;
  const disabled = (style.disabled ?? {}) as Record<string, unknown>;

  const baseRules: string[] = [];
  const hoverRules: string[] = [];
  const activeRules: string[] = [];
  const disabledRules: string[] = [];

  emitBaseRules(base, baseRules);
  emitStateRules(hover, hoverRules);
  emitStateRules(active, activeRules);
  emitStateRules(disabled, disabledRules);

  let css = `.${className} {\n${baseRules.join('\n')}\n}`;
  if (hoverRules.length > 0) {
    css += `\n\n.${className}:hover {\n${hoverRules.join('\n')}\n}`;
  }
  if (activeRules.length > 0) {
    css += `\n\n.${className}:active {\n${activeRules.join('\n')}\n}`;
  }
  if (disabledRules.length > 0) {
    css += `\n\n.${className}:disabled {\n${disabledRules.join('\n')}\n}`;
  }
  return css;
}

/**
 * Generate CSS for all variants of a component type.
 * Convention: `.{componentType}-{variantSlug}` (e.g. `.button-primary`)
 */
export function allVariantsToCSS(
  componentType: string,
  variants: Array<{ slug: string; data: Record<string, unknown> }>,
): string {
  return variants
    .map((v) => variantToCSS(`${componentType}-${v.slug}`, v.data))
    .join('\n\n');
}
