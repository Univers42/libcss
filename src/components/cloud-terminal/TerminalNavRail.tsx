import type { ReactNode } from 'react';
import { cn } from '../lib/cn';

export interface NavRailItem {
  id: string;
  icon: ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export interface TerminalNavRailProps {
  items: NavRailItem[];
  brand?: ReactNode;
  footer?: ReactNode;
  collapsed?: boolean;
  className?: string;
}

/**
 * Fixed left navigation rail (icon-only).
 * Uses prisma tokens for sizing & colours.
 * Supports collapsible mode with smooth animation.
 */
export function TerminalNavRail({
  items,
  brand,
  footer,
  collapsed = false,
  className = '',
}: Readonly<TerminalNavRailProps>) {
  return (
    <nav className={cn('ct-navrail', collapsed && 'ct-navrail--collapsed', className)}>
      {brand && <div className="ct-navrail__brand">{brand}</div>}
      <div className="ct-navrail__items">
        {items.map((item) => (
          <button
            key={item.id}
            className={cn('ct-navrail__btn', item.active && 'ct-navrail__btn--active')}
            onClick={item.onClick}
            title={item.label}
            aria-label={item.label}
            type="button"
          >
            {item.icon}
          </button>
        ))}
      </div>
      {footer && <div className="ct-navrail__footer">{footer}</div>}
    </nav>
  );
}
