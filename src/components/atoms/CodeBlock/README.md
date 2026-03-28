# CodeBlock

syntax-highlighted code block with line numbers and copy button.

## usage

```tsx
<CodeBlock language="typescript" showLineNumbers>
  {`const x = 42;\nconsole.log(x);`}
</CodeBlock>

<CodeBlock
  language="python"
  highlightLines={[2, 3]}
  showCopyButton
  compact
>
  {codeString}
</CodeBlock>
```

## props

| prop | type | what it does |
|------|------|-------------|
| `language` | `string` | label shown in the top corner |
| `showLineNumbers` | `boolean` | numbered gutters |
| `highlightLines` | `number[]` | lines to highlight with a background |
| `showCopyButton` | `boolean` | clipboard copy button |
| `compact` | `boolean` | less padding |
| `mermaid` | `boolean` | mermaid diagram mode |

## things to remember

- BEM class: `prisma-code`
- the copy button copies the raw text content to clipboard
- `highlightLines` is useful for tutorials where you want to draw attention to specific lines
- `mermaid` mode is for rendering mermaid diagram markup
- the language label appears at the top-right corner
