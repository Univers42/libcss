/**
 * @file Studio Public API
 * @description Everything the studio app imports via `@libcss/studio`.
 */

// Core
export { registry, studioEvents, CATEGORY_META } from './core';
export type {
  ComponentCategory,
  ComponentEntry,
  PropControl,
  PropControlType,
  VariantPreset,
  VariantDimensionDef,
  StudioView,
  StudioState,
  StudioEvents,
} from './core';

// Layout
export { StudioLayout } from './layouts/StudioLayout';

// Components
export {
  Breadcrumb,
  ButtonVariantGrid,
  CategoryCard,
  CodePreview,
  ComponentCard,
  ComponentStage,
  InspectorPanel,
  SearchBar,
  Sidebar,
  ThemeSwitcher,
  VariantGrid,
} from './components';
export type {
  ButtonVariantGridProps,
  VariantGridProps,
  VariantDimension,
} from './components';

// Controls
export {
  ControlFactory,
  SelectControl,
  TextControl,
  BooleanControl,
  NumberControl,
  ColorControl,
  RangeControl,
} from './controls';

// Hooks
export {
  useStudioNavigation,
  useComponentState,
  useSearch,
} from './hooks';

// Parser (auto-discovery)
export {
  discoverComponents,
  discoverComponentsSync,
  useComponentManifest,
} from './parser';
export type {
  ComponentManifest,
  ComponentManifestEntry,
} from './parser';
