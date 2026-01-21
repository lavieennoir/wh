import { produce } from 'immer';
import { v4 as uuidv4 } from 'uuid';
import { ShortRoster } from '../hooks/useRostersList';
import type { DataSheet, UnitComposition } from '../schemas/data-sheet.schema';
import type { RosterDetails, RosterUnit } from '../schemas/roster.schema';
import { Army } from './army';
import { armyDataSheetBySlugMaps } from './data-sheets';

export enum RosterUnitType {
  Characters = 'characters',
  Battleline = 'battleline',
  DedicatedTransport = 'dedicated-transport',
  OtherDatasheets = 'other-datasheets',
  AlliedUnits = 'allied-units',
}

export const buildRosterKey = (id: string) => `roster:${id}`;

export const cloneRosterDetails = (fromId: string, toId: string): void => {
  const fromRosterDetails = localStorage.getItem(buildRosterKey(fromId));
  if (!fromRosterDetails) {
    return;
  }
  try {
    const roster = JSON.parse(fromRosterDetails) as RosterDetails;
    roster.id = toId;
    localStorage.setItem(buildRosterKey(toId), JSON.stringify(roster));
  } catch (error) {
    console.error(`Error cloning roster details from ${fromId} to ${toId}:`, error);
  }
};

export const copyRosterUnit = (unit: RosterUnit): RosterUnit => {
  return produce<RosterUnit>(unit, (draft) => {
    draft.id = uuidv4();
  });
};

export const createEmptyRosterDetails = (id: string, shortRoster: ShortRoster): RosterDetails => {
  return {
    id,
    units: [],
    points: shortRoster.points,
    army: shortRoster.army,
  };
};

export const getUnitCost = (unit: RosterUnit, unitComposition: UnitComposition): number => {
  // Build a map of model name to amount from the unit
  const modelAmounts = new Map<string, number>();
  for (const model of unit.models) {
    modelAmounts.set(model.name, (modelAmounts.get(model.name) ?? 0) + model.amount);
  }

  let minCost = Infinity;

  // Find the minimum cost option that can accommodate all models
  for (const costOption of unitComposition.cost) {
    let fits = true;

    // Check if all models in the unit fit within this cost option's maxCounts
    for (const [modelName, constraints] of Object.entries(costOption.models)) {
      const amount = modelAmounts.get(modelName) ?? 0;
      if (amount > constraints.maxCount) {
        fits = false;
        break;
      }
    }

    if (fits && costOption.points < minCost) {
      minCost = costOption.points;
    }
  }

  return minCost === Infinity ? 0 : minCost;
};

export const computeUnitsPoints = (units: RosterDetails['units'], army: Army) => {
  const dataSheets = armyDataSheetBySlugMaps[army];
  if (!dataSheets) {
    return 0;
  }
  return (
    units?.reduce((acc, unit) => {
      const dataSheet = dataSheets[unit.dataSheetSlug];
      if (!dataSheet) {
        return acc;
      }

      return acc + getUnitCost(unit, dataSheet.unitComposition);
    }, 0) ?? 0
  );
};

export const createRosterUnitFromDataSheet = (dataSheet: DataSheet): RosterUnit => {
  let defaultUnitComposition = dataSheet.unitComposition.cost[0];
  if (!defaultUnitComposition) {
    console.warn(`No default unit composition found for ${dataSheet.slug}`);
    defaultUnitComposition = {
      points: 0,
      models: Object.fromEntries(
        dataSheet.unitComposition.models.map((model) => [
          model.model,
          { minCount: model.minCount, maxCount: model.maxCount },
        ]),
      ),
    };
  }

  return {
    id: uuidv4(),
    name: dataSheet.name,
    dataSheetSlug: dataSheet.slug,
    models: Object.entries(defaultUnitComposition.models).map(([model, counts]) => ({
      name: model,
      amount: counts.minCount,
      isWarlord: false,
      wargear: dataSheet.unitComposition.equipment.map((equipment) => ({
        name: equipment,
        amount: counts.minCount,
      })),
    })),
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
