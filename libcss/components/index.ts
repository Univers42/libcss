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

// ── New categories merged from vite-gourmand ──

// Database (full PostgreSQL CRUD system)
export * from './database';

// Cloud Terminal (browser-based shell)
export * from './cloud-terminal';

// Helpers (ConfirmDialog, EmptyState, IconButton, InlineStatus)
export * from './helpers';

// Icons (FlyIcons, OrderStatusIcons)
export * from './icons';

// Features (admin, client, employee, devboard, AI, QA)
export * from './features';

// Utilities
export { cn } from './lib/cn';
