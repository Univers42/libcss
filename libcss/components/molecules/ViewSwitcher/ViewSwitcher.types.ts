import type { ViewConfig } from '@libcss/common';

export interface ViewSwitcherProps {
  /** Available views. */
  views: ViewConfig[];
  /** Currently active view id. */
  activeViewId: string;
  /** Fires when user switches view. */
  onSwitch: (viewId: string) => void;
  /** Fires when user clicks the "+ Add view" button. */
  onAddView?: () => void;
  /** Additional class names. */
  className?: string;
}
