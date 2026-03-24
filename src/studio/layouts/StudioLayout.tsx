/**
 * @file StudioLayout
 * @description Main shell layout for the studio app.
 * Uses the `.studio` CSS grid (header + sidebar + main).
 */

import { useState } from 'react';
import type { ReactNode } from 'react';
import type { ComponentCategory } from '../core/types';
import { Sidebar } from '../components/Sidebar';
import { SearchBar } from '../components/SearchBar';
import { ThemeSwitcher } from '../components/ThemeSwitcher';

interface StudioLayoutProps {
  children: ReactNode;
  searchQuery: string;
  onSearch: (query: string) => void;
  onLogoClick: () => void;
  activeCategory: ComponentCategory | null;
  activeComponentId: string | null;
  onSelectCategory: (category: ComponentCategory) => void;
  onSelectComponent: (id: string, category: ComponentCategory) => void;
  palette: string;
  onPaletteChange: (palette: string) => void;
}

export function StudioLayout({
  children,
  searchQuery,
  onSearch,
  onLogoClick,
  activeCategory,
  activeComponentId,
  onSelectCategory,
  onSelectComponent,
  palette,
  onPaletteChange,
}: StudioLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="studio">
      {/* ── Header ─────────────────────────────── */}
      <header className="studio__header">
        <button
          type="button"
          className="studio__hamburger"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle sidebar"
        >
          ☰
        </button>

        <button
          type="button"
          className="studio__logo"
          onClick={onLogoClick}
          aria-label="Go to overview"
        >
          <span className="studio__logo-icon">◎</span>
          <span className="studio__logo-text">libcss</span>
          <span className="studio__logo-badge">studio</span>
        </button>

        <div className="studio__search">
          <SearchBar value={searchQuery} onChange={onSearch} />
        </div>

        <div className="studio__nav">
          <ThemeSwitcher active={palette} onChange={onPaletteChange} />
        </div>
      </header>

      {/* ── Sidebar ────────────────────────────── */}
      <aside className={`studio__sidebar${mobileOpen ? ' studio__sidebar--open' : ''}`}>
        <Sidebar
          activeCategory={activeCategory}
          activeComponentId={activeComponentId}
          onSelectCategory={onSelectCategory}
          onSelectComponent={onSelectComponent}
          onOverviewClick={onLogoClick}
          isOverview={activeComponentId === null && activeCategory === null}
        />
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="studio__overlay studio__overlay--visible"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ── Main content ───────────────────────── */}
      <main className="studio__main">{children}</main>
    </div>
  );
}
