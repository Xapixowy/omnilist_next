'use client';

import Heading from '@/components/ui/heading';
import ImagePlaceholder from '@/components/ui/image-placeholder';
import Skeleton from '@/components/ui/skeleton';
import { cn } from '@/functions/cn';
import { EntertainmentObjectType } from '@/types/entertainment-object-type';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { ReactElement, useState } from 'react';
import { IconType } from 'react-icons';
import { TbDeviceTv, TbMovie } from 'react-icons/tb';

export type SearchBarEntertainmentObjectCardProps = {
  title: string;
  type: EntertainmentObjectType;
  href: string;
  releaseYear: number | null;
  genres: string[];
  popularity: number;
  imageUrl?: string;
};

const getEntertainmentObjectTypeIcon = (type: EntertainmentObjectType): ReactElement<IconType> => {
  switch (type) {
    case 'movie':
      return <TbMovie />;
    case 'tv_show':
      return <TbDeviceTv />;
  }
};

export default function SearchBarEntertainmentObjectCard({
  title,
  type,
  href,
  releaseYear,
  imageUrl,
  genres,
}: SearchBarEntertainmentObjectCardProps) {
  const t = useTranslations('layouts.home');
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <Link href={href}>
      <div className='relative w-40 aspect-[2/3] flex flex-col gap-4 items-center group cursor-pointer'>
        <div className='relative w-full h-full overflow-hidden rounded-lg'>
          {!isImageLoaded && imageUrl && <Skeleton className='w-full h-full' />}
          {imageUrl ? (
            <Image
              src={imageUrl!}
              alt={t('entertainment_object_image')}
              fill
              className='transition-transform group-hover:scale-110'
              onLoad={() => setIsImageLoaded(true)}
              sizes='342px'
            />
          ) : (
            <ImagePlaceholder className='bg-zinc-600/50 transition-transform group-hover:scale-110' />
          )}
          <div
            className={cn(
              'transition-transform translate-y-full group-hover:translate-y-0 absolute bottom-0 left-0 bg-zinc-950/70 rounded-t-lg p-2 w-full',
              {
                'translate-y-full': imageUrl,
                'translate-y-0': !imageUrl,
              },
            )}
          >
            <Heading variant='p' style='h6'>
              {title}
            </Heading>
            <p className='text-sm text-zinc-400'>{releaseYear ?? '-'}</p>
            <p className='text-sm text-zinc-200 mt-2'>{genres.join(', ')}</p>
          </div>
        </div>
        <div className='absolute top-0 right-0 translate-x-1/4 -translate-y-1/4 from-my-accent-500 to-my-secondary-500 aspect-square w-12 rounded-full bg-gradient-to-r p-1 text-2xl'>
          <div className='flex h-full w-full items-center justify-center rounded-full bg-zinc-950/50'>
            {getEntertainmentObjectTypeIcon(type)}
          </div>
        </div>
      </div>
    </Link>
  );
}
