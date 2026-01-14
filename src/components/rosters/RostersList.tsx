'use client';
import InformationCircleIcon from '@/public/icons/information-circle.svg';
import { useShortRosterList } from '@/src/hooks/useRostersList';
import { kebabCaseToTitleCase } from '@/src/lib/string.utils';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RosterList() {
  const { rosters } = useShortRosterList();
  const router = useRouter();

  const handleEditRoster = (id: string) => (event: React.MouseEvent<HTMLButtonElement>) => {
    router.push(`/rosters/edit?rosterId=${encodeURIComponent(id)}`);
  };

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
    <ul className="flex flex-col gap-2">
      {rosters.map((roster) => (
        <li key={roster.id}>
          <Link
            href={`/rosters/details?rosterId=${encodeURIComponent(roster.id)}`}
            className="btn flex h-24 p-4 justify-between items-start"
          >
            <div className="text-left shrink-0 max-w-2/3 sm:max-w-3/4">
              <p className="truncate text-lg pl-2.75 mb-2">{roster.name}</p>
              <p className="badge badge-soft">{roster.points} points</p>
            </div>
            <div className="text-sm text capitalize text-right truncate">
              <p>{kebabCaseToTitleCase(roster.army)}</p>
              <p>{kebabCaseToTitleCase(roster.detachmentName)}</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
