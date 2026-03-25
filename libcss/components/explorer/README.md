# src/components/explorer/

the component explorer UI — all the pieces that make up the studio's navigation and component browsing experience.

## what's here

| component | purpose |
|-----------|---------|
| `Sidebar` | the left navigation panel — lists all categories and components in a tree |
| `SearchBar` | the search input at the top — filters components by name |
| `CategoryCard` | card that represents a component category (atoms, molecules, etc.) on the overview page |
| `ComponentCard` | card for an individual component — shows name, preview, description |
| `ComponentStage` | the main rendering area where a component is displayed with its current props |
| `InspectorPanel` | right-side panel showing component meta info, props, and variant presets |
| `CodePreview` | displays the JSX/code for the current component configuration |
| `Breadcrumb` | explorer-specific breadcrumb (separate from the atom Breadcrumb) — renamed as ExplorerBreadcrumb |
| `ButtonVariantGrid` | specialized grid for displaying button variant combinations |
| `VariantGrid` | generic grid for showing all variants of a component along multiple dimensions |
| `ThemeSwitcher` | palette/theme picker bar at the top right of the studio |

## how they fit together

```
┌──────────────────────────────────────────────────┐
│ [Breadcrumb]              [SearchBar] [ThemeSw.] │ ← header
├──────────┬───────────────────────────────────────┤
│          │                                       │
│ Sidebar  │   CategoryCard / ComponentCard grid   │ ← overview
│          │          or                           │
│          │   ComponentStage + InspectorPanel     │ ← playground
│          │          or                           │
│          │   VariantGrid / ButtonVariantGrid     │ ← variant gallery
│          │                                       │
│          │   [CodePreview]                       │
└──────────┴───────────────────────────────────────┘
```

## things to remember

- these components are studio-specific — you wouldn't use them in a product app
- `ExplorerBreadcrumb` is aliased as `Breadcrumb` for backward compat but it's a different component from the atom `Breadcrumb`
- `VariantGrid` takes dimension definitions and generates a grid of all combinations automatically
- styles for all of these live in `src/scss/layouts/_shell-explorer.scss`
