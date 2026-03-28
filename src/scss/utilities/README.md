# src/scss/utilities/

helper/utility classes — the kind of stuff you slap on an element for quick layout, spacing, or visibility without writing custom CSS.

## files

| file | purpose |
|------|---------|
| `_layout.scss` | display utilities (`.flex`, `.grid`, `.inline-flex`, `.block`, `.hidden`), flex alignment, gap classes |
| `_spacing.scss` | margin and padding utilities generated from the spacing scale (`.m-0` through `.m-96`, `.p-4`, `.mx-auto`, etc.) |
| `_flex.scss` | flexbox shortcuts — `.flex-row`, `.flex-col`, `.flex-wrap`, `.items-center`, `.justify-between`, etc. |
| `_text.scss` | text utilities — `.text-sm`, `.text-center`, `.font-bold`, `.truncate`, `.uppercase`, etc. |
| `_colors.scss` | background and text color utilities (`.bg-accent`, `.text-primary`, `.text-error`, etc.) |
| `_borders.scss` | border utilities — `.rounded`, `.rounded-lg`, `.rounded-full`, `.ring-1`, `.ring-2` |
| `_visibility.scss` | `.visible`, `.invisible`, `.opacity-0` through `.opacity-100` |
| `_transitions.scss` | transition shortcuts for common properties |
| `_a11y.scss` | accessibility helpers — `.sr-only` (screen-reader only), `.not-sr-only`, `.skip-link`, reduced-motion media query |
| `_focus.scss` | focus ring utilities for custom focus styles |
| `_index.scss` | forwards everything |

## usage

```html
<div class="flex items-center gap-4 p-4">
  <span class="text-sm font-bold text-primary">hello</span>
  <span class="sr-only">hidden from sighted users</span>
</div>
```

## things to remember

- utilities load LAST in the cascade (after components), so they can override component styles when needed
- `.sr-only` is used by the accessibility layer — it hides content visually but keeps it available for screen readers
- the reduced-motion query in `_a11y.scss` kills all animations/transitions to 0ms when the user has `prefers-reduced-motion: reduce` enabled
- spacing uses the same scale defined in `abstracts/_tokens.scss`
