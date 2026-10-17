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
import { BUSINESS, LOCATION_LABEL, TEL_HREF, whatsappHref } from '@/data/business';
import { selectFaqs, CHOUPARAN_FAQ_IDS } from '@/data/faqs';

const CHOUPARAN_STEPS: { icon: IconName; step: string; title: string; text: string }[] = [
  {
    icon: 'phone',
    step: 'Step 1',
    title: 'Call or message',
    text: `Parents from Chouparan can call ${BUSINESS.phone} or message on WhatsApp to ask about available classes.`,
  },
  {
    icon: 'whatsapp',
    step: 'Step 2',
    title: 'Discuss the class',
    text: "The U++ Academy team will help you understand what coaching is available for your child's class and board.",
  },
  {
    icon: 'graduation',
    step: 'Step 3',
    title: 'Begin coaching',
    text: 'Once you have confirmed the right class, your child can begin coaching at U++ Academy, Madhygopali, Maharajgunj.',
  },
];

export default function ChouparanPage() {
  const faqs = selectFaqs(CHOUPARAN_FAQ_IDS);

  return (
    <StructuredData>
      <Section>
        <Reveal>
          <span className="eyebrow">Tuition near Chouparan</span>
          <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tightest text-slate-50 sm:text-6xl">
            Tuition classes near Chouparan —{' '}
            <span className="text-gradient-gold">enquire at U++ Academy</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
            Parents and students from Chouparan can enquire about coaching at U++ Academy,
            which is based in Madhygopali, Maharajgunj. Call or message the academy to
            discuss available classes for your child.
          </p>
        </Reveal>
      </Section>

      <Section subtle>
        <SectionHeading
          eyebrow="How Chouparan parents get started"
          title={<>Simple steps to <span className="text-gradient-gold">enquire</span> about coaching</>}
          description="U++ Academy does not maintain a separate Chouparan branch. All enquiries for Chouparan students go directly to the academy in Madhygopali, Maharajgunj."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {CHOUPARAN_STEPS.map((step, index) => (
            <Reveal key={step.title} delay={index * 100}>
              <Card lift className="h-full">
                <span className="inline-flex items-center rounded-full border border-gold-500/25 bg-gold-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gold-400">
                  {step.step}
                </span>
                <CardIcon tone="gold" className="mt-5">
                  <Icon name="phone" />
                </CardIcon>
                <h3 className="mt-5 text-lg font-bold text-slate-50">{step.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-400">{step.text}</p>
              </Card>
            </Reveal>
          ))}
        </div>

        <Reveal delay={360} className="mt-10">
          <div className="glass-strong rounded-2xl p-6 sm:p-8">
            <h3 className="text-lg font-bold text-slate-50">Contact details for Chouparan parents</h3>
            <p className="mt-2 text-sm text-slate-400">
              U++ Academy is located in {LOCATION_LABEL}. Use either of these options:
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a href={TEL_HREF} className="btn-call">
                <Icon name="phone" className="h-5 w-5" />
                Call {BUSINESS.phone}
              </a>
              <a href={whatsappHref('Hello U++ Academy, I am a parent from Chouparan and would like to enquire about coaching for my child.')} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
                <Icon name="whatsapp" className="h-5 w-5" />
                WhatsApp Enquiry
              </a>
            </div>
          </div>
        </Reveal>
      </Section>

      <Boards />
      <Teachers />

      <Faq
        faqs={faqs}
        eyebrow="FAQ · Chouparan"
        title="Tuition near Chouparan — FAQs"
        description="Questions parents from Chouparan most often ask about U++ Academy."
      />

      <CtaBanner
        title="A parent from Chouparan?"
        description="Message U++ Academy directly to discuss coaching for your child. The academy is based in Madhygopali, Maharajgunj."
      />
    </StructuredData>
  );
}
