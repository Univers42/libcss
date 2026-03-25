# src/components/layout/view/

data view components — 10 different ways to visualize collections of data. these are meant to be rendered inside a shell's main content area.

## available views

| view | what it renders |
|------|----------------|
| `board/` | kanban board — columns with draggable cards |
| `calendar/` | month/week/day calendar grid |
| `chart/` | D3-based charts — bar, line, area, pie, donut, scatter, radar, treemap, heatmap |
| `dashboard/` | widget dashboard with stat cards, mini charts, KPIs |
| `feed/` | vertical social-feed style stream |
| `gallery/` | image/card gallery in a responsive grid |
| `list/` | simple vertical list with optional sorting |
| `map/` | geographic/spatial map view |
| `table/` | data table with headers, sorting, alignment |
| `timeline/` | chronological events on a horizontal or vertical track |

## the chart system (deepest one)

```
chart/
├── core/        ← shared chart infrastructure (axes, scales, grid, tooltip, legend)
├── charts/      ← individual chart type implementations
├── palettes/    ← color palette definitions (8 colors each)
└── index.ts
```

the chart component takes a `ChartConfig` object:

```tsx
import { Chart } from '@libcss/layout';

<Chart config={{
  type: 'bar',
  data: [{ label: 'Q1', value: 120 }, { label: 'Q2', value: 340 }],
  palette: 'prisma',
  responsive: true,
}} />
```

available palettes: prisma, ocean, sunset, forest, neon, earth, pastel.

## things to remember

- all views expect data to be passed as props — they don't fetch anything
- chart rendering uses D3 for the SVG math, but React for the DOM. it's a hybrid approach.
- each view's styles are in the layout SCSS layer (`src/scss/layouts/`)
- views are composable — you could have a dashboard view that contains mini chart views and a table view
