import { useEffect, useState } from 'react';

export const useDebounce = <T>(value: T, delayInMs: number) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delayInMs);

    return () => clearTimeout(handler);
  }, [value, delayInMs]);

  return debouncedValue;
};
