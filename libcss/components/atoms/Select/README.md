# Select

native dropdown select — no custom popover, just a clean styled `<select>`.

## usage

```tsx
<Select
  label="Country"
  placeholder="Select a country"
  options={[
    { value: 'us', label: 'United States' },
    { value: 'fr', label: 'France' },
    { value: 'jp', label: 'Japan', disabled: true },
  ]}
  onChange={handleChange}
/>
```

## props

| prop | type | what it does |
|------|------|-------------|
| `label` | `string` | label text above |
| `placeholder` | `string` | first disabled option text |
| `options` | `{ value, label, disabled? }[]` | dropdown choices |
| `error` | `string` | error message below |
| `fullWidth` | `boolean` | stretches to container width |
| `disabled` | `boolean` | entire select disabled |

## things to remember

- this uses the native `<select>` element — the dropdown is the browser's native UI
- individual options can be disabled independently
- `placeholder` creates a non-selectable first option as a prompt
- pair with `FormField` molecule for a full label + error + hint setup
