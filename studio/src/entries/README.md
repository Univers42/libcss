# studio/src/entries/

this is where every component gets "registered" with the studio. each `.entry.ts` file is a side-effect import that calls `registry.register()` to tell the studio about one component.

## how it works

`index.ts` in this folder imports every entry file:

```ts
import './button.entry';
import './badge.entry';
import './avatar.entry';
// ... etc
```

and `main.tsx` imports this `index.ts` as a side-effect:

```ts
import './entries'; // runs all registrations
```

so by the time React renders, every component is already in the registry and the studio can display them all.

## anatomy of an entry file

```ts
// badge.entry.ts
import { registry } from '@libcss/core';
import { Badge } from '@libcss/components';

registry.register({
  id: 'badge',
  name: 'Badge',
  category: 'atoms',
  component: Badge,
  defaultProps: {
    children: '42',
    variant: 'default',
  },
  controls: [
    { prop: 'variant', type: 'select', options: ['default', 'primary', 'success', 'warning', 'danger'] },
    { prop: 'size', type: 'select', options: ['sm', 'md', 'lg'] },
    { prop: 'children', type: 'text' },
  ],
  variants: [
    { label: 'Default', props: { variant: 'default', children: '5' } },
    { label: 'Primary', props: { variant: 'primary', children: 'New' } },
    // ...
  ],
});
```

the `controls` array defines what shows up in the playground sidebar — each control maps to a prop and renders the appropriate editor (text input, dropdown, toggle, etc.).

the `variants` array defines preset configurations shown in the variant gallery.

## adding a new component

1. create `my-component.entry.ts` in this folder
2. import your component and register it with `registry.register()`
3. define `controls` for the props you want to be editable
4. define `variants` for the different visual states you want to showcase
5. add `import './my-component.entry';` to `index.ts`
6. done — refresh the studio and it shows up

## things to remember

- the order of imports in `index.ts` doesn't matter — the registry is a flat map
- `chart-fixtures.ts` and `chart-gallery-data.ts` aren't entries — they're data files used by the chart entry and chart gallery view
- each entry is independent — if one has a bug, the others still work fine
- you can test an entry by commenting out all others in `index.ts` and just keeping the one you're working on
