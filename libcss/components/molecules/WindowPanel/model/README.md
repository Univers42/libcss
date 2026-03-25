# WindowPanel/model/

data layer for the WindowPanel — types and constants.

## files

- **`WindowPanel.types.ts`** — defines `WindowTab` and `WindowPanelProps` interfaces
- **`WindowPanel.constants.ts`** — default values

## key types

```ts
interface WindowTab {
  id: string;
  label: string;
  content: ReactNode;
}

interface WindowPanelProps {
  title: string;
  icon?: ReactNode;
  tabs?: WindowTab[];
  // ... close button, footer, status bar, compact mode, etc.
}
```

## things to remember

- WindowPanel is a Notion-style floating window used as a container for complex tools (like ColorPicker)
- the types define the tab system, which allows multiple views inside one panel
