# src/components/media/

components for rendering media content — images, videos, audio players, and file attachments.

## what's here

| component | purpose |
|-----------|---------|
| **Image** | responsive image with lazy loading, aspect ratio, lightbox support, figcaption |
| **Video** | video player with controls, poster frame, responsive sizing |
| **Audio** | audio player with waveform display or simple controls |
| **FileAttachment** | file download/preview block (like Notion file blocks) — shows icon, filename, size |

## how to use

```tsx
import { Image, Video, Audio, FileAttachment } from '@libcss/components';

<Image src="/photo.jpg" alt="A nice photo" aspectRatio="16/9" />
<Video src="/demo.mp4" poster="/thumb.jpg" />
<Audio src="/track.mp3" />
<FileAttachment name="report.pdf" size="2.4 MB" url="/files/report.pdf" />
```

## things to remember

- all media components are block-level by default (`display: block; max-width: 100%` from the reset)
- Image supports lazy loading via the native `loading="lazy"` attribute
- the matching SCSS lives in `src/scss/components/media/`
