import { APP_CONFIG } from '@/configs/app';
import { useTranslations } from 'next-intl';
import ApiAttribution from './api-attribution';

export default function GamesApiAttribution() {
  const t = useTranslations('pages.dependencies');

  return (
    <ApiAttribution
      disabled
      title={t('games')}
      service={t('toBeImplemented')}
      image={{
        alt: t('apiIntegrationPending'),
      }}
    >
      <p>
        {t(
          'weAreCurrentlyEvaluatingDifferentGameDataProvidersToIntegrateWithAppOnceImplementedProperAttributionWillBeProvidedHere',
          {
            app: APP_CONFIG.name,
          },
        )}
      </p>
      <p className='italic'>
        {t('potentialAPIsUnderConsiderationIncludeProviders', {
          providers: 'IGDB, Giant Bomb, and RAWG',
        })}
      </p>
    </ApiAttribution>
  );
}
