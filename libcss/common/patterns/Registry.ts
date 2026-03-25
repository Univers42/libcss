/**
 * @file Registry
 * @description Generic typed registry backed by a Map with event notifications.
 * Core building block for the component catalog — register once, query anywhere.
 *
 * @example
 * ```ts
 * const reg = new Registry<string, ComponentEntry>();
 * reg.onRegister((key, value) => console.log(`Added: ${key}`));
 * reg.register('button', buttonEntry);
 * reg.get('button'); // → buttonEntry
 * ```
 */

import { EventBus } from '../events/EventBus';

type RegistryEvents<K, V> = {
  register: { key: K; value: V };
  unregister: { key: K };
  clear: undefined;
};

export class Registry<K extends string = string, V = unknown> {
  private store = new Map<K, V>();
  private bus = new EventBus<RegistryEvents<K, V>>();

  /** Register a value under a key. Overwrites if key exists. */
  register(key: K, value: V): this {
    this.store.set(key, value);
    this.bus.emit('register', { key, value });
    return this;
  }

  /** Get a value by key. Returns undefined if not found. */
  get(key: K): V | undefined {
    return this.store.get(key);
  }

  /** Check if a key is registered. */
  has(key: K): boolean {
    return this.store.has(key);
  }

  /** Get all registered values. */
  getAll(): V[] {
    return [...this.store.values()];
  }

  /** Get all registered keys. */
  keys(): K[] {
    return [...this.store.keys()];
  }

  /** Get all entries as [key, value] pairs. */
  entries(): [K, V][] {
    return [...this.store.entries()];
  }

  /** Remove a key from the registry. */
  unregister(key: K): boolean {
    const existed = this.store.delete(key);
    if (existed) this.bus.emit('unregister', { key });
    return existed;
  }

  /** Remove all entries. */
  clear(): void {
    this.store.clear();
    this.bus.emit('clear', undefined);
  }

  /** Number of registered entries. */
  get size(): number {
    return this.store.size;
  }

  /** Subscribe to register events. */
  onRegister(handler: (key: K, value: V) => void) {
    return this.bus.on('register', ({ key, value }) => handler(key, value));
  }

  /** Subscribe to unregister events. */
  onUnregister(handler: (key: K) => void) {
    return this.bus.on('unregister', ({ key }) => handler(key));
  }
}
