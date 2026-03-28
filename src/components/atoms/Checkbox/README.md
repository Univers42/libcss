# Checkbox

standard checkbox input with label support.

## usage

```tsx
<Checkbox label="I agree to the terms" onChange={handleChange} />
<Checkbox label="Select all" indeterminate />
<Checkbox checked disabled label="Locked option" />
```

## props

| prop | type | what it does |
|------|------|-------------|
| `label` | `string` | text next to the checkbox |
| `checked` | `boolean` | controlled state |
| `indeterminate` | `boolean` | the "dash" state (neither checked nor unchecked) |
| `disabled` | `boolean` | grays it out |
| `onChange` | `(e) => void` | change handler |

## things to remember

- uses `forwardRef` so you can `ref={myRef}` it
- `indeterminate` is that horizontal dash you see when a "select all" checkbox has some items checked
- BEM class: `checkbox`
- this is a single checkbox — for a group, wrap multiples in your own container
