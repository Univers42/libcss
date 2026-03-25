# Icon

SVG icon system — consistent sizing and a base wrapper for custom icons.

## what's in here

- **`BaseIcon`** — wrapper component that standardizes icon sizing and accessibility
- **`GitHubIcon`** — pre-built GitHub logo SVG
- **`GoogleIcon`** — pre-built Google logo SVG

## usage

```tsx
<BaseIcon size="md" label="settings">
  <svg>...</svg>
</BaseIcon>

<GitHubIcon size="lg" />
<GoogleIcon size="md" />
```

## sizes

`xs` · `sm` · `md` · `lg` · `xl`

## props (BaseIcon)

| prop | type | what it does |
|------|------|-------------|
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | icon dimensions |
| `label` | `string` | aria-label for accessibility |
| `children` | `ReactNode` | the actual SVG content |

## things to remember

- BEM class: `prisma-icon`
- `BaseIcon` is meant to be used as a wrapper — pass your own SVG as children
- the size classes set both width and height consistently
- always provide a `label` when the icon conveys meaning (not just decoration)
- GitHubIcon and GoogleIcon are mainly used by the `SocialButton` molecule
