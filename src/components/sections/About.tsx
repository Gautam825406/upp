import { Reveal } from '@/components/ui/Reveal';
import { Section, SectionHeading } from '@/components/ui/Section';
import { Card, CardIcon } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icon';
import type { IconName } from '@/components/ui/Icon';
import { LOCATION_LABEL } from '@/data/business';

const FEATURES: { icon: IconName; title: string; text: string }[] = [
  {
    icon: 'target',
    title: 'Concept clarity',
    text: 'Understanding why a method works, not just memorising it — the foundation that carries students through higher classes.',
  },
  {
    icon: 'shield',
    title: 'Personalised attention',
    text: 'Every student learns at a different pace. U++ Academy adjusts its approach to the student in front of it.',
  },
  {
    icon: 'trending-up',
    title: 'Steady improvement',
    text: 'Patients, measurable progress — helping students improve from where they currently stand.',
  },
  {
    icon: 'graduation',
    title: 'Board-aligned',
    text: 'Coaching aligned to the JAC, CBSE and ICSE syllabi used in Jharkhand schools and beyond.',
  },
];

export function About() {
  return (
    <Section id="about">
      <SectionHeading
        eyebrow="About U++ Academy"
        title={
          <>
            Coaching built on <span className="text-gradient-gold">concept clarity</span>, not shortcuts
          </>
        }
        description={`U++ Academy is based in ${LOCATION_LABEL}, Jharkhand. Director Umesh Kumar leads the academy with a focus on strong academic foundations and a supportive learning environment for students in Classes 1 to 10.`}
      />

      <div className="mt-12 grid gap-5 sm:grid-cols-2">
        {FEATURES.map((feature, index) => (
          <Reveal key={feature.title} delay={index * 100}>
            <Card lift ring>
              <CardIcon tone={index % 2 === 0 ? 'gold' : 'iris'}>
                <Icon name={feature.icon} />
              </CardIcon>
              <h3 className="mt-5 text-lg font-bold text-slate-50">{feature.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-slate-400">{feature.text}</p>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
