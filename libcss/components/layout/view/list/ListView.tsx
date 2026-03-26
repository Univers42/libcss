import { PlusIcon } from '@libcss/components/atoms/Icon';
import type { DatabaseViewProps } from '../types';
import { displayValue } from '../types';

/**
 * List view — simple rows with title and a few props.
 * BEM root: `.db-list`
 */
export function ListView({
  schema,
  records,
  visibleProperties,
  onAddRecord,
}: DatabaseViewProps) {
  const primaryProp = schema.primaryProperty;
  const secondaryProps = visibleProperties
    .filter((p) => p.id !== primaryProp)
    .slice(0, 4);

  return (
    <div className="db-list">
      {records.map((record) => (
        <div className="db-list__item" key={record.id}>
          <div className="db-list__title">
            {displayValue(record.values[primaryProp])}
          </div>
          <div className="db-list__props">
            {secondaryProps.map((prop) => {
              const val = record.values[prop.id];
              if (val == null || val === '') return null;
              return (
                <span key={prop.id}>
                  {displayValue(val, prop)}
                </span>
              );
            })}
          </div>
        </div>
      ))}

      <button className="db-list__add-btn" onClick={onAddRecord}>
        <PlusIcon size="xs" /> New
      </button>
    </div>
  );
}
