# BreadcrumbNav

smart breadcrumb navigation — like the Breadcrumb atom but with overflow collapsing.

## how it's different from Breadcrumb (atom)

the atom just renders items. this molecule adds:
- **`maxItems`** — collapses middle items into "…" when the trail is too long
- **smart truncation** — always shows first and last items

## usage

```tsx
<BreadcrumbNav
  items={[
    { label: 'Home', href: '/', icon: <HomeIcon /> },
    { label: 'Documents', href: '/docs' },
    { label: 'Projects', href: '/docs/projects' },
    { label: 'libcss', href: '/docs/projects/libcss' },
    { label: 'Components' },  // current page
  ]}
  maxItems={3}
/>
// renders: Home > … > libcss > Components
```

## props

| prop | type | what it does |
|------|------|-------------|
| `items` | `BreadcrumbItem[]` | full breadcrumb trail |
| `maxItems` | `number` | max visible items before collapsing |

## things to remember

- ARIA breadcrumb navigation (`<nav aria-label="breadcrumb">`)
- clicking the "…" could expand the full trail (implementation may vary)
- always shows at least the first and last items
- use the atom `Breadcrumb` when you don't need collapsing, use this molecule when you do
