# common/logger/

structured logging with namespaces — so you can actually tell which part of the system is yelling at you.

## what's in here

- **`Logger.ts`** — factory function `createLogger(namespace, config?)` that returns a logger instance
- **`types.ts`** — the `Logger` interface and config types

## usage

```ts
import { createLogger } from '@libcss/core';

const log = createLogger('ColorPicker');

log.debug('rendering swatch bar');  // 🐛 [ColorPicker] rendering swatch bar
log.info('color changed', '#ff0');  // ℹ️ [ColorPicker] color changed #ff0
log.warn('fallback to hex');        // ⚠️ [ColorPicker] fallback to hex
log.error('invalid input');         // 🚨 [ColorPicker] invalid input
```

## things to remember

- every log message gets prefixed with the namespace so you can ctrl+f in the console
- log levels: `debug` < `info` < `warn` < `error` — you can set a minimum level in the config
- the default sink just writes to `console.*` with emoji prefixes
- you can pass a custom sink if you want to send logs somewhere else (analytics, file, etc.)
- keep namespaces short and descriptive — component name or module name works great
