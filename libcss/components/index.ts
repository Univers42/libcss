/**
 * @file Components Public API
 * @description Re-exports all design-system components by category.
 */

// Atoms
export * from './atoms';

// Molecules
export * from './molecules';

// Media
export * from './media';

// Layout
export * from './layout';

// Controls (generic prop-editors)
export * from './controls';

// Explorer (component-explorer UI)
export * from './explorer';

// Views (page-level composite views)
export * from './views';

// Resolve re-export ambiguities
export type { BreadcrumbItem } from './atoms';
export type { SelectOption } from './atoms';
export { ColorPicker } from './controls';

// Utilities
export { cn } from './lib/cn';
