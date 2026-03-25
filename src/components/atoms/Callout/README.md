# Callout

Notion-style callout block — a colored box with an emoji icon and some content.

## usage

```tsx
<Callout variant="info">
  This is some helpful information.
</Callout>

<Callout variant="warning" title="Be careful" compact>
  Double-check your input before submitting.
</Callout>
```

## props

| prop | type | what it does |
|------|------|-------------|
| `variant` | string | color scheme + default emoji icon |
| `title` | `string` | optional bold title |
| `icon` | `string` | override the default emoji |
| `compact` | `boolean` | tighter padding |
| `children` | `ReactNode` | callout content |

## things to remember

- each variant has a predefined emoji icon (💡 for info, ⚠️ for warning, etc.)
- you can override the icon with any emoji or string
- inspired directly by Notion's callout blocks
- BEM class: `prisma-callout`
