import Navbar from '@/src/components/layout/Navbar';
import EditRoster from '@/src/components/rosters/EditRoster';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit Roster',
};

export default function EditRosterPage() {
  return (
    <>
      <Navbar title="Edit Roster" backButtonHref="/rosters" />
      <main className="p-2 pb-16">
        <EditRoster />
      </main>
    </>
  );
}
