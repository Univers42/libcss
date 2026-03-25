export type ChipVariant = 'filled' | 'outlined' | 'ghost';
export type ChipColor = 'default' | 'primary' | 'success' | 'warning' | 'danger';

export interface ChipProps {
  label: string;
  variant?: ChipVariant;
  color?: ChipColor;
  icon?: React.ReactNode;
  removable?: boolean;
  onRemove?: () => void;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}
