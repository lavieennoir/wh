import Navbar from '@/src/components/layout/Navbar';
import RosterForm from '@/src/components/rosters/RosterForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'New Roster',
};

export default function NewRosterPage() {
  return (
    <>
      <Navbar title="New Roster" backButtonHref="/rosters" />
      <main className="p-2 pb-16">
        <RosterForm />
      </main>
    </>
  );
}
