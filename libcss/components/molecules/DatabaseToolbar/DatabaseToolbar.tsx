import { useState, useCallback } from 'react';
import { FilterBar } from '../FilterBar';
import { SortMenu } from '../SortMenu';
import { GroupMenu } from '../GroupMenu';
import {
  FilterIcon,
  SortAscIcon,
  GroupIcon,
  SearchIcon,
  PlusIcon,
} from '@libcss/components/atoms/Icon';
import type { DatabaseToolbarProps } from './DatabaseToolbar.types';

/**
 * Notion-style database header toolbar.
 * Shows filter / sort / group toggles + search + "New" button.
 * BEM root: `.db-toolbar`
 */
export function DatabaseToolbar({
  title,
  icon,
  properties,
  filters,
  sorts,
  groupBy,
  searchQuery,
  onFiltersChange,
  onSortsChange,
  onGroupByChange,
  onSearchChange,
  onNewRecord,
  className,
}: DatabaseToolbarProps) {
  const [panel, setPanel] = useState<'filter' | 'sort' | 'group' | null>(null);
  const [showSearch, setShowSearch] = useState(false);

  const toggle = useCallback(
    (p: 'filter' | 'sort' | 'group') => {
      setPanel((prev) => (prev === p ? null : p));
    },
    [],
  );

  const cls = ['db-toolbar', className].filter(Boolean).join(' ');

  return (
    <div className={cls}>
      {/* Left: Title */}
      <div className="db-toolbar__left">
        {icon && <span className="db-toolbar__icon">{icon}</span>}
        <h2 className="db-toolbar__title">{title}</h2>
      </div>

      {/* Right: Actions */}
      <div className="db-toolbar__right">
        {/* Filter toggle */}
        <button
          className={[
            'db-toolbar__btn',
            filters.length > 0 && 'db-toolbar__btn--active',
          ]
            .filter(Boolean)
            .join(' ')}
          onClick={() => toggle('filter')}
          title="Filter"
        >
          <FilterIcon size="xs" /> Filter{filters.length > 0 ? ` (${filters.length})` : ''}
        </button>

        {/* Sort toggle */}
        <button
          className={[
            'db-toolbar__btn',
            sorts.length > 0 && 'db-toolbar__btn--active',
          ]
            .filter(Boolean)
            .join(' ')}
          onClick={() => toggle('sort')}
          title="Sort"
        >
          <SortAscIcon size="xs" /> Sort{sorts.length > 0 ? ` (${sorts.length})` : ''}
        </button>

        {/* Group toggle */}
        <button
          className={[
            'db-toolbar__btn',
            groupBy != null && 'db-toolbar__btn--active',
          ]
            .filter(Boolean)
            .join(' ')}
          onClick={() => toggle('group')}
          title="Group"
        >
          <GroupIcon size="xs" /> Group
        </button>

        {/* Search */}
        <button
          className="db-toolbar__btn"
          onClick={() => setShowSearch((s) => !s)}
          title="Search"
        >
          <SearchIcon size="xs" />
        </button>

        {showSearch && (
          <input
            className="db-toolbar__search"
            type="search"
            placeholder="Search…"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            autoFocus
          />
        )}

        {/* New record */}
        {onNewRecord && (
          <button className="db-toolbar__new" onClick={onNewRecord}>
            <PlusIcon size="xs" /> New
          </button>
        )}
      </div>

      {/* Panels (conditionally rendered under toolbar) */}
      {panel === 'filter' && (
        <div className="db-toolbar__panel">
          <FilterBar
            filters={filters}
            properties={properties}
            onChange={onFiltersChange}
          />
        </div>
      )}
      {panel === 'sort' && (
        <div className="db-toolbar__panel">
          <SortMenu
            sorts={sorts}
            properties={properties}
            onChange={onSortsChange}
          />
        </div>
      )}
      {panel === 'group' && (
        <div className="db-toolbar__panel">
          <GroupMenu
            groupBy={groupBy}
            properties={properties}
            onChange={onGroupByChange}
          />
        </div>
      )}
    </div>
  );
}
