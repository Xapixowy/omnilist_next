import { I18N_CONFIG } from '@/configs/i18n';
import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async () => {
  // Provide a static locale, fetch a user setting,
  // read from `cookies()`, `headers()`, etc.
  const locale = I18N_CONFIG.locale;

  return {
    locale,
    formats: I18N_CONFIG.formats,
    messages: (await import(`@/messages/${locale}.json`)).default,
  };
});
