/**
 * @file Core Barrel
 * @description Re-exports all core modules — types, registry, events,
 * component definitions, variant resolution.
 */

export { registry } from './registry';
export { explorerEvents, studioEvents } from './events';
export type { ExplorerEvents, StudioEvents } from './events';
export { CATEGORY_META } from './types';
export type {
  ComponentCategory,
  ComponentEntry,
  PropControl,
  PropControlType,
  VariantPreset,
  VariantDimensionDef,
  StudioView,
  StudioState,
} from './types';

// ─── Component Definition System ───────────────────────
export {
  defineComponentType,
  registerComponentType,
  getComponentType,
  getAllComponentTypes,
} from './ComponentDefinition';
export type {
  ComponentType,
  ComponentTypeConfig,
  VariantDef,
  InstanceDef,
} from './ComponentDefinition';

// ─── Variant Resolution ────────────────────────────────
export {
  resolveProps,
  diffFromDefaults,
  variantToCSS,
  allVariantsToCSS,
  getChangedKeys,
} from './VariantResolver';

// ─── Re-export path utilities (convenience) ────────────
export {
  getPath,
  setPath,
  flatten,
  unflatten,
  deepMerge,
} from '../common/utils/pathAccess';
