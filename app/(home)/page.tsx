import MaxWidthWrapper from '@/components/layout/max-width-wrapper';
import AdvantagesSection from './_components/page/advantages-section';
import CallToActionSection from './_components/page/call-to-action-section';
import HeroSection from './_components/page/hero-section';
import ReviewsSection from './_components/page/reviews-section';

export default function Home() {
  return (
    <MaxWidthWrapper className='flex flex-col gap-12'>
      <HeroSection />
      <AdvantagesSection />
      <ReviewsSection />
      <CallToActionSection />
    </MaxWidthWrapper>
  );
}
