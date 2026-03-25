# Alert

dismissible notification banner — for when you need to tell the user something important.

## variants

`info` · `success` · `warning` · `danger`

## usage

```tsx
<Alert variant="warning" title="Heads up" onDismiss={() => {}}>
  This action cannot be undone.
</Alert>
```

## props

| prop | type | what it does |
|------|------|-------------|
| `variant` | `'info' \| 'success' \| 'warning' \| 'danger'` | color + icon style |
| `title` | `string` | optional bold title |
| `icon` | `ReactNode` | override the default icon |
| `dismissible` | `boolean` | show the X button |
| `onDismiss` | `() => void` | called when X is clicked |

## things to remember

- BEM class: `prisma-alert`
- dismissible alerts should always have an `onDismiss` handler
- the icon changes automatically based on variant unless you override it
