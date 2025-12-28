'use client';
import Navigation from '@/src/components/Navigation';
import { useTheme } from '@/src/hooks/useTheme';
import Head from 'next/head';
import './globals.css';

export default function RootLayout({ children }: Readonly<React.PropsWithChildren>) {
  const [theme] = useTheme();
  console.log('theme', theme);

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
