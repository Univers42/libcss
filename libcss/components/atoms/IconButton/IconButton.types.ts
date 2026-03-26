export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** The icon element (SVG, emoji, or ReactNode). */
  icon: React.ReactNode;
  /** Accessible label — required when no visible text. */
  'aria-label': string;
  /** Size variant. */
  size?: 'xs' | 'sm' | 'md';
  /** Visual variant. */
  variant?: 'ghost' | 'subtle' | 'solid';
  /** Tooltip text (shown via title for simplicity). */
  tooltip?: string;
  /** Additional class names. */
  className?: string;
}
