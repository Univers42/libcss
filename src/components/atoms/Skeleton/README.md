# Skeleton

loading placeholder — the gray pulsing shapes you see while content loads.

## usage

```tsx
<Skeleton variant="text" width="80%" />
<Skeleton variant="circular" width={48} height={48} />
<Skeleton variant="rectangular" height={200} />
<Skeleton variant="rounded" width={300} height={150} animation="wave" />
```

## props

| prop | type | what it does |
|------|------|-------------|
| `variant` | `'text' \| 'circular' \| 'rectangular' \| 'rounded'` | shape |
| `animation` | `'pulse' \| 'wave' \| 'none'` | loading animation style |
| `width` | `number \| string` | explicit width |
| `height` | `number \| string` | explicit height |

## common patterns

- **text skeleton**: use several at different widths (100%, 100%, 60%) to simulate a paragraph
- **avatar skeleton**: `circular` with equal width/height
- **card skeleton**: `rounded` or `rectangular` with a fixed height
- **list skeleton**: stack multiple `text` variants in a column

## things to remember

- `pulse` fades in and out — most common choice
- `wave` has a shimmer effect moving left to right — more premium feel
- `none` is static gray — for when animation would be distracting
- number widths are pixels, string widths can be percentages
