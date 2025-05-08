import { APP_CONFIG } from '@/configs/app';
import { useTranslations } from 'next-intl';
import ApiAttribution from './api-attribution';

export default function BooksApiAttribution() {
  const t = useTranslations('pages.dependencies');

  return (
    <ApiAttribution
      disabled
      title={t('books')}
      service={t('toBeImplemented')}
      image={{
        alt: t('apiIntegrationPending'),
      }}
    >
      <p>
        {t(
          'weAreCurrentlyEvaluatingDifferentBookDataProvidersToIntegrateWithAppOnceImplementedProperAttributionWillBeProvidedHere',
          {
            app: APP_CONFIG.name,
          },
        )}
      </p>
      <p className='italic'>
        {t('potentialAPIsUnderConsiderationIncludeProviders', {
          providers: 'Google Books API, Open Library, and Goodreads',
        })}
      </p>
    </ApiAttribution>
  );
}
