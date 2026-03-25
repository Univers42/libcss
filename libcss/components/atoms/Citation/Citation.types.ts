import type { ReactNode } from 'react';

export interface CitationRef {
  readonly id: string;
  readonly number: number;
  readonly content: ReactNode;
  readonly url?: string;
}

export interface CitationMarkerProps {
  readonly number: number;
  readonly href?: string;
  readonly className?: string;
}

export interface CitationReferencesProps {
  readonly references: readonly CitationRef[];
  readonly title?: string;
  readonly className?: string;
}
