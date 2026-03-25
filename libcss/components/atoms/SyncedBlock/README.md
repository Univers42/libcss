# SyncedBlock

Notion-style synced content block — for content that's shared/referenced across pages.

## usage

```tsx
<SyncedBlock sourceId="block-abc123" editing>
  <Paragraph>This content is synced from another page.</Paragraph>
</SyncedBlock>
```

## props

| prop | type | what it does |
|------|------|-------------|
| `sourceId` | `string` | ID of the source block being synced |
| `editing` | `boolean` | show editing state indicator |
| `variant` | string | visual style |
| `children` | `ReactNode` | the synced content |

## things to remember

- BEM class: `prisma-synced-block`
- shows a colored dot indicator + label to mark it as a synced block
- the `sourceId` is stored as a `data-source-id` attribute on the DOM element
- this is a Notion concept — "synced blocks" are content that lives in one place but appears in multiple pages
- when `editing`, the visual indicator becomes more prominent
