# Toolbar

button toolbar — a row (or column) of icon buttons with shared action handling.

## usage

```tsx
<Toolbar
  items={[
    { id: 'bold', icon: <BoldIcon />, label: 'Bold' },
    { id: 'italic', icon: <ItalicIcon />, label: 'Italic' },
    { id: 'underline', icon: <UnderlineIcon />, label: 'Underline', disabled: true },
    { id: 'link', icon: <LinkIcon />, label: 'Link', active: true },
  ]}
  onAction={(id) => handleFormat(id)}
  size="sm"
/>
```

## props

| prop | type | what it does |
|------|------|-------------|
| `items` | `ToolbarItem[]` | `{ id, icon, label, disabled?, active? }` |
| `onAction` | `(id: string) => void` | fired when any item is clicked |
| `size` | `'sm' \| 'md'` | button size |
| `orientation` | `'horizontal' \| 'vertical'` | layout direction |

## things to remember

- ARIA `role="toolbar"` with arrow key navigation
- `active` items get a highlighted/pressed style (useful for toggle-style formatting buttons)
- `disabled` items are visually dimmed and non-interactive
- the `onAction` callback receives the item's `id` — you handle the logic
- think text editor formatting bars, drawing tool palettes, etc.
