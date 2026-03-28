/**
 * libcss/shell — Shell Bootstrap Scaffold
 *
 * Generates customizable bash bootstrap scripts for
 * terminal applications. One config → complete .sh file.
 *
 * @module libcss/shell
 */
export { generateBootstrap } from './generateBootstrap';
export type {
  ShellBootstrapConfig,
  PromptConfig,
  BannerConfig,
  BannerStyle,
} from './types';
