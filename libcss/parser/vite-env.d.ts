/**
 * Vite-specific augmentations for import.meta
 * Required by componentParser.ts which uses import.meta.glob at build time.
 */

interface ImportMetaGlobOptions {
  eager?: boolean;
}

interface ImportMeta {
  readonly glob: <T = Record<string, unknown>>(
    pattern: string | string[],
    options?: ImportMetaGlobOptions,
  ) => Record<string, () => Promise<T>>;
}
