'use client';

import { useLocalStorageValue } from '@/src/hooks/useLocalStorageValue';

export const useExpandAllUnitsByDefault = () => {
  return useLocalStorageValue<boolean | undefined>(undefined, 'expand-all-units-by-default');
};

export default function ExpandAllUnitsByDefaultControl() {
  const [value, setValue] = useExpandAllUnitsByDefault();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // when unchecked, set the value to undefined to use default collapse behavior
    setValue(event.target.checked ? true : undefined);
  };

  return (
    <label className="label gap-2">
      <input
        type="checkbox"
        className="checkbox"
        checked={value ?? false}
        onChange={handleChange}
      />
      Expand all units by default
    </label>
  );
}
