'use client';
import ComingSoonAlert from '@/src/components/common/ComingSoonAlert';
import Navbar from '@/src/components/layout/Navbar';
import { useRosterFromUrl } from '@/src/hooks/useRosterFromUrl';
import { notFound } from 'next/navigation';

export default function RosterDetailsPage() {
  const { roster, isLoading } = useRosterFromUrl();
  if (isLoading) {
    return null;
  }
  if (!roster) {
    return notFound();
  }

  return (
    <>
      <Navbar title={roster.name} backButtonHref="/rosters" />
      <main className="p-2 pb-16">
        <ComingSoonAlert subtitle="Roster details are not yet available" />
      </main>
    </>
  );
}
