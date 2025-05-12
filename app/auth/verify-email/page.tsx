'use client';

import Button from '@/components/ui/button';
import Link from '@/components/ui/link';
import { ROUTES_CONFIG } from '@/configs/routes';
import { ToastService } from '@/services/toast-service';
import { useFormatter, useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';
import Card from '../_components/card';
import Header from '../_components/header';

const SEARCH_PARAMS = {
  USER_ID: 'userId',
  SECRET: 'secret',
  EXPIRE: 'expire',
};

export default function VerifyEmailPage() {
  const t = useTranslations('pages.verify_email');
  const format = useFormatter();
  const router = useRouter();
  const search = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const userId = search.get(SEARCH_PARAMS.USER_ID);
  const secret = search.get(SEARCH_PARAMS.SECRET);
  const expire = search.get(SEARCH_PARAMS.EXPIRE);

  const expireDate: string | null = expire ? format.dateTime(new Date(expire), 'full') : null;

  const submitHandler = async (): Promise<void> => {
    setIsSubmitting(true);

    console.log(userId, secret, expire);

    if (!userId || !secret || !expire) {
      ToastService.error(t('verification'), t('invalid_link'));
      setIsSubmitting(false);
      return;
    }

    // FIXME: Migrate to NEXT api
    // const result = await authClient.completeVerification(userId, secret);
    const result = {
      error: false,
      data: null,
    };

    if (result.error) {
      ToastService.error(t('verification'), t('something_went_wrong_please_try_again'));
      setIsSubmitting(false);
      return;
    }

    await router.push(ROUTES_CONFIG.default);
    ToastService.success(t('verification'), t('you_have_successfully_verified_your_account'));
    setIsSubmitting(false);
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <>
        <Header title={t('click_the_button_below_to_verify_your_account')} />
        <Card className='grid place-items-center'>
          <div className='flex h-full w-full flex-col place-content-center gap-4 text-center text-sm text-zinc-400'>
            <p>{t('you_are_almost_there_tap_the_button_below_to_complete_your_verification')}</p>
            <p className='text-zinc-50'>
              {t('your_verification_link_will_expire_on')} <Link variant='primary'>{expireDate}</Link>
            </p>
            <div className='flex justify-center'>
              <Button variant='primary' loading={isSubmitting} onClick={submitHandler}>
                {t('verify')}
              </Button>
            </div>
          </div>
        </Card>
      </>
    </Suspense>
  );
}
