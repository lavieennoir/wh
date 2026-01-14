'use client';
import EllipsisVerticalIcon from '@/public/icons/ellipsis-vertical.svg';
import InformationCircleIcon from '@/public/icons/information-circle.svg';
import { useShortRosterList } from '@/src/hooks/useRostersList';
import { kebabCaseToTitleCase } from '@/src/lib/string.utils';
import Link from 'next/link';
import { Popover } from '../common/Popover';
import RosterMenu from './RosterMenu';

export default function RosterList() {
  const { rosters } = useShortRosterList();

  if (rosters.length === 0) {
    return (
      <div role="alert" className="alert alert-vertical sm:alert-horizontal">
        <InformationCircleIcon className="size-6 shrink-0 stroke-info" />
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between w-full">
          <div>
            <h3 className="font-bold">You don&apos;t have any rosters yet</h3>
            <div className="text-xs">Get started by creating a new roster</div>
          </div>
          <Link href="/rosters/new" className="btn btn-primary btn-outline">
            Create New Roster
          </Link>
        </div>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-2 pb-18">
      {rosters.map((roster) => (
        <li key={roster.id}>
          <Link
            href={`/rosters/details?rosterId=${encodeURIComponent(roster.id)}`}
            className="p-0 btn flex h-24 justify-between items-stretch"
            data-roster-id={roster.id}
          >
            <div className="p-3 flex flex-col justify-between text-left shrink-0 max-w-2/3 sm:max-w-3/4">
              <p className="truncate text-lg pl-2.75 mb-2">{roster.name}</p>
              <p className="badge badge-soft">{roster.points} points</p>
            </div>
            <div className="text-sm text capitalize text-right truncate">
              <Popover
                className="menu bg-base-200 rounded-box shadow-xl"
                component="ul"
                popoverContent={<RosterMenu roster={roster} />}
                aria-label="Roster actions"
                onClick={(e) => e.preventDefault()}
              >
                <button
                  type="button"
                  className="btn btn-circle btn-ghost"
                  onClick={(e) => e.preventDefault()}
                >
                  <EllipsisVerticalIcon className="size-4" />
                </button>
              </Popover>
              <p className="pr-3">{kebabCaseToTitleCase(roster.army)}</p>
              <p className="pr-3 pb-3">{kebabCaseToTitleCase(roster.detachmentName)}</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
