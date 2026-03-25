# studio/src/

the actual source code for the studio app — the dev tool for previewing and testing components.

## files

| file | what it does |
|------|-------------|
| `main.tsx` | React entrypoint — bootstraps the app, imports component entry files for the registry |
| `App.tsx` | main application shell — sidebar, navigation, theme switching, search, chart gallery |
| `App.css` | app-level styles |
| `vite-env.d.ts` | Vite type declarations |
| `entries/` | component entry definitions (one per component for the registry) |

## App.tsx — the main shell

this is ~175 lines and handles:
- **navigation** — overview, category browsing, individual component views, chart gallery
- **theme palette switching** — cycles through different color themes
- **sidebar** — component list with category grouping
- **search** — filter components by name
- **chart gallery** — dedicated view for chart type/palette exploration

## how it works

1. `main.tsx` imports all entry files from `entries/` — each one registers a component in the registry
2. `App.tsx` reads the registry and builds the UI
3. you pick a component from the sidebar
4. the component renders with its variants/props in the main content area

## things to remember

- this app runs with `make dev` (which runs Vite dev server)
- it uses the `@libcss/*` path aliases to import from the library source
- the app itself is not part of the published library — it's a development tool
- `App.css` has minimal styles because the library's own CSS handles most of the visual work
