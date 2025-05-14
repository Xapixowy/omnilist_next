'use client';

import { LAYOUT_CONFIG } from '@/app/(home)/_configs/layout-config';
import SocialMediaLink from '@/components/ui/social-media-link';
import DiscordPresenceLink from '@/features/discord-presence-link/discord-presence-link';
import { cn } from '@/functions/cn';
import SearchBarButton from '../../search-bar/_components/search-bar-button';
import { useHeaderMobileDrawerContext } from '../contexts/header-mobile-drawer';
import Navigation from './navigation';
import NavigationAuthButtons from './navigation-auth-buttons';

export default function MobileDrawer() {
  const { isOpen, setIsOpen } = useHeaderMobileDrawerContext();

  return (
    <div className={cn('fixed inset-0 bg-zinc-950 z-998 pt-20', { hidden: !isOpen })}>
      <SearchBarButton onClick={() => setIsOpen(false)} />
      <Navigation />
      <NavigationAuthButtons />
      <div className='flex items-center justify-center gap-8 px-8 py-6'>
        <DiscordPresenceLink userId={LAYOUT_CONFIG.discord.userId} />
        {LAYOUT_CONFIG.socialLinks.map((link) => (
          <SocialMediaLink key={link.name} {...link} />
        ))}
      </div>
    </div>
  );
}
