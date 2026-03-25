# List

Notion-style list component — with optional todo/checkbox mode.

## usage

```tsx
<List
  variant="bulleted"
  items={[
    { id: '1', content: 'First item' },
    { id: '2', content: 'Second item' },
  ]}
/>

<List
  variant="todo"
  items={[
    { id: '1', content: 'Buy milk', checked: true },
    { id: '2', content: 'Write README', checked: false },
  ]}
  onToggle={(id) => toggle(id)}
/>
```

## props

| prop | type | what it does |
|------|------|-------------|
| `variant` | `'bulleted' \| 'numbered' \| 'todo'` | list style |
| `items` | `ListItem[]` | array of `{ id, content, checked? }` |
| `onToggle` | `(id: string) => void` | called when a todo checkbox is clicked |
| `compact` | `boolean` | tighter spacing |

## things to remember

- the `todo` variant renders checkboxes that call `onToggle` when clicked
- `checked` is only relevant in `todo` mode
- BEM class: `prisma-list`
- this is Notion-inspired — each item is a block, not a plain `<li>`
