import { APP_CONFIG } from '@/configs/app';
import { useTranslations } from 'next-intl';
import ApiAttribution from './api-attribution';

export default function BooksApiAttribution() {
  const t = useTranslations('pages.dependencies');

  return (
    <ApiAttribution
      disabled
      title={t('books')}
      service={t('to_be_implemented')}
      image={{
        alt: t('api_integration_pending'),
      }}
    >
      <p>
        {t(
          'we_are_currently_evaluating_different_book_data_providers_to_integrate_with_app_once_implemented_proper_attribution_will_be_provided_here',
          {
            app: APP_CONFIG.name,
          },
        )}
      </p>
      <p className='italic'>
        {t('potential_apis_under_consideration_include_providers', {
          providers: 'Google Books API, Open Library, and Goodreads',
        })}
      </p>
    </ApiAttribution>
  );
}
