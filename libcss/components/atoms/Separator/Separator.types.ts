export type SeparatorVariant = 'solid' | 'dashed' | 'dotted' | 'gradient' | 'accent';
export type SeparatorSpacing = 'compact' | 'default' | 'wide';

export interface SeparatorProps {
  readonly variant?: SeparatorVariant;
  readonly spacing?: SeparatorSpacing;
  readonly thick?: boolean;
  readonly className?: string;
}
