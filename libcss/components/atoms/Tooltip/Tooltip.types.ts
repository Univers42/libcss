export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';
export interface TooltipProps {
  content: React.ReactNode;
  placement?: TooltipPlacement;
  delay?: number;
  children: React.ReactElement;
  className?: string;
}
