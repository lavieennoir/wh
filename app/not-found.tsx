import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="h-screen flex items-center justify-center flex-col gap-2">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-lg">Page not found</p>
      <Link href="/" className="btn btn-outline btn-primary btn-lg">
        ← Back to home
      </Link>
    </div>
  );
}
