# TableOfContents

navigation sidebar showing document structure — like a mini-outline.

## usage

```tsx
<TableOfContents
  items={[
    { id: 'intro', label: 'Introduction', depth: 0 },
    { id: 'setup', label: 'Setup', depth: 0 },
    { id: 'install', label: 'Installation', depth: 1, href: '#install' },
    { id: 'config', label: 'Configuration', depth: 1, href: '#config' },
  ]}
  activeId="install"
/>
```

## props

| prop | type | what it does |
|------|------|-------------|
| `items` | `TocItem[]` | `{ id, label, depth, href? }` |
| `activeId` | `string` | currently visible section |
| `variant` | string | visual style |

## things to remember

- BEM class: `prisma-toc`
- `depth` controls indentation level — 0 is top-level, 1 is nested, etc.
- `activeId` highlights the current section (you'd update this on scroll)
- items with `href` render as links, items without are plain text
- meant for sidebar navigation in long documents or documentation pages
