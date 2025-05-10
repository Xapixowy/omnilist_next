import OverviewSection from '@/components/ui/overview-section';
import { APP_CONFIG } from '@/configs/app';
import { useTranslations } from 'next-intl';
import { PAGE_CONFIG } from '../../_configs/page-config';
import Review from './review';

const ReviewsHeading = () => {
  const t = useTranslations('pages.landing');

  return (
    <>
      {t('join_thousands_of_users_who_organize_their_entertainment_with')}{' '}
      <span className='font-bold'>{APP_CONFIG.name}</span>.
    </>
  );
};

export default function ReviewsSection() {
  const t = useTranslations('pages.landing');

  const translatedReviews = PAGE_CONFIG.reviews.map((review) => ({
    ...review,
    message: t(`reviews.${review.message}`, {
      app: APP_CONFIG.name,
    }),
    title: t(`reviews.${review.title}`),
  }));

  return (
    <OverviewSection title={t('satisfied_users')} heading={<ReviewsHeading />}>
      <div className='mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {translatedReviews.map((review) => (
          <Review key={review.author} {...review} />
        ))}
      </div>
    </OverviewSection>
  );
}
