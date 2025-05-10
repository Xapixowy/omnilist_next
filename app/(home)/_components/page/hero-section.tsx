import Button from '@/components/ui/button';
import Heading from '@/components/ui/heading';
import Link from '@/components/ui/link';
import { ROUTES_CONFIG } from '@/configs/routes';
import heroBackground from '@/public/images/landing-hero-background.webp';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function HeroSection() {
  const t = useTranslations('pages.landing');

  return (
    <section className='relative flex flex-col items-center justify-center gap-8 px-8 py-40 text-center'>
      <Heading variant='display'>{t('track_your_entertainment_journey')}</Heading>
      <div className='flex flex-col gap-2'>
        <p>{t('keep_track_of_your_movies_tv_shows_anime_books_and_games_all_in_one_place')}</p>
        <p>{t('never_lose_track_of_what_you_have_watched_read_or_played_again')}</p>
      </div>
      <Link href={`${ROUTES_CONFIG.auth}/${ROUTES_CONFIG.authRoutes.register}`}>
        <Button variant='primary' size='large' rounded>
          {t('get_started')}
        </Button>
      </Link>
      <Image
        className='absolute top-1/2 left-1/2 -z-1 h-[2240px] w-[2400px] max-w-none -translate-1/2'
        src={heroBackground}
        alt={t('abstract_background_with_color_blur')}
      />
    </section>
  );
}
