import { notFound } from 'next/navigation';

export enum Army {
  ChaosDaemons = 'chaos-daemons',
  DeathGuard = 'death-guard',
}

export function getArmyOrNotFound(army: string): Army {
  const armyEnum = Object.values(Army).find((a) => a === army);
  if (!armyEnum) {
    notFound();
  }
  return armyEnum;
}
