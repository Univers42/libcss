# src/components/atoms/

the smallest, most fundamental UI pieces. each atom does exactly one thing and doesn't depend on other atoms (well, mostly — some use Icon internally).

## what's here

there are 39 atoms. here's what each one is for:

| component | purpose |
|-----------|---------|
| **Alert** | notification/alert banner with variants (info, success, warning, error) |
| **Avatar** | user/entity avatar — image, initials, or icon fallback |
| **Badge** | small status label/counter (like notification counts) |
| **Bookmark** | toggle-able bookmark/favorite icon |
| **BrandLogo** | the Prismatica brand logo in different sizes |
| **Breadcrumb** | single breadcrumb item (used by BreadcrumbNav molecule) |
| **Button** | the button. primary, secondary, ghost, danger, sizes, icons, loading state |
| **Callout** | highlighted info/tip/warning/danger block (like Notion callouts) |
| **Checkbox** | styled checkbox input |
| **Chip** | compact tag/filter element, removable |
| **Citation** | academic-style citation block |
| **CodeBlock** | syntax-highlighted code block with copy button |
| **Divider** | horizontal/vertical separator line |
| **Equation** | math equation display (KaTeX-style) |
| **Heading** | h1-h6 with consistent styling |
| **Icon** | SVG icon wrapper — includes GitHub, Google, and base icon components |
| **Input** | text input field with label, error state, icons |
| **Kbd** | keyboard shortcut display (`⌘ + K` style) |
| **List** | ordered/unordered/todo lists |
| **PageLink** | Notion-style page reference link |
| **Paragraph** | styled paragraph text |
| **Progress** | progress bar with percentage |
| **Quote** | blockquote with attribution |
| **Radio** | radio button input |
| **Select** | dropdown select menu |
| **Separator** | visual separator (similar to Divider but semantic) |
| **Skeleton** | loading placeholder (shimmer effect) |
| **Spinner** | loading spinner animation |
| **StrengthBar** | password strength indicator (segmented bar) |
| **Switch** | toggle switch (on/off) |
| **SyncedBlock** | Notion-style synced content indicator |
| **Table** | data table with sorting, alignment options |
| **TableOfContents** | auto-generated table of contents |
| **Tabs** | tab navigation |
| **Textarea** | multi-line text input |
| **ThemeToggle** | light/dark mode toggle button with animation |
| **Toast** | notification popup (success, error, info, warning) |
| **ToggleList** | collapsible/expandable list (like Notion toggles) |
| **Tooltip** | hover tooltip |

## typical file structure

```
Button/
├── Button.tsx           ← main component
├── Button.types.ts      ← props interface
├── Button.constants.ts  ← variant/size maps
└── index.ts             ← re-exports
```

## how to use

```tsx
import { Button } from '@libcss/components';

<Button variant="primary" size="md" onClick={handleClick}>
  Save Changes
</Button>
```

## things to remember

- atoms should be self-contained — they shouldn't import other atoms (Icon is the exception since many atoms need icons)
- every atom has a matching SCSS file in `src/scss/components/atoms/`
- props always extend or include standard HTML attributes where it makes sense
- always export from the folder's `index.ts` AND from the atoms-level `index.ts`
