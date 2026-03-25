# Button

the most important UI component — polymorphic, accessible, and flexible.

## why it's "polymorphic"

this button can render as:
- `<button>` — default behavior
- `<a>` — when you pass `href`
- `<Link>` — when you pass `to` (React Router)

the component figures out the right element automatically.

## usage

```tsx
<Button variant="primary" size="md">Click me</Button>
<Button variant="ghost" leftIcon={<StarIcon />}>Favorite</Button>
<Button href="/docs" variant="outline">Read docs</Button>
<Button variant="danger" isLoading>Deleting...</Button>
<Button size="icon"><TrashIcon /></Button>
```

## props

| prop | type | what it does |
|------|------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'ghost' \| 'danger' \| 'outline'` | visual style |
| `size` | `'sm' \| 'md' \| 'lg' \| 'icon'` | button size |
| `leftIcon` / `rightIcon` | `ReactNode` | icons on either side |
| `isLoading` | `boolean` | shows spinner, disables clicks |
| `isBlock` / `fullWidth` | `boolean` | stretches to full container width |
| `href` | `string` | renders as `<a>` instead |
| `to` | `string` | renders as React Router `<Link>` |

## file structure

```
Button/
├── index.ts
├── model/
│   ├── Button.constants.ts  # default values
│   └── Button.types.ts      # ButtonProps type
└── ui/
    ├── Button.tsx            # main component
    └── ButtonContent.tsx     # inner content layout (icon + label)
```

## things to remember

- `ButtonContent` handles the icon + text layout internally — you don't use it directly
- `isLoading` replaces the content with a spinner and sets `disabled`
- `size="icon"` makes a square button — meant for icon-only buttons
- all variants work with all sizes — mix and match freely
