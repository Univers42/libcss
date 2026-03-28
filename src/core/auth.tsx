/**
 * Configurable Auth context for libcss components.
 *
 * Consuming apps must wrap their tree in <LibcssAuthProvider>
 * to provide authentication data to libcss components.
 *
 * @example
 * import { LibcssAuthProvider } from 'libcss/core/auth';
 *
 * function App() {
 *   const auth = useYourAuth(); // your own hook
 *   return (
 *     <LibcssAuthProvider value={{
 *       user: auth.user,
 *       isAuthenticated: auth.isLoggedIn,
 *       logout: auth.logout,
 *     }}>
 *       <YourApp />
 *     </LibcssAuthProvider>
 *   );
 * }
 */

import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';

export interface LibcssUser {
  id: string | number;
  name?: string;
  email?: string;
  role?: string;
  avatar?: string;
  [key: string]: unknown;
}

export interface LibcssAuthValue {
  user: LibcssUser | null;
  isAuthenticated: boolean;
  logout?: () => void | Promise<void>;
}

const LibcssAuthContext = createContext<LibcssAuthValue | null>(null);

export function LibcssAuthProvider({
  value,
  children,
}: {
  value: LibcssAuthValue;
  children: ReactNode;
}) {
  return <LibcssAuthContext.Provider value={value}>{children}</LibcssAuthContext.Provider>;
}

/**
 * Hook to get auth state in libcss components.
 * Falls back to a safe default if no provider is present.
 */
export function useAuth(): LibcssAuthValue {
  const ctx = useContext(LibcssAuthContext);
  if (!ctx) {
    return { user: null, isAuthenticated: false };
  }
  return ctx;
}
