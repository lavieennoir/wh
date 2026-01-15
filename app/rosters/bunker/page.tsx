import ComingSoonAlert from '@/src/components/common/ComingSoonAlert';
import Navbar from '@/src/components/layout/Navbar';

export default function BunkerPage() {
  return (
    <>
      <Navbar title="Bunker" backButtonHref="/rosters" />
      <main className="p-2 pb-16">
        <ComingSoonAlert />
      </main>
    </>
  );
}
