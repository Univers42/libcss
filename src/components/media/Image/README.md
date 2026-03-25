# Image

image embed with optional caption — uses the `<figure>/<figcaption>` pattern.

## usage

```tsx
<Image src="/photos/hero.jpg" alt="Mountain landscape" caption="Photo by Someone" />
<Image src="/screenshots/app.png" size="full" centered />
<Image src="/icons/logo.png" rounded borderless />
```

## props

| prop | type | what it does |
|------|------|-------------|
| `src` | `string` | image URL |
| `alt` | `string` | alt text (accessibility!) |
| `caption` | `string` | text below the image |
| `size` | `'full'` etc. | width variant |
| `rounded` | `boolean` | border radius |
| `borderless` | `boolean` | removes the border/shadow |
| `centered` | `boolean` | centers the image |

## things to remember

- BEM class: `prisma-image`
- when `caption` is provided, wraps in `<figure>` with `<figcaption>` — semantically correct
- always provide `alt` text — skip it only for purely decorative images (and even then, use `alt=""`)
- the `size` prop controls the max-width, not the height
