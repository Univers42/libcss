# Tooltip

hover/focus tooltip — the little floating label that appears when you hover something.

## usage

```tsx
<Tooltip content="Save your work" placement="top">
  <Button variant="ghost" size="icon"><SaveIcon /></Button>
</Tooltip>

<Tooltip content="Copy to clipboard" placement="bottom" delay={200}>
  <Kbd>⌘C</Kbd>
</Tooltip>
```

## props

| prop | type | what it does |
|------|------|-------------|
| `content` | `string` | tooltip text |
| `placement` | `'top' \| 'bottom' \| 'left' \| 'right'` | which side it appears on |
| `delay` | `number` | hover delay in ms before showing |
| `children` | `ReactNode` | the trigger element |

## things to remember

- shows on mouse enter/focus, hides on mouse leave/blur
- uses ARIA `role="tooltip"` for accessibility
- the delay prevents tooltips from flickering when you move the mouse quickly
- the tooltip is positioned with CSS — no floating UI library needed
- wrap the trigger element as children (the tooltip adds the event listeners via cloning)
