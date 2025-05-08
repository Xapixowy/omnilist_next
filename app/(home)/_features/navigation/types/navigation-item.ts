import { To } from 'react-router';
import { isNavigationBase, NavigationBase } from './navigation-base';

export type NavigationItemVariant = 'default' | 'primary' | 'secondary';

export type NavigationItem = NavigationBase & {
  link: To;
  variant?: NavigationItemVariant;
};

export const isNavigationItem = (item: unknown): item is NavigationItem => {
  if (item === null || item === undefined || typeof item !== 'object') {
    return false;
  }

  const maybeItem = item as Record<string, unknown>;

  const isLinkString = typeof maybeItem.link === 'string';
  const isVariantStringOrUndefined = typeof maybeItem.variant === 'string' || typeof maybeItem.variant === 'undefined';

  return isNavigationBase(item) && isLinkString && isVariantStringOrUndefined;
};
