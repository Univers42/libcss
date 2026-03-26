import { useState, useMemo, useCallback, useRef } from 'react';
import { useDatabaseEngine, useViewManager } from '@libcss/hooks';
import { ViewSwitcher } from '@libcss/components/molecules/ViewSwitcher';
import { DatabaseToolbar } from '@libcss/components/molecules/DatabaseToolbar';
import {
  RocketIcon,
  UserIcon,
  PackageIcon,
  CalendarDateIcon,
  DatabaseIcon,
} from '@libcss/components/atoms/Icon';
import type { DatabaseSource, DatabaseRecord, ViewType } from '@libcss/common';

import {
  TableView,
  BoardView,
  ListView,
  GalleryView,
  CalendarView,
  TimelineView,
  ChartView,
  FeedView,
  MapView,
  DashboardView,
} from '@libcss/components/layout/view';

import projectTracker from '@libcss/common/mockups/project-tracker.json';
import crmContacts from '@libcss/common/mockups/crm-contacts.json';
import productCatalog from '@libcss/common/mockups/product-catalog.json';
import contentCalendar from '@libcss/common/mockups/content-calendar.json';

// ── Dataset catalogue ──

interface DatasetEntry {
  key: string;
  label: string;
  icon: React.ComponentType<{ size?: string; className?: string }>;
  source: DatabaseSource;
}

const DATASETS: DatasetEntry[] = [
  { key: 'project-tracker', label: 'Project Tracker', icon: RocketIcon,       source: projectTracker as unknown as DatabaseSource },
  { key: 'crm-contacts',    label: 'CRM Contacts',    icon: UserIcon,         source: crmContacts    as unknown as DatabaseSource },
  { key: 'product-catalog', label: 'Product Catalog',  icon: PackageIcon,      source: productCatalog as unknown as DatabaseSource },
  { key: 'content-calendar', label: 'Content Calendar', icon: CalendarDateIcon, source: contentCalendar as unknown as DatabaseSource },
];

// ── View renderer map ──

const VIEW_COMPONENTS: Record<ViewType, React.ComponentType<any>> = {
  table:     TableView,
  board:     BoardView,
  list:      ListView,
  gallery:   GalleryView,
  calendar:  CalendarView,
  timeline:  TimelineView,
  chart:     ChartView,
  feed:      FeedView,
  map:       MapView,
  dashboard: DashboardView,
};

// ── Persist helper: debounced PUT to /api/database/:key ──

function usePersist(datasetKey: string, source: DatabaseSource) {
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);
  const sourceRef = useRef(source);
  sourceRef.current = source;

  return useCallback(
    (records: DatabaseRecord[]) => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        const body = JSON.stringify(
          { ...sourceRef.current, records },
          null,
          2,
        );
        fetch(`/api/database/${encodeURIComponent(datasetKey)}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body,
        }).catch((err) => console.warn('[persist] failed:', err));
      }, 300);
    },
    [datasetKey],
  );
}

// ── Database page (inner) ──

function DatabasePage({ source, datasetKey }: { source: DatabaseSource; datasetKey: string }) {
  const onMutate = usePersist(datasetKey, source);
  const engine = useDatabaseEngine({ source, onMutate });
  const viewMgr = useViewManager({ source });

  // Sync view-level filters/sorts/groupBy when switching views
  const handleSwitchView = useCallback(
    (viewId: string) => {
      viewMgr.switchView(viewId);
      const view = viewMgr.views.find((v) => v.id === viewId);
      if (view) {
        engine.setFilters(view.filters ?? []);
        engine.setSorts(view.sorts ?? []);
        engine.setGroupBy(view.groupBy);
      }
    },
    [viewMgr, engine],
  );

  const handleAddView = useCallback(() => {
    const id = `v${Date.now()}`;
    viewMgr.addView({
      id,
      name: 'New view',
      type: 'table',
      propertyVisibility: Object.fromEntries(
        engine.schema.properties.map((p) => [p.id, true]),
      ),
      filters: [],
      sorts: [],
      conditionalColors: [],
    });
  }, [viewMgr, engine.schema]);

  const activeView = viewMgr.activeView;
  const ViewComponent = activeView ? VIEW_COMPONENTS[activeView.type] : VIEW_COMPONENTS.table;

  // Visible properties for the active view
  const visibleProperties = useMemo(() => {
    if (!activeView) return engine.schema.properties.slice();
    return engine.schema.properties.filter(
      (p) => activeView.propertyVisibility[p.id] !== false,
    );
  }, [activeView, engine.schema.properties]);

  return (
    <>
      {/* View tab bar */}
      <ViewSwitcher
        views={viewMgr.views}
        activeViewId={viewMgr.activeViewId}
        onSwitch={handleSwitchView}
        onAddView={handleAddView}
      />

      {/* Toolbar: filter / sort / group / search / + New */}
      <DatabaseToolbar
        title={engine.schema.name}
        icon={engine.schema.icon}
        properties={[...engine.schema.properties]}
        filters={engine.filters}
        sorts={engine.sorts}
        groupBy={engine.groupBy}
        searchQuery={engine.searchQuery}
        onFiltersChange={engine.setFilters}
        onSortsChange={engine.setSorts}
        onGroupByChange={engine.setGroupBy}
        onSearchChange={engine.setSearchQuery}
        onNewRecord={() => engine.addRecord()}
      />

      {/* Active view */}
      <div className="app-content">
        {ViewComponent && (
          <ViewComponent
            schema={engine.schema}
            records={engine.processed}
            groups={engine.groups}
            visibleProperties={visibleProperties}
            viewConfig={activeView}
            onCellChange={engine.updateCell}
            onAddRecord={() => engine.addRecord()}
            onDeleteRecord={engine.deleteRecord}
          />
        )}
      </div>
    </>
  );
}

// ── App shell ──

export default function App() {
  const [activeDataset, setActiveDataset] = useState(DATASETS[0].key);

  const dataset = useMemo(
    () => DATASETS.find((d) => d.key === activeDataset)!,
    [activeDataset],
  );

  return (
    <div className="app-shell">
      {/* Sidebar */}
      <nav className="app-sidebar">
        <div className="app-sidebar__title">
          <DatabaseIcon size="sm" /> Databases
        </div>
        {DATASETS.map((ds) => {
          const IconComp = ds.icon;
          return (
            <button
              key={ds.key}
              className={[
                'app-sidebar__item',
                ds.key === activeDataset && 'app-sidebar__item--active',
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={() => setActiveDataset(ds.key)}
            >
              <span className="app-sidebar__icon"><IconComp size="sm" /></span>
              {ds.label}
            </button>
          );
        })}
      </nav>

      {/* Main content — keyed so it remounts on dataset change */}
      <main className="app-main">
        <DatabasePage key={dataset.key} source={dataset.source} datasetKey={dataset.key} />
      </main>
    </div>
  );
}
