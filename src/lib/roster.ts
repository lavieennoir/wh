import { v4 as uuidv4 } from 'uuid';
import type { DataSheet } from '../schemas/data-sheet.schema';
import type { RosterDetails } from '../schemas/roster.schema';

export enum RosterUnitType {
  Characters = 'characters',
  Battleline = 'battleline',
  DedicatedTransport = 'dedicated-transport',
  OtherDatasheets = 'other-datasheets',
  AlliedUnits = 'allied-units',
}

export const buildRosterKey = (id: string) => `roster:${id}`;

export const createEmptyRosterDetails = (id: string): RosterDetails => {
  // TODO
  return {
    id,
    units: [],
  };
};

export const computeUnitsPoints = (units: RosterDetails['units']) => {
  // TODO
  return units?.reduce((acc, unit) => acc + unit.points, 0) ?? 0;
};

export const createRosterUnitFromDataSheet = (
  dataSheet: DataSheet,
): RosterDetails['units'][number] => {
  // TODO
  return {
    id: uuidv4(),
    name: dataSheet.name,
    points: dataSheet.unitComposition.cost[0]?.points ?? 0,
    dataSheetSlug: dataSheet.slug,
  };
};

export const rosterFilterUnitsBySection: Record<RosterUnitType, (unit: DataSheet) => boolean> = {
  [RosterUnitType.Characters]: (unit: DataSheet) => unit.keywords.includes('Character'),
  [RosterUnitType.Battleline]: (unit: DataSheet) => unit.keywords.includes('Battleline'),
  [RosterUnitType.DedicatedTransport]: (unit: DataSheet) =>
    unit.keywords.includes('Dedicated Transport'),
  [RosterUnitType.OtherDatasheets]: (unit: DataSheet) =>
    !unit.keywords.includes('Character') &&
    !unit.keywords.includes('Battleline') &&
    !unit.keywords.includes('Dedicated Transport'),
  [RosterUnitType.AlliedUnits]: (unit: DataSheet) =>
    unit.factionKeywords.includes('Chaos Knights') ||
    unit.factionKeywords.includes('Titanicus Traitoris'),
};
