# Toast

notification toast — pops up briefly then disappears.

## usage

```tsx
<Toast variant="success" onClose={() => removeToast(id)}>
  File saved successfully!
</Toast>

<Toast variant="error" duration={5000}>
  Something went wrong. Please try again.
</Toast>
```

## props

| prop | type | what it does |
|------|------|-------------|
| `variant` | `'info' \| 'success' \| 'warning' \| 'error'` | color + icon |
| `duration` | `number` | auto-dismiss timeout in ms |
| `onClose` | `() => void` | called when toast closes (manual or auto) |
| `children` | `ReactNode` | toast message |

## things to remember

- has a close button (×) for manual dismissal
- auto-dismisses after `duration` ms with an exit animation
- uses `role="status"` + `aria-live="polite"` so screen readers announce it
- you'll typically manage a list of toasts in state and render them in a fixed-position container
- each toast handles its own timer internally
