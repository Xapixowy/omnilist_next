import Callout from '@/components/ui/callout';
import LinkList from '@/components/ui/link-list';
import { useTranslations } from 'next-intl';
import ApiAttribution from './api-attribution';

const LINKS: {
  label: [string, Record<string, string>];
  href: string;
}[] = [
  {
    label: ['visit_provider', { provider: 'TMDB' }],
    href: 'https://www.themoviedb.org/',
  },
  {
    label: ['api_documentation', {}],
    href: 'https://developer.themoviedb.org/docs/getting-started',
  },
];

export default function MoviesAndTvShowsApiAttribution() {
  const t = useTranslations('pages.dependencies');

  return (
    <ApiAttribution
      title={t('movies_and_tv_shows')}
      service='TMDB'
      image={{
        src: 'https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg',
        alt: t('provider_logo', { provider: 'TMDB' }),
      }}
    >
      <Callout className='max-w-max'>
        &ldquo;{t('this_product_uses_the_tmdb_api_but_is_not_endorsed_or_certified_by_tmdb')}&rdquo;
      </Callout>
      <p>
        {t(
          'the_movie_database_tmdb_is_a_community_built_movie_and_tv_database_every_piece_of_data_has_been_added_by_our_awesome_community_dating_back_to_2008_tmdbs_international_focus_and_breadth_of_data_is_largely_unmatched',
        )}
      </p>
      <LinkList variant='primary' links={LINKS.map((link) => ({ ...link, children: t(...link.label) }))} />
    </ApiAttribution>
  );
}
