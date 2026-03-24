import { useState, useCallback, useEffect } from 'react';
import { StudioLayout } from '@libcss/studio';
import type { ComponentCategory } from '@libcss/studio';
import { OverviewView } from './views/CatalogView';
import { CategoryView } from './views/CategoryView';
import { VariantGalleryView } from './views/VariantGalleryView';
import { PlaygroundView } from './views/PlaygroundView';
import { ChartGalleryView } from './views/ChartGalleryView';

type ViewMode = 'overview' | 'category' | 'variants' | 'component' | 'gallery';

interface NavState {
  view: ViewMode;
  componentId: string | null;
  category: ComponentCategory | null;
  searchQuery: string;
  /** Props to pre-load when opening playground from a variant card. */
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
    setNav((prev) => ({
      ...prev,
      view: 'category',
      category,
      componentId: null,
      searchQuery: '',
      presetProps: null,
    }));
  }, []);

  /**
   * When a component is selected, open the variant gallery (if it has presets/dimensions).
   * The variant gallery is the new "detail view" for a component.
   */
  const goToComponent = useCallback((id: string, category: ComponentCategory) => {
    setNav((prev) => ({
      ...prev,
      view: 'variants',
      componentId: id,
      category,
      presetProps: null,
    }));
  }, []);

  /** Open the single-component playground, optionally with preset props. */
  const goToPlayground = useCallback((presetProps?: Record<string, unknown>) => {
    setNav((prev) => ({
      ...prev,
      view: 'component',
      presetProps: presetProps ?? null,
    }));
  }, []);

  const goToGallery = useCallback(() => {
    setNav((prev) => ({ ...prev, view: 'gallery', componentId: null, presetProps: null }));
  }, []);

  const goBack = useCallback(() => {
    setNav((prev) => {
      // playground → variant gallery
      if (prev.view === 'component' && prev.componentId && prev.category) {
        return { ...prev, view: 'variants', presetProps: null };
      }
      // variant gallery → category
      if (prev.view === 'variants' && prev.category) {
        return { ...prev, view: 'category', componentId: null, presetProps: null };
      }
      // category → overview
      if (prev.view === 'category') {
        return { view: 'overview', componentId: null, category: null, searchQuery: '', presetProps: null };
      }
      // gallery → overview
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
          <OverviewView
            onSelectCategory={goToCategory}
            onSelectComponent={goToComponent}
            onOpenGallery={goToGallery}
          />
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
          <OverviewView
            onSelectCategory={goToCategory}
            onSelectComponent={goToComponent}
            onOpenGallery={goToGallery}
          />
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
          <OverviewView
            onSelectCategory={goToCategory}
            onSelectComponent={goToComponent}
            onOpenGallery={goToGallery}
          />
        );

      case 'gallery':
        return <ChartGalleryView onBack={goToOverview} />;

      default:
        return (
          <OverviewView
            onSelectCategory={goToCategory}
            onSelectComponent={goToComponent}
            onOpenGallery={goToGallery}
          />
        );
    }
  };

  return (
    <StudioLayout
      searchQuery={nav.searchQuery}
      onSearch={setSearch}
      onLogoClick={goToOverview}
      activeCategory={nav.category}
      activeComponentId={nav.componentId}
      onSelectCategory={goToCategory}
      onSelectComponent={goToComponent}
      palette={palette}
      onPaletteChange={setPalette}
    >
      {renderView()}
    </StudioLayout>
  );
}
