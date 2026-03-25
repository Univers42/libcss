# Tabs

tabbed content panels — one set of tabs, one visible panel at a time.

## usage

```tsx
<Tabs
  tabs={[
    { id: 'code', label: 'Code', content: <CodeBlock>...</CodeBlock> },
    { id: 'preview', label: 'Preview', content: <div>...</div> },
    { id: 'tests', label: 'Tests', content: <TestResults /> },
  ]}
  defaultTab="code"
  onTabChange={(id) => console.log('switched to', id)}
/>
```

## props

| prop | type | what it does |
|------|------|-------------|
| `tabs` | `Tab[]` | array of `{ id, label, content }` |
| `variant` | `'line' \| 'pills'` | tab style |
| `defaultTab` | `string` | initially active tab ID |
| `onTabChange` | `(id: string) => void` | fires on tab switch |
| `compact` | `boolean` | smaller tabs |

## variants

- **line**: underline indicator under the active tab (like Chrome tabs)
- **pills**: filled background on the active tab (like a segmented control)

## things to remember

- uses ARIA `role="tablist"` / `role="tab"` / `role="tabpanel"` — fully accessible
- keyboard navigation works (arrow keys to switch tabs)
- supports both controlled and uncontrolled usage (`defaultTab` vs managing state yourself)
- BEM class: `prisma-tabs`
