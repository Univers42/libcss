# scss/components/organisms/

🚧 **placeholder** — future organism-level SCSS styles.

right now this only contains an `_index.scss` with commented-out forwards for planned organisms:

```scss
// @forward 'dashboard-sidebar';
// @forward 'data-table';
// @forward 'navbar';
// @forward 'widget-card';
```

## what organisms are (in atomic design)

organisms are the next level up from molecules — they're bigger, more complex UI sections built from multiple molecules and atoms. examples:
- a full navigation bar (logo + nav links + search + user menu)
- a dashboard sidebar (nav items + collapse + user panel)
- a data table with sorting, filtering, and pagination built-in

## things to remember

- when you implement an organism, create its `_name.scss` partial here and uncomment/add the `@forward` line in `_index.scss`
- follow the same BEM + `prisma-` prefix convention
