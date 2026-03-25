# Progress

progress bar — shows how far along something is.

## usage

```tsx
<Progress value={75} max={100} />
<Progress value={60} showValue label="Upload progress" />
<Progress value={90} color="success" striped animated />
<Progress value={30} color="danger" size="sm" />
```

## props

| prop | type | what it does |
|------|------|-------------|
| `value` | `number` | current progress |
| `max` | `number` | maximum value (default 100) |
| `label` | `string` | accessible label |
| `showValue` | `boolean` | display percentage text |
| `size` | `'sm' \| 'md' \| 'lg'` | bar height |
| `color` | `'primary' \| 'success' \| 'warning' \| 'danger'` | fill color |
| `striped` | `boolean` | diagonal stripe pattern |
| `animated` | `boolean` | animates the stripes |

## things to remember

- uses ARIA `role="progressbar"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax`
- `striped + animated` gives you the classic "loading bar" look
- `showValue` displays the percentage number on or near the bar
- the progress is calculated as `(value / max) * 100`
