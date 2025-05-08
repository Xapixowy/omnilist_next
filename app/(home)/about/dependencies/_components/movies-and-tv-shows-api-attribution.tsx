import Callout from '@/components/ui/callout';
import LinkList from '@/components/ui/link-list';
import { useTranslations } from 'next-intl';
import ApiAttribution from './api-attribution';

const LINKS: {
  label: [string, Record<string, string>];
  href: string;
}[] = [
  {
    label: ['visitProvider', { provider: 'TMDB' }],
    href: 'https://www.themoviedb.org/',
  },
  {
    label: ['apiDocumentation', {}],
    href: 'https://developer.themoviedb.org/docs/getting-started',
  },
];

export default function MoviesAndTvShowsApiAttribution() {
  const t = useTranslations('pages.dependencies');

  return (
    <ApiAttribution
      title={t('moviesAndTvShows')}
      service='TMDB'
      image={{
        src: 'https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg',
        alt: t('providerLogo', { provider: 'TMDB' }),
      }}
    >
      <Callout className='max-w-max'>
        &ldquo;{t('thisProductUsesTheTMDBAPIButIsNotEndorsedOrCertifiedByTMDB')}&rdquo;
      </Callout>
      <p>
        {t(
          'theMovieDatabaseTMDBIsACommunityBuiltMovieAndTVDatabaseEveryPieceOfDataHasBeenAddedByOurAwesomeCommunityDatingBackTo2008TMDBsInternationalFocusAndBreadthOfDataIsLargelyUnmatched',
        )}
      </p>
      <LinkList variant='primary' links={LINKS.map((link) => ({ ...link, children: t(...link.label) }))} />
    </ApiAttribution>
  );
}
