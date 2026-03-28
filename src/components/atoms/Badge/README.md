# Badge

small inline label — for status indicators, counts, tags.

## variants

`default` · `primary` · `success` · `warning` · `danger` · `info`

## sizes

`sm` · `md` · `lg`

## usage

```tsx
<Badge variant="success">Active</Badge>
<Badge variant="danger" pill>3</Badge>
<Badge variant="info" outline>Beta</Badge>
<Badge variant="warning" dot>Draft</Badge>
```

## props

| prop | type | what it does |
|------|------|-------------|
| `variant` | string | color scheme |
| `size` | `'sm' \| 'md' \| 'lg'` | text + padding size |
| `pill` | `boolean` | fully rounded corners |
| `outline` | `boolean` | border only, no fill |
| `dot` | `boolean` | small dot indicator before text |

## things to remember

- `pill` mode is great for notification counts (the circular look)
- `outline` gives a lighter, less aggressive appearance
- `dot` adds a small colored circle before the text — useful for status badges
