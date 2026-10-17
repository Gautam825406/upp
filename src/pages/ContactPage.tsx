import { StructuredData } from '@/components/seo/StructuredData';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { CardIcon } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icon';
import { EnquiryForm } from '@/components/actions/EnquiryForm';
import { Faq } from '@/components/sections/Faq';
import { CtaBanner } from '@/components/sections/CtaBanner';
import { BUSINESS, LOCATION_LABEL, TEL_HREF, whatsappHref } from '@/data/business';
import { selectFaqs } from '@/data/faqs';

const CONTACT_FAQ_IDS = [
  'location', 'contact-umesh-kumar', 'chouparan-contact', 'admission', 'classes-1-10',
] as const;

export default function ContactPage() {
  const faqs = selectFaqs(CONTACT_FAQ_IDS);

  return (
    <StructuredData>
      <Section>
        <Reveal>
          <span className="eyebrow">Contact &amp; Admission Enquiry</span>
          <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tightest text-slate-50 sm:text-6xl">
            Get in touch with <span className="text-gradient-gold">U++ Academy</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
            U++ Academy is based in {LOCATION_LABEL}. Call, message, or fill in the
            enquiry form to discuss coaching for your child.
          </p>
        </Reveal>
      </Section>

      <Section subtle>
        <div className="grid gap-6 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Reveal>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Contact details
              </h2>
            </Reveal>
            <div className="mt-7 flex flex-col gap-4">
              <Reveal delay={80}>
                <Card>
                  <div className="flex items-start gap-4">
                    <CardIcon tone="gold">
                      <Icon name="phone" />
                    </CardIcon>
                    <div>
                      <p className="text-sm font-semibold text-slate-300">Phone</p>
                      <a href={TEL_HREF} className="mt-1 block text-lg font-bold text-slate-50">
                        {BUSINESS.phone}
                      </a>
                      <p className="mt-1 text-sm text-slate-400">Click to call</p>
                    </div>
                  </div>
                </Card>
              </Reveal>

              <Reveal delay={140}>
                <Card>
                  <div className="flex items-start gap-4">
                    <CardIcon tone="iris">
                      <Icon name="whatsapp" />
                    </CardIcon>
                    <div>
                      <p className="text-sm font-semibold text-slate-300">WhatsApp</p>
                      <a
                        href={whatsappHref('Hello U++ Academy, I would like to enquire about coaching for my child.')}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 block text-lg font-bold text-slate-50 underline"
                      >
                        {BUSINESS.phone}
                      </a>
                      <p className="mt-1 text-sm text-slate-400">Opens WhatsApp chat</p>
                    </div>
                  </div>
                </Card>
              </Reveal>

              <Reveal delay={200}>
                <Card>
                  <div className="flex items-start gap-4">
                    <CardIcon tone="aqua">
                      <Icon name="map-pin" />
                    </CardIcon>
                    <div>
                      <p className="text-sm font-semibold text-slate-300">Location</p>
                      <p className="mt-1 text-lg font-bold text-slate-50">
                        {LOCATION_LABEL}
                      </p>
                      <a
                        href={BUSINESS.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 inline-flex items-center gap-1 text-sm text-gold-400 underline"
                      >
                        View on Google Maps
                        <Icon name="external" className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>
                </Card>
              </Reveal>

              <Reveal delay={260}>
                <Card>
                  <div className="flex items-start gap-4">
                    <CardIcon tone="gold">
                      <Icon name="graduation" />
                    </CardIcon>
                    <div>
                      <p className="text-sm font-semibold text-slate-300">Director</p>
                      <p className="mt-1 text-lg font-bold text-slate-50">{BUSINESS.director}</p>
                      <p className="mt-1 text-sm text-slate-400">
                        Director of U++ Academy
                      </p>
                    </div>
                  </div>
                </Card>
              </Reveal>
            </div>
          </div>

          <div className="lg:col-span-3">
            <Reveal delay={100}>
              <EnquiryForm />
            </Reveal>
          </div>
        </div>
      </Section>

      <Faq
        faqs={faqs}
        eyebrow="FAQ"
        title="Contact and admission FAQs"
        description="Questions parents most often ask when contacting U++ Academy."
      />

      <CtaBanner
        title="Speak with the U++ Academy team"
        description="Call or message today. Director Umesh Kumar and the team will help you choose the right class for your child."
      />
    </StructuredData>
  );
}
