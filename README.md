# libcss — Prismatica Design System

**libcss** is the design system for Prismatica. it's an SCSS/CSS library + React components organized using atomic design (atoms → molecules → organisms → layouts). everything visual lives here — colors, spacing, buttons, modals, charts, shells — and any app in the Prismatica ecosystem just pulls from this one source of truth.

you can use it **CSS-only** (just drop in the stylesheet) or **import React components** directly. both work.

---

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
```

---

## using libcss in your project

### option 1 — Docker image (recommended for CSS-only)

the library is published as a Docker image on GitHub Container Registry. the image contains pre-compiled CSS and the full source.

```bash
# pull the latest image
docker pull ghcr.io/univers42/libcss:latest

# extract the compiled CSS into your project
docker create --name libcss-tmp ghcr.io/univers42/libcss:latest
docker cp libcss-tmp:/dist/css/libcss.css ./path/to/your/project/
docker cp libcss-tmp:/dist/css/libcss.min.css ./path/to/your/project/
docker rm libcss-tmp
```

or use it in a multi-stage Dockerfile:

```dockerfile
FROM ghcr.io/univers42/libcss:latest AS design-system

FROM node:20-alpine AS app
# copy the compiled CSS from libcss
COPY --from=design-system /dist/css/libcss.min.css /app/public/libcss.min.css
# copy the React source if you need the components
COPY --from=design-system /src /app/libcss-src
# … rest of your app build
```

then in your HTML:

```html
<link rel="stylesheet" href="/libcss.min.css" />
```

### option 2 — Git submodule (for React components + CSS)

if you need the React components in your app, add libcss as a submodule:

```bash
# add the submodule
git submodule add git@github.com:Univers42/libcss.git libcss

# install its deps
cd libcss && npm install && cd ..
```

then configure your bundler (Vite, Webpack, etc.) to resolve imports from it. example with a tsconfig path alias:

```jsonc
// tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@libcss/*": ["libcss/src/*"]
    }
  }
}
```

import components in your app:

```tsx
import { Button, Badge, Tooltip } from '@libcss/components/atoms';
import { Accordion, Toolbar } from '@libcss/components/molecules';
import { useDebounce, useBreakpoint } from '@libcss/hooks';
```

> **note:** your project must have `react >= 18` and `react-dom >= 18` as dependencies since they are peer dependencies of libcss.

to update the submodule to the latest version:

```bash
cd libcss && git pull origin main && cd ..
git add libcss
git commit -m "update libcss submodule"
```

---

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

---

## available commands

### Make targets

| target | what it does |
|--------|-------------|
| `make build` | compiles SCSS → CSS via Docker |
| `make lint` | lint everything (SCSS + CSS + TypeScript) |
| `make lint-scss` | lint SCSS and CSS files only |
| `make lint-ts` | lint TypeScript files only |
| `make lint-fix` | auto-fix lint issues locally |
| `make typecheck` | run `tsc --noEmit` via Docker |
| `make format` | auto-format all source files |
| `make dev` | watch mode (auto-rebuild on save) |
| `make docs` | generate SCSS documentation |
| `make image` | build the Docker image locally |
| `make push` | build + push Docker image to ghcr.io |
| `make push VERSION=1.2.0` | push a tagged version (also tags `latest`) |
| `make login` | authenticate to GitHub Container Registry |
| `make clean` | remove `dist/css` |
| `make fclean` | full clean + Docker teardown |
| `make re` | `fclean` + `build` |

### npm scripts (local, no Docker)

| script | what it does |
|--------|-------------|
| `npm run build` | compile SCSS locally |
| `npm run build:min` | compile + minify + autoprefix |
| `npm run build:all` | both expanded and minified |
| `npm run watch` | auto-rebuild on save |
| `npm run lint` | stylelint + eslint |
| `npm run lint:fix` | auto-fix lint issues |
| `npm run format` | prettier on all source |
| `npm run typecheck` | `tsc --noEmit` |

---

## publishing a new version

```bash
# 1. authenticate to ghcr.io (once — needs a PAT with write:packages)
export CR_PAT=ghp_your_token_here
make login

# 2. build and push
make push VERSION=1.0.0
# this builds the image, pushes 1.0.0 AND updates :latest
```

the image is published to `ghcr.io/univers42/libcss`.

---

## using it — CSS only

grab `dist/css/libcss.css` and link it:

```html
<link rel="stylesheet" href="libcss.css" />
```

dark mode works automatically via `prefers-color-scheme`. or force it:

```html
<html data-theme="dark">
```

---

## naming convention

all CSS classes follow BEM:

```
.button
.button__icon
.button--primary
```

CSS custom properties are `--prisma-*` (like `--prisma-accent`, `--prisma-bg-primary`).

---

## things to keep in mind

- **entry point** for SCSS is `src/scss/libcss.scss` — imports everything in order: base → themes → components → layouts → utilities. order matters for the cascade.
- **tokens** live in `src/scss/abstracts/_tokens.scss` — colors, spacing, shadows, z-index, typography. change stuff there, everything downstream updates.
- **theming** is all CSS custom properties. light and dark are built in. palette switching (sunset, ocean, forest…) is done in the studio via `data-palette` attributes.
- **adding a new component**: create the SCSS in `src/scss/components/`, the React files in `src/components/`, and it shows up in the registry.

## license

MIT — Prismatica / Univers42
