# src/scss/themes/

this is where light and dark mode are defined. instead of toggling CSS classes, we use CSS custom properties (`--prisma-*`) that get swapped between themes.

## files

| file | what it does |
|------|-------------|
| `_light.scss` | sets all `--prisma-*` custom properties on `:root` for the light theme. this is the default. |
| `_dark.scss` | overrides those same properties inside `[data-theme="dark"]` and also via `@media (prefers-color-scheme: dark)` for auto-detection. |
| `_index.scss` | forwards both |

## how theming works

every component in the library references CSS custom properties like `var(--prisma-bg-primary)` and `var(--prisma-text-primary)` instead of hardcoded colors. when you switch themes, those properties change, and every component updates automatically.

```html
<!-- force dark mode -->
<html data-theme="dark">

<!-- or let the OS decide (default behavior) -->
<html>
```

## the token categories

- `--prisma-bg-*` — background colors (primary, secondary, tertiary, elevated, hover, selected…)
- `--prisma-text-*` — text colors
- `--prisma-accent*` — accent / brand color and its hover/pressed states
- `--prisma-data-*` — semantic colors (success, warning, error, info)
- `--prisma-border-*` — border colors
- `--prisma-shadow-*` — box shadows at different elevations

## things to remember

- light theme is the default (set on `:root`)
- dark theme activates both via `data-theme="dark"` attribute AND `prefers-color-scheme: dark` media query
- both themes also define extended tokens in `[data-theme="light"]` and `[data-theme="dark"]` selectors for component-specific overrides
- if you add a new token, you need to define it in BOTH themes or it'll fall back to the light value in dark mode
