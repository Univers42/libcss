# FileAttachment

file download card — shows file info with a download action.

## usage

```tsx
<FileAttachment
  filename="design-spec.pdf"
  size="2.4 MB"
  href="/files/design-spec.pdf"
/>
<FileAttachment filename="data.csv" size="128 KB" compact />
```

## props

| prop | type | what it does |
|------|------|-------------|
| `filename` | `string` | the file name to display |
| `size` | `string` | human-readable file size |
| `href` | `string` | download URL |
| `compact` | `boolean` | smaller layout |

## what it renders

a horizontal card with:
- file icon (auto-detected from extension)
- filename
- file size
- download arrow/action on the right

## things to remember

- BEM class: `prisma-file`
- inspired by Notion's file attachment blocks
- the download link opens in a new tab / triggers a download
- compact mode is for inline use within lists
