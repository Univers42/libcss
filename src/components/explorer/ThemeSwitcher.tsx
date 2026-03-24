/**
 * @file ThemeSwitcher
 * @description Palette selector for the global UI theme.
 * Renders a row of gradient dots in the header — each represents
 * a palette from the chart color system, applied to the entire interface.
 */

interface PaletteTheme {
  id: string;
  label: string;
  colors: [string, string];
}

const THEMES: PaletteTheme[] = [
  { id: 'prisma',     label: 'Prisma',     colors: ['#6366f1', '#06b6d4'] },
  { id: 'sunset',     label: 'Sunset',     colors: ['#f97316', '#ef4444'] },
  { id: 'ocean',      label: 'Ocean',      colors: ['#0891b2', '#0ea5e9'] },
  { id: 'forest',     label: 'Forest',     colors: ['#059669', '#65a30d'] },
  { id: 'neon',       label: 'Neon',       colors: ['#22d3ee', '#a78bfa'] },
  { id: 'earth',      label: 'Earth',      colors: ['#d97706', '#92400e'] },
  { id: 'pastel',     label: 'Pastel',     colors: ['#a78bfa', '#f9a8d4'] },
  { id: 'monochrome', label: 'Mono',       colors: ['#94a3b8', '#64748b'] },
  { id: 'corporate',  label: 'Corporate',  colors: ['#1e3a5f', '#0d9488'] },
  { id: 'contrast',   label: 'Contrast',   colors: ['#2563eb', '#dc2626'] },
];

interface ThemeSwitcherProps {
  active: string;
  onChange: (id: string) => void;
}

export function ThemeSwitcher({ active, onChange }: ThemeSwitcherProps) {
  return (
    <div className="theme-switcher" role="radiogroup" aria-label="Color theme">
      <span className="theme-switcher__label">Theme</span>
      {THEMES.map((t) => (
        <button
          key={t.id}
          type="button"
          className={`theme-switcher__dot${active === t.id ? ' theme-switcher__dot--active' : ''}`}
          onClick={() => onChange(t.id)}
          title={t.label}
          role="radio"
          aria-checked={active === t.id}
          aria-label={t.label}
          style={{
            background: `linear-gradient(135deg, ${t.colors[0]}, ${t.colors[1]})`,
          }}
        />
      ))}
    </div>
  );
}
