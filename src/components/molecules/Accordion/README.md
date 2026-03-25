# Accordion

expandable panels — click to expand, click again to collapse.

## usage

```tsx
<Accordion
  items={[
    { id: 'faq1', title: 'How do I install it?', content: <p>Run npm install...</p> },
    { id: 'faq2', title: 'Is it free?', content: <p>Yes, totally.</p> },
  ]}
  allowMultiple={false}
  defaultOpen={['faq1']}
/>
```

## props

| prop | type | what it does |
|------|------|-------------|
| `items` | `AccordionItem[]` | `{ id, title, content }` array |
| `allowMultiple` | `boolean` | can multiple panels be open at once? |
| `defaultOpen` | `string[]` | IDs of initially open panels |
| `disabled` | `string[]` | IDs of panels that can't be toggled |

## things to remember

- when `allowMultiple` is false, opening one panel closes the others (classic accordion behavior)
- the chevron icon rotates to indicate open/closed state
- each panel has its own expand/collapse animation
- this is a molecule because it composes multiple interactive elements (headers + panels) with shared state
