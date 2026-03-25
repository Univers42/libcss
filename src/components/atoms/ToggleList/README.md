# ToggleList

Notion-style collapsible toggle — a summary row that expands to reveal content.

## usage

```tsx
<ToggleList title="Click to see details" defaultOpen={false}>
  <Paragraph>Hidden content here.</Paragraph>
  <List items={[...]} />
</ToggleList>
```

## props

| prop | type | what it does |
|------|------|-------------|
| `title` | `string` | the visible summary text |
| `defaultOpen` | `boolean` | starts expanded or collapsed |
| `variant` | string | visual style |
| `children` | `ReactNode` | the expandable content |

## things to remember

- BEM class: `prisma-toggle-list`
- uses native `<details>/<summary>` — the toggle works without any JavaScript
- Notion calls these "toggle" blocks — click the arrow to expand/collapse
- similar to `Heading` with `toggleable`, but this is a standalone block, not a heading level
