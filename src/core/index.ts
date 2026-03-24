/**
 * @file Core Barrel
 * @description Re-exports all core modules — types, registry, events.
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
