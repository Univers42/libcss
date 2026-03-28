# src/components/layout/shell/

the 4 shell layout variants — the outermost containers that structure an entire page.

## shells

| shell | layout | use case |
|-------|--------|----------|
| `DashboardShell` | sidebar + header + main (CSS grid) | admin panels, the studio itself, any app with navigation |
| `StackedShell` | header on top + full-width body | simple apps, documentation pages |
| `CenteredShell` | centered card on a background | login, signup, error pages |
| `PanelShell` | floating resizable panel(s) | tool windows, inspectors |
| `StreamingShell` | floating nav + hero + rows + modal | streaming platforms (Netflix, Disney+, HBO) |

## DashboardShell (the main one)

this is the most-used shell. it takes:

- `brand` — logo/brand slot (top of sidebar)
- `nav` — navigation content (sidebar body)
- `header` — top bar slot (search, theme switcher, etc.)
- `children` — main content area
- `colorScheme` — `"dark"` or `"light"`
- `sidebarWidth` — CSS width value

```tsx
<DashboardShell
  colorScheme="dark"
  sidebarWidth="260px"
  brand={<Logo />}
  nav={<SidebarNav />}
  header={<SearchBar />}
>
  <PageContent />
</DashboardShell>
```

## how the grid works

```
grid-template-columns: var(--shell-sidebar-w) 1fr
grid-template-rows: var(--shell-header-h) 1fr
grid-template-areas:
  "sidebar header"
  "sidebar main"
```

sidebar is full-height on the left. header spans the top right. main content fills the rest.

## things to remember

- all shells are `height: 100vh` + `overflow: hidden` — they're the page root
- dark/light is controlled by `colorScheme` prop which adds a `--light` class modifier
- the `--shell-*` custom properties drive all colors — override them in your app CSS for custom theming
- each shell uses the tokens defined in `src/scss/layouts/_shell.scss`
