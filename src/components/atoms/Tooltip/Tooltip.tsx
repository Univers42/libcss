import { useState, useRef, useCallback } from 'react';
import type { TooltipProps } from './Tooltip.types';

export function Tooltip({
  content,
  placement = 'top',
  delay = 200,
  children,
  className,
}: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  const show = useCallback(() => {
    timer.current = setTimeout(() => setVisible(true), delay);
  }, [delay]);

  const hide = useCallback(() => {
    clearTimeout(timer.current);
    setVisible(false);
  }, []);

  return (
    <span
      className={`tooltip-wrapper${className ? ` ${className}` : ''}`}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}
      {visible && (
        <span className={`tooltip tooltip--${placement}`} role="tooltip">
          {content}
          <span className="tooltip__arrow" />
        </span>
      )}
    </span>
  );
}
