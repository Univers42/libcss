import { VIEW_TYPE_META } from '@libcss/common';
import type { ViewType } from '@libcss/common';
import {
  TableIcon,
  BoardIcon,
  TimelineIcon,
  CalendarIcon,
  ListIcon,
  GalleryIcon,
  ChartBarIcon,
  FeedIcon,
  MapPinIcon,
  DashboardIcon,
  PlusIcon,
} from '@libcss/components/atoms/Icon';
import type { BaseIconProps } from '@libcss/components/atoms/Icon';
import type { ViewSwitcherProps } from './ViewSwitcher.types';

/** Map view type key → SVG icon component. */
const VIEW_ICONS: Record<ViewType, React.ComponentType<BaseIconProps>> = {
  table:     TableIcon,
  board:     BoardIcon,
  timeline:  TimelineIcon,
  calendar:  CalendarIcon,
  list:      ListIcon,
  gallery:   GalleryIcon,
  chart:     ChartBarIcon,
  feed:      FeedIcon,
  map:       MapPinIcon,
  dashboard: DashboardIcon,
};

/**
 * Notion-style view tab bar with SVG icons and an optional "+ Add view" button.
 * BEM root: `.view-switcher`
 */
export function ViewSwitcher({
  views,
  activeViewId,
  onSwitch,
  onAddView,
  className,
}: ViewSwitcherProps) {
  const cls = ['view-switcher', className].filter(Boolean).join(' ');

  return (
    <nav className={cls} role="tablist" aria-label="Database views">
      {views.map((view) => {
        const meta = VIEW_TYPE_META[view.type];
        const IconComp = VIEW_ICONS[view.type] ?? TableIcon;
        const isActive = view.id === activeViewId;
        return (
          <button
            key={view.id}
            role="tab"
            aria-selected={isActive}
            className={[
              'view-switcher__tab',
              isActive && 'view-switcher__tab--active',
            ]
              .filter(Boolean)
              .join(' ')}
            onClick={() => onSwitch(view.id)}
            title={`${meta?.label ?? view.type}: ${view.name}`}
          >
            <span className="view-switcher__icon"><IconComp size="xs" /></span>
            <span className="view-switcher__label">{view.name}</span>
          </button>
        );
      })}
      {onAddView && (
        <button
          className="view-switcher__add"
          onClick={onAddView}
          aria-label="Add view"
          title="Add a view"
        >
          <PlusIcon size="xs" />
        </button>
      )}
    </nav>
  );
}
