# Textarea

multi-line text input — with auto-grow magic.

## usage

```tsx
<Textarea label="Bio" placeholder="Tell us about yourself..." />
<Textarea label="Notes" autoGrow minRows={3} maxRows={10} />
<Textarea label="Comment" error="Required field" fullWidth />
<Textarea label="Fixed" resize="none" rows={5} />
```

## props

| prop | type | what it does |
|------|------|-------------|
| `label` | `string` | label text above |
| `placeholder` | `string` | placeholder text |
| `error` | `string` | error message below |
| `hint` | `string` | helper text below |
| `autoGrow` | `boolean` | textarea expands as you type |
| `minRows` / `maxRows` | `number` | limits for auto-grow |
| `resize` | `'none' \| 'vertical' \| 'horizontal' \| 'both'` | CSS resize handle |
| `fullWidth` | `boolean` | stretches to container width |

## things to remember

- uses `forwardRef`
- `autoGrow` is the killer feature — the textarea height adjusts to content automatically
- `minRows`/`maxRows` only matter when `autoGrow` is true
- without `autoGrow`, it's just a styled native `<textarea>`
