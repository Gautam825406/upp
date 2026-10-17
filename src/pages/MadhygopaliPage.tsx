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
import { BUSINESS, LOCATION_LABEL } from '@/data/business';
import { selectFaqs, MADHYGOPALI_FAQ_IDS } from '@/data/faqs';

const APPROACH_POINTS: { icon: IconName; title: string; text: string }[] = [
  {
    icon: 'target',
    title: 'Concept clarity first',
    text: 'U++ Academy focuses on understanding why a method works — not just memorising it. This is what carries students through higher classes.',
  },
  {
    icon: 'shield',
    title: 'Special attention for weak students',
    text: 'Patients, targeted help for students who have fallen behind and need to rebuild confidence subject by subject.',
  },
  {
    icon: 'users',
    title: 'Personalised approach',
    text: 'Every student learns at a different pace. The academy adjusts its teaching to the student in front of it.',
  },
  {
    icon: 'trending-up',
    title: 'Steady measurable improvement',
    text: 'The goal is progress from where the student currently stands — consistent, measurable academic improvement.',
  },
];

export default function MadhygopaliPage() {
  const faqs = selectFaqs(MADHYGOPALI_FAQ_IDS);

  return (
    <StructuredData>
      <Section>
        <Reveal>
          <span className="eyebrow">Based in Madhygopali</span>
          <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tightest text-slate-50 sm:text-6xl">
            Coaching classes in <span className="text-gradient-gold">Madhygopali</span> — U++ Academy
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
            U++ Academy is based in {LOCATION_LABEL}. The academy offers coaching for
            Class 1 to Class 10 covering JAC, CBSE and ICSE, with a particular focus on
            concept clarity and special support for weak students.
          </p>
        </Reveal>
      </Section>

      <Section subtle>
        <SectionHeading
          eyebrow="The U++ Academy approach"
          title={<>How we teach in <span className="text-gradient-gold">Madhygopali</span></>}
          description="U++ Academy's teaching approach is built around four core principles that apply to every student, every class and every board."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {APPROACH_POINTS.map((point, index) => (
            <Reveal key={point.title} delay={index * 100}>
              <Card lift ring>
                <CardIcon tone={index % 2 === 0 ? 'gold' : 'iris'}>
                  <Icon name={point.icon} />
                </CardIcon>
                <h3 className="mt-5 text-lg font-bold text-slate-50">{point.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-400">{point.text}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      <Boards />
      <Teachers />

      <Faq
        faqs={faqs}
        eyebrow="FAQ · Madhygopali"
        title="Coaching in Madhygopali — FAQs"
        description="Frequently asked questions about U++ Academy's coaching in Madhygopali, Maharajgunj."
      />

      <CtaBanner
        title="Admissions open in Madhygopali"
        description={`Call ${BUSINESS.phone} or message U++ Academy to discuss coaching for your child. The academy is located in ${LOCATION_LABEL}.`}
      />
    </StructuredData>
  );
}
