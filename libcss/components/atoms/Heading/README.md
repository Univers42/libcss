# Heading

heading component (h1–h5) with an optional collapsible toggle.

## usage

```tsx
<Heading level={1}>Page Title</Heading>
<Heading level={2}>Section</Heading>
<Heading level={3} toggleable defaultOpen={false}>
  Click to expand this section
</Heading>
```

## props

| prop | type | what it does |
|------|------|-------------|
| `level` | `1 \| 2 \| 3 \| 4 \| 5` | renders h1–h5 |
| `toggleable` | `boolean` | makes it collapsible (uses `<details>/<summary>`) |
| `defaultOpen` | `boolean` | initial open/closed state when toggleable |

## things to remember

- BEM class: `prisma-heading`
- `toggleable` mode wraps the heading in a `<details>` element — it's native HTML behavior, no JS needed for the toggle
- levels map directly to `<h1>` through `<h5>` — pick appropriately for document hierarchy
- Notion-style toggleable headings are a core feature of this design system
