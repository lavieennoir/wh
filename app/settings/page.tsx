import Navbar from '@/src/components/Navbar';
import ThemeController from '@/src/components/ThemeController';

export default async function SettingsPage() {
  return (
    <>
      <Navbar title="Settings" hideBackButton />
      <main className="p-2 pb-16">
        <div className="flex flex-row gap-2 items-center justify-b">
          UI Theme <ThemeController />
        </div>
      </main>
    </>
  );
}
