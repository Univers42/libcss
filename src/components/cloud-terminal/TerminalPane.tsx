/**
 * @file TerminalPane.tsx
 * @description A single terminal pane — wraps useXterm, provides
 * its own xterm.js instance + socket.io connection.
 *
 * Each pane is a fully independent terminal session.
 */

import { useEffect } from 'react';
import { cn } from '../lib/cn';
import { useXterm, type UseXtermOptions } from './useXterm';
import type { TerminalThemeColors } from './CloudTerminal.types';

export interface TerminalPaneProps {
  /** Unique tab ID this pane renders for */
  readonly tabId: string;
  /** Whether this pane is currently visible (active tab) */
  readonly visible: boolean;
  /** Whether this pane's group is focused */
  readonly focused: boolean;
  /** Socket URL override */
  readonly socketUrl?: string;
  /** Font size */
  readonly fontSize?: number;
  /** Font family */
  readonly fontFamily?: string;
  /** xterm theme colors */
  readonly theme?: Partial<TerminalThemeColors>;
  /** Cursor blink */
  readonly cursorBlink?: boolean;
  /** Show scanlines */
  readonly showScanlines?: boolean;
  /** Called when pane receives focus */
  readonly onFocus?: () => void;
  /** Called when the shell session exits (Ctrl+D) */
  readonly onSessionEnd?: () => void;
  /** Notify parent of connection status changes */
  readonly onStatusChange?: (status: string) => void;
  /** Called when PTY info (TTY device name) is received */
  readonly onTtyInfo?: (ttyName: string) => void;
  readonly className?: string;
}

export function TerminalPane({
  tabId,
  visible,
  focused,
  socketUrl,
  fontSize,
  fontFamily,
  theme,
  cursorBlink = true,
  showScanlines = true,
  onFocus,
  onSessionEnd,
  onStatusChange,
  onTtyInfo,
  className = '',
}: Readonly<TerminalPaneProps>) {
  const options: UseXtermOptions = {
    socketUrl,
    fontSize,
    fontFamily,
    theme,
    cursorBlink,
    allowTransparency: true,
    onSessionEnd,
  };

  const xterm = useXterm(options);

  useEffect(() => {
    onStatusChange?.(xterm.status);
  }, [xterm.status, onStatusChange]);

  useEffect(() => {
    if (xterm.ttyName) onTtyInfo?.(xterm.ttyName);
  }, [xterm.ttyName, onTtyInfo]);

  useEffect(() => {
    if (visible) {
      const t = setTimeout(() => xterm.refit(), 50);
      return () => clearTimeout(t);
    }
  }, [visible, xterm]);

  return (
    <section
      className={cn(
        'ct-pane',
        !visible && 'ct-pane--hidden',
        focused && 'ct-pane--focused',
        className,
      )}
      data-tab-id={tabId}
      aria-label={`Terminal pane ${tabId}`}
      role="region"
      tabIndex={-1}
      onClick={onFocus}
      onKeyDown={onFocus}
      onFocus={onFocus}
    >
      <div ref={xterm.containerRef as React.RefObject<HTMLDivElement>} className="ct-pane__xterm" />
      {showScanlines && visible && <div className="ct-pane__scanlines" aria-hidden="true" />}
    </section>
  );
}
