# src/parser/

auto-discovery system for components. instead of manually listing every component, the parser can scan the file system and build a manifest of all available components.

## files

| file | what it does |
|------|-------------|
| `componentParser.ts` | the main parser — walks the component directories, reads file conventions, and builds a manifest of discovered components |
| `types.ts` | TypeScript types — `ComponentManifest`, `ComponentManifestEntry` |
| `useComponentManifest.ts` | React hook that runs the parser and returns the manifest as state |
| `index.ts` | barrel — exports `discoverComponents`, `discoverComponentsSync`, `useComponentManifest` |

## how it works

the parser looks at the folder structure under `src/components/` and uses naming conventions to figure out what's a component:

- folder name → component name
- parent folder → category (atoms, molecules, media…)
- presence of `.tsx` files → it's a component
- presence of `.types.ts` → has typed props

```ts
import { discoverComponents } from '../parser';

const manifest = await discoverComponents();
// → [{ name: 'Button', category: 'atoms', path: '...' }, ...]
```

or as a hook:

```tsx
const manifest = useComponentManifest();
```

## things to remember

- this is separate from the registry — the parser discovers what exists on disk, the registry tracks what's been registered at runtime
- useful for tooling, docs generation, and CI checks
- the hook is used in some studio views to show all available components even if they haven't been registered with an entry file yet
