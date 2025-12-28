import deathGuardDataSheets from '@/assets/death-guard/datasheets.json';
import { DataSheet } from '../schemas/data-sheet.schema';
import { Army } from './army';

export const armyDataSheets: Record<Army, DataSheet[]> = {
  [Army.DeathGuard]: deathGuardDataSheets,
};
