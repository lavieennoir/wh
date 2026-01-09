import { z } from 'zod';
import { abilitySchema } from './data-sheet.schema';

export const enum Phase {
  Command = 'Command',
  Movement = 'Movement',
  Shooting = 'Shooting',
  Charge = 'Charge',
  Fight = 'Fight',
  Any = 'Any',
}
export const enum Turn {
  Your = 'Your',
  Opponent = 'Opponent',
  Any = 'Any',
}

const enchantmentSchema = z.object({
  name: z.string(),
  cost: z.number(),
  description: z.string(),
  requiredKeywords: z.array(z.string()).optional(),
});

const stratagemSchema = z.object({
  name: z.string(),
  cost: z.number(),
  phase: z
    .array(z.enum([Phase.Command, Phase.Movement, Phase.Shooting, Phase.Charge, Phase.Fight]))
    .or(z.literal(Phase.Any)),
  turn: z.enum([Turn.Your, Turn.Opponent, Turn.Any]),
  content: z.object({
    when: z.string(),
    target: z.string(),
    effect: z.string(),
    restrictions: z.string().optional(),
  }),
});

const changeSchema = z.union([
  // Detachment rule adds keywords to units (selected by "target" keywords)
  z.object({
    type: z.literal('gain-keyword'),
    name: z.string().optional(),
    target: z.array(z.string()),
    keywords: z.array(z.string()),
  }),
  // Detachment rule allows units with faction keyword other than default to be selected
  z.object({
    type: z.literal('allow-extra-faction-keywords'),
    name: z.string().optional(),
    faction: z.array(z.string()),
    units: z.array(z.string()).optional(), // If units are provided, only these units are allowed to be selected
    // Limits the points of extra faction units that can be selected for each battle size
    limits: z
      .object({
        incursion: z.number().min(0).max(1000),
        strikeForce: z.number().min(0).max(2000),
        onslaught: z.number().min(0).max(3000),
      })
      .optional(),
    // Allow warlord to be selected from extra faction units
    allowExtraFactionWarlord: z.boolean(),
  }),
  // Detachment rule forbids units from being selected
  z.object({
    type: z.literal('forbid-units'),
    name: z.string().optional(),
    units: z.array(z.string()),
    except: z.array(z.string()).optional(), // If except is provided, these units are allowed to be selected even if their keywords are in the units array
  }),
]);

export const detachmentSchema = z.object({
  slug: z.string(),
  name: z.string(),
  changes: z.array(changeSchema).optional(),
  rules: z.array(abilitySchema).optional(),
  enchantments: z.array(enchantmentSchema).optional(),
  stratagems: z.array(stratagemSchema).optional(),
});

export const detachmentArrayValidationSchema = z.array(detachmentSchema);

export type Detachment = z.infer<typeof detachmentSchema>;
export type Stratagem = z.infer<typeof stratagemSchema>;
export type Enchantment = z.infer<typeof enchantmentSchema>;
export type Change = z.infer<typeof changeSchema>;

// Allow string input types that are casted to enum/literal after validation
export interface DetachmentValidationInput
  extends Omit<z.input<typeof detachmentSchema>, 'stratagems' | 'changes'> {
  changes?: Array<Omit<z.input<typeof changeSchema>, 'type'> & { type: string }>;
  stratagems?: Array<
    Omit<z.input<typeof stratagemSchema>, 'phase' | 'turn'> & {
      phase: string | string[];
      turn: string;
    }
  >;
}
