import OverviewSection from '@/components/ui/overview-section';
import { APP_CONFIG } from '@/configs/app';
import { useTranslations } from 'next-intl';
import { PAGE_CONFIG } from '../../_configs/page-config';
import Advantage from './advantage';

const AdvantagesHeading = () => {
  const t = useTranslations('pages.landing');

  return (
    <>
      <span className='font-bold'>{APP_CONFIG.name}</span>{' '}
      {t('helps_you_organize_and_track_all_your_entertainment_across_different_mediums')}
    </>
  );
};

export default function AdvantagesSection() {
  const t = useTranslations('pages.landing');

  const translatedAdvantages = PAGE_CONFIG.advantages.map((advantage) => ({
    ...advantage,
    title: t(`advantages.${advantage.title}`),
    description: t(`advantages.${advantage.description}`),
  }));

  return (
    <OverviewSection title={t('whats_the_point')} heading={<AdvantagesHeading />}>
      <div className='mt-8 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3'>
        {translatedAdvantages.map((advantage) => (
          <Advantage key={advantage.title} className='w-full' {...advantage} />
        ))}
      </div>
    </OverviewSection>
  );
}
