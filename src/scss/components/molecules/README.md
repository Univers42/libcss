# scss/components/molecules/

SCSS styles for molecule components — composites built from atoms.

## files

| file | component |
|------|-----------|
| `_accordion.scss` | Accordion panels |
| `_auth-form.scss` | Auth form layout (used by login/register pages) |
| `_color-picker.scss` | Color picker panel + all sub-components |
| `_form-field.scss` | FormField wrapper |
| `_info-panel.scss` | InfoPanel + feature/stat items |
| `_language-selector.scss` | Language dropdown |
| `_pagination.scss` | Page navigation |
| `_social-button.scss` | Social login buttons |
| `_split-layout.scss` | Two-column split |
| `_stepper.scss` | Multi-step indicator |
| `_toolbar.scss` | Button toolbar |
| `_window-panel.scss` | WindowPanel floating container |
| `_index.scss` | barrel |

## things to remember

- `_auth-form.scss` styles a form layout that doesn't have a direct TSX component — it's applied via class names in the auth feature pages
- `_color-picker.scss` is one of the larger partials because the color picker has many sub-elements (saturation map, hue strip, wheel, sliders, etc.)
- same conventions: BEM with `prisma-` prefix, `_index.scss` barrel
