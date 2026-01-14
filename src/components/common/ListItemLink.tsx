import ChevronRightIcon from '@/public/icons/chevron-right.svg';
import clsx from 'clsx';
import Link, { LinkProps } from 'next/link';

export interface ListItemLinkProps extends LinkProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export default function ListItemLink({
  href,
  children,
  icon,
  className,
  ...props
}: ListItemLinkProps) {
  return (
    <Link
      {...props}
      href={href}
      className={clsx('btn btn-lg flex flex-row items-center justify-between', className)}
    >
      <p className="truncate">{children}</p>
      {icon ?? <ChevronRightIcon className="size-4" />}
    </Link>
  );
}
