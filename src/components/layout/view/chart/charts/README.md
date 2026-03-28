# chart/charts/

the 10 individual chart type renderers — each one knows how to draw one kind of chart.

## files

| file | chart type |
|------|-----------|
| `BarChart.tsx` | vertical bar chart |
| `HorizontalBarChart.tsx` | horizontal bar chart |
| `StackedBarChart.tsx` | stacked vertical bars |
| `GroupedBarChart.tsx` | side-by-side grouped bars |
| `LineChart.tsx` | line graph with optional markers |
| `AreaChart.tsx` | filled area under a line |
| `PieChart.tsx` | circular pie chart |
| `DonutChart.tsx` | pie with center hole |
| `ScatterChart.tsx` | XY scatter plot with dots |
| `ComboChart.tsx` | combined bars + lines |

## how they work

each chart receives pre-processed data and D3 scales from the parent `<Chart />` component. they only handle the SVG rendering — no data processing, no scale creation.

```
Chart.tsx (orchestrator)
  → transforms data
  → creates scales
  → picks the right chart variant
  → passes: data, scales, dimensions, config
  → variant renders SVG elements
```

## things to remember

- you never import these directly — `Chart.tsx` picks the right one based on the `type` prop
- they all operate on pre-processed data (the `core/transforms.ts` module does the preprocessing)
- each chart renders SVG `<rect>`, `<path>`, `<circle>`, `<line>` etc.
- barrel exported via `index.ts`
