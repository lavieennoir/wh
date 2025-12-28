'use client';
import ChevronLeftIcon from '@/public/icons/chevron-left.svg';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export interface NavbarProps {
  title: string;
  hideBackButton?: boolean;
  backButtonHref?: string;
}

export default function Navbar({ title, hideBackButton = false, backButtonHref }: NavbarProps) {
  const pathname = usePathname();
  // remove the last part of the pathname by default to move up one level
  const href = backButtonHref ?? pathname.split('/').slice(0, -1).join('/');

  return (
    <nav className="navbar bg-base-100 shadow-sm gap-2">
      {!hideBackButton && (
        <Link href={href || '/'} className="btn btn-circle btn-ghost">
          <ChevronLeftIcon className="size-4" />
        </Link>
      )}
      <h1 className={hideBackButton ? 'ml-12' : ''}>{title}</h1>
    </nav>
  );
}
