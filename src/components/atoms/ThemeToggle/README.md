# ThemeToggle

light/dark theme toggle button — sun and moon.

## usage

```tsx
<ThemeToggle theme="light" onToggle={() => toggleTheme()} />
```

## props

| prop | type | what it does |
|------|------|-------------|
| `theme` | `'light' \| 'dark'` | current theme |
| `onToggle` | `() => void` | called when button is clicked |

## file structure

```
ThemeToggle/
├── index.ts
├── model/
│   ├── ThemeToggle.types.ts
│   └── ThemeToogle.constants.ts  # (yes, there's a typo — "Toogle")
└── ui/
    ├── ThemeToggle.tsx
    └── ThemeToggle.spec.tsx       # tests!
```

## things to remember

- BEM class: `prisma-theme-toggle`
- shows ☀️ for light mode, 🌙 for dark mode
- uses `aria-pressed` and a descriptive `aria-label` for accessibility
- this has test coverage in the `.spec.tsx` file
- the toggle itself doesn't change the theme — it just fires `onToggle` and you handle the actual theme switching (probably via `useUIStore` or a context)
