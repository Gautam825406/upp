import { StructuredData } from '@/components/seo/StructuredData';
import { Hero } from '@/components/sections/Hero';
import { PromoSection } from '@/components/sections/PromoSection';
import { About } from '@/components/sections/About';
import { DirectorMessage } from '@/components/sections/DirectorMessage';
import { Boards } from '@/components/sections/Boards';
import { Locations } from '@/components/sections/Locations';
import { Teachers } from '@/components/sections/Teachers';
import { DownloadApp } from '@/components/sections/DownloadApp';
import { Gallery } from '@/components/sections/Gallery';
import { Faq } from '@/components/sections/Faq';
import { CtaBanner } from '@/components/sections/CtaBanner';
import { selectFaqs, HOME_FAQ_IDS } from '@/data/faqs';

export default function HomePage() {
  const homeFaqs = selectFaqs(HOME_FAQ_IDS);

  return (
    <StructuredData showBreadcrumb={false} faqs={homeFaqs}>
      <Hero />
      <PromoSection />
      <About />
      <DirectorMessage />
      <Boards />
      <Locations />
      <Teachers />
      <DownloadApp />
      <Gallery />
      <Faq
        faqs={homeFaqs}
        eyebrow="FAQ"
        title="Frequently asked questions"
        description="Answers to the most common questions parents ask about U++ Academy coaching."
      />
      <CtaBanner />
    </StructuredData>
  );
}
