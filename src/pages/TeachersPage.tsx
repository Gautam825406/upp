import { StructuredData } from '@/components/seo/StructuredData';
import { Teachers } from '@/components/sections/Teachers';
import { DirectorMessage } from '@/components/sections/DirectorMessage';
import { About } from '@/components/sections/About';
import { Faq } from '@/components/sections/Faq';
import { CtaBanner } from '@/components/sections/CtaBanner';
import { selectFaqs } from '@/data/faqs';

const TEACHERS_FAQ_IDS = ['director', 'classes-1-10', 'weak-students', 'admission'] as const;

export default function TeachersPage() {
  const faqs = selectFaqs(TEACHERS_FAQ_IDS);

  return (
    <StructuredData>
      <Teachers />
      <DirectorMessage />
      <About />
      <Faq
        faqs={faqs}
        eyebrow="FAQ"
        title="Questions about the team"
        description="More about how U++ Academy works with students and parents."
      />
      <CtaBanner title="Want to know more about our teachers?" description="Call or message U++ Academy to speak with the team and discuss your child's learning goals." />
    </StructuredData>
  );
}
