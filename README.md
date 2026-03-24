# Prismatica UI

Prismatica UI is a high-performance, scalable, and polymorphic React component library built with **Feature-Sliced Design (FSD)** and **Atomic Design** principles. It serves as the core design system for the Prismatica ecosystem, ensuring visual consistency and technical excellence across projects.

## 🚀 Vision & Goal

The goal is to create a comprehensive, framework-agnostic-style library (like Bootstrap or Tailwind) but encapsulated in React components. It provides:
- **Consistency:** Unified design tokens for colors, typography, and spacing.
- **Scalability:** A modular architecture that grows without technical debt.
- **Developer Experience:** Total documentation via Storybook and 100% type safety with TypeScript.

## 🏗️ Architecture & Design Philosophy

### Feature-Sliced Design (FSD)
We follow the FSD methodology to organize our codebase into logical layers:
- **Shared:** The foundation. Contains the UI library (atoms, molecules), global styles, and generic helpers.
- **Entities:** Business entities (e.g., User, Product).
- **Features:** User interactions (e.g., AuthForm, SearchBar).
- **Widgets:** Complex compositions (e.g., Navbar, Footer).
- **Pages:** Full views.
- **App:** Global configuration (providers, styles).

### Atomic Design Fusion
Inside the `Shared/UI` layer, we categorize components following Atomic Design:
1. **Atoms:** The smallest building blocks (Button, Input, Spinner).
2. **Molecules:** Groups of atoms functioning together (FormField, LanguageSelector).
3. **Organisms:** Complex UI sections (to be implemented).

## 🛠️ Tech Stack

- **Framework:** React 18 (TypeScript)
- **Build Tool:** Vite
- **Styling:** SCSS Modules with Design Tokens
- **Documentation:** Storybook 8
- **Testing:** Vitest & React Testing Library
- **Icons:** Lucide React & Custom SVGs

## 📂 Component Blueprint

Every component in Prismatica UI follows a strict 6-file structure to ensure isolation and maintainability:

```text
Component/
├── index.ts                 # Public API
├── Component.module.scss    # Scoped Styles
├── model/
│   └── Component.types.ts   # TypeScript Interfaces
└── ui/
    ├── Component.tsx        # React Implementation
    ├── Component.stories.ts # Storybook Documentation
    └── Component.spec.tsx   # Unit Tests
```

## 🚦 Current Status

### Implemented Atoms
- [x] **Button:** Polymorphic (supports Link, Anchor, and Button).
- [x] **Input:** Controlled/Uncontrolled text input with error states.
- [x] **Checkbox:** Accessible binary selection.
- [x] **Spinner:** Visual loading feedback.
- [x] **ThemeToggle:** Dark/Light mode orchestrator.
- [x] **BrandLogo:** Brand identity component.
- [x] **StrengthBar:** Visual password strength indicator.

### Implemented Molecules
- [x] **FormField:** Wrapper for inputs with labels and error messages.
- [x] **LanguageSelector:** Accessible dropdown for i18n.
- [x] **SocialButton:** Specialized buttons for OAuth.

## 🛠️ Development

### Installation
```bash
npm install
```

### Run Storybook (Documentation)
```bash
npm run storybook
```

### Run Tests
```bash
npm test
```

## 🗺️ Roadmap

1. **Phase 1: Foundation (Done)** - Infrastructure, path aliases, and basic atoms.
2. **Phase 2: Form Expansion (Current)** - Completing all form-related atoms (Select, Switch, Radio).
3. **Phase 3: Feedback & Data (Pending)** - Adding Badge, Tooltip, Modal, and Skeleton.
4. **Phase 4: Library Export** - Configuring Vite for library mode to publish via NPM.

---
**Author:** serjimen  
**Version:** 1.0.0
