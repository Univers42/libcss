# Equation

math equation display — for rendering formulas in documents.

## usage

```tsx
<Equation display="block" number={1} label="Pythagorean theorem">
  a² + b² = c²
</Equation>

<Equation display="inline">E = mc²</Equation>
```

## props

| prop | type | what it does |
|------|------|-------------|
| `display` | `'inline' \| 'block'` | inline in text or centered block |
| `number` | `number` | equation number shown on the right |
| `label` | `string` | accessible label for the equation |

## things to remember

- BEM class: `prisma-equation`
- block equations are centered with optional numbering (like in academic papers)
- inline equations flow within text
- this renders the raw text — if you want actual LaTeX rendering, you'd pair this with a math library like KaTeX
