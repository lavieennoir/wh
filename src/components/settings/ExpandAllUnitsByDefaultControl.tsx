'use client';

import { useLocalStorageValue } from '@/src/hooks/useLocalStorageValue';

export const useExpandAllUnitsByDefault = () => {
  return useLocalStorageValue(false, 'expand-all-units-by-default');
};

export default function ExpandAllUnitsByDefaultControl() {
  const [value, setValue] = useExpandAllUnitsByDefault();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.checked);
  };

  return (
    <label className="label gap-2">
      <input type="checkbox" className="checkbox" checked={value} onChange={handleChange} />
      Expand all units by default
    </label>
  );
}
