'use client';
import BunkerIcon from '@/public/icons/bunker.svg';
import EllipsisVerticalIcon from '@/public/icons/ellipsis-vertical.svg';
import { Popover } from '@/src/components/common/Popover';
import Navbar from '@/src/components/layout/Navbar';
import RosterMenu, { RosterMenuProps } from '@/src/components/rosters/RosterMenu';
import RosterUnitsSection from '@/src/components/rosters/RosterUnitsSection';
import RosterValidationAlert from '@/src/components/rosters/RosterValidationAlert';
import { useFullRosterFromUrl } from '@/src/hooks/useFullRosterFromUrl';
import { rosterFilterUnitsBySection, RosterUnitType } from '@/src/lib/roster';
import Link from 'next/link';
import { notFound, useRouter } from 'next/navigation';

const enabledRosterMenuOptions: RosterMenuProps['enabledOptions'] = ['edit', 'delete'];

export default function RosterDetails() {
  const router = useRouter();
  const { roster, isLoading, setRosterDetails } = useFullRosterFromUrl();

  if (isLoading) {
    return null;
  }
  if (!roster) {
    return notFound();
  }

  return (
    <>
      <Navbar
        title={roster.name}
        backButtonHref="/rosters"
        actions={
          <>
            <Link
              href={`/rosters/bunker?rosterId=${encodeURIComponent(roster.id)}`}
              className="btn btn-circle btn-ghost ml-auto"
            >
              <BunkerIcon className="size-8" />
            </Link>
            <Popover
              popoverContent={
                <RosterMenu
                  roster={roster}
                  enabledOptions={enabledRosterMenuOptions}
                  onDeleteClick={() => router.push('/rosters')}
                />
              }
              className="menu bg-base-200 rounded-box shadow-xl"
            >
              <button className="btn btn-circle btn-ghost">
                <EllipsisVerticalIcon className="size-6" />
              </button>
            </Popover>
          </>
        }
      />
      <main className="py-2 pb-16">
        <RosterUnitsSection
          roster={roster}
          setRosterDetails={setRosterDetails}
          type={RosterUnitType.Characters}
          filter={rosterFilterUnitsBySection[RosterUnitType.Characters]}
        />
        <RosterUnitsSection
          roster={roster}
          setRosterDetails={setRosterDetails}
          type={RosterUnitType.Battleline}
          filter={rosterFilterUnitsBySection[RosterUnitType.Battleline]}
        />
        <RosterUnitsSection
          roster={roster}
          setRosterDetails={setRosterDetails}
          type={RosterUnitType.DedicatedTransport}
          filter={rosterFilterUnitsBySection[RosterUnitType.DedicatedTransport]}
        />
        <RosterUnitsSection
          roster={roster}
          setRosterDetails={setRosterDetails}
          type={RosterUnitType.OtherDatasheets}
          filter={rosterFilterUnitsBySection[RosterUnitType.OtherDatasheets]}
        />
        <RosterUnitsSection
          roster={roster}
          setRosterDetails={setRosterDetails}
          type={RosterUnitType.AlliedUnits}
          filter={rosterFilterUnitsBySection[RosterUnitType.AlliedUnits]}
        />
        <RosterValidationAlert roster={roster} />
      </main>
    </>
  );
}
