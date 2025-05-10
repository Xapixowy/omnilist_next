import MaxWidthWrapper from '@/components/layout/max-width-wrapper';
import Heading from '@/components/ui/heading';
import { APP_CONFIG } from '@/configs/app';
import { useTranslations } from 'next-intl';
import AnimeAndMangaApiAttribution from './_components/anime-and-manga-api-attribution';
import BooksApiAttribution from './_components/books-api-attribution';
import GamesApiAttribution from './_components/games-api-attribution';
import MoviesAndTvShowsApiAttribution from './_components/movies-and-tv-shows-api-attribution';

export default function DependenciesPage() {
  const t = useTranslations('pages.dependencies');

  return (
    <MaxWidthWrapper className='flex flex-col gap-8 px-8 py-20'>
      <Heading variant='display'>{t('dependencies_and_attributions')}</Heading>
      <p>
        {t(
          'app_uses_several_external_apis_to_provide_data_for_different_media_types_we_are_grateful_to_these_services_for_making_their_data_available',
          {
            app: APP_CONFIG.name,
          },
        )}
      </p>
      <div className='flex flex-col gap-16 pt-8'>
        <MoviesAndTvShowsApiAttribution />
        <AnimeAndMangaApiAttribution />
        <BooksApiAttribution />
        <GamesApiAttribution />
      </div>
    </MaxWidthWrapper>
  );
}
