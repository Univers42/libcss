# Pagination

page navigation — numbered buttons with prev/next arrows.

## usage

```tsx
<Pagination
  currentPage={3}
  totalPages={20}
  onPageChange={(page) => setPage(page)}
  siblings={1}
/>
// renders: < 1 … 2 [3] 4 … 20 >
```

## props

| prop | type | what it does |
|------|------|-------------|
| `currentPage` | `number` | the active page |
| `totalPages` | `number` | total number of pages |
| `onPageChange` | `(page: number) => void` | called when a page is clicked |
| `siblings` | `number` | how many pages to show on each side of current (default: 1) |

## how the range works

with `siblings={1}` and `currentPage={5}`:
```
< 1 … 4 [5] 6 … 20 >
```

with `siblings={2}` and `currentPage={5}`:
```
< 1 … 3 4 [5] 6 7 … 20 >
```

the `…` ellipsis dots appear when there are gaps.

## things to remember

- always shows first and last page
- prev/next arrows disable at the boundaries
- ellipsis dots are visual indicators, not clickable
- `siblings` controls information density — higher = more page buttons visible
