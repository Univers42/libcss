# Divider

visual separator line — horizontal or vertical.

## usage

```tsx
<Divider />
<Divider variant="dashed" spacing="lg" />
<Divider orientation="vertical" />
<Divider label="OR" />
```

## props

| prop | type | what it does |
|------|------|-------------|
| `variant` | `'solid' \| 'dashed' \| 'dotted'` | line style |
| `spacing` | `'sm' \| 'md' \| 'lg'` | margin above/below (or left/right if vertical) |
| `orientation` | `'horizontal' \| 'vertical'` | direction |
| `label` | `string` | text in the middle of the line (like "OR") |

## things to remember

- when `label` is provided, the line breaks in the middle and shows the text
- vertical dividers need a parent with a defined height to show up
- the label variant is great for "OR" dividers between form options
