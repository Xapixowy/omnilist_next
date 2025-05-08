import { TFunction } from 'i18next';
import { isNavigationItem, NavigationItem } from '../types/navigation-item';
import { NavigationSection } from '../types/navigation-section';

const translateItem = (item: NavigationItem, t: TFunction) => ({
  ...item,
  title: t(item.title),
});

export const translateNavigationList = (
  items: (NavigationItem | NavigationSection)[],
  t: TFunction,
): (NavigationItem | NavigationSection)[] => {
  return items.map((item) =>
    isNavigationItem(item)
      ? translateItem(item, t)
      : { ...item, title: t(item.title), items: item.items.map((item) => translateItem(item, t)) },
  );
};
