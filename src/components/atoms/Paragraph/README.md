# Paragraph

text paragraph component — for body text in documents.

## usage

```tsx
<Paragraph>Regular paragraph text.</Paragraph>
<Paragraph size="lg">Larger text for emphasis.</Paragraph>
<Paragraph muted>Secondary, less important text.</Paragraph>
```

## props

| prop | type | what it does |
|------|------|-------------|
| `size` | `'sm' \| 'md' \| 'lg'` | font size |
| `muted` | `boolean` | dimmer text color |

## things to remember

- BEM class: `prisma-paragraph`
- `muted` reduces the opacity/contrast — use it for helper text or secondary content
- renders a `<p>` element
