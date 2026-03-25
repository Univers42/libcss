# scss/components/atoms/

SCSS styles for all 39+ atom components.

## what's in here

one `_partial.scss` file per atom, all forwarded through `_index.scss`:

```
_alert.scss, _avatar.scss, _badge.scss, _bookmark.scss, _brand-logo.scss,
_breadcrumb.scss, _button.scss, _callout.scss, _checkbox.scss, _chip.scss,
_citation.scss, _code.scss, _divider.scss, _equation.scss, _icon.scss,
_input.scss, _kbd.scss, _list.scss, _page.scss, _paragraph.scss,
_progress.scss, _quote.scss, _radio.scss, _select.scss, _separator.scss,
_skeleton.scss, _spinner.scss, _strength-bar.scss, _switch.scss,
_synced_block.scss, _table.scss, _tabs.scss, _text.scss, _textarea.scss,
_theme-toggle.scss, _toast.scss, _tocs.scss, _toggle_list.scss, _tooltip.scss
```

## naming convention

each file corresponds to a React component:
- `_button.scss` → styles for the `Button` atom (`.prisma-button`)
- `_badge.scss` → styles for the `Badge` atom (`.prisma-badge`)
- etc.

## things to remember

- all files are SCSS **partials** (prefixed with `_`) — they're not compiled standalone
- `_index.scss` forwards all partials — just `@use 'atoms'` from the parent and you get everything
- styles use BEM notation with `prisma-` prefix
- theme variables come from `../../abstracts/` (custom properties like `--prisma-*`)
- if you add a new atom, create its `_name.scss` here and add a `@forward` line in `_index.scss`
