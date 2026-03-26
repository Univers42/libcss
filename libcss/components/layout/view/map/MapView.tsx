import { MapPinIcon, GlobeIcon } from '@libcss/components/atoms/Icon';
import type { DatabaseViewProps } from '../types';
import { displayValue } from '../types';

/**
 * Map view — placeholder with address listing.
 * A real implementation would use Mapbox/Leaflet.
 * BEM root: `.db-map`
 */
export function MapView({
  schema,
  records,
}: DatabaseViewProps) {
  const primaryProp = schema.primaryProperty;
  const placeProp = schema.properties.find(
    (p) => p.type === 'place' || p.type === 'text',
  )?.id;

  return (
    <div className="db-map">
      <div className="db-map__placeholder">
        <span className="db-map__icon"><GlobeIcon size="xl" /></span>
        <p className="db-map__text">
          Map view requires a mapping library (Mapbox / Leaflet).
        </p>
        <p className="db-map__text">
          Showing {records.length} records with location data:
        </p>
      </div>

      <div className="db-map__list">
        {records.map((record) => (
          <div className="db-map__item" key={record.id}>
            <span className="db-map__pin"><MapPinIcon size="sm" /></span>
            <span className="db-map__label">
              {displayValue(record.values[primaryProp])}
            </span>
            {placeProp && (
              <span className="db-map__address">
                {displayValue(record.values[placeProp])}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
