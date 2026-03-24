export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type SpinnerVariant = 'primary' | 'secondary' | 'white' | 'current';

export interface SpinnerProps {
  readonly size?: SpinnerSize;
  readonly variant?: SpinnerVariant;
  readonly className?: string;
  readonly label?: string;
}
