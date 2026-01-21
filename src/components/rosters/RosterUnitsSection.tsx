import EllipsisVerticalIcon from '@/public/icons/ellipsis-vertical.svg';
import { ShortRoster } from '@/src/hooks/useRostersList';
import { armyDataSheetBySlugMaps } from '@/src/lib/data-sheets';
import { computeUnitsPoints, copyRosterUnit, getUnitCost, RosterUnitType } from '@/src/lib/roster';
import { capitalize, kebabCaseToTitleCase } from '@/src/lib/string.utils';
import { DataSheet } from '@/src/schemas/data-sheet.schema';
import { RosterDetails } from '@/src/schemas/roster.schema';
import clsx from 'clsx';
import Link from 'next/link';
import { Fragment, SetStateAction } from 'react';
import { Popover } from '../common/Popover';

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
  const pointsUsed = computeUnitsPoints(unistOfType, roster.army);

  const handleDeleteUnit = (unitId: string) => () => {
    setRosterDetails((prev) => {
      if (!prev) {
        return prev;
      }
      return { ...prev, units: prev.units.filter((u) => u.id !== unitId) };
    });
  };

  const handleDuplicateUnit = (unitId: string) => () => {
    setRosterDetails((prev) => {
      if (!prev) {
        return prev;
      }

      const unitIdx = prev.units.findIndex((u) => u.id === unitId);
      if (unitIdx === -1) {
        return prev;
      }
      const newUnits = [
        ...prev.units.slice(0, unitIdx),
        copyRosterUnit(prev.units[unitIdx]),
        ...prev.units.slice(unitIdx),
      ];
      return { ...prev, units: newUnits };
    });
  };
  return (
    <div>
      <div className="flex justify-between items-center bg-base-content text-base-300 gap-2 p-2">
        <h2 className="text-lg font-bold capitalize mr-auto">{kebabCaseToTitleCase(type)}</h2>
        <span className={clsx(pointsUsed > 0 ? 'visible' : 'invisible', 'text-sm font-bold px-4')}>
          {pointsUsed} Points
        </span>
        <Link
          href={`/rosters/add-unit/${type}?rosterId=${roster.id}`}
          className="btn btn-sm btn-outline"
        >
          +
        </Link>
      </div>
      <div>
        {unistOfType.map((unit) => (
          <Fragment key={unit.id}>
            <Link
              href={`/rosters/edit-unit?rosterId=${encodeURIComponent(
                roster.id,
              )}&unitId=${encodeURIComponent(unit.id)}`}
              key={unit.id}
              role="button"
              className="w-full grid grid-cols-[1fr_auto_auto] grid-rows-[auto_1fr] gap-2 p-2 pr-1 pt-1 min-h-36 border border-t-0 border-base-300"
            >
              <h3 className="font-bold text-left pt-1 flex flex-col">
                {unit.models.some((model) => model.isWarlord) && (
                  <span className="badge badge-info font-bold">Warlord</span>
                )}
                {unit.name}
              </h3>
              <span className="pt-1">
                <span className="badge badge-info font-bold">
                  {armyDataSheetBySlugMaps[roster.army]?.[unit.dataSheetSlug]?.unitComposition
                    ? getUnitCost(
                        unit,
                        armyDataSheetBySlugMaps[roster.army]?.[unit.dataSheetSlug]?.unitComposition,
                      )
                    : 0}{' '}
                  Points
                </span>
              </span>
              <ul className="col-span-2 list-disc list-inside text-left">
                {unit.models.length > 1 ? (
                  unit.models.map((model) => (
                    <Fragment key={model.name}>
                      <li key={model.name}>
                        {model.amount} x {model.name}
                      </li>
                      <ul className="list-[circle] list-inside pl-6">
                        {model.wargear.map((wargear) => (
                          <li key={wargear.name}>
                            {wargear.amount} x {capitalize(wargear.name)}
                          </li>
                        ))}
                      </ul>
                    </Fragment>
                  ))
                ) : (
                  <ul className="list-disc list-inside">
                    {unit.models[0].wargear.map((wargear) => (
                      <li key={wargear.name}>
                        {wargear.amount} x {capitalize(wargear.name)}
                      </li>
                    ))}
                  </ul>
                )}
              </ul>
              <Popover
                className="menu bg-base-200 rounded-box shadow-xl"
                component="ul"
                aria-label="Unit actions"
                onClick={(e) => e.preventDefault()}
                popoverContent={
                  <>
                    <li>
                      <button type="button" onClick={handleDeleteUnit(unit.id)}>
                        Delete
                      </button>
                    </li>
                    <li>
                      <button type="button" onClick={handleDuplicateUnit(unit.id)}>
                        Duplicate
                      </button>
                    </li>
                  </>
                }
              >
                <button
                  type="button"
                  className="row-start-1 col-start-3 row-span-2 btn btn-circle btn-ghost"
                  onClick={(e) => e.preventDefault()}
                >
                  <EllipsisVerticalIcon className="size-6" />
                </button>
              </Popover>
            </Link>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
