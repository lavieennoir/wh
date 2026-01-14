import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useShortRosterList } from './useRostersList';

export const useRosterFromUrl = () => {
  const searchParams = useSearchParams();
  const rosterId = searchParams.get('rosterId');

  const [isLoading, setIsLoading] = useState(true);
  const { rosters } = useShortRosterList();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- wait for roster to read from localStorage
    setIsLoading(false);
  }, []);

  const roster = rosters.find((roster) => roster.id === rosterId);

  return { roster, isLoading };
};
