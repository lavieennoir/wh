import chaosDaemonsDataSheets from '@/data/chaos-daemons/datasheets.json';
import deathGuardDataSheets from '@/data/death-guard/datasheets.json';
import { DataSheet, dataSheetArrayValidationSchema } from '../schemas/data-sheet.schema';
import { Army } from './army';

// Validate data sheets at build time to ensure they are valid,
// Additionally use `satisfies` validate them at compile time
export const armyDataSheets: Record<Army, DataSheet[]> = {
  [Army.ChaosDaemons]: dataSheetArrayValidationSchema.parse(
    chaosDaemonsDataSheets satisfies DataSheet[],
  ),
  [Army.DeathGuard]: dataSheetArrayValidationSchema.parse(
    deathGuardDataSheets satisfies DataSheet[],
  ),
};

export const armyDataSheetBySlugMaps: Record<
  string,
  Record<string, DataSheet>
> = Object.fromEntries(
  Object.entries(armyDataSheets).map(
    ([army, dataSheets]) =>
      [
        army,
        Object.fromEntries(dataSheets.map((dataSheet) => [dataSheet.slug, dataSheet] as const)),
      ] as const,
  ),
);
