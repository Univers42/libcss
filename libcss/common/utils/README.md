# common/utils/

tiny utility functions — zero dependencies, just helpful stuff.

## what's in here

### deepClone.ts

```ts
import { deepClone } from '@libcss/core';

const copy = deepClone(someObject);
// → a fully independent deep copy
```

uses `structuredClone` under the hood (it's a native browser API now), with a `JSON.parse(JSON.stringify())` fallback for older environments. you'll see this whenever we need to duplicate state without reference sharing.

### uid.ts

```ts
import { uid } from '@libcss/core';

uid();         // → "x7k2m9"
uid('toast');  // → "toast-x7k2m9"
```

generates short unique IDs using random base-36 strings. NOT cryptographically secure — this is for DOM `id` attributes, key props, that sort of thing. if you need real UUIDs, use the `crypto` API instead.

## things to remember

- these are all pure functions — no side effects, no state
- they're re-exported through `src/core/index.ts` so you can import from `@libcss/core`
- `deepClone` won't work on things `structuredClone` can't handle (functions, DOM nodes, etc.)
- `uid()` is good enough for component instance IDs but don't use it for database keys or anything security-related
