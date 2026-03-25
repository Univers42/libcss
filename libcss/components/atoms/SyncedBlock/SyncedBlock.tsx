import type { JSX } from 'react';
import { cn } from '../../lib/cn';
import { SYNCED_BLOCK_LABEL } from './SyncedBlock.constants';
import type { SyncedBlockProps } from './SyncedBlock.types';

export function SyncedBlock({
  sourceId,
  editing = false,
  children,
  className = '',
}: SyncedBlockProps): JSX.Element {
  const classes = cn('prisma-synced-block', editing && 'prisma-synced-block--editing', className);

  return (
    <div className={classes} data-source-id={sourceId}>
      <span className="prisma-synced-block__indicator">
        <span className="prisma-synced-block__indicator-dot" />
        {SYNCED_BLOCK_LABEL}
      </span>
      <div className="prisma-synced-block__content">{children}</div>
    </div>
  );
}
