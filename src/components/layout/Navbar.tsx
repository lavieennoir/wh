'use client';

import ChevronLeftIcon from '@/public/icons/chevron-left.svg';
import clsx from 'clsx';
import Link from 'next/link';

export interface NavbarProps {
  title: string;
  hideBackButton?: boolean;
  backButtonHref?: string;
  actions?: React.ReactNode;
}

export default function Navbar({
  title,
  hideBackButton = false,
  backButtonHref,
  actions,
}: NavbarProps) {
  // Relative href to move up one level by default
  const href = backButtonHref ?? '..';

  return (
    <nav className="navbar bg-base-100 shadow-sm gap-2">
      {!hideBackButton && (
        <Link
          id="navigate-back-link"
          href={href || '/'}
          className="btn btn-circle btn-ghost"
          aria-label="Back"
          onClick={(e) => {
            if (window.history.length > 2) {
              e.preventDefault();
              window.history.back();
            }
          }}
        >
          <ChevronLeftIcon className="size-4" />
        </Link>
      )}
      <h1 className={clsx('truncate', hideBackButton && 'ml-12')}>{title}</h1>
      {actions}
    </nav>
  );
}
