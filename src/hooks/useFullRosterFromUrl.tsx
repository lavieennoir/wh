import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRoster } from './useRoster';

export const useFullRosterFromUrl = () => {
  const searchParams = useSearchParams();
  const rosterId = searchParams.get('rosterId');

  const [isLoading, setIsLoading] = useState(true);
  const roster = useRoster(rosterId ?? '');

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- wait for roster to read from localStorage
    setIsLoading(false);
  }, []);

  return { ...roster, isLoading };
};
