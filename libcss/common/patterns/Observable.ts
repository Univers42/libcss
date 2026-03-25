/**
 * @file Observable
 * @description Reactive value wrapper with subscription support.
 * Used by the inspector panel to observe component prop changes.
 *
 * @example
 * ```ts
 * const color = new Observable('#3b82f6');
 * color.subscribe((val) => console.log('Color changed:', val));
 * color.set('#ef4444'); // logs "Color changed: #ef4444"
 * ```
 */

import type { Unsubscribe } from '../events/types';

type Subscriber<T> = (value: T, prev: T) => void;

export class Observable<T> {
  private value: T;
  private subscribers = new Set<Subscriber<T>>();

  constructor(initial: T) {
    this.value = initial;
  }

  /** Get the current value. */
  get(): T {
    return this.value;
  }

  /** Set a new value and notify subscribers if changed. */
  set(next: T): void {
    const prev = this.value;
    if (Object.is(prev, next)) return;
    this.value = next;
    for (const sub of this.subscribers) {
      try {
        sub(next, prev);
      } catch (err) {
        console.error('[Observable] Subscriber error:', err);
      }
    }
  }

  /** Subscribe to value changes. Returns an unsubscribe function. */
  subscribe(subscriber: Subscriber<T>): Unsubscribe {
    this.subscribers.add(subscriber);
    return () => {
      this.subscribers.delete(subscriber);
    };
  }

  /** Remove all subscribers. */
  clear(): void {
    this.subscribers.clear();
  }
}
