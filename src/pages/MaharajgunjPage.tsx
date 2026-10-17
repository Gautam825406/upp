import { StructuredData } from '@/components/seo/StructuredData';
import { Boards } from '@/components/sections/Boards';
import { Teachers } from '@/components/sections/Teachers';
import { Faq } from '@/components/sections/Faq';
import { CtaBanner } from '@/components/sections/CtaBanner';
import { Reveal } from '@/components/ui/Reveal';
import { Section, SectionHeading } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { CardIcon } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icon';
import type { IconName } from '@/components/ui/Icon';
import { LOCATION_LABEL } from '@/data/business';
import { selectFaqs, MAHARAJGUNJ_FAQ_IDS } from '@/data/faqs';

const REASONS: { icon: IconName; title: string; text: string }[] = [
  {
    icon: 'graduation',
    title: 'Class 1 to Class 10',
    text: 'Coaching across the full school range, from early foundations through to higher secondary entry preparation.',
  },
  {
    icon: 'shield',
    title: 'JAC, CBSE and ICSE',
    text: 'Coaching aligned to the boards most common in Jharkhand schools and nearby.',
  },
  {
    icon: 'trending-up',
    title: 'Support for weak students',
    text: 'Extra attention, repeated practice, and concept clarity for students who need to improve from where they stand.',
  },
  {
    icon: 'users',
    title: 'Small, personal approach',
    text: 'U++ Academy adjusts its teaching to each student rather than applying the same method to everyone.',
  },
];

export default function MaharajgunjPage() {
  const faqs = selectFaqs(MAHARAJGUNJ_FAQ_IDS);

  return (
    <StructuredData>
      <Section>
        <Reveal>
          <span className="eyebrow">Coaching in Maharajgunj</span>
          <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tightest text-slate-50 sm:text-6xl">
            Coaching classes for Maharajgunj students at{' '}
            <span className="text-gradient-gold">U++ Academy</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
            U++ Academy serves students and parents across Maharajgunj with coaching for
            Class 1 to Class 10 covering JAC, CBSE and ICSE. The academy is based in
            Madhygopali, Maharajgunj.
          </p>
        </Reveal>
      </Section>

      <Section subtle>
        <SectionHeading
          eyebrow="Why Maharajgunj parents choose U++ Academy"
          title={<>Coaching built for the <span className="text-gradient-gold">Maharajgunj area</span></>}
          description="U++ Academy focuses on concept clarity, personalised attention, and special support for students who have fallen behind — the same approach works across all classes and boards."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {REASONS.map((reason, index) => (
            <Reveal key={reason.title} delay={index * 100}>
              <Card lift>
                <CardIcon tone={index % 2 === 0 ? 'gold' : 'iris'}>
                  <Icon name={reason.icon} />
                </CardIcon>
                <h3 className="mt-5 text-lg font-bold text-slate-50">{reason.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-400">{reason.text}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      <Boards />
      <Teachers />

      <Faq
        faqs={faqs}
        eyebrow="FAQ · Maharajgunj"
        title="Coaching in Maharajgunj — FAQs"
        description={`Frequently asked questions about U++ Academy coaching in ${LOCATION_LABEL}.`}
      />

      <CtaBanner
        title="Looking for coaching in Maharajgunj?"
        description="Call or message U++ Academy to discuss available classes for your child. The academy is based in Madhygopali, Maharajgunj."
      />
    </StructuredData>
  );
}
