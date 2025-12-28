import Navigation from '@/src/components/Navigation';
import { getTheme } from '@/src/lib/theme';
import type { Metadata } from 'next';
import Head from 'next/head';
import './globals.css';

export const metadata: Metadata = {
  title: 'WH',
};

export default async function RootLayout({ children }: Readonly<React.PropsWithChildren>) {
  const theme = await getTheme();

  return (
    <html lang="en" data-theme={theme ?? undefined}>
      <Head>
        <link rel="icon" href="/icon?<generated>" type="image/<generated>" sizes="<generated>" />
        <link
          rel="apple-touch-icon"
          href="/apple-icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
      </Head>
      <body className="bg-base-100">
        {children}
        <Navigation />
      </body>
    </html>
  );
}
