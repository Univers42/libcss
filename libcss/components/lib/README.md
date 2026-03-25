# src/components/lib/

shared utilities used by components internally.

## what's here

| file | purpose |
|------|---------|
| `cn.ts` | **classname joiner** — like the `classnames` or `clsx` package but homemade. takes any number of string/undefined/false args and joins the truthy ones into a space-separated class string. |

```ts
import { cn } from '../lib/cn';

cn('btn', variant && `btn--${variant}`, disabled && 'btn--disabled')
// → "btn btn--primary" (if variant='primary', disabled=false)
```

this is used everywhere in the component codebase for conditional class composition.

## things to remember

- this is exported from the main components barrel as `cn`
- it's a small utility — no external dependencies
- falsy values (undefined, null, false, '') are silently ignored
