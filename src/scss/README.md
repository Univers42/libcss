# src/scss/

this is the heart of libcss — all the SCSS that compiles into the final stylesheet.

## entry point

`libcss.scss` is the main file. it `@use`s everything in this order:

1. **base** — reset, typography, animations
2. **themes** — light/dark CSS custom properties
3. **components** — atoms, molecules, organisms styles
4. **layouts** — shell layouts, chart styles
5. **utilities** — helper classes

the order matters! base resets come first, then theming tokens, then component styles that reference those tokens, etc.

## how to build

```bash
# from project root
npm run build        # → dist/css/libcss.css
npm run watch        # auto-rebuild on save
```

## important

- abstracts (`_tokens.scss`, `_mixins.scss`, `_functions.scss`) never output CSS on their own — they're just `@use`d by other files
- every subfolder has an `_index.scss` that forwards its contents
- dart sass `@use` / `@forward` rules are used everywhere (no `@import`)
- all component classes use BEM with the `prisma-` prefix
- theming is done via CSS custom properties (`--prisma-*`), set in the themes layer
