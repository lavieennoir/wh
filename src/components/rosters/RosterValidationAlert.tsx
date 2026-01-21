import { ShortRoster } from '@/src/hooks/useRostersList';
import { computeUnitsPoints } from '@/src/lib/roster';
import { RosterDetails, rosterValidationSchema } from '@/src/schemas/roster.schema';
import clsx from 'clsx';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export interface RosterValidationAlertProps {
  roster: ShortRoster & RosterDetails;
}

export default function RosterValidationAlert({ roster }: RosterValidationAlertProps) {
  const [isValid, setIsValid] = useState(false);

  const pointsUsed = computeUnitsPoints(roster.units, roster.army);

  useEffect(() => {
    rosterValidationSchema.safeParseAsync(roster).then((result) => {
      setIsValid(result.success);
    });
  }, [roster]);

  return (
    <Link
      href={`/rosters/issues?rosterId=${encodeURIComponent(roster.id)}`}
      className={clsx('fixed bottom-20 left-2 alert p-0')}
    >
      <div
        className={clsx(
          'shrink-0 stroke-current px-4 py-2 h-full rounded-l-lg flex items-center justify-center',
          isValid ? 'bg-success text-success-content' : 'bg-warning text-warning-content',
        )}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24">
          {isValid ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          )}
        </svg>
      </div>
      <div className="flex flex-col pr-4 py-2">
        <span className="font-bold">
          {pointsUsed} / {roster.points}
        </span>
        <span className="uppercase">Points</span>
      </div>
    </Link>
  );
}
