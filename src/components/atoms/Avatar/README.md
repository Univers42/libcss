# Avatar

user profile picture with smart fallbacks.

## how it works

shows the image if provided. if the image fails or isn't given, it generates colored initials from the name. the color is deterministic — same name always gets the same color.

## usage

```tsx
<Avatar src="/photos/me.jpg" name="Jane Doe" size="md" />
<Avatar name="Jane Doe" />  {/* → colored circle with "JD" */}
<Avatar name="Jane Doe" status="online" shape="rounded" />
```

## props

| prop | type | what it does |
|------|------|-------------|
| `src` | `string` | image URL |
| `name` | `string` | used for fallback initials + alt text |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | avatar size |
| `shape` | `'circle' \| 'rounded' \| 'square'` | border radius style |
| `status` | `'online' \| 'offline' \| 'busy' \| 'away'` | status dot indicator |

## things to remember

- always provide `name` even when using `src` — it's used for the alt text and the initials fallback
- the initials are extracted from the first letter of each word (max 2 letters)
- status dot shows as a small colored circle at the bottom-right corner
