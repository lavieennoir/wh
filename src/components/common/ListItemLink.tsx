import ChevronRightIcon from '@/public/icons/chevron-right.svg';
import Link from 'next/link';

export interface ListItemLinkProps {
  href: string;
  children: React.ReactNode;
}

export default function ListItemLink({ href, children }: ListItemLinkProps) {
  return (
    <Link href={href} className="btn btn-lg flex flex-row items-center justify-between">
      <p className="truncate">{children}</p>
      <ChevronRightIcon className="size-4" />
    </Link>
  );
}
