import { PwaInstallAlert } from '@/src/components/common/PwaInstallAlert';
import Navbar from '@/src/components/layout/Navbar';
import Navigation from '@/src/components/layout/Navigation';
import ArmiesList from '@/src/components/rules/ArmiesList';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'WH',
};

export default function Home() {
  return (
    <>
      <Navbar title="Armies" hideBackButton />
      <main className="p-2 pb-16">
        <PwaInstallAlert className="mb-4" />
        <ArmiesList />
      </main>
      <Navigation activeTab="references" />
    </>
  );
}
