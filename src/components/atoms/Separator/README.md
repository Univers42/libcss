# Separator

horizontal rule — a visual break between content sections.

## usage

```tsx
<Separator />
<Separator variant="dashed" />
<Separator variant="dotted" thick />
<Separator spacing="lg" />
```

## props

| prop | type | what it does |
|------|------|-------------|
| `variant` | `'solid' \| 'dashed' \| 'dotted'` | line style |
| `spacing` | `'default'` or custom | vertical margin |
| `thick` | `boolean` | thicker line |

## wait, how is this different from Divider?

Separator is specifically an `<hr>` style horizontal break with BEM class `prisma-separator`. Divider supports both horizontal/vertical orientations, labels, and different semantics. they overlap a bit — Separator is simpler and more opinionated.

## things to remember

- BEM class: `prisma-separator`
- use Separator for simple section breaks
- use Divider when you need vertical lines, labels, or more control
