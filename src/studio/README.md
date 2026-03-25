# src/studio/

this isn't a separate app — it's a **barrel file** that re-exports everything needed by the studio under one clean import path (`@libcss/studio`).

## what it does

the studio barrel gathers exports from across the codebase and presents them as a single module:

```ts
// instead of importing from 5 different places:
import { registry } from '../core';
import { Sidebar } from '../components/explorer';
import { useStudioNavigation } from '../hooks';
import { OverviewView } from '../components/views';
import { ControlFactory } from '../components/controls';

// you just do:
import { registry, Sidebar, useStudioNavigation, OverviewView, ControlFactory } from '@libcss/studio';
```

## what's re-exported

- **core**: registry, events, CATEGORY_META, all type definitions
- **layout**: StudioLayout
- **explorer**: Sidebar, SearchBar, CategoryCard, ComponentCard, ThemeSwitcher, VariantGrid, etc.
- **controls**: ControlFactory, SelectControl, TextControl, BooleanControl, NumberControl, ColorControl, RangeControl
- **hooks**: useStudioNavigation, useComponentState, useSearch
- **views**: OverviewView, CategoryView, PlaygroundView, VariantGalleryView, ChartGalleryView
- **parser**: discoverComponents, useComponentManifest

## things to remember

- this file just re-exports — no logic lives here
- the `@libcss/studio` alias is configured in the studio's `vite.config.ts` and `tsconfig.json`
- if you add a new export to any of the source modules, you might need to add it here too for it to be available via the studio alias
- backward compat: `ExplorerBreadcrumb` is also exported as `Breadcrumb` for old imports
