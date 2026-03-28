# Input

text input field — the workhorse of any form.

## usage

```tsx
<Input label="Email" placeholder="you@example.com" />
<Input label="Search" leftIcon={<SearchIcon />} size="sm" />
<Input label="Password" type="password" error="Too short" hint="Min 8 chars" />
<Input fullWidth />
```

## props

| prop | type | what it does |
|------|------|-------------|
| `label` | `string` | label text above the input |
| `type` | `string` | input type (text, password, email, etc.) |
| `placeholder` | `string` | placeholder text |
| `size` | `'sm' \| 'md' \| 'lg'` | input height |
| `variant` | `'outlined'` etc. | visual style |
| `leftIcon` / `rightIcon` | `ReactNode` | icons inside the input |
| `error` | `string` | error message shown below |
| `hint` | `string` | helper text shown below |
| `fullWidth` | `boolean` | stretches to container width |
| `disabled` | `boolean` | grays it out |

## things to remember

- uses `forwardRef` — you can attach refs for focus management or form libraries
- `error` takes priority over `hint` when both are provided
- the icon slots are inside the input field visually (padding is adjusted automatically)
- BEM class: `prisma-input`
