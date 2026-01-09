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
  }),
});

export const detachmentSchema = z.object({
  slug: z.string(),
  name: z.string(),
  description: z.string().optional(),
  rules: z.array(abilitySchema).optional(),
  enchantments: z.array(enchantmentSchema).optional(),
  stratagems: z.array(stratagemSchema).optional(),
});

export const detachmentArrayValidationSchema = z.array(detachmentSchema);

export type Detachment = z.infer<typeof detachmentSchema>;
export type Stratagem = z.infer<typeof stratagemSchema>;
export type Enchantment = z.infer<typeof enchantmentSchema>;

// Allow string input types that are cased to enum after validation
export interface DetachmentValidationInput
  extends Omit<z.input<typeof detachmentSchema>, 'stratagems'> {
  stratagems?: Array<
    Omit<z.input<typeof stratagemSchema>, 'phase' | 'turn'> & {
      phase: string | string[];
      turn: string;
    }
  >;
}
