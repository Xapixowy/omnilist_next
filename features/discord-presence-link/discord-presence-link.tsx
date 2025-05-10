'use client';

import SocialMediaLink, { SocialMediaLinkSize } from '@/components/ui/social-media-link';
import { cn } from '@/functions/cn';
import { useTranslations } from 'next-intl';
import { TbBrandDiscordFilled } from 'react-icons/tb';
import { useDiscordPresenceContext } from './contexts/discord-presence-status';
import { DiscordStatus } from './types/user-presence';

const DISCORD_LINK = 'https://discord.com/users';
const DEFAULT_DISCORD_STATUS_DOT_SIZE = 'medium';
const DISCORD_STATUS_DOT_CLASSES: {
  sizes: Record<SocialMediaLinkSize, string>;
  statuses: Record<DiscordStatus, string>;
} = {
  sizes: {
    small: 'h-3 w-3 -translate-2/3',
    medium: 'h-4 w-4 -translate-4/5',
    large: 'h-6 w-6 -translate-3/4',
  },
  statuses: {
    online: 'bg-green-500',
    idle: 'bg-yellow-500',
    dnd: 'bg-red-500',
    offline: 'bg-gray-500',
  },
};

type DiscordPresenceLinkProps = {
  userId: string;
  size?: SocialMediaLinkSize;
};

const DiscordStatusDot = ({
  status,
  size = DEFAULT_DISCORD_STATUS_DOT_SIZE,
  className = '',
}: {
  status: DiscordStatus;
  size?: SocialMediaLinkSize;
  className?: string;
}) => (
  <div
    className={cn(
      'absolute right-0 bottom-0 rounded-full border-2 border-zinc-950',
      DISCORD_STATUS_DOT_CLASSES.sizes[size],
      DISCORD_STATUS_DOT_CLASSES.statuses[status],
      className,
    )}
  ></div>
);

export default function DiscordPresenceLink({ userId, size }: DiscordPresenceLinkProps) {
  const { status } = useDiscordPresenceContext();
  const t = useTranslations('features.discord_presence');

  const statusText = t(
    {
      online: 'online',
      idle: 'idle',
      dnd: 'do_not_disturb',
      offline: 'offline',
    }[status],
  ).toLowerCase();

  return (
    <div className='group relative inline-block'>
      <SocialMediaLink
        name={`Discord (${statusText})`}
        href={`${DISCORD_LINK}/${userId}`}
        icon={TbBrandDiscordFilled}
        size={size}
      />
      <DiscordStatusDot className='group-hover:border-zinc-950/90' status={status} size={size} />
    </div>
  );
}
