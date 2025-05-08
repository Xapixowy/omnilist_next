import { NavigationItem } from '../types/navigation-item';
import { isNavigationSection, NavigationSection } from '../types/navigation-section';

const shouldShowNavigationItem = (
  item: NavigationItem | NavigationSection,
  isLoggedIn: boolean,
  currentRoutePath: string,
): boolean => {
  if (item.shownIfLoggedIn !== undefined) {
    return item.shownIfLoggedIn && isLoggedIn;
  }

  if (item.hiddenIfLoggedIn !== undefined) {
    return item.hiddenIfLoggedIn && !isLoggedIn;
  }

  if (item.shownOnRoutes !== undefined) {
    return item.shownOnRoutes.includes(currentRoutePath);
  }

  if (item.hiddenOnRoutes !== undefined) {
    return item.hiddenOnRoutes.includes(currentRoutePath);
  }

  return true;
};

const filterNavigationSectionItems = (
  section: NavigationSection,
  isLoggedIn: boolean,
  currentRoutePath: string,
): NavigationSection => ({
  ...section,
  items: section.items.filter((item) => shouldShowNavigationItem(item, isLoggedIn, currentRoutePath)),
});

export const filterNavigationItems = (
  items: (NavigationItem | NavigationSection)[],
  isLoggedIn: boolean,
  currentRoutePath: string,
) =>
  items
    .filter((item) =>
      isNavigationSection(item) ? filterNavigationSectionItems(item, isLoggedIn, currentRoutePath) : true,
    )
    .filter((item) => shouldShowNavigationItem(item, isLoggedIn, currentRoutePath));
