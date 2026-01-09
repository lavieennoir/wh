import { z } from 'zod';
import { abilitySchema } from './data-sheet.schema';

export const armyRuleSchema = z.object({
  name: z.string(),
  description: z.string(),
  abilities: z.array(abilitySchema).optional(),
});

export const armyRuleArrayValidationSchema = z.array(armyRuleSchema);

export type ArmyRule = z.infer<typeof armyRuleSchema>;
