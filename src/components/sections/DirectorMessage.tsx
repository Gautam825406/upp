import { Reveal } from '@/components/ui/Reveal';
import { Section, SectionHeading } from '@/components/ui/Section';
import { CallButton } from '@/components/actions/CallButton';
import { WhatsAppButton } from '@/components/actions/WhatsAppButton';

/**
 * A note from the director, set like a short letter: a saffron left rule, plain paragraphs,
 * the director's photo and name underneath. No decorative giant quote mark, no colour blob.
 */
export function DirectorMessage() {
  return (
    <Section id="director-message">
      <SectionHeading
        eyebrow="A note from the director"
        title="Welcome to U++ Academy"
      />

      <Reveal delay={80} className="mt-10">
        <div className="max-w-3xl border-l-2 border-gold-500 pl-6 sm:pl-8">
          <blockquote className="space-y-4 text-base leading-relaxed text-slate-200 sm:text-lg">
            <p>
              At U++ Academy, our focus is straightforward — build strong academic
              foundations and create a supportive learning environment where every
              student can do better.
            </p>
            <p>
              Whether you are a parent in Madhygopali, Maharajgunj, or Chouparan,
              reaching out is the first step. We are here to answer your questions,
              discuss how we work with students, and help you decide what&apos;s right
              for your child.
            </p>
          </blockquote>

          <footer className="mt-8 flex items-center gap-4">
            <img
              src="/umesh-kumar.webp"
              alt="Umesh Kumar, Director of U++ Academy"
              width={64}
              height={64}
              loading="lazy"
              className="h-16 w-16 shrink-0 rounded-lg border border-ink-700 object-cover object-top"
            />
            <div>
              <p className="text-base font-bold text-slate-50">Umesh Kumar</p>
              <p className="text-sm text-slate-400">Director · U++ Academy</p>
            </div>
          </footer>
        </div>
      </Reveal>

      <Reveal delay={200} className="mt-10">
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <CallButton>Speak with us</CallButton>
          <WhatsAppButton>Message on WhatsApp</WhatsAppButton>
        </div>
      </Reveal>
    </Section>
  );
}
