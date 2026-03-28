# Switch

toggle switch — the sliding on/off control.

## usage

```tsx
<Switch label="Dark mode" onChange={handleToggle} />
<Switch label="Notifications" checked size="sm" />
<Switch label="Disabled option" disabled />
```

## props

| prop | type | what it does |
|------|------|-------------|
| `label` | `string` | text next to the switch |
| `size` | `'sm' \| 'md' \| 'lg'` | switch size |
| `checked` | `boolean` | controlled state |
| `disabled` | `boolean` | grays it out |
| `onChange` | `(e) => void` | fires when toggled |

## things to remember

- uses `forwardRef`
- BEM class: `switch` with track/thumb inner elements
- visually: a rounded track with a sliding circular thumb
- semantically it's a checkbox under the hood — just styled differently
- use Switch for boolean settings, Checkbox for agree/disagree or multi-select scenarios
