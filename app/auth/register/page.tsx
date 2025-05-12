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
import Footer from '../_components/footer';
import Header from '../_components/header';
import { RegisterForm, RegisterFormFields, RegisterFormSchema } from './form';

export default function RegisterPage() {
  const t = useTranslations('pages.register');
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>({
    resolver: zodResolver(RegisterFormSchema(useTranslations())),
  });

  const submitHandler: SubmitHandler<RegisterForm> = async (data: RegisterForm): Promise<void> => {
    // FIXME: Migrate to NEXT api
    // const result = await authClient.register(
    //   data[RegisterFormFields.EMAIL],
    //   data[RegisterFormFields.PASSWORD],
    //   data[RegisterFormFields.NAME],
    // );
    console.log(data);

    const result = {
      error: false,
      data: null,
    };

    if (result.error) {
      ToastService.error(t('registration'), t('register_failed_please_try_again'));
      return;
    }

    // FIXME: Migrate to NEXT api
    // await authClient.login(data[RegisterFormFields.EMAIL], data[RegisterFormFields.PASSWORD]);
    // await authClient.verify();
    await router.push(`/${ROUTES_CONFIG.auth}/${ROUTES_CONFIG.authRoutes.login}`);
    ToastService.success(t('registration'), t('register_successfully_please_check_your_email_for_verification'));
  };

  return (
    <>
      <Header title={t('fill_the_form_to_start_tracking')} />
      <Card>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit(submitHandler)}>
          <div className='flex flex-col gap-2'>
            <Label htmlFor={RegisterFormFields.NAME}>{t('name')}</Label>
            <Input {...register(RegisterFormFields.NAME)} id={RegisterFormFields.NAME} placeholder='Raphael Pattern' />
            <FormError message={errors[RegisterFormFields.NAME]?.message} />
          </div>
          <div className='flex flex-col gap-2'>
            <Label htmlFor={RegisterFormFields.EMAIL}>{t('email_address')}</Label>
            <Input
              {...register(RegisterFormFields.EMAIL)}
              id={RegisterFormFields.EMAIL}
              type='email'
              placeholder='raphael@example.net'
            />
            <FormError message={errors[RegisterFormFields.EMAIL]?.message} />
          </div>
          <div className='flex flex-col gap-2'>
            <Label htmlFor={RegisterFormFields.PASSWORD}>{t('password')}</Label>
            <Input
              {...register(RegisterFormFields.PASSWORD)}
              id={RegisterFormFields.PASSWORD}
              type='password'
              placeholder='********'
            />
            <FormError message={errors[RegisterFormFields.PASSWORD]?.message} />
          </div>
          <div className='flex flex-col gap-2'>
            <Label htmlFor={RegisterFormFields.CONFIRM_PASSWORD}>{t('confirm_password')}</Label>
            <Input
              {...register(RegisterFormFields.CONFIRM_PASSWORD)}
              id={RegisterFormFields.CONFIRM_PASSWORD}
              type='password'
              placeholder='********'
            />
            <FormError message={errors[RegisterFormFields.CONFIRM_PASSWORD]?.message} />
          </div>
          <div className='mt-2 grid place-items-center'>
            <Button variant='primary' loading={isSubmitting}>
              {t('sign_up')}
            </Button>
          </div>
          <p className='text-center text-sm text-zinc-400'>
            <span>{t('already_have_an_account')} </span>
            <Link variant='primary' href={`/${ROUTES_CONFIG.auth}/${ROUTES_CONFIG.authRoutes.login}`}>
              {t('log_in')}
            </Link>
          </p>
        </form>
      </Card>
      <Footer>
        <p className='text-sm text-zinc-400'>
          {t('by_signing_up_you_agree_to_the')} <a>{t('terms_of_service')}.</a>
        </p>
      </Footer>
    </>
  );
}
