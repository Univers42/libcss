# LanguageSelector

dropdown language picker — with flag emojis and a dropdown menu.

## usage

```tsx
<LanguageSelector
  languages={[
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'ja', label: '日本語', flag: '🇯🇵' },
  ]}
  current="en"
  onChange={(code) => setLocale(code)}
/>
```

## file structure

```
LanguageSelector/
├── index.ts
├── model/
│   ├── LanguageSelector.constants.ts
│   └── LanguageSelector.types.ts
└── ui/
    ├── LanguageSelector.tsx      # main component
    ├── LanguageOption.tsx         # individual option row
    └── useLanguageSelector.ts    # open/close state hook
```

## things to remember

- uses ARIA menu pattern (role="menu", role="menuitem")
- the `useLanguageSelector` hook manages open/close state + keyboard navigation
- generic over the language code type — so you can use string literals, enums, or whatever
- dropdown closes on outside click and Escape key
- `LanguageOption` renders: flag emoji + language name + language code
