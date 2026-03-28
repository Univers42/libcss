# src/

this is where all the actual source code lives. everything here either compiles into the final `libcss.css` stylesheet or gets imported as React components by consuming apps.

## what's inside

| folder | what it is |
|--------|-----------|
| `scss/` | the SCSS source — this is the core of the library. compiles into `dist/css/libcss.css` |
| `components/` | React components organized by atomic design: atoms, molecules, media, layout, etc. |
| `hooks/` | reusable React hooks (useDebounce, useClickOutside, useMediaQuery…) |
| `core/` | the engine that powers the studio — component registry, event bus, shared types |
| `common/` | infrastructure utilities — EventBus, Logger, Observable pattern, deep clone, uid |
| `parser/` | auto-discovers components from the file system for the studio manifest |
| `studio/` | barrel file that re-exports everything under the `@libcss/studio` alias |

## how it all connects

the SCSS side and the React side are independent but aligned. the SCSS compiles to a standalone CSS file that works without React. the React components just apply the right CSS classes from that stylesheet.

so you can use:
- **CSS only**: just link `libcss.css` and use class names like `prisma-button prisma-button--primary`
- **React**: import `<Button variant="primary" />` which applies those classes internally

the `core/` + `hooks/` + `parser/` folders are mostly for the studio playground — they power the component explorer, live prop editing, and auto-discovery features.
