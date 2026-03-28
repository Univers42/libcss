# ColorPicker/model/

the brains of the color picker — all the data, types, and pure logic lives here.

## files

### color-engine.ts

pure functions for converting between color spaces. no React, no state — just math.

```ts
import { hexToRgb, rgbToHsv, hsvToHex, rgbToCmyk, ... } from './color-engine';
```

supported conversions:
- HEX ↔ RGB
- RGB ↔ HSV
- RGB ↔ HSL
- RGB ↔ CMYK
- HSV → HEX (useful for the saturation map + hue strip)

### useColorState.ts

the central React hook that manages color state across all modes. it keeps one source of truth and derives all other representations from it.

```ts
const { color, setHex, setRgb, setHsv, setHsl, setCmyk } = useColorState('#ff6600');
// color.hex → "#ff6600"
// color.rgb → { r: 255, g: 102, b: 0 }
// color.hsv → { h: 24, s: 100, v: 100 }
// ...etc
```

### ColorPicker.types.ts

all the TypeScript interfaces — mode types (`'map' | 'wheel' | 'rgb' | 'hsl' | 'cmyk' | 'gradient'`), props, color objects, etc.

## things to remember

- the engine is pure functions — great for testing, no side effects
- `useColorState` is the single source of truth — when you set any color format, all others update
- the conversion chain is: input → normalized internal format → derive all other formats
