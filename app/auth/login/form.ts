import { MESSAGES } from '@/forms/messages';
import { useTranslations } from 'next-intl';
import { z } from 'zod';

export enum LoginFormFields {
  EMAIL = 'email',
  PASSWORD = 'password',
}

export const LoginFormSchema = (t: ReturnType<typeof useTranslations>) =>
  z.object({
    [LoginFormFields.EMAIL]: z
      .string({
        required_error: MESSAGES.required(t, { field: t('pages.login.email_address') }),
      })
      .email(MESSAGES.email(t, {})),
    [LoginFormFields.PASSWORD]: z
      .string({
        required_error: MESSAGES.required(t, { field: t('pages.login.password') }),
      })
      .nonempty(MESSAGES.required(t, { field: t('pages.login.password') })),
  });

export type LoginForm = z.infer<ReturnType<typeof LoginFormSchema>>;
