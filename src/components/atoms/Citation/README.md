# Citation

academic-style inline citations and reference lists — like a mini bibliography system.

## two components

### CitationMarker

the little superscript number in the text: "according to Smith¹"

```tsx
<p>
  This was proven by research <CitationMarker id="ref1" index={1} />.
</p>
```

### CitationReferences

the numbered list at the bottom of the page:

```tsx
<CitationReferences
  references={[
    { id: 'ref1', text: 'Smith et al., 2023', url: 'https://...' },
    { id: 'ref2', text: 'Doe, 2024' },
  ]}
/>
```

## things to remember

- the marker is a link that scrolls to the matching reference in the list
- references can optionally have URLs that open in a new tab
- BEM class: `prisma-citation`
- this is designed for article/document-style content — scholarly vibes
