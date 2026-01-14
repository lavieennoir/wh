import { z } from 'zod';

export const rosterValidationSchema = z.object({
  id: z.string(),
  units: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      points: z.number(),
      dataSheetSlug: z.string(),
    }),
  ),
});

export type RosterDetails = z.infer<typeof rosterValidationSchema>;
