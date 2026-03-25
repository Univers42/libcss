# FormField

form field wrapper — adds label, error message, and required indicator around any input.

## usage

```tsx
<FormField label="Email" required error="Please enter a valid email">
  <Input type="email" fullWidth />
</FormField>

<FormField label="Password" hint="Minimum 8 characters">
  <Input type="password" fullWidth />
</FormField>
```

## props

| prop | type | what it does |
|------|------|-------------|
| `label` | `string` | field label |
| `required` | `boolean` | shows a red asterisk (*) |
| `error` | `string` | error message below the input |
| `hint` | `string` | helper text below (hidden when error is shown) |
| `children` | `ReactNode` | the actual input component |

## things to remember

- BEM class: `prisma-field`
- this is a **wrapper** — it doesn't render an input itself, it wraps whatever you put inside
- error text takes priority over hint text (only one shows at a time)
- the label is linked to the input via `htmlFor`/`id` when possible
- use this to get consistent form styling without duplicating label/error markup everywhere
