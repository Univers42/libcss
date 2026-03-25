# Quote

blockquote component — for quoting text with optional author attribution.

## usage

```tsx
<Quote>The only way to do great work is to love what you do.</Quote>
<Quote author="Steve Jobs" variant="highlighted">
  Stay hungry, stay foolish.
</Quote>
```

## props

| prop | type | what it does |
|------|------|-------------|
| `author` | `string` | attribution shown below the quote |
| `variant` | string | visual style variation |
| `children` | `ReactNode` | the quoted text |

## things to remember

- BEM class: `prisma-quote`
- renders a `<blockquote>` element — semantically correct
- the author citation appears below the quote text with an em dash prefix
- great for pull quotes, testimonials, or document block quotes
