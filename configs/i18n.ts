import { Language } from '@/enums/language';
import { IntlConfig } from 'next-intl';

export const I18N_CONFIG: IntlConfig = {
  locale: Language.EN,
  formats: {
    dateTime: {
      date: {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      },
      time: {
        hour: '2-digit',
        minute: '2-digit',
      },
      full: {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      },
    },
  },
};
