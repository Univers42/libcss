import { useState, useCallback, useRef } from 'react';
import { deepClone } from '../common';

/**
 * Generic state manager for a Record<string, unknown> props bag.
 * Provides set-single-prop, reset-all, and re-initialize helpers.
 */
export function useComponentState(defaultProps: Record<string, unknown>) {
  const defaultRef = useRef(defaultProps);
  const [props, setProps] = useState<Record<string, unknown>>(() => deepClone(defaultProps));

  const setProp = useCallback((key: string, value: unknown) => {
    setProps((prev) => ({ ...prev, [key]: value }));
  }, []);

  const resetProps = useCallback(() => {
    setProps(deepClone(defaultRef.current));
  }, []);

  const initProps = useCallback((newDefaults: Record<string, unknown>) => {
    defaultRef.current = newDefaults;
    setProps(deepClone(newDefaults));
  }, []);

  return { props, setProp, resetProps, initProps };
}
