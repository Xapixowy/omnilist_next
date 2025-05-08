import { useTranslations } from 'next-intl';
import { isNavigationItem, NavigationItem } from '../types/navigation-item';
import { NavigationSection } from '../types/navigation-section';

export const translateNavigationItems = (
  items: (NavigationItem | NavigationSection)[],
  t: ReturnType<typeof useTranslations>,
): (NavigationItem | NavigationSection)[] => {
  return items.map((item) =>
    isNavigationItem(item)
      ? { ...item, title: t(item.title) }
      : {
          ...item,
          title: t(item.title),
          items: item.items.map((subItem) => ({ ...subItem, title: t(subItem.title) })),
        },
  );
};
