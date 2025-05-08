import Button from '@/components/ui/button';
import CallToAction from '@/components/ui/call-to-action';
import Link from '@/components/ui/link';
import { APP_CONFIG } from '@/configs/app';
import { ROUTES_CONFIG } from '@/configs/routes';
import { useTranslations } from 'next-intl';

export default function CallToActionSection() {
  const t = useTranslations('pages.landing');

  return (
    <section className='p-8'>
      <CallToAction
        title={t('readyToOrganizeYourEntertainment')}
        description={t('joinTodayAndNeverLoseTrackOfYourMoviesShowsBooksAndGamesAgain', { app: APP_CONFIG.name })}
      >
        <Link href={`${ROUTES_CONFIG.auth}/${ROUTES_CONFIG.authRoutes.register}`}>
          <Button variant='primary' size='large' rounded>
            {t('signUpNow')}
          </Button>
        </Link>
        <Link href={`${ROUTES_CONFIG.auth}/${ROUTES_CONFIG.authRoutes.login}`}>
          <Button variant='secondary' size='large' rounded>
            {t('logIn')}
          </Button>
        </Link>
      </CallToAction>
    </section>
  );
}
