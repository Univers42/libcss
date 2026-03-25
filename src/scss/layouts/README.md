# src/scss/layouts/

styles for the big structural pieces — the shells that wrap entire pages, the chart rendering system, and the component explorer UI.

## files

| file | what it does |
|------|-------------|
| `_shell.scss` | the 4 shell layout variants: **dashboard** (sidebar + header + main), **stacked** (header on top), **centered** (auth/login pages), **panel** (floating window). each one uses CSS grid and `--shell-*` custom properties. |
| `_shell-explorer.scss` | styles for the component explorer UI — sidebar, category cards, component cards, search bar, breadcrumbs, inspector panel, playground area, variant grids. basically everything that makes the studio look good. |
| `_chart.scss` | D3-based chart container styles — SVG axes, gridlines, tooltips, legends, bars, lines, areas, pies, etc. |
| `_palettes.scss` | color palettes for charts — each palette defines 8 data colors used by the chart system |
| `_index.scss` | forwards everything |

## the shell system

the shells are the main architectural patterns. they all share `--shell-*` tokens:

- `--shell-bg`, `--shell-surface`, `--shell-border` — colors
- `--shell-accent-h/s/l` — HSL-decomposed accent for easy theming
- `--shell-font`, `--shell-mono` — typography
- `--shell-radius`, `--shell-transition` — shape and motion

each shell has a dark and light variant (via `[class*="--light"]` modifier).

## things to remember

- the dashboard shell is the most commonly used — it's what the studio itself runs on
- chart styles work with D3 SVG output — they style elements like `.chart-axis`, `.chart-bar`, `.chart-tooltip`
- palette switching happens via `data-palette` attribute on the chart container
- all shell layouts use `height: 100vh` and `overflow: hidden` — they're meant to be the full-page container
