# chart/palettes/

10 color palettes for chart data visualization + a palette generator utility.

## available palettes

| palette | vibe |
|---------|------|
| `prisma` | the default — balanced and colorful |
| `ocean` | blues and teals |
| `forest` | greens and earth tones |
| `sunset` | warm oranges, reds, purples |
| `neon` | bright, high-saturation colors |
| `pastel` | soft, muted tones |
| `earth` | natural, warm colors |
| `monochrome` | shades of a single color |
| `corporate` | professional, subdued palette |
| `contrast` | high-contrast for accessibility |

## usage

```tsx
<Chart type="bar" data={...} palette="ocean" />
```

the Chart component resolves the palette name to the actual color array.

## generator.ts

utility for programmatic palette creation:
- generates colors with good visual separation
- compares color similarity to avoid duplicates
- used internally when you need more colors than a palette provides

## things to remember

- each palette file exports a `ChartPalette` object with an array of hex colors
- palettes are designed to look good together — the first N colors always work as a set
- `contrast` palette is specifically designed for accessibility (WCAG color contrast)
- `monochrome` uses different shades of the same hue — great for single-series emphasis
