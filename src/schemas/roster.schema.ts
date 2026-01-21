import { z } from 'zod';
import { Army } from '../lib/army';
import { armyDataSheetBySlugMaps } from '../lib/data-sheets';
import { computeUnitsPoints } from '../lib/roster';

export const unitValidationSchema = z.object({
  id: z.string(),
  name: z.string(),
  dataSheetSlug: z.string(),
  demonicAllegiance: z.enum(['khorne', 'tzeentch', 'nurgle', 'slaanesh']).optional(),
  models: z.array(
    z.object({
      name: z.string(),
      amount: z.number(),
      isWarlord: z.boolean().optional(),
      wargear: z.array(
        z.object({
          name: z.string(),
          amount: z.number(),
        }),
      ),
    }),
  ),
});

export const rosterValidationSchema = z
  .object({
    id: z.string(),
    units: z
      .array(unitValidationSchema)
      .refine(
        (units) =>
          units.flatMap((unit) => unit.models).filter((model) => model.isWarlord).length === 1,
        {
          message: 'You must select one **Character** model from your army to be your **Warlord**',
          path: ['units'],
        },
      ),
    points: z.number(),
    army: z.enum(Army, 'Army is required'),
  })
  .superRefine((data, ctx) => {
    const dataSheets = armyDataSheetBySlugMaps[data.army];
    if (!dataSheets) {
      ctx.addIssue({
        code: 'custom',
        path: ['army'],
        message: `Roster's army "${data.army}" is not a valid army.`,
      });
      return;
    }
    const pointsUsed = computeUnitsPoints(data.units, data.army);
    if (pointsUsed > data.points) {
      ctx.addIssue({
        code: 'too_big',
        path: ['points'],
        maximum: data.points,
        origin: 'value',
        message: `You are using more points (${pointsUsed}) than your battle size allows (${data.points})`,
      });
    }
    const supremeCommanders = data.units.filter(
      (unit) => dataSheets[unit.dataSheetSlug]?.supremeCommander,
    );

    const hasWarlord = supremeCommanders.some((unit) =>
      unit.models.some((model) => model.isWarlord),
    );
    if (
      supremeCommanders.length > 0 &&
      hasWarlord &&
      supremeCommanders.every((unit) => !unit.models.some((model) => model.isWarlord))
    ) {
      ctx.addIssue({
        code: 'custom',
        path: ['units'],
        message: 'You must select one of the Supreme Commander units to be your **Warlord**',
      });
    }

    const unitGroups = data.units.reduce((acc, unit) => {
      const count = acc.get(unit.dataSheetSlug) ?? 0;
      acc.set(unit.dataSheetSlug, count + 1);
      return acc;
    }, new Map<string, number>());

    unitGroups.entries().forEach(([dataSheetSlug, count]) => {
      const dataSheet = dataSheets[dataSheetSlug];
      if (dataSheet?.keywords.includes('Epic Hero') && count > 1) {
        ctx.addIssue({
          code: 'custom',
          path: ['units'],
          message: `You have ${count} instances of ${dataSheet.name}. Your army cannot include the same **Epic Hero** more than once.`,
        });
      }

      const maxUnitsCount =
        dataSheet?.keywords.includes('Battleline') ||
        dataSheet?.keywords.includes('Dedicated Transport')
          ? 6
          : 3;
      if (count > maxUnitsCount) {
        ctx.addIssue({
          code: 'custom',
          path: ['units'],
          message: `You have ${count} instances of ${dataSheet.name}. Your army cannot include more than ${maxUnitsCount} instances of this unit`,
        });
      }
    });

    data.units.forEach((unit) => {
      const dataSheet = dataSheets[unit.dataSheetSlug];
      if (dataSheet?.demonicAllegiance && !unit.demonicAllegiance) {
        ctx.addIssue({
          code: 'custom',
          path: ['units'],
          message: `You must select one Demonic Allegiance for ${dataSheet.name}.`,
        });
      }
    });
  });

export type RosterDetails = z.infer<typeof rosterValidationSchema>;
export type RosterUnit = z.infer<typeof unitValidationSchema>;
