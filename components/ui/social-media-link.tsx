import { cn } from '@/functions/cn';
import { IconType } from 'react-icons';

const DEFAULT_SOCIAL_MEDIA_LINK_SIZE = 'medium';
const SOCIAL_MEDIA_LINK_CLASSES: Record<SocialMediaLinkSize, string> = {
  small: 'text-3xl w-12 p-2',
  medium: 'text-5xl w-18 p-3',
  large: 'text-7xl w-26 p-4',
};

export type SocialMediaLinkSize = 'small' | 'medium' | 'large';
export type SocialMediaLinkProps = {
  name: string;
  href: string;
  icon: IconType;
  size?: SocialMediaLinkSize;
};

export default function SocialMediaLink({
  name,
  href,
  icon: Icon,
  size = DEFAULT_SOCIAL_MEDIA_LINK_SIZE,
}: SocialMediaLinkProps) {
  return (
    <a
      href={href}
      target='_blank'
      className={cn(
        'group relative inline-grid aspect-square cursor-pointer place-items-center rounded-full text-3xl text-zinc-50 transition-colors hover:bg-zinc-700/30',
        SOCIAL_MEDIA_LINK_CLASSES[size],
      )}
    >
      <Icon />
      <span className='absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[calc(120%)] rounded-md bg-zinc-700/30 px-2 py-1 text-xs font-extralight whitespace-nowrap opacity-0 transition-opacity group-hover:opacity-100'>
        {name}
      </span>
    </a>
  );
}
