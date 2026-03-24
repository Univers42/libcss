import type { JSX } from 'react';
import { cn } from '../../lib/cn';
import { DEFAULT_CITATION_TITLE } from './Citation.constants';
import type { CitationMarkerProps, CitationReferencesProps } from './Citation.types';

export function CitationMarker({
  number,
  href,
  className = '',
}: CitationMarkerProps): JSX.Element {
  return (
    <a
      className={cn('prisma-citation__marker', className)}
      href={href ?? `#ref-${number}`}
    >
      {number}
    </a>
  );
}

export function CitationReferences({
  references,
  title = DEFAULT_CITATION_TITLE,
  className = '',
}: CitationReferencesProps): JSX.Element {
  return (
    <div className={cn('prisma-citation', className)}>
      <div className="prisma-citation__references">
        <div className="prisma-citation__references-title">{title}</div>
        {references.map((ref) => (
          <div key={ref.id} id={`ref-${ref.number}`} className="prisma-citation__ref">
            <span className="prisma-citation__ref-number">{ref.number}.</span>
            <div className="prisma-citation__ref-content">
              {ref.content}
              {ref.url && (
                <>
                  {' '}
                  <a className="prisma-citation__ref-link" href={ref.url} target="_blank" rel="noopener noreferrer">
                    ↗
                  </a>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
