import { LAYOUT_CONFIG } from '@/app/(home)/_configs/layout-config';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { filterNavigationItems } from '../functions/filter-navigation-items';
import { translateNavigationItems } from '../functions/translate-navigation-items';
import { NavigationItem } from '../types/navigation-item';
import { NavigationSection } from '../types/navigation-section';

export const useNavigationItems = (): (NavigationItem | NavigationSection)[] => {
  const pathname = usePathname();
  const t = useTranslations('layouts.home');

  const isLoggedIn = false;

  return translateNavigationItems(filterNavigationItems(LAYOUT_CONFIG.navigationItems, isLoggedIn, pathname), t);
};
