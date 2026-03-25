# src/hooks/

reusable React hooks. some are general-purpose (debounce, throttle), some are studio-specific (navigation, component state, search).

## general-purpose hooks

| hook | what it does |
|------|-------------|
| `useClickOutside` | fires a callback when the user clicks outside a ref'd element. great for dropdowns, modals, popups. |
| `useDebounce` | returns a debounced version of a value — waits until the user stops typing/changing for X ms before updating. |
| `useThrottle` | returns a throttled value — updates at most once every X ms. good for scroll/resize handlers. |
| `useMediaQuery` | returns `true`/`false` for a media query string. useful for responsive logic in JS. |
| `useBreakpoint` | returns the current breakpoint name (`xs`, `sm`, `md`, `lg`, `xl`, `2xl`) based on window width. |
| `useLocalStorage` | like `useState` but persisted to localStorage. survives page refresh. |

## studio-specific hooks

| hook | what it does |
|------|-------------|
| `useStudioNavigation` | state machine for the component explorer — manages view/category/component/search transitions. |
| `useComponentState` | manages the live prop state for a component in the playground — tracks defaults + overrides. |
| `useSearch` | generic search hook — takes a search function, returns query/results/handler. |

## usage examples

```tsx
import { useDebounce, useClickOutside, useBreakpoint } from '@libcss/hooks';

// debounce a search input
const [query, setQuery] = useState('');
const debouncedQuery = useDebounce(query, 300);

// close a dropdown on outside click
const ref = useRef(null);
useClickOutside(ref, () => setOpen(false));

// responsive logic
const bp = useBreakpoint();
const isMobile = bp === 'xs' || bp === 'sm';
```

## things to remember

- the general-purpose hooks can be used in any React project, they have no libcss dependencies
- studio hooks depend on core types (`ComponentCategory`, `StudioState`, etc.)
- `useBreakpoint` uses `useMediaQuery` internally — the breakpoint values match the SCSS token breakpoints
- all hooks are exported from `index.ts` — import from `'@libcss/hooks'` or `'../hooks'`
