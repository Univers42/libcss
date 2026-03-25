# Breadcrumb

navigation trail showing where you are — Home > Products > Shoes > Nike.

## usage

```tsx
<Breadcrumb
  items={[
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products', icon: <ShopIcon /> },
    { label: 'Shoes' },  // last item = current page, no link
  ]}
  separator=">"
/>
```

## props

| prop | type | what it does |
|------|------|-------------|
| `items` | `BreadcrumbItem[]` | array of `{ label, href?, icon? }` |
| `separator` | `string` | character between items (default: `/`) |
| `compact` | `boolean` | smaller text size |

## things to remember

- the last item usually represents the current page and shouldn't have an `href`
- items with `href` render as links, items without render as plain text
- each item can optionally have an icon before the label
- this is the **atom** — there's also a `BreadcrumbNav` molecule that adds smart collapsing for long trails
