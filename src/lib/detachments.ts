import chaosDaemonsDetachments from '@/data/chaos-daemons/detachments.json';
import deathGuardDetachments from '@/data/death-guard/detachments.json';
import {
  Detachment,
  detachmentArrayValidationSchema,
  DetachmentValidationInput,
} from '../schemas/detachment.schema';
import { Army } from './army';

// Validate army detachments at build time to ensure they are valid,
// Additionally use `satisfies` validate them at compile time
export const armyDetachments: Record<Army, Detachment[]> = {
  [Army.ChaosDaemons]: detachmentArrayValidationSchema.parse(
    chaosDaemonsDetachments satisfies DetachmentValidationInput[],
  ),
  [Army.DeathGuard]: detachmentArrayValidationSchema.parse(
    deathGuardDetachments satisfies DetachmentValidationInput[],
  ),
};
