/**
 * @file EventBus
 * @description Generic typed event emitter with full type safety.
 * Supports on/off/once/emit with automatic cleanup via returned Unsubscribe.
 *
 * @example
 * ```ts
 * type AppEvents = {
 *   'user:login': { userId: string };
 *   'theme:change': { isDark: boolean };
 * };
 *
 * const bus = new EventBus<AppEvents>();
 * const unsub = bus.on('user:login', ({ userId }) => console.log(userId));
 * bus.emit('user:login', { userId: '42' });
 * unsub(); // cleanup
 * ```
 */

import type { EventMap, EventHandler, Unsubscribe } from './types';

export class EventBus<Events extends EventMap = EventMap> {
  private listeners = new Map<keyof Events, Set<EventHandler<any>>>();

  /**
   * Subscribe to an event. Returns an unsubscribe function.
   */
  on<K extends keyof Events>(event: K, handler: EventHandler<Events[K]>): Unsubscribe {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(handler);

    return () => this.off(event, handler);
  }

  /**
   * Subscribe to an event for a single invocation.
   */
  once<K extends keyof Events>(event: K, handler: EventHandler<Events[K]>): Unsubscribe {
    const wrapper: EventHandler<Events[K]> = (payload) => {
      this.off(event, wrapper);
      handler(payload);
    };
    return this.on(event, wrapper);
  }

  /**
   * Remove a specific handler from an event.
   */
  off<K extends keyof Events>(event: K, handler: EventHandler<Events[K]>): void {
    const set = this.listeners.get(event);
    if (set) {
      set.delete(handler);
      if (set.size === 0) this.listeners.delete(event);
    }
  }

  /**
   * Emit an event to all registered handlers.
   */
  emit<K extends keyof Events>(event: K, payload: Events[K]): void {
    const set = this.listeners.get(event);
    if (set) {
      for (const handler of set) {
        try {
          handler(payload);
        } catch (err) {
          console.error(`[EventBus] Error in handler for "${String(event)}":`, err);
        }
      }
    }
  }

  /**
   * Remove all handlers for a specific event, or all events if none specified.
   */
  clear<K extends keyof Events>(event?: K): void {
    if (event) {
      this.listeners.delete(event);
    } else {
      this.listeners.clear();
    }
  }

  /**
   * Get the number of handlers for a specific event.
   */
  listenerCount<K extends keyof Events>(event: K): number {
    return this.listeners.get(event)?.size ?? 0;
  }
}
