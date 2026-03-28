# Kbd

keyboard shortcut indicator — that little styled `<kbd>` element.

## usage

```tsx
<Kbd>Ctrl</Kbd> + <Kbd>S</Kbd>
<Kbd>⌘K</Kbd>
```

## props

just `children` and `className`. that's it — this is the simplest atom in the library.

## things to remember

- renders a native `<kbd>` HTML element with the `kbd` CSS class
- used for showing keyboard shortcuts in tooltips, menus, or documentation
- no variants, no sizes — it's intentionally minimal
