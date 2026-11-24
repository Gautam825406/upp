import { StructuredData } from '@/components/seo/StructuredData';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { Teachers } from '@/components/sections/Teachers';
import { DirectorMessage } from '@/components/sections/DirectorMessage';
import { About } from '@/components/sections/About';
import { Faq } from '@/components/sections/Faq';
import { CtaBanner } from '@/components/sections/CtaBanner';
import { selectFaqs, TEACHERS_FAQ_IDS } from '@/data/faqs';

export default function TeachersPage() {
  const faqs = selectFaqs(TEACHERS_FAQ_IDS);

  return (
    <StructuredData faqs={faqs}>
      <Section>
        <Reveal>
          <span className="eyebrow">Our teachers</span>
          <h1 className="mt-6 max-w-3xl text-4xl font-extrabold leading-[1.08] tracking-tightest text-slate-50 sm:text-6xl">
            Teachers at <span className="text-pine-600">U++ Academy</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
            U++ Academy is led by Director Umesh Kumar in Madhygopali, Maharajgunj. Call or
            message the academy to discuss coaching for your child.
          </p>
        </Reveal>
      </Section>

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
