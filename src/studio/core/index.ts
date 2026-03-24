/**
 * @file Studio Core Barrel
 * @description Re-exports all studio core modules.
 */

export { registry } from './registry';
export { studioEvents } from './events';
export type { StudioEvents } from './events';
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
