import Navbar from '@/src/components/layout/Navbar';
import ExpandAllUnitsByDefaultControl from '@/src/components/settings/ExpandAllUnitsByDefaultControl';
import ThemeController from '@/src/components/settings/ThemeController';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Settings',
};

export default async function SettingsPage() {
  return (
    <>
      <Navbar title="Settings" hideBackButton />
      <main className="p-2 pb-16 flex flex-col gap-4">
        <div className="flex flex-row gap-2 items-center">
          UI Theme <ThemeController />
        </div>
        <ExpandAllUnitsByDefaultControl />
      </main>
    </>
  );
}
