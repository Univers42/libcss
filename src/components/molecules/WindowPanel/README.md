# src/components/molecules/WindowPanel/

a Notion-style floating panel/window component. think of it as a container with a title bar, optional tabs, a body area, a footer, and a status bar.

## structure

```
WindowPanel/
├── model/
│   └── WindowPanel.types.ts    ← props + tab type definitions
└── ui/
    └── WindowPanel.tsx         ← the component
```

## what it does

WindowPanel renders a styled container with:
- **title bar**: icon + title + optional close button
- **tab bar**: if you pass `tabs` (array of `{ id, label, icon, content }`), it renders a tab strip. only the active tab's content is shown.
- **body**: the main content area (either tab content or `children`)
- **footer**: optional bottom area (used for inputs, swatch grids, etc.)
- **status bar**: optional bottom text bar (like "rgb(59,130,246)")

## usage

```tsx
<WindowPanel
  title="Color Picker"
  icon="🎨"
  tabs={[
    { id: 'map', label: 'Map', content: <SaturationMap /> },
    { id: 'wheel', label: 'Wheel', content: <ColorWheel /> },
  ]}
  activeTab="map"
  onTabChange={setActiveTab}
  compact
  footer={<SwatchBar />}
  statusBar={<span>#3b82f6</span>}
/>
```

## things to remember

- tabs are optional — you can also just pass `children` for a simple panel without tabs
- tab state can be controlled (`activeTab` + `onTabChange`) or uncontrolled (internal state)
- the `compact` prop reduces padding for tighter layouts
- used by ColorPicker and could be used for any tool panel in the future
- styles are in `src/scss/components/molecules/_window-panel.scss`
