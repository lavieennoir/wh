import { z } from 'zod';

const rangedWeaponSchema = z.object({
  name: z.string(),
  range: z.number(),
  attacks: z.string(),
  ballisticSkill: z.number().nullable(),
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

export const abilitySchema = z.object({
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

const leaderSchema = z.object({
  attachableTo: z.array(z.string()).min(1),
  note: z.string().optional(),
});

const transportSchema = z.object({
  capacity: z.number().optional(),
  note: z.string(),
});

const degradationSchema = z.object({
  woundsRemaining: z.string(),
  effect: z.string(),
});

const wargearAbilitySchema = z.object({
  name: z.string(),
  isAura: z.boolean().optional(),
  description: z.string(),
});

const wargearOptionSchema = z.object({
  target: z.object({
    model: z.string(), // model name from the models array which has current wargear option
    eachXModels: z.number().optional(), // only 1 model per each X models in the unit can have current wargear option
    maxAmount: z.number().optional(), // max amount of models in the unit that can have current wargear option
    wargearToReplace: z.array(z.string()).optional(), // 1 instance of each of these wargears must be removed from the model to add current wargear option
    requiredWargear: z.array(z.string()).optional(), // model must have all of provided wargear options to add current wargear option
    forbiddenWargear: z.array(z.string()).optional(), // model must not have any of provided wargear options to add current wargear option
  }),
  options: z.array(
    z.object({
      amount: z.number(),
      wargear: z.string(),
    }),
  ),
});

export const dataSheetValidationSchema = z.object({
  updatedAt: z.string(),
  slug: z.string(),
  name: z.string(),
  baseSize: z.string().optional(),
  keywords: z.array(z.string()),
  factionKeywords: z.array(z.string()),
  unitComposition: unitCompositionSchema,
  stats: statsSchema,
  rangedWeapons: z.array(rangedWeaponSchema).optional(),
  meleeWeapons: z.array(meleeWeaponSchema).optional(),
  coreAbilities: z.array(z.string()).optional(),
  factionAbility: z.string().optional(),
  abilities: z.array(abilitySchema),
  leader: leaderSchema.optional(),
  transport: transportSchema.optional(),
  degradation: degradationSchema.optional(),
  wargearAbilities: z.array(wargearAbilitySchema).optional(),
  wargearOptions: z.array(wargearOptionSchema).optional(),
  supremeCommander: z.string().optional(),
});

export const dataSheetArrayValidationSchema = z.array(dataSheetValidationSchema);

export type DataSheet = z.infer<typeof dataSheetValidationSchema>;
export type RangedWeapon = z.infer<typeof rangedWeaponSchema>;
export type MeleeWeapon = z.infer<typeof meleeWeaponSchema>;
export type Ability = z.infer<typeof abilitySchema>;
export type Stats = z.infer<typeof statsSchema>;
export type UnitComposition = z.infer<typeof unitCompositionSchema>;
export type WargearAbility = z.infer<typeof wargearAbilitySchema>;
export type WargearOption = z.infer<typeof wargearOptionSchema>;
