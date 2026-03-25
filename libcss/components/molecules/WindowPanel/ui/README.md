# WindowPanel/ui/

the visual implementation of the Notion-style floating window panel.

## WindowPanel.tsx

renders:
1. **title bar** — icon + title + close button (×)
2. **tab bar** — horizontal tabs for switching views (if `tabs` are provided)
3. **content area** — the active tab's content
4. **footer** — optional bottom bar
5. **status bar** — optional status text at the very bottom

## usage

```tsx
<WindowPanel
  title="Color Picker"
  icon={<PaletteIcon />}
  tabs={[
    { id: 'map', label: 'Map', content: <SaturationMap /> },
    { id: 'rgb', label: 'RGB', content: <RGBSliders /> },
  ]}
  onClose={() => setOpen(false)}
  footer={<SwatchBar />}
/>
```

## things to remember

- supports both controlled and uncontrolled tab management
- the main consumer of this component is `ColorPicker`, but it's generic enough for any tool panel
- compact mode reduces padding for smaller floating panels
- the title bar is always visible — it's the drag/identity area
