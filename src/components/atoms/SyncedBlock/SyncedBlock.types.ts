import type { ReactNode } from 'react';

export interface SyncedBlockProps {
  readonly sourceId: string;
  readonly editing?: boolean;
  readonly children: ReactNode;
  readonly className?: string;
}
