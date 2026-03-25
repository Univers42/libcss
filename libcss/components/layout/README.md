# src/components/layout/

the big structural pieces — shell containers that wrap entire pages, and data views for different visualization patterns.

## structure

```
layout/
├── shell/              ← 4 page-level shell containers
│   ├── DashboardShell  ← sidebar + header + main content (most common)
│   ├── StackedShell    ← simple top header + scrolling body
│   ├── CenteredShell   ← centered card layout (login pages, etc.)
│   └── PanelShell      ← floating panel/window layout
│
├── view/               ← 10 data view patterns
│   ├── board/          ← kanban-style board
│   ├── calendar/       ← calendar grid
│   ├── chart/          ← D3-based charts (bar, line, area, pie, donut, scatter…)
│   ├── dashboard/      ← widget dashboard with stat cards
│   ├── feed/           ← social-feed style vertical stream
│   ├── gallery/        ← image/card gallery grid
│   ├── list/           ← simple list view
│   ├── map/            ← geographic map view
│   ├── table/          ← data table with sorting/filtering
│   └── timeline/       ← chronological timeline
│
├── StudioLayout.tsx    ← legacy layout wrapper
└── index.ts            ← barrel exports
```

## shells

shells are the outermost layout containers. they use CSS grid + `--shell-*` custom properties:

```tsx
import { DashboardShell } from '@libcss/layout';

<DashboardShell
  colorScheme="dark"
  sidebarWidth="260px"
  brand={<Logo />}
  nav={<Sidebar />}
  header={<SearchBar />}
>
  <MainContent />
</DashboardShell>
```

the dash shell gives you: a collapsible sidebar, a fixed header bar, and a scrollable main area. all via CSS grid — `grid-template-areas: "sidebar header" "sidebar main"`.

## chart system

the chart view is the most complex one. it's built on D3 and supports:

- bar, line, area, pie, donut, scatter, radar, treemap, heatmap
- multiple color palettes (prisma, ocean, sunset, forest, neon, earth, pastel)
- responsive sizing, legends, tooltips, gridlines

```tsx
import { Chart } from '@libcss/layout';

<Chart config={{
  type: 'bar',
  data: [...],
  palette: 'ocean',
  responsive: true,
}} />
```

## things to remember

- shells are full-page containers (`height: 100vh`, `overflow: hidden`) — don't nest them
- all shells support dark/light via `colorScheme` prop or `--light` CSS class modifier
- the Shell tokens (`--shell-*`) are separate from the theme tokens (`--prisma-*`) — shells manage their own color system
- chart palettes are defined in `src/scss/layouts/_palettes.scss`
