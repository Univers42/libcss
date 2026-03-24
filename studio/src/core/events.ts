/**
 * @file Studio Events
 * @description Typed event bus instance for studio-wide communication.
 */

import { EventBus } from '../../../src/common';
import type { ComponentCategory, StudioView } from './types';

export type StudioEvents = {
  'component:select': { entryId: string };
  'prop:change': { key: string; value: unknown };
  'category:change': { category: ComponentCategory };
  'search:update': { query: string };
  'view:change': { view: StudioView };
  'props:reset': { entryId: string };
};

/** Singleton event bus for the studio app. */
export const studioEvents = new EventBus<StudioEvents>();
