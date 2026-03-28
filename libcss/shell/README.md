# libcss/shell — Generic Shell Bootstrap Scaffold

Generates a customizable bash bootstrap script for terminal applications. Configure prompt style, welcome banner, aliases, and shell behavior from a single config object.

## Quick Start

```ts
import { generateBootstrap } from '../libcss/shell';

const script = generateBootstrap({
  appName: 'My Terminal',
  appVersion: '1.0.0',
  prompt: {
    username: '\\u',
    hostname: 'myhost',
    hostColor: '1;32',   // bold green
    pathColor: '1;34',   // bold blue
    gitColor: '33',      // yellow
  },
  banner: {
    style: 'zigzag',     // 'box' | 'zigzag' | 'minimal' | 'none'
    color: '1;36',       // cyan
    icon: '☁',
  },
  aliases: {
    ll: 'ls -alF --color=auto',
    cls: 'clear',
  },
});

fs.writeFileSync('shell/core/bootstrap.sh', script);
```

## Config Reference

See `types.ts` for full interface documentation.
