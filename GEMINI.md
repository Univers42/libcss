# Prismatica UI - Project Mandates & Standards

This document serves as the foundational authority for all development within this repository. Adherence to these standards is mandatory to ensure architectural integrity, scalability, and consistency.

## 🏗️ Core Architecture: FSD + Atomic Design

We use **Feature-Sliced Design (FSD)** for overall organization and **Atomic Design** for the `shared/ui` layer.

### 1. Layer Hierarchy (Strictly Downward Imports)
- **app/**: Global config, providers, and styles.
- **pages/**: Full application views.
- **widgets/**: Complex compositions (Navbar, Sidebar).
- **features/**: User-facing business logic (AuthForm, SearchBar).
- **entities/**: Business data models (User, Product).
- **shared/**: Infrastructure, utils, and the UI library.

### 2. Public API (Encapsulation)
- Every slice (atom, molecule, etc.) **MUST** have an `index.ts` file.
- External imports must only access a slice through its `index.ts`.
- Internal folder structures (e.g., `ui/`, `model/`) are private to the slice.

## 📂 Component Blueprint (The 6-File Rule)

Every UI component in `shared/ui` must follow this exact structure to ensure portability and testing:

```text
Component/
├── index.ts                 # Public API: export { Component } from './ui/Component';
├── Component.module.scss    # Styles: CSS Modules, zero hardcoded literals.
├── model/
│   └── Component.types.ts   # TS: Strictly typed interfaces. No 'any'.
└── ui/
    ├── Component.tsx        # Logic: Clean React implementation.
    ├── Component.stories.tsx# Docs: Storybook stories for all states.
    └── Component.spec.tsx   # Tests: Vitest + React Testing Library.
```

## 🎨 Styling Standards

1. **CSS Modules:** All styling must be scoped via `.module.scss`.
2. **Design Tokens:** Use CSS Custom Properties (`var(--prisma-...)`) for colors, spacing, and typography.
3. **No Literals:** Hardcoded hex codes or pixel values are forbidden. Import `@/app/styles/abstracts` if SASS variables are needed.
4. **Theming:** Components must be theme-agnostic, relying on the `:root` or `[data-theme]` variables defined in `app/styles`.

## 💻 TypeScript & Code Quality

- **Strict Mode:** Always enabled. Use `readonly` for API/Prop data.
- **Interfaces over Types:** Prefer `interface` for object definitions and `type` for unions/aliases.
- **Path Aliases:** Always use `@/` for `src/` and `@/styles/` for `src/app/styles/`.
- **Polymorphism:** Use the `as` prop pattern or explicit conditional rendering (like in `Button.tsx`) for components that change their HTML tag.

## 🧪 Testing & Documentation

- **100% Coverage:** Every new atom/molecule must have unit tests covering rendering, events, and accessibility.
- **Storybook:** Every component must be documented with at least: `Default`, `States` (error, disabled), and `Sizes`.
- **Accessibility:** Follow WCAG 2.1 AA guidelines. Use ARIA roles and labels (`aria-invalid`, `role="switch"`, etc.).

## 🚀 Scaling Strategy

1. **Atoms First:** Ensure all basic building blocks exist before creating complex molecules.
2. **Aggregators:** Update `shared/ui/atoms/index.ts` (and molecules) immediately after adding a new component.
3. **DRY (Don't Repeat Yourself):** If logic is shared between 3+ components, move it to `shared/lib`.

---
**Last Updated:** 2026-03-24  
**Project:** Prismatica UI Library
