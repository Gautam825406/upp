import { StructuredData } from '@/components/seo/StructuredData';
import { Boards } from '@/components/sections/Boards';
import { About } from '@/components/sections/About';
import { Faq } from '@/components/sections/Faq';
import { CtaBanner } from '@/components/sections/CtaBanner';
import { selectFaqs, HOME_FAQ_IDS } from '@/data/faqs';

export default function CoursesPage() {
  const faqs = selectFaqs(HOME_FAQ_IDS);

  return (
    <StructuredData>
      <Boards />
      <About />
      <Faq
        faqs={faqs}
        eyebrow="FAQ"
        title="Questions about courses and classes"
        description="Information about the classes and boards U++ Academy supports."
      />
      <CtaBanner title="Not sure which class or board is right?" description="Call or message us and we will help you find the right coaching for your child." />
    </StructuredData>
  );
}
