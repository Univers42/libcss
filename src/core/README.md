# src/core/

the engine room. this is where the component registry, event system, and shared type definitions live. it powers the studio's ability to discover components, track state, and communicate between parts.

## files

| file | what it does |
|------|-------------|
| `registry.ts` | the **component registry** — a global map where component entries are registered. each entry describes a component's name, category, props, variants, and render function. the studio reads from this to know what to show. |
| `events.ts` | typed event buses — `studioEvents` (global studio events) and `explorerEvents` (component explorer events). uses the EventBus from `common/events`. |
| `types.ts` | all the shared TypeScript types: `ComponentCategory`, `ComponentEntry`, `PropControl`, `VariantPreset`, `StudioView`, `StudioState`, etc. also has `CATEGORY_META` which maps each category to a label, icon, and description. |
| `index.ts` | barrel — re-exports everything |

## how the registry works

when the studio boots, each entry file (in `studio/src/entries/`) calls `registry.register()` to add itself:

```ts
import { registry } from '@libcss/core';

registry.register({
  id: 'button',
  name: 'Button',
  category: 'atoms',
  component: Button,
  defaultProps: { variant: 'primary', children: 'Click me' },
  controls: [...],
  variants: [...],
});
```

then the studio UI reads `registry.getAll()` to build the component catalog.

## things to remember

- `ComponentCategory` = `'atoms' | 'molecules' | 'media' | 'layout' | 'organisms'`
- each `ComponentEntry` has: id, name, category, component (React), defaultProps, controls (for playground), variants (preset configs)
- the event buses are useful for cross-component communication without prop drilling (like "component selected", "theme changed")
- `CATEGORY_META` provides display names, icons, and descriptions for each category — used by the overview page
