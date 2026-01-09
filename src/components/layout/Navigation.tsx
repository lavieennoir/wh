import Cog6ToothIcon from '@/public/icons/6-cog-tooth.svg';
import BarsBottomLeftIcon from '@/public/icons/bars-3-bottom-left.svg';
import BookmarkSquareIcon from '@/public/icons/bookmark-square.svg';
import Link from 'next/link';

const tabs = [
  {
    key: 'references',
    label: 'References',
    icon: BookmarkSquareIcon,
    href: '/',
  },
  {
    key: 'rosters',
    label: 'Rosters',
    icon: BarsBottomLeftIcon,
    href: '/rosters',
  },
  {
    key: 'settings',
    label: 'Settings',
    icon: Cog6ToothIcon,
    href: '/settings',
  },
] as const;

type NavigationTabKey = (typeof tabs)[number]['key'];

export interface NavigationProps {
  activeTab: NavigationTabKey;
}

export default function Navigation({ activeTab }: NavigationProps) {
  return (
    <footer className="dock dock-md max-w-5xl mx-auto">
      {tabs.map((tab) => (
        <Link key={tab.key} href={tab.href} className={activeTab === tab.key ? 'dock-active' : ''}>
          <tab.icon className="size-4" />
          <span className="dock-label">{tab.label}</span>
        </Link>
      ))}
    </footer>
  );
}
