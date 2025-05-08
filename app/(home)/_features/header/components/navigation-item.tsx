'use client';

import { cn } from '@/functions/cn';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IconType } from 'react-icons';
import { useHeaderMobileDrawerContext } from '../contexts/header-mobile-drawer';
import { NavigationItemVariant } from '../types/navigation-item';

const NAVIGATION_ITEM_DEFAULT_VARIANT: NavigationItemVariant = 'default';
const NAVIGATION_ITEM_CLASSES: Record<NavigationItemVariant, string> = {
  default: '',
  primary:
    'bg-zinc-100 sm:outline outline-zinc-100 hover:bg-zinc-100 hover:outline-zinc-100 sm:px-5 sm:py-2 sm:rounded-full sm:-ml-2',
  secondary:
    'bg-zinc-600/30 sm:outline outline-zinc-200/30 hover:outline-zinc-50/50 sm:px-5 sm:py-2 sm:rounded-full sm:-ml-2',
};
const NAVIGATION_ITEM_TITLE_CLASSES: Record<NavigationItemVariant, string> = {
  default: 'text-zinc-400 group-hover:text-zinc-50',
  primary:
    'from-my-accent-500 to-my-secondary-500 bg-gradient-to-r from-20% to-80% bg-clip-text text-transparent transition-colors group-hover:from-my-accent-700 group-hover:to-my-secondary-700',
  secondary: 'text-zinc-200 group-hover:text-zinc-50',
};

export type NavigationItemProps = {
  title: string;
  href: string;
  variant?: NavigationItemVariant;
  icon?: IconType;
  className?: string;
};

export default function NavigationItem({
  title,
  href,
  variant = NAVIGATION_ITEM_DEFAULT_VARIANT,
  icon: Icon,
  className = '',
}: NavigationItemProps) {
  const pathname = usePathname();
  const { setIsOpen } = useHeaderMobileDrawerContext();

  const formattedHref = href.startsWith('/') ? href : `/${href}`;
  const isActive: boolean = pathname.split('?')[0] === formattedHref && variant === 'default';

  return (
    <Link
      href={href}
      onClick={() => setIsOpen(false)}
      className={cn(
        'whitespace-nowrap block sm:inline-block px-8 py-6 sm:p-0 group transition-colors',
        NAVIGATION_ITEM_CLASSES[variant],
        className,
      )}
    >
      <span
        className={cn(NAVIGATION_ITEM_TITLE_CLASSES[variant], {
          'text-gradient--inverse': isActive,
        })}
      >
        {Icon && <Icon />}
        {title}
      </span>
    </Link>
  );
}
