import ComingSoonAlert from '@/src/components/common/ComingSoonAlert';
import Navbar from '@/src/components/layout/Navbar';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rosters',
};

export default function RosterPage() {
  return (
    <>
      <Navbar title="Rosters" hideBackButton />
      <main className="p-2 pb-16">
        <ComingSoonAlert subtitle="Rosters are not yet available" />
      </main>
    </>
  );
}
