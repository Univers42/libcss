# src/scss/base/

the foundation layer. this stuff loads first and sets up the baseline styles that everything else builds on.

## files

| file | what it does |
|------|-------------|
| `_reset.scss` | CSS reset/normalize — kills browser defaults. box-sizing border-box everywhere, removes margins, makes images block-level, inherits fonts on inputs, etc. |
| `_typography.scss` | base font stack, body font-size, heading sizes, line-heights, font-weight defaults. also sets `font-smoothing` for crisp text. |
| `_animations.scss` | shared `@keyframes` — fade-in, slide-in, spin, pulse, etc. used by components throughout the library. |
| `_index.scss` | barrel that forwards everything |

## why it matters

without the reset, every browser renders stuff differently. without the typography base, you'd be setting `font-family` and `font-size` on every single component. this layer saves you from that.

## things to remember

- this layer DOES output CSS (unlike abstracts)
- the reset includes `:focus-visible` outline styling — 2px solid blue, with reduced-motion respectful transitions
- `img, picture, video, canvas, svg` are all set to `display: block; max-width: 100%` by default
- all headings get `overflow-wrap: break-word` to prevent long words from destroying layouts
