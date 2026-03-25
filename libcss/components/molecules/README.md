# src/components/molecules/

molecules are built by combining multiple atoms (or other primitives) into something more functional. they handle a specific UI pattern with its own internal logic.

## what's here

| component | what it does |
|-----------|-------------|
| **Accordion** | expandable/collapsible sections — click a header, content slides open |
| **BreadcrumbNav** | full breadcrumb trail using Breadcrumb atoms |
| **ColorPicker** | professional multi-mode color picker — saturation map, color wheel, RGB/HSL/CMYK sliders, gradient editor, swatches. lives inside a WindowPanel with tabs. |
| **FormField** | label + input + error message combo — wraps any input atom into a proper form field |
| **InfoPanel** | information panel with feature items and state indicators |
| **LanguageSelector** | dropdown to pick a language (i18n) |
| **Pagination** | page navigation with prev/next and page numbers |
| **SocialButton** | OAuth-style social login buttons (Google, GitHub, etc.) |
| **SplitLayout** | two-column split with resizable panels |
| **Stepper** | multi-step wizard/progress indicator |
| **Toolbar** | horizontal action bar with grouped buttons/controls |
| **WindowPanel** | Notion-like floating panel/window — supports tabs, footer, status bar. used as the container for ColorPicker and other tool panels. |

## ColorPicker deep dive

this one's the most complex molecule. it has its own internal architecture:

```
ColorPicker/
├── model/
│   ├── color-engine.ts    ← pure-function color space conversions (hex↔rgb↔hsv↔hsl↔cmyk)
│   ├── useColorState.ts   ← central state hook — single source of truth for color
│   └── ColorPicker.types.ts
└── ui/
    ├── ColorPicker.tsx    ← main component, renders the active mode only
    ├── SaturationMap.tsx  ← 2D saturation/value grid (CSS gradients, no canvas)
    ├── ColorWheel.tsx     ← circular hue/saturation picker (conic-gradient)
    ├── HueStrip.tsx       ← horizontal hue slider
    ├── AlphaStrip.tsx     ← transparency slider
    ├── RGBSliders.tsx     ← R/G/B channel sliders
    ├── HSLSliders.tsx     ← H/S/L channel sliders
    ├── CMYKSliders.tsx    ← C/M/Y/K channel sliders
    ├── ChannelSlider.tsx  ← generic slider used by the above
    ├── GradientPicker.tsx ← gradient stop editor
    ├── SwatchBar.tsx      ← preset color grid
    └── ColorInput.tsx     ← hex/rgb/hsl text input with format toggle
```

all drag-based sub-components use `requestAnimationFrame` throttling + `React.memo` to stay performant during pointer moves.

## things to remember

- molecules combine atoms but shouldn't get too big — if it's a full page section, it's probably an organism
- WindowPanel is a generic container — you can put anything in its tabs
- the ColorPicker supports 6 modes: map, wheel, rgb, hsl, cmyk, gradient
- FormField is the go-to for wrapping any input with proper label/error/help text
