# Bookmark

Notion-style web bookmark embed — renders a clickable link card with metadata.

## what it looks like

a horizontal card showing: title, description, hostname, favicon, and optional thumbnail. clicking it opens the URL.

## usage

```tsx
<Bookmark
  url="https://react.dev"
  title="React"
  description="The library for web and native user interfaces"
  thumbnail="/thumbs/react.png"
/>
```

## props

| prop | type | what it does |
|------|------|-------------|
| `url` | `string` | the link URL (also shown as hostname) |
| `title` | `string` | card title |
| `description` | `string` | one-liner under the title |
| `thumbnail` | `string` | optional image on the right side |

## things to remember

- BEM class: `prisma-bookmark`
- the component extracts the hostname from the URL to display as a subtle domain label
- inspired by Notion's bookmark block — if you've used Notion, you know the look
- the favicon is derived from the URL's domain
