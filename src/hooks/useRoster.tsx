import { useCallback, useMemo } from 'react';
import { buildRosterKey, createRosterUnitFromDataSheet } from '../lib/roster';
import { DataSheet } from '../schemas/data-sheet.schema';
import { RosterDetails } from '../schemas/roster.schema';
import { useLocalStorageValue } from './useLocalStorageValue';
import { useShortRosterList, type ShortRoster } from './useRostersList';

export interface Roster extends ShortRoster, RosterDetails {}

export const useRoster = (id: string) => {
  const [rosterDetails, setRosterDetails] = useLocalStorageValue<RosterDetails | undefined>(
    undefined,
    buildRosterKey(id),
  );
  const shortRosterList = useShortRosterList();

  // combine the short roster and the roster details
  // to avoid 2 sources of truth from localStorage
  const roster = useMemo<(ShortRoster & RosterDetails) | undefined>(() => {
    const shortRoster = shortRosterList.rosters.find((roster) => roster.id === id);
    if (!shortRoster || !rosterDetails) {
      return undefined;
    }
    return {
      ...shortRoster,
      ...rosterDetails,
    };
  }, [shortRosterList.rosters, rosterDetails, id]);

  const addUnit = useCallback(
    (unit: DataSheet) => {
      setRosterDetails((prev) => {
        if (!prev) {
          return undefined;
        }
        return {
          ...prev,
          units: [...prev.units, createRosterUnitFromDataSheet(unit)],
        };
      });
    },
    [setRosterDetails],
  );

  return { roster, addUnit, setRosterDetails };
};
