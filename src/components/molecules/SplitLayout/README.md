# SplitLayout

two-column layout — a left pane and a right pane.

## usage

```tsx
<SplitLayout
  left={<InfoPanel title="Welcome" ... />}
  right={<LoginForm />}
  variant="default"
  maxWidth="1200px"
/>
```

## props

| prop | type | what it does |
|------|------|-------------|
| `left` | `ReactNode` | left pane content |
| `right` | `ReactNode` | right pane content (optional) |
| `variant` | string | visual style |
| `maxWidth` | `string` | max width constraint |

## things to remember

- BEM class: `prisma-split-layout`
- commonly used for auth pages: info/branding on the left, form on the right
- responsive — stacks vertically on smaller screens
- if you only provide `left`, it takes the full width
