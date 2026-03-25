# src/components/views/

page-level composite views — these are the "pages" of the studio. each one assembles explorer components, controls, and layout into a full screen experience.

## what's here

| view | what it shows |
|------|-------------|
| `CatalogView` (aka OverviewView) | the landing page — grid of category cards showing all component families |
| `CategoryView` | all components within a category — grid of component cards with search |
| `VariantGalleryView` | all variants of a single component displayed in a matrix grid |
| `PlaygroundView` | interactive playground — live component + prop controls + code preview |
| `ChartGalleryView` | gallery of chart examples with different types and palettes |

## navigation flow

```
OverviewView → CategoryView → VariantGalleryView → PlaygroundView
                                                  ↘ ChartGalleryView
```

- **overview**: pick a category (atoms, molecules, media…)
- **category**: browse components in that category, search/filter
- **variant gallery**: see every variant combination of a component
- **playground**: tweak individual props live with controls
- **chart gallery**: dedicated gallery for chart visualizations

## things to remember

- these views are rendered inside a `DashboardShell` by `App.tsx`
- navigation state is managed in `App.tsx` via a `NavState` object, not a router
- each view receives callbacks for navigation (`onBack`, `onSelectComponent`, etc.)
- the PlaygroundView uses `ControlFactory` from `controls/` to render prop editors
