# src/components/

all the React components for the design system. these mirror the SCSS structure — same atoms/molecules split, same naming.

## structure

```
components/
├── atoms/       ← 39 small building blocks (Button, Badge, Input, Tooltip…)
├── molecules/   ← 12 composed components (ColorPicker, Toolbar, Accordion…)
├── media/       ← 4 media components (Image, Video, Audio, FileAttachment)
├── layout/      ← shell containers + data views (DashboardShell, Chart…)
├── controls/    ← generic prop editors for the studio playground
├── explorer/    ← component explorer UI pieces (sidebar, cards, search…)
├── views/       ← page-level composite views (overview, category, playground…)
├── lib/         ← shared utils (cn for classnames, password strength…)
└── index.ts     ← barrel that re-exports everything
```

## how components are organized

most components follow this pattern inside their folder:

```
Button/
├── Button.tsx           ← the main component
├── Button.types.ts      ← TypeScript props interface
├── Button.constants.ts  ← variant maps, defaults
└── index.ts             ← barrel export
```

some (like ColorPicker, WindowPanel) have extra structure with `model/` and `ui/` subfolders separating logic from presentation.

## importing

```tsx
// from the barrel
import { Button, Badge, Tooltip } from '@libcss/components';

// or direct (when you need tree-shaking)
import { Button } from '../components/atoms/Button';
```

## adding a new component

1. create its folder under the right category (atoms/molecules/media)
2. write the `.tsx`, `.types.ts`, and `index.ts` files
3. add the export to the category's `index.ts` barrel
4. create matching SCSS in `src/scss/components/`
5. (optional) create a studio entry in `studio/src/entries/` to make it show up in the playground

## things to remember

- all components are typed with TypeScript — props always have an interface
- components use the CSS classes from `libcss.css`, not CSS modules (except for a few studio-specific ones)
- the `cn()` utility in `lib/cn.ts` is used for conditional classname joining
- layout components (shells, chart) use `--shell-*` CSS custom properties, not `--prisma-*`
