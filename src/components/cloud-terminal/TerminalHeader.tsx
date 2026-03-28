import type { ReactNode } from 'react';
import { cn } from '../lib/cn';
import type { ConnectionStatus } from './CloudTerminal.types';

export interface TerminalHeaderProps {
  readonly title?: string;
  readonly subtitle?: string;
  readonly status: ConnectionStatus;
  readonly isFullscreen?: boolean;
  readonly onClear?: () => void;
  readonly onToggleFullscreen?: () => void;
  readonly onClose?: () => void;
  readonly onMinimize?: () => void;
  readonly onMaximize?: () => void;
  readonly extra?: ReactNode;
  readonly className?: string;
}

export function TerminalHeader({
  title = 'CLOUD_TERMINAL',
  subtitle: _subtitle,
  status,
  isFullscreen = false,
  onClear,
  onToggleFullscreen,
  onClose,
  onMinimize,
  onMaximize,
  extra,
  className = '',
}: Readonly<TerminalHeaderProps>) {
  return (
    <header className={cn('ct-header', className)}>
      {/* Left — window controls + identity */}
      <div className="ct-header__left">
        {(onClose || onMinimize || onMaximize) && (
          <div className="ct-header__traffic">
            {onClose && (
              <button
                className="ct-header__traffic-dot ct-header__traffic-dot--close"
                onClick={onClose}
                title="Close"
                aria-label="Close window"
                type="button"
              />
            )}
            {onMinimize && (
              <button
                className="ct-header__traffic-dot ct-header__traffic-dot--minimize"
                onClick={onMinimize}
                title="Minimize"
                aria-label="Minimize window"
                type="button"
              />
            )}
            {onMaximize && (
              <button
                className="ct-header__traffic-dot ct-header__traffic-dot--maximize"
                onClick={onMaximize}
                title="Maximize"
                aria-label="Maximize window"
                type="button"
              />
            )}
          </div>
        )}
        <div className="ct-header__identity">
          <h1 className="ct-header__title">{title}</h1>
        </div>
        <div className="ct-header__status">
          <span
            className={cn(
              'ct-header__dot',
              status === 'connected' && 'ct-header__dot--live',
              status === 'disconnected' && 'ct-header__dot--dead',
              status === 'connecting' && 'ct-header__dot--connecting',
            )}
          />
        </div>
      </div>

      {/* Right — actions */}
      <div className="ct-header__actions">
        {extra}
        {onClear && (
          <button
            className="ct-header__btn"
            onClick={onClear}
            title="Purge Buffer"
            aria-label="Clear terminal"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="1 4 1 10 7 10" />
              <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
            </svg>
          </button>
        )}
        {onToggleFullscreen && (
          <button
            className="ct-header__btn"
            onClick={onToggleFullscreen}
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            aria-label="Toggle fullscreen"
          >
            {isFullscreen ? (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="4 14 10 14 10 20" />
                <polyline points="20 10 14 10 14 4" />
                <line x1="14" y1="10" x2="21" y2="3" />
                <line x1="3" y1="21" x2="10" y2="14" />
              </svg>
            ) : (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 3 21 3 21 9" />
                <polyline points="9 21 3 21 3 15" />
                <line x1="21" y1="3" x2="14" y2="10" />
                <line x1="3" y1="21" x2="10" y2="14" />
              </svg>
            )}
          </button>
        )}
      </div>
    </header>
  );
}
