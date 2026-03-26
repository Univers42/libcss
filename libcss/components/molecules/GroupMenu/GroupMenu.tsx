import type { GroupMenuProps } from './GroupMenu.types';

/**
 * Dropdown to select a group-by property.
 * BEM root: `.group-menu`
 */
export function GroupMenu({
  groupBy,
  properties,
  onChange,
  className,
}: GroupMenuProps) {
  const cls = ['group-menu', className].filter(Boolean).join(' ');

  return (
    <div className={cls}>
      <div className="group-menu__header">
        <span className="group-menu__title">Group by</span>
      </div>

      <select
        className="group-menu__select"
        value={groupBy?.property ?? ''}
        onChange={(e) => {
          const val = e.target.value;
          if (!val) {
            onChange(undefined);
          } else {
            onChange({
              property: val,
              sort: groupBy?.sort,
              showEmpty: groupBy?.showEmpty ?? true,
            });
          }
        }}
      >
        <option value="">None</option>
        {properties.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>

      {groupBy && (
        <div className="group-menu__options">
          <label className="group-menu__option">
            <span>Sort groups</span>
            <select
              className="group-menu__sort"
              value={groupBy.sort ?? 'asc'}
              onChange={(e) =>
                onChange({ ...groupBy, sort: e.target.value as 'asc' | 'desc' })
              }
            >
              <option value="asc">A → Z</option>
              <option value="desc">Z → A</option>
            </select>
          </label>

          <label className="group-menu__option">
            <input
              type="checkbox"
              checked={groupBy.showEmpty !== false}
              onChange={(e) =>
                onChange({ ...groupBy, showEmpty: e.target.checked })
              }
            />
            <span>Show empty groups</span>
          </label>
        </div>
      )}
    </div>
  );
}
