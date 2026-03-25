# src/scss/abstracts/

this folder contains the "invisible" layer — tokens, mixins, and functions that never produce any CSS output by themselves. they only get used by other SCSS files via `@use`.

## files

| file | purpose |
|------|---------|
| `_tokens.scss` | all design tokens — colors, spacing, font sizes, shadows, z-index, transitions, breakpoints. this is THE source of truth for the visual language. |
| `_mixins.scss` | reusable SCSS mixins — responsive breakpoints, focus rings, theme variable generation, truncation, scrollbars, etc. |
| `_functions.scss` | helper functions — color manipulation, unit conversion, map lookups |
| `_custom-properties.scss` | CSS custom property declarations for runtime theming |
| `_index.scss` | barrel — forwards tokens, mixins, and functions so other files can `@use 'abstracts' as *` |

## how to use in other SCSS files

```scss
@use '../abstracts' as *;

.my-thing {
  color: map.get($colors, 'accent');
  padding: spacing(4);
  @include respond-to('md') {
    padding: spacing(8);
  }
}
```

## things to remember

- if you want to change a color, font, spacing, or shadow value across the whole library → edit `_tokens.scss`
- mixins are designed to be composable — `respond-to()` for breakpoints, `focus-ring()` for accessible focus styles, `theme-variables()` for generating the full set of theme custom properties
- `_index.scss` only forwards tokens, mixins, functions — not custom-properties (that one is used directly by themes)
