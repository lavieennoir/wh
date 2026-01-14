import { SetStateAction, useCallback, useEffect, useState } from 'react';

export const useLocalStorageValue = <
  T extends object | string | number | boolean | null | undefined,
>(
  defaultValue: T,
  key: string,
) => {
  const [value, setValue] = useState<T>(defaultValue);

  const updateValue = useCallback(
    (newValue: SetStateAction<T>) => {
      setValue((prevValue) => {
        const updatedValue = typeof newValue === 'function' ? newValue(prevValue) : newValue;
        localStorage.setItem(key, JSON.stringify(updatedValue));
        return updatedValue;
      });
    },
    [key],
  );

  useEffect(() => {
    const storedValue = localStorage.getItem(key);
    if (!storedValue) {
      return;
    }
    try {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setValue(JSON.parse(storedValue) as T);
    } catch {
      console.warn(`Error parsing localStorage value for key ${key}:`, storedValue);
    }
  }, [key]);

  return [value, updateValue] as const;
};
