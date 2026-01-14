import { ShortRoster } from '@/src/hooks/useRostersList';
import { armyDataSheetBySlugMaps } from '@/src/lib/data-sheets';
import { computeUnitsPoints, RosterUnitType } from '@/src/lib/roster';
import { kebabCaseToTitleCase } from '@/src/lib/string.utils';
import { DataSheet } from '@/src/schemas/data-sheet.schema';
import { RosterDetails } from '@/src/schemas/roster.schema';
import Link from 'next/link';
import { SetStateAction } from 'react';

export interface RosterUnitsSectionProps {
  roster: ShortRoster & RosterDetails;
  setRosterDetails: (roster: SetStateAction<RosterDetails | undefined>) => void;
  filter: (unit: DataSheet) => boolean;
  type: RosterUnitType;
}

export default function RosterUnitsSection({
  roster,
  setRosterDetails,
  filter,
  type,
}: RosterUnitsSectionProps) {
  const unistOfType = roster.units.filter((u) => {
    const dataSheet = armyDataSheetBySlugMaps[roster.army]?.[u.dataSheetSlug];
    return dataSheet && filter(dataSheet);
  });
  const pointsUsed = computeUnitsPoints(unistOfType);

  return (
    <div>
      <div className="flex justify-between items-center bg-base-content text-base-300 p-2">
        <h2 className="text-lg font-bold capitalize">{kebabCaseToTitleCase(type)}</h2>
        <span className={pointsUsed > 0 ? 'visible' : 'invisible'}>{pointsUsed} Points</span>
        <Link
          href={`/rosters/add-unit/${type}?rosterId=${roster.id}`}
          className="btn btn-sm btn-outline"
        >
          +
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {unistOfType.map((unit) => (
          <div key={unit.id} className="card">
            <span>{unit.name}</span>
            <span>{unit.points} Points</span>
          </div>
        ))}
      </div>
    </div>
  );
}
