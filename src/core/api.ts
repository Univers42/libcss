/**
 * Configurable API layer for libcss components.
 *
 * Consuming apps must call `configureApi()` at startup to provide
 * their own HTTP request implementation.
 *
 * @example
 * import { configureApi } from 'libcss/core/api';
 * import { apiRequest } from './services/api';
 * configureApi({ request: apiRequest });
 */

export type ApiRequestFn = (
  url: string,
  options?: {
    method?: string;
    body?: unknown;
    signal?: AbortSignal;
    headers?: Record<string, string>;
  },
) => Promise<unknown>;

let _apiRequest: ApiRequestFn | null = null;

/** Configure the API request function used by all libcss components */
export function configureApi(config: { request: ApiRequestFn }): void {
  _apiRequest = config.request;
}

/**
 * Get the configured API request function.
 * Throws if `configureApi()` has not been called.
 */
export function apiRequest<T = unknown>(
  url: string,
  options?: Parameters<ApiRequestFn>[1],
): Promise<T> {
  if (!_apiRequest) {
    throw new Error(
      '[libcss] API not configured. Call configureApi({ request: yourApiFunction }) at app startup.',
    );
  }
  return _apiRequest(url, options) as Promise<T>;
}
