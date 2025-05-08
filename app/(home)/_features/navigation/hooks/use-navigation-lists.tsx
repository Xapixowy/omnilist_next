import { useTranslation } from 'react-i18next';
import { useMatches } from 'react-router';
import { HOME_LAYOUT_CONFIG } from '../../../configs/home-layout';
import { translateNavigationList } from '../../../functions/translate-navigation-list';
import { NavigationItem } from '../types/navigation-item';
import { isNavigationSection, NavigationSection } from '../types/navigation-section';

const showNavigationItemOrSection = (
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
  items: section.items.filter((item) => showNavigationItemOrSection(item, isLoggedIn, currentRoutePath)),
});

export const useNavigationLists = (isLoggedIn: boolean): (NavigationItem | NavigationSection)[][] => {
  const { t } = useTranslation();
  const matches = useMatches();
  const currentRoutePath = matches[matches.length - 1].pathname;

  return HOME_LAYOUT_CONFIG.navigationLists
    .map((list) =>
      list
        .filter((item) =>
          isNavigationSection(item) ? filterNavigationSectionItems(item, isLoggedIn, currentRoutePath) : true,
        )
        .filter((item) => showNavigationItemOrSection(item, isLoggedIn, currentRoutePath)),
    )
    .map((list) => translateNavigationList(list, t));
};
