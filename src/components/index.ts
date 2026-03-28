/**
 * @file Components Public API
 * @description Re-exports all design-system components by category.
 *
 * When two sub-barrels export the same name (e.g. Pagination from both
 * molecules/ and database/), the first `export *` wins and the conflicting
 * module uses a namespaced re-export instead.
 */

// Atoms  (primary)
export * from './atoms';

// Molecules  (primary — takes precedence for ColorPicker, Pagination, SearchBar)
// BreadcrumbItem already exported by atoms; explicit re-export resolves TS2308 ambiguity.
export * from './molecules';
export type { BreadcrumbItem } from './atoms';

// Media
export * from './media';

// Layout
export * from './layout';

// Controls — omit ColorPicker (already in molecules)
export {
  NumberControl,
  SliderControl,
  BooleanControl,
  TextControl,
  ToggleControl,
  ScrubControl,
  TagsControl,
  RangeControl,
  SelectControl,
  MultiSelectControl,
  ParameterGroup,
  ControlFactory,
} from './controls';

// Explorer — omit SearchBar (already in molecules)
export {
  Sidebar as ExplorerSidebar,
  VariantGrid,
  ComponentStage,
  ThemeSwitcher,
  ExplorerBreadcrumb,
  ComponentCard,
  CategoryCard,
  CodePreview,
  ButtonVariantGrid,
  InspectorPanel,
} from './explorer';

// Views (page-level composite views)
export * from './views';

// Database — omit Pagination (already in molecules)
export {
  DatabaseViewer,
  DatabaseCards,
  DataTable,
  TableSelector,
  FilterBar,
  RecordModal,
  useDatabase,
} from './database';

// Cloud Terminal — omit DEFAULT_TITLE (already in atoms/BrandLogo)
export {
  CloudTerminal,
  Shell,
  ShellModal,
  ShellFab,
  TerminalPane,
  TerminalViewport,
  TerminalChrome,
  TerminalTabs,
  TerminalNavRail,
  TerminalStatusBar,
  TerminalHeader,
  TerminalEditor,
  TerminalDocs,
  TerminalBackground,
  TerminalThemeSwitcher,
  SplitContainer,
  SplitHandle,
} from './cloud-terminal';

// Helpers (ConfirmDialog, EmptyState, IconButton, InlineStatus)
export * from './helpers';

// Icons (FlyIcons, OrderStatusIcons)
export * from './icons';

// Features (admin, client, employee, devboard, AI, QA)
export * from './features';

// Utilities
export { cn } from './lib/cn';
