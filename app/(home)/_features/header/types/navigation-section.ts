import { isNavigationBase, NavigationBase } from './navigation-base';
import { isNavigationItem, NavigationItem } from './navigation-item';

export type NavigationSection = NavigationBase & {
  items: NavigationItem[];
};

export const isNavigationSection = (item: unknown): item is NavigationSection => {
  if (item === null || item === undefined || typeof item !== 'object') {
    return false;
  }

  const maybeItem = item as Record<string, unknown>;

  const isItemsArray = Array.isArray(maybeItem.items) && maybeItem.items.every((item) => isNavigationItem(item));

  return isNavigationBase(item) && isItemsArray;
};
