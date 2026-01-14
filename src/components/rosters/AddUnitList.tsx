'use client';
import { useFullRosterFromUrl } from '@/src/hooks/useFullRosterFromUrl';
import { armyDataSheets } from '@/src/lib/data-sheets';
import { rosterFilterUnitsBySection, RosterUnitType } from '@/src/lib/roster';
import { capitalize, kebabCaseToTitleCase } from '@/src/lib/string.utils';
import { DataSheet } from '@/src/schemas/data-sheet.schema';
import { notFound, useRouter } from 'next/navigation';
import ComingSoonAlert from '../common/ComingSoonAlert';
import ListItemLink from '../common/ListItemLink';
import Navbar from '../layout/Navbar';

export interface AddUnitListProps {
  type: RosterUnitType;
}

export default function AddUnitList({ type }: AddUnitListProps) {
  const { roster, addUnit, isLoading } = useFullRosterFromUrl();
  const router = useRouter();

  if (isLoading) {
    return null;
  }
  if (!roster) {
    notFound();
  }

  const filter = rosterFilterUnitsBySection[type as RosterUnitType];
  const dataSheets = armyDataSheets[roster.army]?.filter(filter) ?? [];
  const title = capitalize(kebabCaseToTitleCase(type));

  const handleAddUnit = (dataSheet: DataSheet) => (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    addUnit(dataSheet);
    router.push(`/rosters/details?rosterId=${encodeURIComponent(roster.id)}`);
  };

  return (
    <>
      <Navbar
        title={title}
        backButtonHref={`/rosters/details?rosterId=${encodeURIComponent(roster.id)}`}
      />
      <main className="p-2 pb-16">
        {type === RosterUnitType.AlliedUnits ? (
          <ComingSoonAlert />
        ) : (
          <ul className="list flex flex-col gap-2">
            {dataSheets.length === 0 && (
              <ComingSoonAlert subtitle="Datasheets are not yet available" />
            )}
            {dataSheets.map((dataSheet) => (
              <li key={dataSheet.slug}>
                <ListItemLink
                  className="h-auto py-2"
                  href={`/${roster.army}/datasheets/${dataSheet.slug}`}
                  icon={
                    <div className="flex flex-col items-center gap-2">
                      <button className="btn btn-outline btn-sm" onClick={handleAddUnit(dataSheet)}>
                        +
                      </button>
                      <div className="badge badge-soft badge-info">
                        {dataSheet.unitComposition.cost[0]?.points ?? 'N/A'} Points
                      </div>
                    </div>
                  }
                >
                  {dataSheet.name}
                </ListItemLink>
              </li>
            ))}
          </ul>
        )}
      </main>
    </>
  );
}
