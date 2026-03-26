import { PlusIcon, ImageIcon } from '@libcss/components/atoms/Icon';
import type { DatabaseViewProps } from '../types';
import { displayValue } from '../types';

/**
 * Gallery view — card grid with optional cover image.
 * BEM root: `.db-gallery`
 */
export function GalleryView({
  schema,
  records,
  visibleProperties,
  viewConfig,
  onAddRecord,
}: DatabaseViewProps) {
  const primaryProp = schema.primaryProperty;
  const coverProp = viewConfig?.galleryOptions?.coverProperty;
  const cardSize = viewConfig?.galleryOptions?.cardSize ?? 'md';

  const cardProps = viewConfig?.galleryOptions?.cardProperties
    ? visibleProperties.filter((p) =>
        viewConfig.galleryOptions!.cardProperties!.includes(p.id),
      )
    : visibleProperties
        .filter((p) => p.id !== primaryProp && p.id !== coverProp)
        .slice(0, 3);

  // Build size modifier — SCSS has `--large`
  const sizeMod = cardSize === 'lg' ? 'db-gallery--large' : '';

  return (
    <div className={`db-gallery ${sizeMod}`.trim()}>
      {records.map((record) => {
        const coverVal = coverProp ? record.values[coverProp] : null;
        const coverUrl =
          typeof coverVal === 'string'
            ? coverVal
            : coverVal && typeof coverVal === 'object' && 'url' in coverVal
              ? (coverVal as { url: string }).url
              : null;

        return (
          <div className="db-gallery__card" key={record.id}>
            {/* Cover image or placeholder */}
            {coverUrl ? (
              <div
                className="db-gallery__cover"
                style={{
                  backgroundImage: `url(${coverUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  height: 140,
                }}
              />
            ) : (
              <div
                className="db-gallery__cover db-gallery__cover--placeholder"
                style={{
                  height: 140,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'var(--db-header-bg)',
                }}
              >
                <ImageIcon size="lg" />
              </div>
            )}

            {/* Card body — matches SCSS __card-body */}
            <div className="db-gallery__card-body">
              <div className="db-gallery__card-title">
                {displayValue(record.values[primaryProp])}
              </div>

              {/* Card meta props — matches SCSS __card-meta */}
              <div className="db-gallery__card-meta">
                {cardProps.map((prop) => {
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
          </div>
        );
      })}

      {/* Add card */}
      <div
        className="db-gallery__card db-gallery__card--add"
        onClick={onAddRecord}
        style={{ cursor: 'pointer' }}
      >
        <div
          className="db-gallery__card-body"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: 8,
            opacity: 0.5,
          }}
        >
          <PlusIcon size="lg" />
          <span>New page</span>
        </div>
      </div>
    </div>
  );
}
