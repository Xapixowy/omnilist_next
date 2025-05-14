'use client';

import { DiscordPresenceProvider } from '@/features/discord-presence-link/contexts/discord-presence-status';
import { ReactNode } from 'react';
import Footer from './_components/layout/footer';
import { LAYOUT_CONFIG } from './_configs/layout-config';
import Header from './_features/header/header';
import SearchBarModal from './_features/search-bar/_components/search-bar-modal';
import { SearchBarProvider } from './_features/search-bar/_hooks/use-search-bar';

type HomeLayoutProps = {
  children: ReactNode;
};

const Providers = ({ children }: { children: ReactNode }) => (
  <>
    <DiscordPresenceProvider userId={LAYOUT_CONFIG.discord.userId} status={LAYOUT_CONFIG.discord.status}>
      <SearchBarProvider>{children}</SearchBarProvider>
    </DiscordPresenceProvider>
  </>
);

const Modals = () => (
  <>
    <SearchBarModal />
  </>
);

export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <Providers>
      <div>
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
      <Modals />
    </Providers>
  );
}
