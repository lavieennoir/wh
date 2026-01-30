import { PwaInstallAlert } from '@/src/components/common/PwaInstallAlert';
import Navbar from '@/src/components/layout/Navbar';
import RosterList from '@/src/components/rosters/RostersList';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Rosters',
};

export default function RosterPage() {
  return (
    <>
      <Navbar title="Rosters" hideBackButton />
      <main className="p-2 pb-16">
        <PwaInstallAlert className="mb-4" />
        <RosterList />
        <div className="fab bottom-20">
          <Link
            href="/rosters/new"
            className="btn btn-lg btn-circle bg-neutral-content text-neutral opacity-80 items-baseline"
          >
            <span className="text-3xl leading-11">+</span>
          </Link>
        </div>
      </main>
    </>
  );
}
