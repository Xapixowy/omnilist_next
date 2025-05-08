import { APP_CONFIG } from '@/configs/app';
import { useTranslations } from 'next-intl';
import ApiAttribution from './api-attribution';

export default function AnimeAndMangaApiAttribution() {
  const t = useTranslations('pages.dependencies');

  return (
    <ApiAttribution
      disabled
      title={t('animeAndManga')}
      service={t('toBeImplemented')}
      image={{
        alt: t('apiIntegrationPending'),
      }}
    >
      <p>
        {t(
          'weAreCurrentlyEvaluatingDifferentAnimeAndMangaDataProvidersToIntegrateWithAppOnceImplementedProperAttributionWillBeProvidedHere',
          {
            app: APP_CONFIG.name,
          },
        )}
      </p>
      <p className='italic'>
        {t('potentialAPIsUnderConsiderationIncludeProviders', {
          providers: 'MyAnimeList, AniList, and Kitsu',
        })}
      </p>
    </ApiAttribution>
  );
}
