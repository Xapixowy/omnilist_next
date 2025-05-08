import MaxWidthWrapper from '@/components/layout/max-width-wrapper';
import Link from '@/components/ui/link';
import SocialMediaLink from '@/components/ui/social-media-link';
import { APP_CONFIG } from '@/configs/app';
import { ROUTES_CONFIG } from '@/configs/routes';
import DiscordPresenceLink from '@/features/discord-presence-link/discord-presence-link';
import { cn } from '@/functions/cn';
import { useTranslations } from 'next-intl';
import { LAYOUT_CONFIG } from '../../_configs/layout-config';

export type FooterNavigationSectionProps = {
  title: string;
  links: FooterNavigationLinkProps[];
  className?: string;
};

export type FooterNavigationLinkProps = {
  title: string;
  href: string;
};

const FooterNavigationLink = ({ title, href }: FooterNavigationLinkProps) => {
  return (
    <Link className='font-light' href={href}>
      {title}
    </Link>
  );
};

const FooterNavigationSection = ({ title, links, className = '' }: FooterNavigationSectionProps) => {
  return (
    <div className={cn('p flex flex-col gap-3', className)}>
      <p className='font-semibold text-zinc-50'>{title}</p>
      <ul className='flex flex-col gap-2'>
        {links.map((link) => (
          <li key={link.title}>
            <FooterNavigationLink {...link} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function Footer() {
  const t = useTranslations('layouts.home');
  const currentYear = new Date().getFullYear();

  return (
    <footer className='border-t border-t-zinc-700'>
      <MaxWidthWrapper className='p-8'>
        <section className='grid grid-cols-2 gap-12 p-2 pb-8 md:grid-cols-3 lg:grid-cols-4'>
          {LAYOUT_CONFIG.footerNavigationSections
            .map((section) => ({
              title: t(section.title),
              links: section.links.map((link) => ({ ...link, title: t(link.title) })),
            }))
            .map((section) => (
              <FooterNavigationSection key={section.title} {...section} />
            ))}
        </section>
        <section className='flex flex-col-reverse items-center justify-between gap-8 border-t border-t-zinc-700 p-2 pt-8 sm:flex-row sm:gap-12'>
          <p className='flex gap-1 text-sm text-zinc-400'>
            <span>&copy;</span>
            <span>{currentYear}</span>
            <Link href={ROUTES_CONFIG.default}>{APP_CONFIG.name}.</Link>
            <span>{t('allRightsReserved')}</span>
          </p>
          <div>
            <DiscordPresenceLink userId={LAYOUT_CONFIG.discord.userId} size='small' />
            {LAYOUT_CONFIG.socialLinks.map((link) => (
              <SocialMediaLink key={link.name} {...link} size='small' />
            ))}
          </div>
        </section>
      </MaxWidthWrapper>
    </footer>
  );
}
