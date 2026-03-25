# libcss — Prismatica Design System

hey! so this is **libcss**, basically the whole design system for Prismatica. it's an SCSS/CSS library + a bunch of React components organized using atomic design (atoms → molecules → organisms → layouts). the idea is that everything visual lives here — colors, spacing, buttons, modals, charts, shells — and any app in the Prismatica ecosystem just pulls from this one source of truth.

you can use it CSS-only (just drop in the stylesheet) or import React components directly. both work.

## quick start

```bash
# install deps
npm install

# build the CSS
npm run build          # → dist/css/libcss.css (expanded + sourcemap)
npm run build:min      # → dist/css/libcss.min.css (compressed, autoprefixed)
npm run build:all      # both

# watch mode (auto-rebuild on save)
npm run watch

# launch the interactive studio/playground
make dev
# or manually:
cd studio && npm install && npm run dev
```

the studio opens at `http://localhost:5173` (or whatever port vite picks). it lets you browse every component, tweak props live, and see all variants in one place.

## project layout

```
src/
├── scss/            ← all the SCSS source (this IS the CSS library)
│   ├── abstracts/   ← tokens, mixins, functions (no CSS output on their own)
│   ├── base/        ← reset, typography, animations
│   ├── themes/      ← light/dark via CSS custom properties
│   ├── components/  ← styles for atoms, molecules, organisms
│   ├── layouts/     ← shell layouts (dashboard, panel…), charts, explorer
│   └── utilities/   ← helper classes (.flex, .gap-4, .sr-only…)
│
├── components/      ← React components (mirrors the SCSS structure)
│   ├── atoms/       ← small building blocks (Button, Badge, Input…)
│   ├── molecules/   ← composed things (ColorPicker, Toolbar, Accordion…)
│   ├── media/       ← Image, Video, Audio, FileAttachment
│   ├── layout/      ← shell containers + data views (chart, timeline…)
│   ├── controls/    ← generic prop editors for the playground
│   ├── explorer/    ← component explorer UI (sidebar, search, cards…)
│   └── views/       ← page-level views (overview, category, playground…)
│
├── hooks/           ← reusable React hooks (useDebounce, useBreakpoint…)
├── core/            ← registry, event bus, shared types
├── common/          ← infra stuff (EventBus, Logger, Observable, etc.)
├── parser/          ← auto-discovers components from file system
└── studio/          ← barrel that re-exports everything as @libcss/studio

studio/              ← Vite app — the interactive component playground
dist/                ← compiled output (git-ignored, don't touch)
```

## using it — CSS only

grab `dist/css/libcss.css` and link it:

```html
<link rel="stylesheet" href="libcss.css" />
```

dark mode works automatically via `prefers-color-scheme`. or force it:

```html
<html data-theme="dark">
```

## using it — React components

```tsx
import { Button, Badge, Tooltip } from '@libcss/components';
import { DashboardShell } from '@libcss/layout';
```

## naming convention

all CSS classes follow BEM with the `prisma-` prefix:

```
.prisma-button
.prisma-button__icon
.prisma-button--primary
```

CSS custom properties are `--prisma-*` (like `--prisma-accent`, `--prisma-bg-primary`).

## available commands

| command | what it does |
|---------|-------------|
| `make dev` | installs studio deps + starts vite |
| `make build` | compiles SCSS via docker |
| `npm run build` | compiles SCSS locally (no docker) |
| `npm run watch` | auto-rebuild on save |
| `npm run lint` | stylelint all SCSS |
| `npm run typecheck` | run tsc --noEmit |
| `make clean` | removes dist/css |
| `make fclean` | full clean + docker teardown |

## things to keep in mind

- **entry point** for SCSS is `src/scss/libcss.scss` — imports everything in order: base → themes → components → layouts → utilities. order matters for the cascade.
- **tokens** live in `src/scss/abstracts/_tokens.scss` — colors, spacing, shadows, z-index, typography. change stuff there, everything downstream updates.
- **theming** is all CSS custom properties. light and dark are built in. palette switching (sunset, ocean, forest…) is done in the studio via `data-palette` attributes.
- **adding a new component**: create the SCSS in `src/scss/components/`, the React files in `src/components/`, add an entry file in `studio/src/entries/`, and it shows up in the playground.

## license

MIT — Prismatica / Univers42
