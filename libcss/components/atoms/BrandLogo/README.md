# BrandLogo

the app logo + title link — usually sits in the top-left corner of a layout.

## usage

```tsx
<BrandLogo title="Prismatica" href="/" />
<BrandLogo title="My App" icon={<CustomIcon />} href="/" />
```

## props

| prop | type | what it does |
|------|------|-------------|
| `title` | `string` | brand name text |
| `href` | `string` | where clicking the logo goes |
| `icon` | `ReactNode` | custom logo icon (has a default SVG) |

## file structure

```
BrandLogo/
├── index.ts              # barrel export
├── model/
│   ├── BrandLogo.constants.ts
│   └── BrandLogo.types.ts
└── ui/
    ├── BrandLogo.tsx      # main component
    └── BrandLogo.icons.tsx # default SVG logo
```

## things to remember

- renders as an `<a>` tag — it's a real link
- has an `aria-label` for accessibility
- the default icon is a custom SVG defined in `BrandLogo.icons.tsx`
- uses the model/ui folder pattern because it has its own constants + icons
