import { AuthClient } from '@/services/api-clients/auth-client';
import { Models } from 'appwrite';
import { createContext, useContext, useEffect, useState } from 'react';

type AuthenticationContextType = {
  user: Models.User<Models.Preferences> | null;
  isLoggedIn: boolean;
  setUser: (user: Models.User<Models.Preferences> | null) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
};

const AuthenticationContext = createContext<AuthenticationContextType | undefined>(undefined);

export const useAuthenticationContext = () => {
  const context = useContext(AuthenticationContext);

  if (context === undefined) {
    throw new Error('useAuthenticationContext must be used within an AuthenticationProvider');
  }

  return context;
};

export const AuthenticationProvider = ({ children }: { children: React.ReactNode }) => {
  const authClient = AuthClient.getInstance();
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const initalizeUser = async (): Promise<void> => {
    const user = await authClient.getUser();

    if (user.error) {
      return;
    }

    setUser(user.data);
    setIsLoggedIn(true);
  };

  useEffect(() => {
    // initalizeUser();
  }, []);

  return (
    <AuthenticationContext.Provider value={{ user, isLoggedIn, setUser, setIsLoggedIn }}>
      {children}
    </AuthenticationContext.Provider>
  );
};
