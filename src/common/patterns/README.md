# common/patterns/

reusable design patterns — the kind of stuff you'd find in a "gang of four" book but typed for TS.

## what's in here

### Observable.ts

a reactive value wrapper. you set a value, and anyone watching gets notified.

```ts
import { Observable } from '@libcss/core';

const theme = new Observable('light');

// subscribe to changes
theme.subscribe((newVal) => console.log('theme is now', newVal));

// update — triggers all subscribers
theme.set('dark');

// read current value
console.log(theme.get()); // 'dark'
```

use case: when you need a simple reactive primitive without pulling in a whole state management library. the theme system and some internal component states use this.

### Registry.ts

a typed key→value registry backed by a `Map`, with event notifications for additions/removals.

```ts
import { Registry } from '@libcss/core';

const components = new Registry<string, ComponentDef>();

components.register('Button', buttonDef);
components.get('Button'); // → buttonDef
components.has('Button'); // → true
components.unregister('Button');
```

use case: the **component registry** in the studio uses this exact pattern. it's what lets the studio dynamically discover and display components.

## things to remember

- Observable is NOT React state — it's a plain JS pattern. if you want React reactivity, you'd wrap it in a hook with `useSyncExternalStore`.
- Registry uses the EventBus internally, so you can listen for `register`/`unregister` events on it
- both are generic — `Observable<T>` and `Registry<K, V>` — so they're type-safe
