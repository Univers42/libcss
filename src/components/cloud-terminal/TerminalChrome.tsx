import { cn } from '../lib/cn';

export interface TerminalChromeProps {
  /** Content label to show (e.g. 'bash-v5.2' or 'Design Document') */
  readonly sessionLabel?: string;
  /** Whether encryption badge is shown */
  readonly encrypted?: boolean;
  /** Close window (wired to red dot) */
  readonly onClose?: () => void;
  /** Minimize window (wired to orange dot) */
  readonly onMinimize?: () => void;
  /** Maximize/restore window (wired to third dot) */
  readonly onMaximize?: () => void;
  readonly className?: string;
}

/**
 * The macOS-style chrome bar above the terminal viewport.
 * Three dots wired to window controls (close/minimize/maximize)
 * when running in Electron, purely decorative in browser.
 */
export function TerminalChrome({
  sessionLabel = 'Session: bash-v5.2',
  encrypted = true,
  onClose,
  onMinimize,
  onMaximize,
  className = '',
}: Readonly<TerminalChromeProps>) {
  const interactive = !!(onClose || onMinimize || onMaximize);

  return (
    <div className={cn('ct-chrome', className)}>
      <div className="ct-chrome__left">
        <div className={cn('ct-chrome__dots', interactive && 'ct-chrome__dots--interactive')}>
          <button
            className="ct-chrome__dot ct-chrome__dot--close"
            onClick={onClose}
            aria-label="Close"
            tabIndex={onClose ? 0 : -1}
          />
          <button
            className="ct-chrome__dot ct-chrome__dot--minimize"
            onClick={onMinimize}
            aria-label="Minimize"
            tabIndex={onMinimize ? 0 : -1}
          />
          <button
            className="ct-chrome__dot ct-chrome__dot--maximize"
            onClick={onMaximize}
            aria-label="Maximize"
            tabIndex={onMaximize ? 0 : -1}
          />
        </div>
        <div className="ct-chrome__sep" />
        <span className="ct-chrome__label">{sessionLabel}</span>
      </div>
      {encrypted && (
        <div className="ct-chrome__right">
          <span className="ct-chrome__indicator" />
          <span className="ct-chrome__badge">Encrypted</span>
        </div>
      )}
    </div>
  );
}
