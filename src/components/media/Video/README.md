# Video

video player embed with aspect ratio support — `<figure>/<figcaption>` wrapper.

## usage

```tsx
<Video src="/videos/demo.mp4" caption="Product demo" aspectRatio="16:9" />
<Video src="/clips/short.mp4" poster="/thumbs/short.jpg" aspectRatio="4:3" />
<Video src="/hero.mp4" borderless aspectRatio="21:9" />
```

## props

| prop | type | what it does |
|------|------|-------------|
| `src` | `string` | video URL |
| `caption` | `string` | text below the video |
| `poster` | `string` | preview image before playing |
| `aspectRatio` | `'16:9' \| '4:3' \| '1:1' \| '21:9'` | video container ratio |
| `borderless` | `boolean` | removes border/shadow |

## things to remember

- BEM class: `prisma-video`
- wraps in `<figure>/<figcaption>` just like the Image component
- the aspect ratio is enforced by a CSS padding trick — keeps the container proportional even before the video loads
- the poster image shows as a thumbnail before the user hits play
- native `<video>` element with browser controls
