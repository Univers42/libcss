# Stepper

multi-step progress indicator — shows where you are in a sequence.

## usage

```tsx
<Stepper
  steps={[
    { label: 'Account', description: 'Create your account' },
    { label: 'Profile', description: 'Fill in your info' },
    { label: 'Confirm', description: 'Review and submit' },
  ]}
  activeStep={1}
  orientation="horizontal"
/>
```

## props

| prop | type | what it does |
|------|------|-------------|
| `steps` | `Step[]` | `{ label, description? }` array |
| `activeStep` | `number` | 0-indexed current step |
| `orientation` | `'horizontal' \| 'vertical'` | layout direction |

## step states

- **completed** (index < activeStep) — shows ✓ checkmark
- **active** (index === activeStep) — highlighted current step
- **pending** (index > activeStep) — dimmed future step

## things to remember

- connectors (lines between steps) are rendered automatically
- vertical orientation is good for sidebar wizards
- horizontal is the classic checkout-flow stepper
- `activeStep` is 0-indexed — 0 means you're on the first step
