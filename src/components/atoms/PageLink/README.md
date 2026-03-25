# PageLink

Notion-style page link — a clickable row with icon, title, and arrow.

## usage

```tsx
<PageLink title="Getting Started" icon="📝" href="/docs/getting-started" />
<PageLink title="API Reference" compact />
```

## props

| prop | type | what it does |
|------|------|-------------|
| `title` | `string` | link label |
| `icon` | `string` | emoji or text icon |
| `href` | `string` | where it links to |
| `compact` | `boolean` | smaller version |

## things to remember

- BEM class: `prisma-page`
- looks like a Notion page reference — horizontal row with icon + title + arrow indicator
- used for internal navigation in document-style layouts
