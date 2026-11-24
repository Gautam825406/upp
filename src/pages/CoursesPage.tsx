import { StructuredData } from '@/components/seo/StructuredData';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { Boards } from '@/components/sections/Boards';
import { About } from '@/components/sections/About';
import { Faq } from '@/components/sections/Faq';
import { CtaBanner } from '@/components/sections/CtaBanner';
import { selectFaqs, HOME_FAQ_IDS } from '@/data/faqs';

export default function CoursesPage() {
  const faqs = selectFaqs(HOME_FAQ_IDS);

  return (
    <StructuredData faqs={faqs}>
      <Section>
        <Reveal>
          <span className="eyebrow">Courses &amp; classes</span>
          <h1 className="mt-6 max-w-3xl text-4xl font-extrabold leading-[1.08] tracking-tightest text-slate-50 sm:text-6xl">
            Classes <span className="text-pine-600">6 to 12</span> — JAC, CBSE &amp; ICSE coaching
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
            U++ Academy runs coaching for Class 6 to Class 12 in Madhygopali, Maharajgunj —
            Class 6 to 10 across all boards, and Class 11 to 12 in Arts &amp; Science.
          </p>
        </Reveal>
      </Section>

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
