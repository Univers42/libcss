# InfoPanel

information panel — title, subtitle, features list, and stat items.

## usage

```tsx
<InfoPanel
  title="Prismatica"
  subtitle="A design system built for developers"
  features={[
    { icon: '⚡', label: '40+ components' },
    { icon: '🎨', label: 'Themeable with CSS vars' },
    { icon: '♿', label: 'Accessible by default' },
  ]}
  stats={[
    { value: '39', label: 'Atoms' },
    { value: '12', label: 'Molecules' },
  ]}
/>
```

## sub-components

- **`InfoFeatureItem`** — renders an icon + label row (the feature list items)
- **`InfoStatItem`** — renders a big number + label (the stat items)

## file structure

```
InfoPanel/
├── index.ts
├── model/
│   ├── InfoPanel.constants.ts
│   └── InfoPanel.types.ts
└── ui/
    ├── InfoPanel.tsx
    ├── InfoFeatureItem.tsx
    ├── InfoStatItem.tsx
    └── InfoPanel.spec.tsx  # tests!
```

## things to remember

- BEM class: `prisma-info-panel`
- this has test coverage
- the panel is used on splash/landing layouts — it's the "hero" information block
- features and stats are separate arrays with separate sub-components
