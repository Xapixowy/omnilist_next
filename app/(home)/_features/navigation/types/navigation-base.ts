export type NavigationBase = {
  id: string;
  title: string;
  hiddenOnRoutes?: string[];
  hiddenIfLoggedIn?: boolean;
  shownOnRoutes?: string[];
  shownIfLoggedIn?: boolean;
};

export const isNavigationBase = (item: unknown): item is NavigationBase => {
  if (item === null || item === undefined || typeof item !== 'object') {
    return false;
  }

  const maybeItem = item as Record<string, unknown>;

  const isIdString = typeof maybeItem.id === 'string';
  const isTitleString = typeof maybeItem.title === 'string';
  const isHiddenOnRoutesArrayOrUndefined =
    Array.isArray(maybeItem.hiddenOnRoutes) || typeof maybeItem.hiddenOnRoutes === 'undefined';
  const isHiddenIfLoggedInBooleanOrUndefined =
    typeof maybeItem.hiddenIfLoggedIn === 'boolean' || typeof maybeItem.hiddenIfLoggedIn === 'undefined';
  const isShownOnRoutesArrayOrUndefined =
    Array.isArray(maybeItem.shownOnRoutes) || typeof maybeItem.shownOnRoutes === 'undefined';
  const isShownIfLoggedInBooleanOrUndefined =
    typeof maybeItem.shownIfLoggedIn === 'boolean' || typeof maybeItem.shownIfLoggedIn === 'undefined';

  return (
    isIdString &&
    isTitleString &&
    isHiddenOnRoutesArrayOrUndefined &&
    isHiddenIfLoggedInBooleanOrUndefined &&
    isShownOnRoutesArrayOrUndefined &&
    isShownIfLoggedInBooleanOrUndefined
  );
};
