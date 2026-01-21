import Navbar from '@/src/components/layout/Navbar';
import RosterIssues from '@/src/components/rosters/RosterIssues';
import { Suspense } from 'react';

export default function RosterIssuesPage() {
  return (
    <>
      <Navbar title="Errors" backButtonHref="/rosters" />
      <main className="p-2 pb-16">
        <Suspense>
          <RosterIssues />
        </Suspense>
      </main>
    </>
  );
}
