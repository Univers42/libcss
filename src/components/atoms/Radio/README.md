# Radio

radio button input — for single-selection from a group.

## usage

```tsx
<Radio name="plan" value="free" label="Free plan" onChange={handleChange} />
<Radio name="plan" value="pro" label="Pro plan" onChange={handleChange} />
<Radio name="plan" value="enterprise" label="Enterprise" disabled />
```

## props

standard HTML radio props plus:

| prop | type | what it does |
|------|------|-------------|
| `label` | `string` | text next to the radio |
| `name` | `string` | group name (radios with same name are linked) |
| `value` | `string` | the value this radio represents |
| `checked` | `boolean` | controlled state |
| `disabled` | `boolean` | grays it out |

## things to remember

- uses `forwardRef` — works with form libraries
- BEM class: `radio`
- radios with the same `name` form a group — only one can be selected
- this renders a single radio button — group them yourself in a fieldset or container
