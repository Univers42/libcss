# libcss

**Atomic design system** for Prismatica — SCSS tokens, components, and React bindings compiled via Docker.

---

## Quick Start

```bash
# Build production CSS (expanded + minified)
make

# Watch mode (live-reload during development)
make dev

# Lint SCSS
make lint

# Generate documentation
make docs
```

## Architecture

```
src/
├── scss/                    # Pure SCSS layer
│   ├── abstracts/           # Tokens, mixins, functions (no CSS output)
│   ├── base/                # Reset, typography, animations
│   ├── themes/              # Light & dark theme variables
│   ├── components/          # Atomic design components
│   │   ├── atoms/           # Button, Icon, BrandLogo, StrengthBar, ThemeToggle
│   │   ├── molecules/       # FormField, InfoPanel, SplitLayout, SocialButton, etc.
│   │   └── organisms/       # (future)
│   ├── utilities/           # Layout, spacing, visibility helpers
│   └── libcss.scss          # Main entry point
│
└── components/              # React component layer
    ├── atoms/               # React atom components
    ├── molecules/           # React molecule components
    ├── lib/                 # Shared utilities (cn, passwordStrength)
    └── index.ts             # Public API barrel
```

## Naming Convention

All CSS classes use BEM with the `prisma-` namespace:

```
.prisma-{block}
.prisma-{block}__{element}
.prisma-{block}--{modifier}
```

CSS custom properties follow `--prisma-*` (e.g., `--prisma-accent`, `--prisma-bg-primary`).

## Theming

The library ships with light and dark themes. Toggle via:

```html
<html data-theme="dark">
```

Or rely on `prefers-color-scheme` automatic detection.

## Docker Commands

| Command       | Description                           |
|---------------|---------------------------------------|
| `make`        | Build `dist/css/libcss.css` + `.min`  |
| `make dev`    | Watch mode with live compilation      |
| `make lint`   | Run Stylelint on all SCSS             |
| `make docs`   | Generate Sassdoc into `docs/`         |
| `make clean`  | Remove `dist/css/`                    |
| `make fclean` | Full clean + remove Docker images     |
| `make re`     | `fclean` + `all`                      |

## Usage in Prismatica

### CSS only

```dockerfile
COPY --from=libcss /dist/css/libcss.min.css ./public/
```

### React components

```tsx
import { Button, SplitLayout, LanguageSelector } from '@libcss/components';
```

## Design Tokens

All design tokens live in `src/scss/abstracts/_tokens.scss`:

- **Colors**: Accent, semantic (success/warning/danger/info), neutrals
- **Spacing**: 0–96 scale (rem-based)
- **Typography**: Font families, sizes, weights, line heights, letter spacing
- **Borders**: Radii, widths
- **Shadows**: sm through 2xl
- **Z-index**: Layering system (base → tooltip)
- **Transitions**: Duration and easing presets

## License

Internal — Prismatica project.
