import { MESSAGES } from '@/forms/messages';
import { match } from '@/forms/validators';
import { useTranslations } from 'next-intl';
import { z } from 'zod';

export enum RegisterFormFields {
  NAME = 'name',
  EMAIL = 'email',
  PASSWORD = 'password',
  CONFIRM_PASSWORD = 'confirm_password',
}

export const RegisterFormSchema = (t: ReturnType<typeof useTranslations>) =>
  z
    .object({
      [RegisterFormFields.NAME]: z
        .string({ required_error: MESSAGES.required(t, { field: t('pages.register.name') }) })
        .min(3, { message: MESSAGES.minLength(t, { field: t('pages.register.name'), length: 3 }) }),
      [RegisterFormFields.EMAIL]: z
        .string({
          required_error: MESSAGES.required(t, { field: t('pages.register.email_address') }),
        })
        .email({ message: MESSAGES.email(t, {}) }),
      [RegisterFormFields.PASSWORD]: z
        .string({ required_error: MESSAGES.required(t, { field: t('pages.register.password') }) })
        .min(8, { message: MESSAGES.minLength(t, { field: t('pages.register.password'), length: 8 }) }),
      [RegisterFormFields.CONFIRM_PASSWORD]: z
        .string({
          required_error: MESSAGES.required(t, { field: t('pages.register.confirm_password') }),
        })
        .nonempty(MESSAGES.required(t, { field: t('pages.register.confirm_password') })),
    })
    .superRefine(
      match(
        MESSAGES.match(t, { field1: t('pages.register.password'), field2: t('pages.register.confirm_password') }),
        RegisterFormFields.PASSWORD,
        RegisterFormFields.CONFIRM_PASSWORD,
      ),
    );

export type RegisterForm = z.infer<ReturnType<typeof RegisterFormSchema>>;
