/**
 * @file Studio Public API — Re-export Barrel
 * @description Backward-compatible re-exports from the new canonical locations.
 * The studio module is now dissolved into the library:
 *   core      → src/core/
 *   controls  → src/components/controls/
 *   explorer  → src/components/explorer/
 *   hooks     → src/hooks/
 *   layout    → src/components/layout/
 *   parser    → src/parser/
 *   views     → src/components/views/
 *
 * Apps importing from `@libcss/studio` continue to work unchanged.
 */

// ── Core ────────────────────────────────────────────────
export {
  registry,
  studioEvents,
  explorerEvents,
  CATEGORY_META,
} from '../core';
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
  ExplorerEvents,
} from '../core';

// ── Layout ──────────────────────────────────────────────
export { StudioLayout } from '../components/layout/StudioLayout';

// ── Explorer Components ─────────────────────────────────
export {
  ExplorerBreadcrumb,
  ExplorerBreadcrumb as Breadcrumb,
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
} from '../components/explorer';
export type {
  ButtonVariantGridProps,
  VariantGridProps,
  VariantDimension,
} from '../components/explorer';

// ── Controls ────────────────────────────────────────────
export {
  ControlFactory,
  SelectControl,
  TextControl,
  BooleanControl,
  NumberControl,
  ColorControl,
  RangeControl,
} from '../components/controls';

// ── Hooks ───────────────────────────────────────────────
export {
  useStudioNavigation,
  useComponentState,
  useSearch,
} from '../hooks';

// ── Views ───────────────────────────────────────────────
export {
  OverviewView,
  CategoryView,
  PlaygroundView,
  VariantGalleryView,
  ChartGalleryView,
} from '../components/views';
export type {
  OverviewViewProps,
  CategoryViewProps,
  PlaygroundViewProps,
  VariantGalleryViewProps,
  ChartGalleryViewProps,
  ChartGalleryItem,
} from '../components/views';

// ── Parser ──────────────────────────────────────────────
export {
  discoverComponents,
  discoverComponentsSync,
  useComponentManifest,
} from '../parser';
export type {
  ComponentManifest,
  ComponentManifestEntry,
} from '../parser';

