import Heading from '@/components/ui/heading';
import { EntertainmentObjectType } from '@/types/entertainment-object-type';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { ReactElement } from 'react';
import { IconType } from 'react-icons';
import { TbDeviceTv, TbMovie } from 'react-icons/tb';

export type SearchBarEntertainmentObjectCardProps = {
  title: string;
  type: EntertainmentObjectType;
  href: string;
  releaseYear: number;
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
}: SearchBarEntertainmentObjectCardProps) {
  const t = useTranslations('layouts.home');

  return (
    <Link href={href}>
      <div>
        <Image src={imageUrl!} alt={t('entertainment_object_image')} width={342} height={513} />
        <div>{getEntertainmentObjectTypeIcon(type)}</div>
      </div>
      <div>
        <Heading variant='p'>{title}</Heading>
        <p>{releaseYear}</p>
      </div>
    </Link>
  );
}
