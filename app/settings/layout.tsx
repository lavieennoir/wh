import Navigation from '@/src/components/Navigation';

export default function RootLayout({ children }: Readonly<React.PropsWithChildren>) {
  return (
    <>
      {children}
      <Navigation activeTab="settings" />
    </>
  );
}
