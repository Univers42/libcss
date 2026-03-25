/**
 * @file EventBus types
 * @description Type definitions for the generic typed event emitter.
 */

/** A record mapping event names to their payload types. */
export type EventMap = Record<string, unknown>;

/** Handler function for a specific event. */
export type EventHandler<T = unknown> = (payload: T) => void;

/** Unsubscribe function returned by `on()` and `once()`. */
export type Unsubscribe = () => void;
