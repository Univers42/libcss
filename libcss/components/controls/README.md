# src/components/controls/

generic prop-editor controls for the studio playground. when you open a component in the playground and see sliders, toggles, dropdowns to tweak its props — these are the controls rendering that UI.

## what's here

| control | what it edits |
|---------|-------------|
| `TextControl` | string props — renders a text input |
| `NumberControl` | numeric props — renders a number input |
| `BooleanControl` | boolean props — renders a toggle switch |
| `SelectControl` | enum/option props — renders a dropdown |
| `ColorControl` | color props — renders a color picker |
| `RangeControl` | range/slider props — renders a slider |
| `SliderControl` | similar to range but with different UX |
| `ToggleControl` | on/off toggle |
| `TagsControl` | array of strings — renders tag chips |
| `MultiSelectControl` | multiple choice select |
| `ControlFactory` | the smart one — picks the right control based on the prop's schema type |
| `ParameterGroup` | groups related controls together with a label |

also has:
- `schema.ts` — type definitions for describing prop schemas
- `types.ts` — shared TypeScript types

## how ControlFactory works

you give it a prop schema and it figures out which control to render:

```tsx
<ControlFactory
  control={{ type: 'select', options: ['sm', 'md', 'lg'] }}
  value="md"
  onChange={(v) => setPropValue('size', v)}
/>
// automatically renders SelectControl
```

## things to remember

- these controls are used by the PlaygroundView — you rarely use them directly in product code
- ControlFactory is the entry point — it examines `control.type` and dispatches to the right component
- each control receives `value` + `onChange` — standard controlled component pattern
