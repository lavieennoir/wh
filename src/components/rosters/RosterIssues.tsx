'use client';
import { useFullRosterFromUrl } from '@/src/hooks/useFullRosterFromUrl';
import { rosterValidationSchema } from '@/src/schemas/roster.schema';
import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';
import Markdown from 'react-markdown';
import { z } from 'zod';

export default function RosterIssues() {
  const { roster, isLoading } = useFullRosterFromUrl();
  const [issues, setIssues] = useState<z.core.$ZodIssue[] | null>(null);

  useEffect(() => {
    rosterValidationSchema.safeParseAsync(roster).then((result) => {
      setIssues(result.success ? [] : result.error.issues);
    });
  }, [roster]);

  if (isLoading) {
    return null;
  }
  if (!roster) {
    return notFound();
  }

  if (!issues?.length) {
    return (
      <div role="alert" className="alert">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 shrink-0 stroke-current text-success"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>Your army is valid - Prepare for battle!</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {issues.map((issue, idx) => (
        <div key={idx} role="alert" className="alert">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current text-warning"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <Markdown>{issue.message}</Markdown>
        </div>
      ))}
    </div>
  );
}
