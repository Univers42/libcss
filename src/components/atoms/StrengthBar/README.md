# StrengthBar

password/strength indicator — those colored segments that fill up based on strength level.

## usage

```tsx
<StrengthBar level={0} maxLevel={4} label="Too weak" />
<StrengthBar level={2} maxLevel={4} label="Fair" />
<StrengthBar level={4} maxLevel={4} label="Strong" />
```

## props

| prop | type | what it does |
|------|------|-------------|
| `level` | `number` | current strength (0 to maxLevel) |
| `maxLevel` | `number` | total number of segments |
| `label` | `string` | descriptive text ("Weak", "Strong", etc.) |

## file structure

```
StrengthBar/
├── index.ts
├── model/
│   ├── StrengthBar.constants.ts  # color mapping per level
│   └── StrengthBar.types.ts
└── ui/
    ├── StrengthBar.tsx           # main component
    ├── StrengthBarSegment.tsx    # individual segment bar
    └── StrengthBar.spec.tsx      # tests!
```

## things to remember

- segments change color as the level increases (red → orange → yellow → green)
- uses ARIA `role="progressbar"` for accessibility
- `StrengthBarSegment` is an internal sub-component — you don't use it directly
- this has test coverage in the `.spec.tsx` file
- commonly paired with a password `Input` and some strength-checking logic
