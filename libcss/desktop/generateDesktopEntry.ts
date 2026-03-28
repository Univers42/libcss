/**
 * libcss/desktop — .desktop file generator for Linux
 *
 * Generates a freedesktop.org-compliant .desktop entry
 * and installs it to ~/.local/share/applications/.
 *
 * @example
 *   import { generateDesktopEntry } from '../libcss/desktop';
 *   const entry = generateDesktopEntry({
 *     name: 'My App',
 *     comment: 'An awesome app',
 *     exec: 'bash -c "cd /path/to/app && npx electron ."',
 *     icon: 'my-app',
 *     categories: ['Utility', 'Development'],
 *   });
 */

export interface DesktopEntryOptions {
  /** Application name */
  readonly name: string;
  /** Short description */
  readonly comment?: string;
  /** Shell command to launch the app */
  readonly exec: string;
  /** Icon name (freedesktop icon theme name, not a path) */
  readonly icon?: string;
  /** .desktop Categories (default: ['Utility']) */
  readonly categories?: readonly string[];
  /** Search keywords */
  readonly keywords?: readonly string[];
  /** WM_CLASS for window matching */
  readonly wmClass?: string;
  /** Whether the app needs a terminal to run (default: false) */
  readonly terminal?: boolean;
}

/**
 * Generate the contents of a .desktop file.
 */
export function generateDesktopEntry(opts: DesktopEntryOptions): string {
  const categories = (opts.categories ?? ['Utility']).join(';');
  const keywords = (opts.keywords ?? []).join(';');

  return [
    '[Desktop Entry]',
    `Name=${opts.name}`,
    opts.comment ? `Comment=${opts.comment}` : null,
    `Exec=${opts.exec}`,
    opts.icon ? `Icon=${opts.icon}` : null,
    `Terminal=${opts.terminal ? 'true' : 'false'}`,
    'Type=Application',
    `Categories=${categories};`,
    keywords ? `Keywords=${keywords};` : null,
    opts.wmClass ? `StartupWMClass=${opts.wmClass}` : null,
  ].filter(Boolean).join('\n') + '\n';
}
