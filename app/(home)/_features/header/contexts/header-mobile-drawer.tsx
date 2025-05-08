import { createContext, ReactNode, useContext, useState } from 'react';

type HeaderMobileDrawerContext = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean | ((prevValue: boolean) => boolean)) => void;
};

const HeaderMobileDrawerContext = createContext<HeaderMobileDrawerContext | undefined>(undefined);

export const useHeaderMobileDrawerContext = (): HeaderMobileDrawerContext => {
  const context = useContext(HeaderMobileDrawerContext);

  if (context === undefined) {
    throw new Error('useHeaderMobileDrawerContext must be used within a HeaderMobileDrawerProvider');
  }

  return context;
};

export const HeaderMobileDrawerProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <HeaderMobileDrawerContext.Provider value={{ isOpen, setIsOpen }}>{children}</HeaderMobileDrawerContext.Provider>
  );
};
