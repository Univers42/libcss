import { cn } from '../lib/cn';
import type { ConnectionStatus } from './CloudTerminal.types';

export interface TerminalStatusBarProps {
  status: ConnectionStatus;
  sessionId?: string;
  className?: string;
}

/**
 * Bottom status bar with connection info and session details.
 */
export function TerminalStatusBar({
  status,
  sessionId,
  className = '',
}: Readonly<TerminalStatusBarProps>) {
  return (
    <div className={cn('ct-statusbar', className)}>
      <div className="ct-statusbar__left">
        <span className={cn(
          'ct-statusbar__indicator',
          status === 'connected'    && 'ct-statusbar__indicator--live',
          status === 'disconnected' && 'ct-statusbar__indicator--dead',
          status === 'connecting'   && 'ct-statusbar__indicator--connecting',
        )} />
        <span className="ct-statusbar__text">PTY</span>
        <span className="ct-statusbar__sep">|</span>
        <span className="ct-statusbar__text">UTF-8</span>
        <span className="ct-statusbar__sep">|</span>
        <span className="ct-statusbar__text">bash</span>
      </div>
      <div className="ct-statusbar__right">
        {sessionId && (
          <span className="ct-statusbar__text ct-statusbar__text--mono">
            sid:{sessionId.slice(0, 8)}
          </span>
        )}
      </div>
    </div>
  );
}
