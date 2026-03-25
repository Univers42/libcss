# Spinner

loading spinner — the classic rotating circle.

## usage

```tsx
<Spinner />
<Spinner size="lg" />
<Spinner size="sm" color="#ff0000" />
```

## props

| prop | type | what it does |
|------|------|-------------|
| `size` | `'sm' \| 'md' \| 'lg'` | spinner diameter |
| `color` | `string` | custom color |

## things to remember

- uses `role="status"` and `aria-label` for screen readers
- the animation is pure CSS (no JS intervals)
- use inside buttons (`<Button isLoading>`) or standalone for full-page loading states
- prefer `Skeleton` for layout placeholders, use `Spinner` for action-triggered loading
