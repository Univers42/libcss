# studio/

the interactive component playground — a Vite + React app that lets you browse, search, and play with every component in the design system.

## quick start

```bash
# from project root
make dev

# or manually
cd studio
npm install
npm run dev
```

opens at `http://localhost:5173` (or next available port).

## what is this

it's a standalone Vite app that imports the design system source directly (not the compiled CSS — it resolves the `.tsx` components via path aliases). you get:

- **component catalog**: browse all atoms, molecules, media, layout components
- **variant gallery**: see every visual variant of a component in a grid
- **live playground**: pick a component, tweak its props with controls, see it update in real-time
- **chart gallery**: explore different chart types and color palettes
- **theme switching**: hot-swap between color palettes (prisma, sunset, ocean, forest, neon…)

## structure

```
studio/
├── public/
│   └── libcss.css      ← compiled stylesheet (symlink or copy from dist/)
├── src/
│   ├── main.tsx         ← React entry point
│   ├── App.tsx          ← root component — DashboardShell + navigation state
│   ├── App.css          ← studio-specific styles (brand, palette themes)
│   └── entries/         ← component registration files
│       ├── index.ts     ← imports all entries (side-effect)
│       ├── button.entry.ts
│       ├── badge.entry.ts
│       └── ...          ← one per component (~40 entry files)
├── index.html           ← loads /libcss.css + /src/main.tsx
├── vite.config.ts       ← path aliases + dev server config
├── tsconfig.json        ← TypeScript config with path aliases
└── package.json
```

## how entries work

each entry file registers a component with the studio registry:

```ts
// button.entry.ts
import { registry } from '@libcss/core';
import { Button } from '@libcss/components';

registry.register({
  id: 'button',
  name: 'Button',
  category: 'atoms',
  component: Button,
  defaultProps: { variant: 'primary', children: 'Click me' },
  controls: [
    { prop: 'variant', type: 'select', options: ['primary', 'secondary', 'ghost', 'danger'] },
    { prop: 'size', type: 'select', options: ['sm', 'md', 'lg'] },
    { prop: 'disabled', type: 'boolean' },
  ],
  variants: [...],
});
```

`entries/index.ts` imports them all as side-effects so they run on app boot.

## path aliases

defined in `vite.config.ts`:

- `@libcss/components` → `../src/components`
- `@libcss/studio` → `../src/studio`
- `@libcss/layout` → `../src/components/layout`
- `@libcss/core` → `../src/core`
- `@libcss/hooks` → `../src/hooks`

## things to remember

- the studio loads `libcss.css` from `public/` for the component styles — make sure it's up to date after SCSS changes (`npm run build` from root, or it might be symlinked)
- `App.css` contains studio-only styles: brand logo, palette theme overrides (`[data-palette="sunset"]`, etc.), shell token customizations
- navigation is state-based (not URL-based) — there's no router, just a `NavState` object in `App.tsx`
- to add a new component to the studio: create the component in `src/components/`, then add an entry file in `studio/src/entries/`, then import it in `entries/index.ts`
