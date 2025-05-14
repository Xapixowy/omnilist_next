import { LAYOUT_CONFIG } from '@/app/(home)/_configs/layout-config';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { filterNavigationItems } from '../functions/filter-navigation-items';
import { translateNavigationItems } from '../functions/translate-navigation-items';
import { isNavigationItem, NavigationItem } from '../types/navigation-item';

export const useNavigationAuthItems = (): NavigationItem[] => {
  const pathname = usePathname();
  const t = useTranslations('layouts.home');

  const isLoggedIn = false;

  return translateNavigationItems(
    filterNavigationItems(LAYOUT_CONFIG.navigationAuthItems, isLoggedIn, pathname),
    t,
  ).filter((item) => isNavigationItem(item));
};
