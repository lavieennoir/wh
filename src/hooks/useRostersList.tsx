import { useCallback } from 'react';
import { buildRosterKey, createEmptyRosterDetails } from '../lib/roster';
import { RosterDetails } from '../schemas/roster.schema';
import { useLocalStorageValue } from './useLocalStorageValue';

export interface ShortRoster extends Pick<RosterDetails, 'army' | 'points'> {
  id: string;
  name: string;
  detachmentName: string;
}

export const useShortRosterList = () => {
  const [rosters, setRosters] = useLocalStorageValue<ShortRoster[]>([], 'roster-list');

  const addRoster = useCallback(
    (roster: ShortRoster) => {
      setRosters((prev) => [roster, ...prev]);
      // Also create the empty roster details in localStorage
      localStorage.setItem(
        buildRosterKey(roster.id),
        JSON.stringify(createEmptyRosterDetails(roster.id, roster)),
      );
    },
    [setRosters],
  );

  const removeRoster = useCallback(
    (id: string) => {
      setRosters((prev) => prev.filter((roster) => roster.id !== id));
      // Also delete the detailed roster info from localStorage
      localStorage.removeItem(buildRosterKey(id));
    },
    [setRosters],
  );

  const updateRoster = useCallback(
    (id: string, updatedRoster: ShortRoster) => {
      setRosters((prev) => prev.map((roster) => (roster.id === id ? updatedRoster : roster)));
    },
    [setRosters],
  );

  return { rosters, addRoster, removeRoster, updateRoster };
};
