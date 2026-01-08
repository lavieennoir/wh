import ChevronLeftIcon from '@/public/icons/chevron-left.svg';
import Link from 'next/link';

export interface NavbarProps {
  title: string;
  hideBackButton?: boolean;
  backButtonHref?: string;
}

export default function Navbar({ title, hideBackButton = false, backButtonHref }: NavbarProps) {
  // Relative href to move up one level by default
  const href = backButtonHref ?? '..';

  return (
    <nav className="navbar bg-base-100 shadow-sm gap-2">
      {!hideBackButton && (
        <Link href={href || '/'} className="btn btn-circle btn-ghost" aria-label="Back">
          <ChevronLeftIcon className="size-4" />
        </Link>
      )}
      <h1 className={hideBackButton ? 'ml-12' : ''}>{title}</h1>
    </nav>
  );
}
