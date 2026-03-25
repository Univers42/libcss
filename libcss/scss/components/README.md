# src/scss/components/

all the component styles, organized by atomic design level:

```
components/
├── atoms/       ← small, single-purpose UI pieces
├── molecules/   ← combinations of atoms
├── organisms/   ← (future — larger composed sections)
└── media/       ← media-specific components
```

## atoms/

these are the smallest building blocks. each one does one thing:

Alert, Avatar, Badge, Bookmark, BrandLogo, Breadcrumb, Button, Callout, Checkbox, Chip, Citation, CodeBlock, Divider, Equation, Heading, Icon, Input, Kbd, List, PageLink, Paragraph, Progress, Quote, Radio, Select, Separator, Skeleton, Spinner, StrengthBar, Switch, SyncedBlock, Table, TableOfContents, Tabs, Textarea, ThemeToggle, Toast, ToggleList, Tooltip

## molecules/

built from multiple atoms working together:

Accordion, BreadcrumbNav, ColorPicker, FormField, InfoPanel, LanguageSelector, Pagination, SocialButton, SplitLayout, Stepper, Toolbar, WindowPanel

## media/

styles for media-related components:

Audio, FileAttachment, Image, Video

## naming

all classes follow BEM with the `prisma-` prefix:

```scss
.prisma-button { }
.prisma-button__icon { }
.prisma-button--primary { }
.prisma-button--sm { }
```

## how to add a new component

1. create a new file: `atoms/_my-component.scss` (or molecules, etc.)
2. add it to the corresponding `_index.scss` barrel
3. use tokens from abstracts: `@use '../../abstracts' as *;`
4. follow the BEM naming: `.prisma-my-component`, `.prisma-my-component__child`, `.prisma-my-component--variant`
