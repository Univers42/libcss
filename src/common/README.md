# src/common/

shared infrastructure — low-level patterns and utilities that aren't specific to any component or the studio. think of this as the "standard library" for the project.

## what's inside

### events/
a typed **EventBus** implementation. lets you publish/subscribe to named events with typed payloads. used by the core event system.

```ts
import { EventBus } from '../common/events';

const bus = new EventBus<{ 'user:login': { name: string } }>();
bus.on('user:login', (data) => console.log(data.name));
bus.emit('user:login', { name: 'Dan' });
```

### logger/
a structured **Logger** with log levels (debug, info, warn, error). can be configured with different transports. keeps console output consistent across the project.

```ts
import { Logger } from '../common/logger';

const log = new Logger('MyModule');
log.info('something happened');
log.error('oh no', error);
```

### patterns/
reusable design patterns:

- **Observable** — reactive value container. subscribe to changes, get notified when the value updates. basic reactivity without React.
- **Registry** — generic typed registry pattern. store/retrieve items by key. the component registry in `core/` is built on top of this.

### utils/
small pure utilities:

- **deepClone** — deep-copies an object (structuredClone wrapper with fallback)
- **uid** — generates unique IDs (used for component keys, event IDs, etc.)

## things to remember

- everything here is framework-agnostic — no React imports, no DOM assumptions
- the EventBus is type-safe — you define the event map as a generic and get autocomplete on event names + payloads
- Observable is useful for state that needs to be shared outside of React's tree (like global settings)
- these are internal utilities — they're not exported in the public API
