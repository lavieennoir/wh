import { useMemo } from 'react';
import { buildRosterKey } from '../lib/roster';
import { useLocalStorageValue } from './useLocalStorageValue';
import { useShortRosterList, type ShortRoster } from './useRostersList';

export interface RosterDetails {
  id: string;
  units: unknown[];
}

export interface Roster extends ShortRoster, RosterDetails {}

export const useRoster = (id: string) => {
  const [rosterDetails, setRosterDetails] = useLocalStorageValue<RosterDetails | undefined>(
    undefined,
    buildRosterKey(id),
  );
  const shortRosterList = useShortRosterList();

  // combine the short roster and the roster details
  // to avoid 2 sources of truth from localStorage
  const roster = useMemo(() => {
    const shortRoster = shortRosterList.rosters.find((roster) => roster.id === id);
    if (!shortRoster || !rosterDetails) {
      return undefined;
    }
    return {
      ...shortRoster,
      ...rosterDetails,
    };
  }, [shortRosterList.rosters, rosterDetails, id]);

  return { roster, setRosterDetails };
};
