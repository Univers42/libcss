# chart/core/

infrastructure modules that power the chart system — scales, axes, transforms, tooltips, and more.

## file map

| file | what it does |
|------|-------------|
| `scales.ts` | creates D3 scales (band, linear, color) from data + config |
| `axes.tsx` | renders X and Y axis SVG elements |
| `grid.tsx` | renders gridlines (horizontal, vertical, or both) |
| `legend.tsx` | renders the chart legend |
| `tooltip.tsx` | the tooltip component + `useTooltip` hook |
| `data-labels.tsx` | renders value labels on data points |
| `reference-line.tsx` | renders horizontal/vertical reference lines |
| `data-provider.ts` | React context for passing chart data down |
| `data-context.tsx` | the context provider component |
| `transforms.ts` | data preprocessing — the heavy lifter |
| `responsive.ts` | resize observer hook for responsive dimensions |

## transforms.ts — the important one

this is where raw data gets turned into chart-ready data:
- **cartesian transform** — for bar/line/area charts (maps to x/y positions)
- **grouped transform** — for grouped/stacked bar charts (sub-groups + stacking offsets)
- **pie transform** — for pie/donut charts (calculates angles)
- **scatter transform** — for scatter plots (maps to x/y coordinates)
- also handles **aggregation** (sum, avg, min, max, count)

## things to remember

- `scales.ts` is the bridge between data space → pixel space (D3 scales)
- `transforms.ts` runs before rendering — chart variants receive clean, ready-to-render data
- the tooltip uses a React hook (`useTooltip`) for hover state management
- `responsive.ts` uses `ResizeObserver` to re-render charts when the container size changes
- all of this is barrel-exported through `index.ts`
