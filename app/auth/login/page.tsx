'use client';

import FormError from '@/components/forms/form-error';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import Label from '@/components/ui/label';
import Link from '@/components/ui/link';
import { ROUTES_CONFIG } from '@/configs/routes';
import { ToastService } from '@/services/toast-service';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import Card from '../_components/card';
import Header from '../_components/header';
import { LoginForm, LoginFormFields, LoginFormSchema } from './form';

export default function LoginPage() {
  const t = useTranslations('pages.login');
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(LoginFormSchema(useTranslations())),
  });

  const testToast = () => ToastService.success(t('login'), t('you_have_successfully_logged_in_to_your_account'));

  const submitHandler: SubmitHandler<LoginForm> = async (data: LoginForm): Promise<void> => {
    // FIXME: Migrate to NEXT api
    // const result = await authClient.login(data[LoginFormFields.EMAIL], data[LoginFormFields.PASSWORD]);
    const result = {
      error: false,
      data: null,
    };

    if (result.error) {
      ToastService.error(t('login'), t('invalid_credenntials'));
      return;
    }

    // FIXME: Migrate to NEXT api
    // const getUserResult = await authClient.getUser();
    const getUserResult = {
      error: false,
      data: null,
    };

    if (getUserResult.error) {
      ToastService.error(t('login'), t('somethingWentWrongPleaseTryAgain'));
      return;
    }

    // FIXME: Refactor to NEXT authentication
    // setUser(getUserResult.data);
    // setIsLoggedIn(true);
    await router.push(ROUTES_CONFIG.default);
    ToastService.success(t('login'), t('you_have_successfully_logged_in_to_your_account'));
  };

  return (
    <>
      <Header title={t('enter_your_credentials_to_access_your_account')} />
      <Card>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit(submitHandler)}>
          <div className='flex flex-col gap-2'>
            <Label htmlFor={LoginFormFields.EMAIL}>{t('email_address')}</Label>
            <Input
              {...register(LoginFormFields.EMAIL)}
              id={LoginFormFields.EMAIL}
              type='email'
              placeholder='raphael@example.net'
            />
            <FormError message={errors[LoginFormFields.EMAIL]?.message} />
          </div>
          <div className='flex flex-col gap-2'>
            <Label htmlFor={LoginFormFields.PASSWORD}>{t('password')}</Label>
            <Input
              {...register(LoginFormFields.PASSWORD)}
              id={LoginFormFields.PASSWORD}
              type='password'
              placeholder='********'
            />
            <FormError message={errors[LoginFormFields.PASSWORD]?.message} />
            <p className='text-right text-sm'>
              <Link href={`/${ROUTES_CONFIG.auth}/${ROUTES_CONFIG.authRoutes.forgotPassword}`}>
                {t('forgot_password')}
              </Link>
            </p>
          </div>
          <div className='mt-2 grid place-items-center'>
            <Button variant='primary' loading={isSubmitting} onClick={testToast}>
              {t('log_in')}
            </Button>
          </div>
          <p className='text-center text-sm text-zinc-400'>
            <span>{t('dont_have_an_account')} </span>
            <Link variant='primary' href={`/${ROUTES_CONFIG.auth}/${ROUTES_CONFIG.authRoutes.register}`}>
              {t('sign_up')}
            </Link>
          </p>
        </form>
      </Card>
    </>
  );
}
