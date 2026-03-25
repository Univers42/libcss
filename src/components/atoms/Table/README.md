# Table

data table — headers and rows in a scrollable container.

## usage

```tsx
<Table
  headers={['Name', 'Role', 'Status']}
  rows={[
    ['Alice', 'Developer', 'Active'],
    ['Bob', 'Designer', 'Away'],
  ]}
  striped
  hoverable
/>
```

## props

| prop | type | what it does |
|------|------|-------------|
| `headers` | `string[]` | column header labels |
| `rows` | `string[][]` | array of row arrays |
| `striped` | `boolean` | alternating row colors |
| `bordered` | `boolean` | visible cell borders |
| `hoverable` | `boolean` | highlight row on hover |
| `compact` | `boolean` | less padding |

## things to remember

- BEM class: `prisma-table`
- wrapped in a scrollable container for horizontal overflow on narrow screens
- this is Notion-style — simple data display, not a full data grid
- for more complex data views (sorting, filtering, pagination), check the `views/` layout components
