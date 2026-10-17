import { Reveal } from '@/components/ui/Reveal';
import { Section, SectionHeading } from '@/components/ui/Section';
import { CallButton } from '@/components/actions/CallButton';
import { WhatsAppButton } from '@/components/actions/WhatsAppButton';

export function DirectorMessage() {
  return (
    <Section id="director-message" className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-iris-500/10 blur-3xl"
        aria-hidden="true"
      />
      <SectionHeading
        eyebrow="A note from the director"
        title={
          <>
            Welcome to <span className="text-gradient-gold">U++ Academy</span>
          </>
        }
      />

      <Reveal delay={80} className="mt-10">
        <div className="relative mx-auto max-w-3xl">
          <div
            className="absolute -top-4 left-1/2 -translate-x-1/2 text-7xl leading-none text-gold-500/15 select-none"
            aria-hidden="true"
          >
            "
          </div>

          <blockquote className="space-y-5 text-lg leading-relaxed text-slate-300">
            <p>
              At U++ Academy, our focus is straightforward — build strong academic
              foundations and create a supportive learning environment where every
              student can do better.
            </p>
            <p>
              Whether you are a parent in Madhygopali, Maharajgunj, or Chouparan,
              reaching out is the first step. We are here to answer your questions,
              discuss how we work with students, and help you decide what's right
              for your child.
            </p>
          </blockquote>

          <footer className="mt-8 flex items-center gap-5">
            <img
              src="/umesh%20kumar.png"
              alt="Umesh Kumar, Director of U++ Academy"
              className="h-16 w-16 shrink-0 rounded-full border-2 border-gold-500/30 object-cover"
            />
            <div>
              <p className="text-base font-bold text-slate-50">Umesh Kumar</p>
              <p className="text-sm text-slate-500">Director · U++ Academy</p>
            </div>
          </footer>
        </div>
      </Reveal>

      <Reveal delay={200} className="mt-10 flex flex-wrap items-center gap-3">
        <CallButton>Speak with us</CallButton>
        <WhatsAppButton>Message on WhatsApp</WhatsAppButton>
      </Reveal>
    </Section>
  );
}
