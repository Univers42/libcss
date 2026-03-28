/**
 * @file Logger types
 * @description Type definitions for the structured logger.
 */

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface LogEntry {
  readonly level: LogLevel;
  readonly namespace: string;
  readonly message: string;
  readonly timestamp: number;
  readonly data?: unknown;
}

export interface LogSink {
  (entry: LogEntry): void;
}

export interface LoggerConfig {
  /** Minimum level to output. Defaults to 'info'. */
  readonly level?: LogLevel;
  /** Custom sink function. Defaults to console output. */
  readonly sink?: LogSink;
}

export interface Logger {
  debug(message: string, data?: unknown): void;
  info(message: string, data?: unknown): void;
  warn(message: string, data?: unknown): void;
  error(message: string, data?: unknown): void;
}
