import ThemeLoader from '@/src/components/ThemeLoader';
import Head from 'next/head';
import './globals.css';

export default function RootLayout({ children }: Readonly<React.PropsWithChildren>) {
  return (
    <html lang="en">
      <ThemeLoader />
      <Head>
        <link rel="icon" href="/icon?<generated>" type="image/<generated>" sizes="<generated>" />
        <link
          rel="apple-touch-icon"
          href="/apple-icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
      </Head>
      <body className="bg-base-100">{children}</body>
    </html>
  );
}
