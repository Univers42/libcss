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

export {
  resolveProps,
  diffFromDefaults,
  variantToCSS,
  allVariantsToCSS,
  getChangedKeys,
} from './VariantResolver';

export { getPath, setPath, flatten, unflatten, deepMerge } from '../common/utils/pathAccess';

export { configureApi, apiRequest } from './api';
export type { ApiRequestFn } from './api';

export { LibcssAuthProvider, useAuth } from './auth';
export type { LibcssUser, LibcssAuthValue } from './auth';

export { LibcssNotificationsProvider, useNotifications } from './notifications';
export type { LibcssNotification, LibcssNotificationsValue } from './notifications';
