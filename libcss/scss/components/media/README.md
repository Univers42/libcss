# scss/components/media/

SCSS styles for the 4 media embed components.

## files

| file | component | BEM class |
|------|-----------|-----------|
| `_audio.scss` | Audio player | `.prisma-audio` |
| `_file.scss` | FileAttachment | `.prisma-file` |
| `_image.scss` | Image embed | `.prisma-image` |
| `_video.scss` | Video player | `.prisma-video` |
| `_index.scss` | barrel — forwards all above | — |

## things to remember

- same pattern as atoms — SCSS partials, BEM naming, forwarded via `_index.scss`
- media components often use aspect-ratio techniques (padding trick or CSS `aspect-ratio`)
- responsive behavior is handled here (images and videos scale to container width)
