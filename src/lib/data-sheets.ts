import chaosDaemonsDataSheets from '@/assets/chaos-daemons/datasheets.json';
import deathGuardDataSheets from '@/assets/death-guard/datasheets.json';
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
