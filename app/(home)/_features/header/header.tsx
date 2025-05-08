'use client';

import BrandLink from '@/components/global/brand-link';
import MaxWidthWrapper from '@/components/layout/max-width-wrapper';
import { cn } from '@/functions/cn';
import { ReactNode, useEffect, useState } from 'react';
import MobileDrawer from './components/mobile-drawer';
import Navigation from './components/navigation';
import NavigationHamburger from './components/navigation-hamburger';
import { HeaderMobileDrawerProvider } from './contexts/header-mobile-drawer';

const Providers = ({ children }: { children: ReactNode }) => {
  return <HeaderMobileDrawerProvider>{children}</HeaderMobileDrawerProvider>;
};

export default function Header() {
  const [isHeaderOnTop, setIsHeaderOnTop] = useState(true);

  const handleScroll = () => {
    setIsHeaderOnTop(window.scrollY === 0);
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll);
  }, []);

  return (
    <Providers>
      <header
        className={cn('sticky top-0 h-20 bg-transparent z-999', {
          'bg-zinc-950/80': !isHeaderOnTop,
        })}
      >
        <MaxWidthWrapper className='flex h-20 items-center justify-between gap-8 px-8'>
          <BrandLink />
          <Navigation className='hidden sm:flex' />
          <NavigationHamburger />
        </MaxWidthWrapper>
      </header>
      <MobileDrawer />
    </Providers>
  );
}
