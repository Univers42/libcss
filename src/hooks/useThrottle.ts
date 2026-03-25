import { useRef, useEffect, useState } from 'react';

/**
 * Returns a throttled version of `value`.
 */
export function useThrottle<T>(value: T, interval = 200): T {
  const [throttled, setThrottled] = useState(value);
  const lastUpdated = useRef(Date.now());

  useEffect(() => {
    const now = Date.now();
    if (now - lastUpdated.current >= interval) {
      lastUpdated.current = now;
      setThrottled(value);
    } else {
      const timer = setTimeout(
        () => {
          lastUpdated.current = Date.now();
          setThrottled(value);
        },
        interval - (now - lastUpdated.current),
      );
      return () => clearTimeout(timer);
    }
  }, [value, interval]);

  return throttled;
}
