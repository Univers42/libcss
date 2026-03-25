# Chip

tag/chip component — for filters, categories, or multi-select values.

## usage

```tsx
<Chip>React</Chip>
<Chip variant="filled" color="primary" icon={<TagIcon />}>TypeScript</Chip>
<Chip removable onRemove={() => removeTag('css')}>CSS</Chip>
<Chip clickable onClick={() => toggleFilter('new')}>New</Chip>
```

## props

| prop | type | what it does |
|------|------|-------------|
| `variant` | `'filled' \| 'outlined'` | solid or border-only |
| `color` | `'default' \| 'primary' \| 'success'` etc. | color scheme |
| `icon` | `ReactNode` | icon before text |
| `removable` | `boolean` | shows an X button |
| `onRemove` | `() => void` | called when X is clicked |
| `clickable` | `boolean` | adds hover/click styles |
| `disabled` | `boolean` | grays it out |

## things to remember

- chips are smaller than badges and meant for interactive use (filtering, tagging)
- `removable` chips get a small × icon at the end
- `clickable` chips get cursor pointer + hover state
- commonly used for tag lists, filter bars, or multi-select inputs
