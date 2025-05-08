import { NavigationItem } from '@/layouts/home-layout/features/navigation/types/navigation-item';
import { UserMenuItem } from '@/layouts/home-layout/types/user-menu-item';
import { createContext, ReactNode, useContext, useState } from 'react';
import { NavigationSection } from '../types/navigation-section';

type NavigationContextType = {
  navigationCollapsedItem: string | null;
  navigationMobileDrawerVisibility: boolean;
  setNavigationCollapsedItem: (navigationCollapsedItem: string | null) => void;
  setNavigationMobileDrawerVisibility: (navigationMobileDrawerVisibility: boolean) => void;
};

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const useNavigationContext = (): NavigationContextType => {
  const context = useContext(NavigationContext);

  if (context === undefined) {
    throw new Error('useNavigationContext must be used within a NavigationProvider');
  }

  return context;
};

export const NavigationProvider = (props: {
  navigationLists: (NavigationItem | NavigationSection)[][];
  userMenuItems: UserMenuItem[];
  children: ReactNode;
}) => {
  const [navigationCollapsedItem, setNavigationCollapsedItem] = useState<string | null>(null);
  const [navigationMobileDrawerVisibility, setNavigationMobileDrawerVisibility] = useState<boolean>(false);

  return (
    <NavigationContext.Provider
      value={{
        navigationCollapsedItem,
        navigationMobileDrawerVisibility,
        setNavigationCollapsedItem,
        setNavigationMobileDrawerVisibility,
      }}
    >
      {props.children}
    </NavigationContext.Provider>
  );
};
