# common/events/

the event system used across the library.

## what's in here

- **`EventBus.ts`** — a fully typed event emitter. think of it like `addEventListener` but way cleaner because you define the shape of your events upfront.
- **`types.ts`** — type definitions (`EventMap`, `EventHandler`, `Unsubscribe`)

## how it works

```ts
import { EventBus } from '@libcss/core';

// define your event map
type MyEvents = {
  click: { x: number; y: number };
  resize: { width: number };
};

const bus = new EventBus<MyEvents>();

// subscribe — returns an unsubscribe function
const unsub = bus.on('click', (payload) => {
  console.log(payload.x, payload.y); // fully typed!
});

// emit
bus.emit('click', { x: 10, y: 20 });

// one-time listener
bus.once('resize', (payload) => { /* fires only once */ });

// cleanup
unsub();
```

## things to remember

- the `on()` method returns an `Unsubscribe` function — always call it when cleaning up (e.g. in `useEffect` returns)
- `once()` automatically removes itself after the first fire
- the bus is generic — you pass in an event map type and get full autocomplete on event names + payloads
- the `Registry` pattern in `../patterns/` uses this internally for its own events
