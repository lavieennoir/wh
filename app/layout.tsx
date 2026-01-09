import ServiceWorkerManager from '@/src/components/layout/ServiceWorkerManager';
import ThemeLoader from '@/src/components/layout/ThemeLoader';
import Head from 'next/head';
import './globals.css';

export default function RootLayout({ children }: Readonly<React.PropsWithChildren>) {
  return (
    <html lang="en">
      <ThemeLoader />
      <Head>
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <body className="bg-base-100 max-w-5xl mx-auto">
        <ServiceWorkerManager />
        {children}
      </body>
    </html>
  );
}
