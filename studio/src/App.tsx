import React, { useState, useCallback, useEffect } from 'react';
import { DashboardShell, Chart } from '@libcss/layout';
import type { ChartConfig } from '@libcss/layout';
import {
  OverviewView,
  CategoryView,
  VariantGalleryView,
  PlaygroundView,
  ChartGalleryView,
  Sidebar,
  SearchBar,
  ThemeSwitcher,
} from '@libcss/studio';
import type { ComponentCategory, ChartGalleryItem } from '@libcss/studio';
import { GALLERY_ITEMS } from './entries/chart-gallery-data';

type ViewMode = 'overview' | 'category' | 'variants' | 'component' | 'gallery';

interface NavState {
  view: ViewMode;
  componentId: string | null;
  category: ComponentCategory | null;
  searchQuery: string;
  presetProps: Record<string, unknown> | null;
}

export default function App() {
  const [nav, setNav] = useState<NavState>({
    view: 'overview',
    componentId: null,
    category: null,
    searchQuery: '',
    presetProps: null,
  });

  const [palette, setPalette] = useState('prisma');

  useEffect(() => {
    document.documentElement.setAttribute('data-palette', palette);
  }, [palette]);

  // ── Navigation callbacks ─────────────────────

  const goToOverview = useCallback(() => {
    setNav({ view: 'overview', componentId: null, category: null, searchQuery: '', presetProps: null });
  }, []);

  const goToCategory = useCallback((category: ComponentCategory) => {
    setNav((prev) => ({ ...prev, view: 'category', category, componentId: null, searchQuery: '', presetProps: null }));
  }, []);

  const goToComponent = useCallback((id: string, category: ComponentCategory) => {
    setNav((prev) => ({ ...prev, view: 'variants', componentId: id, category, presetProps: null }));
  }, []);

  const goToPlayground = useCallback((presetProps?: Record<string, unknown>) => {
    setNav((prev) => ({ ...prev, view: 'component', presetProps: presetProps ?? null }));
  }, []);

  const goToGallery = useCallback(() => {
    setNav((prev) => ({ ...prev, view: 'gallery', componentId: null, presetProps: null }));
  }, []);

  const goBack = useCallback(() => {
    setNav((prev) => {
      if (prev.view === 'component' && prev.componentId && prev.category)
        return { ...prev, view: 'variants', presetProps: null };
      if (prev.view === 'variants' && prev.category)
        return { ...prev, view: 'category', componentId: null, presetProps: null };
      if (prev.view === 'category')
        return { view: 'overview', componentId: null, category: null, searchQuery: '', presetProps: null };
      return { view: 'overview', componentId: null, category: null, searchQuery: '', presetProps: null };
    });
  }, []);

  const setSearch = useCallback((query: string) => {
    setNav((prev) => ({ ...prev, searchQuery: query }));
  }, []);

  // ── View routing ─────────────────────────────

  const renderView = () => {
    switch (nav.view) {
      case 'category':
        return nav.category ? (
          <CategoryView
            category={nav.category}
            searchQuery={nav.searchQuery}
            onSearch={setSearch}
            onSelectComponent={goToComponent}
            onBack={goToOverview}
          />
        ) : (
          <OverviewView onSelectCategory={goToCategory} onSelectComponent={goToComponent} onOpenGallery={goToGallery} />
        );

      case 'variants':
        return nav.componentId && nav.category ? (
          <VariantGalleryView
            key={nav.componentId}
            componentId={nav.componentId}
            category={nav.category}
            onBack={goBack}
            onOpenPlayground={goToPlayground}
          />
        ) : (
          <OverviewView onSelectCategory={goToCategory} onSelectComponent={goToComponent} onOpenGallery={goToGallery} />
        );

      case 'component':
        return nav.componentId && nav.category ? (
          <PlaygroundView
            key={`${nav.componentId}-${JSON.stringify(nav.presetProps)}`}
            componentId={nav.componentId}
            category={nav.category}
            initialProps={nav.presetProps ?? undefined}
            onBack={goBack}
          />
        ) : (
          <OverviewView onSelectCategory={goToCategory} onSelectComponent={goToComponent} onOpenGallery={goToGallery} />
        );

      case 'gallery':
        return (
          <ChartGalleryView
            items={GALLERY_ITEMS as unknown as ChartGalleryItem[]}
            renderChart={(config) => React.createElement(Chart, { config: config as ChartConfig })}
            onBack={goToOverview}
          />
        );

      default:
        return (
          <OverviewView onSelectCategory={goToCategory} onSelectComponent={goToComponent} onOpenGallery={goToGallery} />
        );
    }
  };

  // ── Shell composition ────────────────────────

  return (
    <DashboardShell
      colorScheme="dark"
      sidebarWidth="272px"
      brand={
        <button type="button" className="app-brand" onClick={goToOverview}>
          <span className="app-brand__icon">◎</span>
          libcss
          <span className="app-brand__badge">studio</span>
        </button>
      }
      nav={
        <Sidebar
          activeCategory={nav.category}
          activeComponentId={nav.componentId}
          onSelectCategory={goToCategory}
          onSelectComponent={goToComponent}
          onOverviewClick={goToOverview}
          isOverview={nav.componentId === null && nav.category === null}
        />
      }
      header={
        <>
          <div className="app-search">
            <SearchBar value={nav.searchQuery} onChange={setSearch} />
          </div>
          <ThemeSwitcher active={palette} onChange={setPalette} />
        </>
      }
    >
      {renderView()}
    </DashboardShell>
  );
}
