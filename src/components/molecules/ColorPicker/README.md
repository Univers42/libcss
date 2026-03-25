# src/components/molecules/ColorPicker/

the most complex molecule in the library — a full-featured color picker with 6 different modes.

## modes

| mode | what you see |
|------|-------------|
| **map** | 2D saturation/value grid + hue strip + alpha strip (the classic Photoshop-style picker) |
| **wheel** | circular hue ring where angle = hue, distance from center = saturation |
| **rgb** | three channel sliders for Red, Green, Blue |
| **hsl** | three channel sliders for Hue, Saturation, Lightness |
| **cmyk** | four channel sliders for Cyan, Magenta, Yellow, Key |
| **gradient** | gradient stop editor — pick colors for each stop, drag positions |

all modes share the same color state. switching modes doesn't lose your color.

## architecture

```
ColorPicker/
├── model/                  ← logic + data
│   ├── color-engine.ts     ← pure functions for color space conversions
│   ├── useColorState.ts    ← central React hook managing color state
│   └── ColorPicker.types.ts
└── ui/                     ← presentation
    ├── ColorPicker.tsx     ← main component (selects active mode, renders in WindowPanel)
    ├── SaturationMap.tsx   ← 2D grid (CSS gradients, not canvas)
    ├── ColorWheel.tsx      ← conic-gradient wheel
    ├── HueStrip.tsx        ← hue slider (0–360°)
    ├── AlphaStrip.tsx      ← alpha/opacity slider
    ├── ChannelSlider.tsx   ← generic slider component
    ├── RGBSliders.tsx      ← 3× ChannelSlider for RGB
    ├── HSLSliders.tsx      ← 3× ChannelSlider for HSL
    ├── CMYKSliders.tsx     ← 4× ChannelSlider for CMYK
    ├── GradientPicker.tsx  ← gradient stop bar + per-stop color picking
    ├── SwatchBar.tsx       ← preset color grid
    └── ColorInput.tsx      ← text input with format toggle (hex/rgb/hsl/cmyk)
```

## color-engine.ts

all conversions are pure functions, no side effects:

- `hexToRgba` / `rgbaToHex`
- `rgbaToHsva` / `hsvaToRgba`
- `hsvaToHsla` / `hslaToHsva`
- `rgbaToCmyk` / `cmykToRgba`
- `colorFromHex`, `colorFromHsva`, `colorFromRgba`, `colorFromHsla` — master builders that compute all color spaces from one input

## performance

drag interactions (saturation map, hue strip, wheel) need to be smooth at 60fps. here's what we do:

- **requestAnimationFrame throttling** — mouse/pointer events are batched into rAF callbacks
- **React.memo** on all sub-components — HueStrip won't re-render during a saturation drag because its `hue` prop didn't change
- **refs for callbacks** — `onChange` and `color` are read from refs to keep `useCallback` stable
- **CSS `contain: layout style paint`** on interactive areas — isolates browser repaints to just that element
- **`will-change: left, top`** on cursor/thumb elements — promotes them to GPU layers
- **only the active mode renders** — switching from `useMemo` per-mode to a single `switch` eliminated 5× wasted renders

## things to remember

- the central state is `ColorState` = `{ hex, rgb, hsv, hsl, cmyk }` — always in sync
- `useColorState` returns stable setters (`setHsva`, `setRgba`, `setHue`, `setAlpha`) — they never change identity
- the picker lives inside a `WindowPanel` with tabs (one tab per mode)
- swatches and alpha strip are optional (controlled by props)
