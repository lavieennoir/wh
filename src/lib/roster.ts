import { RosterDetails } from '../hooks/useRoster';

export const buildRosterKey = (id: string) => `roster:${id}`;

export const createEmptyRosterDetails = (id: string): RosterDetails => {
  return {
    id,
    units: [],
  };
};
