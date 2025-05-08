import { SocialMediaLinkProps } from '@/components/ui/social-media-link';
import { ROUTES_CONFIG } from '@/configs/routes';
import { DiscordStatus } from '@/features/discord-presence-link/types/user-presence';
import { TbBrandGithub, TbBrandLinkedinFilled } from 'react-icons/tb';
import { FooterNavigationSectionProps } from '../_components/layout/footer';
import { NavigationItem } from '../_features/header/types/navigation-item';
import { NavigationSection } from '../_features/header/types/navigation-section';

export const LAYOUT_CONFIG: {
  navigationItems: (NavigationItem | NavigationSection)[];
  footerNavigationSections: FooterNavigationSectionProps[];
  socialLinks: SocialMediaLinkProps[];
  discord: {
    userId: string;
    status: DiscordStatus;
  };
} = {
  navigationItems: [
    {
      title: 'about',
      items: [
        {
          title: 'dependencies',
          href: `${ROUTES_CONFIG.about}/${ROUTES_CONFIG.aboutRoutes.dependencies}`,
        },
      ],
    },
    {
      title: 'lists',
      items: [
        {
          title: 'moviesAndTvShows',
          href: `${ROUTES_CONFIG.list}/${ROUTES_CONFIG.listRoutes.moviesAndTvShows}`,
        },
      ],
      shownIfLoggedIn: true,
    },
    {
      title: 'login',
      href: `${ROUTES_CONFIG.auth}/${ROUTES_CONFIG.authRoutes.login}`,
      variant: 'secondary',
      hiddenIfLoggedIn: true,
    },
    {
      title: 'signUp',
      href: `${ROUTES_CONFIG.auth}/${ROUTES_CONFIG.authRoutes.register}`,
      variant: 'primary',
      hiddenIfLoggedIn: true,
    },
  ],
  footerNavigationSections: [
    {
      title: 'about',
      links: [
        {
          title: 'dependencies',
          href: `${ROUTES_CONFIG.about}/${ROUTES_CONFIG.aboutRoutes.dependencies}`,
        },
      ],
    },
    {
      title: 'authentication',
      links: [
        {
          title: 'login',
          href: `${ROUTES_CONFIG.auth}/${ROUTES_CONFIG.authRoutes.login}`,
        },
        {
          title: 'signUp',
          href: `${ROUTES_CONFIG.auth}/${ROUTES_CONFIG.authRoutes.register}`,
        },
      ],
    },
  ],
  socialLinks: [
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/jakub-chodzinski/',
      icon: TbBrandLinkedinFilled,
    },
    {
      name: 'GitHub',
      href: 'https://github.com/Xapixowy',
      icon: TbBrandGithub,
    },
  ],
  discord: {
    userId: '271744551813644290',
    status: 'offline',
  },
};
