import SocialMediaLink from '@/components/ui/social-media-link';
import { useAuthenticationContext } from '@/contexts/authentication';
import DiscordPresenceLink from '@/features/discord-presence-link';
import { HOME_LAYOUT_CONFIG } from '@/layouts/home-layout/configs/home-layout';
import { useNavigationLists } from '@/layouts/home-layout/features/navigation/hooks/use-navigation-lists';
import { useNavigationContext } from '../contexts/navigation';
import { MobileNavigationList } from './navigation-list';

const NavigationMobileDrawer = () => {
  const { isLoggedIn } = useAuthenticationContext();
  const { navigationMobileDrawerVisibility } = useNavigationContext();
  const navigationLists = useNavigationLists(isLoggedIn);

  return (
    <nav
      className={`fixed inset-0 z-998 flex flex-col bg-zinc-950 pt-[var(--header-height)] transition-opacity ${navigationMobileDrawerVisibility ? 'opacity-100' : '-translate-x-[120%] overflow-y-auto opacity-0'}`}
    >
      <div className='flex flex-col'>
        {navigationLists.map((section, index) => (
          <MobileNavigationList key={index} items={section} />
        ))}
      </div>
      <div className='flex items-center justify-center gap-8 px-8 py-6'>
        <DiscordPresenceLink variant='medium' userId={HOME_LAYOUT_CONFIG.discord.userId} />
        {HOME_LAYOUT_CONFIG.socialLinks.map((link) => (
          <SocialMediaLink key={link.name} {...link} />
        ))}
      </div>
    </nav>
  );
};
export default NavigationMobileDrawer;
