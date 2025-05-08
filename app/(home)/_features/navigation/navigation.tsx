import MaxWidthWrapper from '@/components/layout/max-width-wrapper';
import { useAuthenticationContext } from '@/contexts/authentication';
import { findParrentElementWithDataAttribute } from '@/functions/find-parent-element-with-data-attribute';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import UserMenu from '../../components/user-menu';
import { HOME_LAYOUT_CONFIG } from '../../configs/home-layout';
import { NavigationBrandLink } from './components/navigation-brand-link';
import NavigationHamburger from './components/navigation-hamburger';
import { NavigationList } from './components/navigation-list';
import NavigationMobileDrawer from './components/navigation-mobile-drawer';
import { useNavigationContext } from './contexts/navigation';
import { useNavigationLists } from './hooks/use-navigation-lists';

export const NAVIGATION_COLLAPSE_ITEM_DATA_ATTRIBUTE: string = 'navigation-collapse-item';

const Navigation = () => {
  const { t } = useTranslation();
  const { user, isLoggedIn } = useAuthenticationContext();
  const { setNavigationCollapsedItem } = useNavigationContext();
  const navigationLists = useNavigationLists(isLoggedIn);
  const [isOnTop, setIsOnTop] = useState<boolean>(true);

  const translatedUserMenuItems = HOME_LAYOUT_CONFIG.userMenuItems.map((item) => ({ ...item, title: t(item.title) }));

  const mouseOverHandler = (e: MouseEvent): void => {
    if (!e.target) {
      return;
    }

    const parentElement = findParrentElementWithDataAttribute(
      e.target as HTMLElement,
      NAVIGATION_COLLAPSE_ITEM_DATA_ATTRIBUTE,
    );

    if (parentElement !== null) {
      return;
    }

    setNavigationCollapsedItem(null);
  };

  const handleScroll = () => {
    setIsOnTop(window.scrollY === 0);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('click', mouseOverHandler);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', mouseOverHandler);
    };
  }, []);

  return (
    <>
      <header className={`sticky top-0 h-20 ${!isOnTop ? 'bg-zinc-950/80' : 'bg-transparent'} z-999`}>
        <MaxWidthWrapper className='bg vb flex h-[var(--header-height)] items-center gap-8 px-8'>
          <NavigationBrandLink />
          <nav className='ml-8 hidden flex-1 items-center justify-between gap-8 sm:flex'>
            {navigationLists.map((section, index) => (
              <NavigationList key={index} items={section} />
            ))}
          </nav>
          {user && <UserMenu user={user} menuItems={translatedUserMenuItems} />}
          <NavigationHamburger />
        </MaxWidthWrapper>
      </header>
      <NavigationMobileDrawer />
    </>
  );
};
export default Navigation;
