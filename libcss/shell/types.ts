/**
 * libcss/shell — Configuration types for bootstrap generator.
 */

export type BannerStyle = 'box' | 'zigzag' | 'minimal' | 'none';

export interface PromptConfig {
  /** Bash escape for username (default: '\\u') */
  readonly username?: string;
  /** Hostname label (default: 'shell') */
  readonly hostname?: string;
  /** ANSI color code for host part (default: '1;32' = bold green) */
  readonly hostColor?: string;
  /** ANSI color code for path (default: '1;34' = bold blue) */
  readonly pathColor?: string;
  /** ANSI color code for git branch (default: '33' = yellow) */
  readonly gitColor?: string;
  /** Show git branch in prompt (default: true) */
  readonly showGit?: boolean;
  /** Two-line prompt: line 1 = info, line 2 = input (default: false) */
  readonly twoLine?: boolean;
}

export interface BannerConfig {
  /** Banner decorative style */
  readonly style?: BannerStyle;
  /** ANSI color code for the banner frame (default: '1;36' = bold cyan) */
  readonly color?: string;
  /** ANSI color code for the app name line (default: same as color) */
  readonly nameColor?: string;
  /** Icon character shown before the app name (default: '☁') */
  readonly icon?: string;
}

export interface ShellBootstrapConfig {
  /** Application name shown in the banner */
  readonly appName: string;
  /** Application version shown in the banner (default: '1.0.0') */
  readonly appVersion?: string;
  /** Prompt configuration */
  readonly prompt?: PromptConfig;
  /** Welcome banner configuration */
  readonly banner?: BannerConfig;
  /** Extra aliases as { name: command } (merged with defaults) */
  readonly aliases?: Readonly<Record<string, string>>;
  /** Extra lines to append to the bootstrap script */
  readonly extraLines?: readonly string[];
  /** History size (default: 10000) */
  readonly historySize?: number;
  /** Include color/dircolors setup (default: true) */
  readonly colorSupport?: boolean;
  /** Include git prompt helper (default: true) */
  readonly gitPrompt?: boolean;
}
