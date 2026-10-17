import { Reveal } from '@/components/ui/Reveal';
import { CallButton } from '@/components/actions/CallButton';
import { WhatsAppButton } from '@/components/actions/WhatsAppButton';
import { BUSINESS, LOCATION_LABEL } from '@/data/business';

export function CtaBanner({
  title = 'Ready to begin? Admission enquiries are open now.',
  description = 'Call, message, or visit the academy in Madhygopali, Maharajgunj. Our team will help you choose the right class for your child.',
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="relative overflow-hidden py-20 sm:py-24">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 60% at 20% 20%, rgba(109,91,255,0.28) 0%, transparent 60%), radial-gradient(50% 50% at 85% 15%, rgba(255,194,75,0.20) 0%, transparent 60%), radial-gradient(70% 70% at 50% 100%, rgba(34,211,238,0.12) 0%, transparent 60%)',
        }}
      />
      <div className="absolute inset-0 bg-ink-950/65" />
      <div className="container-shell relative z-10">
        <div className="glass-strong mx-auto max-w-4xl rounded-3xl p-8 sm:p-14">
          <div className="glow-ring rounded-2xl px-6 py-8 sm:px-10 sm:py-11">
            <Reveal>
              <span className="eyebrow">{LOCATION_LABEL} · {BUSINESS.name}</span>
              <h2 className="mt-6 text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl">
                <span className="text-gradient-gold">{title}</span>
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
                {description}
              </p>
            </Reveal>
            <Reveal delay={180}>
              <div className="mt-9 flex flex-wrap items-center gap-3.5">
                <WhatsAppButton
                  message={`Hello ${BUSINESS.name}, I would like to know about admission for my child.`}
                >
                  WhatsApp Enquiry
                </WhatsAppButton>
                <CallButton>Call {BUSINESS.phone}</CallButton>
              </div>
            </Reveal>
            <Reveal delay={300}>
              <p className="mt-6 text-sm text-slate-500">
                Director: Umesh Kumar · Serving Maharajgunj, Madhygopali & Chouparan
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
