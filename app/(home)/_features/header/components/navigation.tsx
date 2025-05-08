import { LAYOUT_CONFIG } from '@/app/(home)/_configs/layout-config';
import { cn } from '@/functions/cn';
import { useTranslations } from 'next-intl';
import { translateNavigationItems } from '../functions/translate-navigation-items';
import { isNavigationItem } from '../types/navigation-item';
import NavigationItem from './navigation-item';
import NavigationSection from './navigation-section';

type NavigationProps = {
  className?: string;
};

export default function Navigation({ className = '' }: NavigationProps) {
  const t = useTranslations('layouts.home');

  const translatedNavigationItems = translateNavigationItems(LAYOUT_CONFIG.navigationItems, t);

  return (
    <nav>
      <ul className={cn('flex flex-col sm:flex-row sm:items-center sm:justify-end sm:gap-6', className)}>
        {translatedNavigationItems.map((item, index) => (
          <li className='border-t last:border-b border-zinc-600 sm:border-none' key={index}>
            {isNavigationItem(item) ? <NavigationItem {...item} /> : <NavigationSection {...item} />}
          </li>
        ))}
      </ul>
    </nav>
  );
}
