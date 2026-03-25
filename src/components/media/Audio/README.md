# Audio

audio player embed — wraps the native `<audio>` element with metadata display.

## usage

```tsx
<Audio src="/music/track.mp3" title="Chill Vibes" artist="DJ Prisma" />
<Audio src="/podcast/ep1.mp3" title="Episode 1" compact />
```

## props

| prop | type | what it does |
|------|------|-------------|
| `src` | `string` | audio file URL |
| `title` | `string` | track/file name |
| `artist` | `string` | optional artist name |
| `compact` | `boolean` | smaller layout |

## things to remember

- BEM class: `prisma-audio`
- uses the native `<audio controls>` element — browser provides the play/pause/seek UI
- the component adds a styled wrapper with title + artist display above the player
- compact mode reduces padding and font sizes
