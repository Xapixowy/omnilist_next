import { createContext, ReactNode, useContext, useState } from 'react';

type SearchBarContext = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const SearchBarContext = createContext<SearchBarContext | undefined>(undefined);

export const useSearchBarContext = () => {
  const context = useContext(SearchBarContext);

  if (context === undefined) {
    throw new Error('useSearchBarContext must be used within a SearchBarProvider');
  }

  return context;
};

export const SearchBarProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return <SearchBarContext.Provider value={{ isOpen, setIsOpen }}>{children}</SearchBarContext.Provider>;
};
