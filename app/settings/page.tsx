import Navbar from '@/src/components/Navbar';
import ThemeController from '@/src/components/ThemeController';
import { getTheme, updateTheme } from '@/src/lib/theme';

export default async function SettingsPage() {
  const theme = await getTheme();

  return (
    <>
      <Navbar title="Settings" hideBackButton />
      <main className="p-2 pb-16">
        <div className="flex flex-row gap-2 items-center justify-b">
          UI Theme <ThemeController value={theme} formAction={updateTheme} />
        </div>
      </main>
    </>
  );
}
