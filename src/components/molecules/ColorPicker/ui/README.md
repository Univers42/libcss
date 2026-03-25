# ColorPicker/ui/

all the visual components that make up the color picker interface.

## component map

| file | what it renders |
|------|----------------|
| `ColorPicker.tsx` | main orchestrator — tabs + active view inside a `WindowPanel` |
| `SaturationMap.tsx` | the 2D gradient square (x=saturation, y=brightness) |
| `HueStrip.tsx` | the horizontal rainbow slider |
| `AlphaStrip.tsx` | the horizontal opacity slider |
| `ColorWheel.tsx` | circular hue wheel with radial picking |
| `RGBSliders.tsx` | three sliders for Red/Green/Blue channels |
| `HSLSliders.tsx` | three sliders for Hue/Saturation/Lightness |
| `CMYKSliders.tsx` | four sliders for Cyan/Magenta/Yellow/Key |
| `GradientPicker.tsx` | gradient stop editor |
| `SwatchBar.tsx` | preset color swatches row |
| `ColorInput.tsx` | text input for typing hex/rgb values |
| `ChannelSlider.tsx` | shared base slider used by RGB/HSL/CMYK panels |

## architecture

```
ColorPicker (WindowPanel wrapper)
  └─ active mode view (only one renders at a time!)
       ├─ Map mode:     SaturationMap + HueStrip + AlphaStrip
       ├─ Wheel mode:   ColorWheel + AlphaStrip
       ├─ RGB mode:     RGBSliders
       ├─ HSL mode:     HSLSliders
       ├─ CMYK mode:    CMYKSliders
       └─ Gradient mode: GradientPicker
  └─ SwatchBar (always visible)
  └─ ColorInput (always visible)
```

## performance notes

- only the active mode's components render (not all 6 at once)
- `SaturationMap`, `HueStrip`, `AlphaStrip`, `ColorWheel`, `SwatchBar`, `ColorInput` are all wrapped in `React.memo`
- pointer events use `requestAnimationFrame` to throttle updates
- SCSS uses `contain: layout style paint` and `will-change` hints
