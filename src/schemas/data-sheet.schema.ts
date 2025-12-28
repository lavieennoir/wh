import { z } from 'zod';

const rangedWeaponSchema = z.object({
  name: z.string(),
  range: z.number(),
  attacks: z.string(),
  balllisticSkill: z.number(),
  strength: z.number(),
  armourPenetration: z.number(),
  damage: z.string(),
  abilities: z.array(z.string()).optional(),
});

const meleeWeaponSchema = z.object({
  name: z.string(),
  attacks: z.string(),
  weaponSkill: z.number(),
  strength: z.number(),
  armourPenetration: z.number(),
  damage: z.string(),
  abilities: z.array(z.string()).optional(),
});

const subAbilitySchema = z.object({
  name: z.string(),
  description: z.string(),
});

const abilitySchema = z.object({
  name: z.string(),
  description: z.string(),
  subAbilities: z.array(subAbilitySchema).optional(),
});

const statsSchema = z.object({
  movement: z.number(),
  toughness: z.number(),
  save: z.number(),
  wounds: z.number(),
  leadership: z.number(),
  objectiveControl: z.number(),
  invulnerableSave: z.number().optional(),
});

const unitCompositionSchema = z.object({
  equipment: z.array(z.string()),
  models: z.array(
    z.object({
      model: z.string(),
      minCount: z.number(), // min possible amount of models in the unit
      maxCount: z.number(), // max possible amount of models in the unit
    }),
  ),
  cost: z.array(
    z.object({
      points: z.number(),
      models: z.record(
        z.string(), // model name from the models array is used as the key
        z.object({
          minCount: z.number(), // min possible amount of models in the unit per specified price
          maxCount: z.number(), // max possible amount of models in the unit per specified price
        }),
      ),
    }),
  ),
});

const degradationSchema = z.object({
  woundsRemaining: z.string(),
  effect: z.string(),
});

export const dataSheetValidationSchema = z.object({
  updatedAt: z.string(),
  slug: z.string(),
  name: z.string(),
  baseSize: z.string(),
  keywords: z.array(z.string()),
  factionKeywords: z.array(z.string()),
  unitComposition: unitCompositionSchema,
  stats: statsSchema,
  rangedWeapons: z.array(rangedWeaponSchema).optional(),
  meleeWeapons: z.array(meleeWeaponSchema).optional(),
  coreAbilities: z.array(z.string()).optional(),
  factionAbility: z.string().optional(),
  abilities: z.array(abilitySchema),
  degradation: degradationSchema.optional(),
  supremeCommander: z.string().optional(),
});

export type DataSheet = z.infer<typeof dataSheetValidationSchema>;
export type RangedWeapon = z.infer<typeof rangedWeaponSchema>;
export type MeleeWeapon = z.infer<typeof meleeWeaponSchema>;
export type Ability = z.infer<typeof abilitySchema>;
export type Stats = z.infer<typeof statsSchema>;
export type UnitComposition = z.infer<typeof unitCompositionSchema>;
