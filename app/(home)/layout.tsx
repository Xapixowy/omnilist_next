'use client';

import { DiscordPresenceProvider } from '@/features/discord-presence-link/contexts/discord-presence-status';
import { ReactNode } from 'react';
import Footer from './_components/layout/footer';
import { LAYOUT_CONFIG } from './_configs/layout-config';
import Header from './_features/header/header';

type HomeLayoutProps = {
  children: ReactNode;
};

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <DiscordPresenceProvider userId={LAYOUT_CONFIG.discord.userId} status={LAYOUT_CONFIG.discord.status}>
        {children}
      </DiscordPresenceProvider>
    </>
  );
};

export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <Providers>
      <div>
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </Providers>
  );
}
