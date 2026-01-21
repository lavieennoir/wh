'use client';
import FileIcon from '@/public/icons/file.svg';
import { useFullRosterFromUrl } from '@/src/hooks/useFullRosterFromUrl';
import { armyDataSheetBySlugMaps } from '@/src/lib/data-sheets';
import { getUnitCost } from '@/src/lib/roster';
import { RosterUnit } from '@/src/schemas/roster.schema';
import { produce } from 'immer';
import { ErrorBoundary } from 'next/dist/client/components/error-boundary';
import Link from 'next/link';
import { notFound, useSearchParams } from 'next/navigation';
import { ChangeEvent, useCallback } from 'react';
import Navbar from '../layout/Navbar';
import EditRosterModel from './EditRosterModel';
import RosterValidationAlert from './RosterValidationAlert';

export default function EditRosterUnit() {
  const searchParams = useSearchParams();
  const { roster, isLoading, setRosterDetails } = useFullRosterFromUrl();

  const updateModel = useCallback(
    (unitIdx: number, modelIdx: number) => (model: RosterUnit['models'][number]) => {
      setRosterDetails((prev) => {
        if (!prev) {
          return undefined;
        }
        const updatedUnit = produce(prev.units[unitIdx], (draft) => {
          draft.models[modelIdx] = model;
        });
        return {
          ...prev,
          units: [...prev.units.slice(0, unitIdx), updatedUnit, ...prev.units.slice(unitIdx + 1)],
        };
      });
    },
    [setRosterDetails],
  );
  const updateDemonicAllegiance = useCallback(
    (unitIdx: number) => (e: ChangeEvent<HTMLSelectElement>) => {
      setRosterDetails((prev) => {
        if (!prev) {
          return undefined;
        }
        const updatedUnit = produce(prev.units[unitIdx], (draft) => {
          draft.demonicAllegiance = e.target.value as RosterUnit['demonicAllegiance'];
        });
        return {
          ...prev,
          units: [...prev.units.slice(0, unitIdx), updatedUnit, ...prev.units.slice(unitIdx + 1)],
        };
      });
    },
    [setRosterDetails],
  );

  if (isLoading) {
    return null;
  }

  if (!roster) {
    return notFound();
  }

  const unitId = searchParams.get('unitId');
  const unitIdx = roster.units.findIndex((unit) => unit.id === unitId);
  const unit = roster.units[unitIdx];
  if (unitIdx === -1) {
    return notFound();
  }
  const dataSheet = armyDataSheetBySlugMaps[roster.army]?.[unit.dataSheetSlug];
  if (!dataSheet) {
    return notFound();
  }

  return (
    <>
      <Navbar
        title={unit.name}
        backButtonHref={`/rosters/details?rosterId=${encodeURIComponent(roster.id)}`}
        actions={
          <>
            <span className="badge badge-info font-bold ml-auto">
              {getUnitCost(unit, dataSheet.unitComposition)} Points
            </span>
            <Link
              href={`/${roster.army}/datasheets/${unit.dataSheetSlug}`}
              className="btn btn-circle btn-ghost"
            >
              <FileIcon className="size-6" />
            </Link>
          </>
        }
      />
      <main className="pt-2 pb-16 flex flex-col gap-4">
        <ErrorBoundary
          errorComponent={({ error }) => (
            <div className="alert alert-error">
              <p>
                <strong>Error loading data sheet</strong> {error.message}.
              </p>
            </div>
          )}
        >
          {unit.models.length > 1 ? (
            unit.models.map((model, modelIdx) => (
              <EditRosterModel
                key={model.name}
                model={model}
                updateModel={updateModel(unitIdx, modelIdx)}
                dataSheet={dataSheet}
              />
            ))
          ) : (
            <EditRosterModel
              model={unit.models[0]}
              updateModel={updateModel(unitIdx, 0)}
              dataSheet={dataSheet}
            />
          )}
          {dataSheet.demonicAllegiance && (
            <div className="flex items-center justify-between gap-2 pl-5 pr-2">
              <h3 className="shrink-0">Demonic Allegiance</h3>
              <select
                className="select"
                value={unit.demonicAllegiance ?? ''}
                onChange={updateDemonicAllegiance(unitIdx)}
              >
                <option value="" disabled>
                  None
                </option>
                <option value="khorne">Khorne</option>
                <option value="tzeentch">Tzeentch</option>
                <option value="nurgle">Nurgle</option>
                <option value="slaanesh">Slaanesh</option>
              </select>
            </div>
          )}
        </ErrorBoundary>
        <RosterValidationAlert roster={roster} />
      </main>
    </>
  );
}
