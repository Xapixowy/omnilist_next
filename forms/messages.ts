import { useTranslations } from 'next-intl';

type MessageParamsMap = {
  required: { field: string };
  email: object;
  minLength: { field: string; length: number };
  maxLength: { field: string; length: number };
  match: { field1: string; field2: string };
};

const capitalizeFirstLetter = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1);

export const MESSAGES: {
  [K in keyof MessageParamsMap]: (t: ReturnType<typeof useTranslations>, params: MessageParamsMap[K]) => string;
} = {
  required: (t, params) => capitalizeFirstLetter(t(`form_validation_messages.required`, params)),
  email: (t) => capitalizeFirstLetter(t(`form_validation_messages.email`, {})),
  minLength: (t, params) => capitalizeFirstLetter(t(`form_validation_messages.min_length`, params)),
  maxLength: (t, params) => capitalizeFirstLetter(t(`form_validation_messages.max_length`, params)),
  match: (t, params) => capitalizeFirstLetter(t(`form_validation_messages.match`, params)),
};
