# chart/

the D3-powered chart system — 10 chart types, 10 color palettes, metadata-driven rendering.

this is the most complex component in the entire library. take your time understanding it.

## how it works

you give `<Chart />` a config object describing what you want, and it:
1. resolves the chart type and config
2. runs data transforms (aggregation, grouping, stacking, etc.)
3. creates D3 scales (x, y, color)
4. delegates rendering to the appropriate chart variant
5. adds axes, gridlines, legends, tooltips, data labels, and reference lines

## chart types

| type | what it looks like |
|------|-------------------|
| `bar` | vertical bars |
| `horizontal-bar` | horizontal bars |
| `stacked-bar` | stacked vertical bars |
| `grouped-bar` | side-by-side grouped bars |
| `line` | line graph |
| `area` | filled area under a line |
| `pie` | circular pie chart |
| `donut` | pie with a hole in the middle |
| `scatter` | dots plotted on XY axes |
| `combo` | mix of bars + lines |

## folder structure

```
chart/
├── Chart.tsx          # main orchestrator (631 lines!)
├── Chart.types.ts     # all type definitions (252 lines)
├── Chart.constants.ts # default config
├── index.ts           # barrel
├── charts/            # 10 chart variant renderers
├── core/              # infrastructure (scales, axes, transforms, etc.)
└── palettes/          # 10 color palette definitions
```

## usage

```tsx
<Chart
  type="bar"
  data={[
    { label: 'Jan', value: 42 },
    { label: 'Feb', value: 58 },
  ]}
  palette="ocean"
  showGrid
  showLegend
  showTooltip
/>
```

## things to remember

- Chart.tsx is the brain — it's 631 lines and handles all the orchestration
- everything is metadata-driven — you describe what you want, the chart builds itself
- data transforms happen before rendering (aggregation, grouping, stacking, pie slicing)
- all SVG rendering — no canvas, no WebGL
- the chart is responsive by default (uses a resize observer)
