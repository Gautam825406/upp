import { Reveal } from '@/components/ui/Reveal';
import { WhatsAppButton } from '@/components/actions/WhatsAppButton';
import { BUSINESS, LOCATION_LABEL } from '@/data/business';

/**
 * Closing call-to-action: a solid pine panel with cream text.
 * No gradient wash, no glass card, no glow ring — just the question and the two ways to reach us.
 * The call button uses the cream variant so it reads on the green panel; WhatsApp keeps its
 * own green so parents recognise it at a glance.
 */
export function CtaBanner({
  title = 'Ready to begin? Admission enquiries are open now.',
  description = 'Call, message, or visit the academy in Madhygopali, Maharajgunj. Our team will help you choose the right class for your child.',
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="py-16 sm:py-20">
      <div className="container-shell">
        <div className="rounded-xl bg-pine-600 px-6 py-10 sm:px-12 sm:py-14">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-onSolid/70">
              {LOCATION_LABEL} · {BUSINESS.name}
            </p>
            <h2 className="mt-4 max-w-2xl text-3xl font-extrabold leading-[1.15] tracking-tight text-onSolid sm:text-4xl">
              {title}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-onSolid/85 sm:text-lg">
              {description}
            </p>
          </Reveal>
          <Reveal delay={150}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <WhatsAppButton
                message={`Hello ${BUSINESS.name}, I would like to know about admission for my child.`}
              >
                WhatsApp Enquiry
              </WhatsAppButton>
              <a href={`tel:${BUSINESS.phoneE164}`} className="btn-cream">
                Call {BUSINESS.phone}
              </a>
            </div>
          </Reveal>
          <Reveal delay={250}>
            <p className="mt-6 text-sm text-onSolid/70">
              Director: Umesh Kumar · Serving Maharajgunj, Madhygopali &amp; Chouparan
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
