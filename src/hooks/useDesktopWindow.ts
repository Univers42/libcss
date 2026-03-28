/**
 * libcss/desktop — useDesktopWindow hook
 *
 * React hook for interacting with the Electron window controls
 * exposed via the preload's contextBridge (window.desktopApp).
 *
 * Gracefully degrades when running in a browser (non-Electron).
 */
import { useState, useEffect, useCallback, useRef } from 'react';

export interface DesktopWindowAPI {
  /** Whether we're running in an Electron context */
  readonly isElectron: boolean;
  /** Minimize the window */
  readonly minimize: () => void;
  /** Maximize or unmaximize the window */
  readonly maximize: () => void;
  /** Close the window */
  readonly close: () => void;
  /** Whether the window is currently maximized */
  readonly isMaximized: boolean;
  /** Zoom in */
  readonly zoomIn: () => void;
  /** Zoom out */
  readonly zoomOut: () => void;
  /** Reset zoom to 100% */
  readonly zoomReset: () => void;
}

// Extend Window to include the desktopApp bridge
declare global {
  interface Window {
    desktopApp?: {
      isElectron: boolean;
      platform: string;
      minimize: () => Promise<void>;
      maximize: () => Promise<void>;
      close: () => Promise<void>;
      isMaximized: () => Promise<boolean>;
      zoomIn: () => Promise<void>;
      zoomOut: () => Promise<void>;
      zoomReset: () => Promise<void>;
      getZoom: () => Promise<number>;
      onMaximizedChange: (cb: (isMax: boolean) => void) => () => void;
    };
  }
}

/**
 * Hook that provides window control functions for Electron.
 * Returns no-ops when running in a regular browser.
 */
export function useDesktopWindow(): DesktopWindowAPI {
  const [isMaximized, setIsMaximized] = useState(false);
  const cleanupRef = useRef<(() => void) | null>(null);

  const api = globalThis.window?.desktopApp;
  const isElectron = !!api?.isElectron;

  // Listen for maximize state changes from main process
  useEffect(() => {
    if (!api?.onMaximizedChange) return;

    cleanupRef.current = api.onMaximizedChange((isMax) => {
      setIsMaximized(isMax);
    });

    // Check initial state
    api.isMaximized?.().then(setIsMaximized);

    return () => {
      cleanupRef.current?.();
    };
  }, [api]);

  const minimize = useCallback(() => {
    api?.minimize();
  }, [api]);
  const maximize = useCallback(() => {
    api?.maximize();
  }, [api]);
  const close = useCallback(() => {
    api?.close();
  }, [api]);
  const zoomIn = useCallback(() => {
    api?.zoomIn();
  }, [api]);
  const zoomOut = useCallback(() => {
    api?.zoomOut();
  }, [api]);
  const zoomReset = useCallback(() => {
    api?.zoomReset();
  }, [api]);

  return {
    isElectron,
    minimize,
    maximize,
    close,
    isMaximized,
    zoomIn,
    zoomOut,
    zoomReset,
  };
}
