/**
 * @file Logger
 * @description Structured logger with namespace, levels, and pluggable sinks.
 *
 * @example
 * ```ts
 * const log = createLogger('Studio');
 * log.info('Component selected', { id: 'button' });
 * // → [Studio] ℹ Component selected { id: 'button' }
 * ```
 */

import type { LogLevel, LogEntry, LoggerConfig, Logger, LogSink } from './types';

const LEVEL_PRIORITY: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

const LEVEL_ICONS: Record<LogLevel, string> = {
  debug: '🔍',
  info: 'ℹ',
  warn: '⚠',
  error: '✖',
};

/* eslint-disable no-console */
const defaultSink: LogSink = (entry) => {
  const prefix = `[${entry.namespace}] ${LEVEL_ICONS[entry.level]}`;
  const method = entry.level === 'debug' ? 'log' : entry.level;

  if (entry.data !== undefined) {
    console[method](prefix, entry.message, entry.data);
  } else {
    console[method](prefix, entry.message);
  }
};
/* eslint-enable no-console */

/**
 * Create a namespaced logger instance.
 */
export function createLogger(namespace: string, config: LoggerConfig = {}): Logger {
  const minLevel = config.level ?? 'info';
  const sink = config.sink ?? defaultSink;
  const minPriority = LEVEL_PRIORITY[minLevel];

  function log(level: LogLevel, message: string, data?: unknown): void {
    if (LEVEL_PRIORITY[level] < minPriority) return;

    const entry: LogEntry = {
      level,
      namespace,
      message,
      timestamp: Date.now(),
      data,
    };

    try {
      sink(entry);
    } catch {
      // Silently swallow sink errors to avoid infinite loops
    }
  }

  return {
    debug: (message, data?) => log('debug', message, data),
    info: (message, data?) => log('info', message, data),
    warn: (message, data?) => log('warn', message, data),
    error: (message, data?) => log('error', message, data),
  };
}
