import { notFound } from 'next/navigation';

export enum Army {
  ChaosDaemons = 'chaos-daemons',
  DeathGuard = 'death-guard',
}

export const defaultArmyFactions: Record<Army, string> = {
  [Army.ChaosDaemons]: 'Legiones Daemonica',
  [Army.DeathGuard]: 'Death Guard',
};

export function getArmyOrNotFound(army: string): Army {
  const armyEnum = Object.values(Army).find((a) => a === army);
  if (!armyEnum) {
    notFound();
  }
  return armyEnum;
}
