/**
 * @file Explorer Events
 * @description Typed event bus instance for explorer-wide communication.
 */

import { EventBus } from '../common';
import type { ComponentCategory, StudioView } from './types';

export type ExplorerEvents = {
  'component:select': { entryId: string };
  'prop:change': { key: string; value: unknown };
  'category:change': { category: ComponentCategory };
  'search:update': { query: string };
  'view:change': { view: StudioView };
  'props:reset': { entryId: string };
};

/** Singleton event bus for the component explorer system. */
export const explorerEvents = new EventBus<ExplorerEvents>();

/**
 * @deprecated Use `explorerEvents` instead. Kept for backward compatibility.
 */
export const studioEvents = explorerEvents;
export type StudioEvents = ExplorerEvents;
