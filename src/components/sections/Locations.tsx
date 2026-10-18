import { Link } from 'react-router-dom';
import { Reveal } from '@/components/ui/Reveal';
import { Section, SectionHeading } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icon';
import type { IconName } from '@/components/ui/Icon';
import { BUSINESS } from '@/data/business';

const LOCATION_LINKS: {
  area: string;
  page: string;
  href: string;
  heading: string;
  blurb: string;
  icon: IconName;
  isPrimary: boolean;
}[] = [
  {
    area: 'Madhygopali',
    page: '/coaching-in-madhygopali',
    href: '/coaching-in-madhygopali',
    heading: 'Coaching in Madhygopali',
    blurb:
      'U++ Academy is based in Madhygopali, Maharajgunj. The academy offers coaching for Class 1 to Class 10 with concept clarity, personalised attention, and special support for weak students.',
    icon: 'map-pin',
    isPrimary: true,
  },
  {
    area: 'Maharajgunj',
    page: '/coaching-in-maharajgunj',
    href: '/coaching-in-maharajgunj',
    heading: 'Coaching in Maharajgunj',
    blurb:
      'U++ Academy serves students and parents across Maharajgunj, offering coaching classes for JAC, CBSE and ICSE students from Class 1 to Class 10.',
    icon: 'graduation',
    isPrimary: false,
  },
  {
    area: 'Chouparan',
    page: '/tuition-in-chouparan',
    href: '/tuition-in-chouparan',
    heading: 'Tuition near Chouparan',
    blurb:
      'Parents from Chouparan can enquire about coaching at U++ Academy in Madhygopali, Maharajgunj. Call to discuss available classes and admission.',
    icon: 'compass',
    isPrimary: false,
  },
];

export function Locations() {
  return (
    <Section id="locations">
      <SectionHeading
        eyebrow="Areas we serve"
        title={
          <>
            One academy, <span className="text-gradient-gold">three nearby areas</span>
          </>
        }
        description={`U++ Academy is based in ${BUSINESS.address.addressLocality}, ${BUSINESS.areaServed[1]}. Parents and students from Madhygopali, Maharajgunj and nearby Chouparan can reach the academy for coaching enquiries.`}
      />

      <div className="mt-12 grid gap-5 sm:grid-cols-3">
        {LOCATION_LINKS.map((location, index) => (
          <Reveal key={location.area} delay={index * 110}>
            <Link to={location.href} className="block h-full" aria-label={`${location.heading} — visit page`}>
              <Card lift ring className="flex h-full flex-col">
                <div className="flex items-start justify-between gap-3">
                  <span className={`inline-flex h-11 w-11 items-center justify-center rounded-xl border ${location.isPrimary ? 'border-gold-500/30 bg-gold-500/12 text-gold-400' : 'border-iris-400/25 bg-iris-400/10 text-iris-400'}`}>
                    <Icon name={location.icon} />
                  </span>
                  {location.isPrimary && (
                    <span className="rounded-full border border-gold-500/25 bg-gold-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-gold-400">
                      Based here
                    </span>
                  )}
                </div>
                <h3 className="mt-5 text-lg font-bold text-slate-50 sm:text-xl">{location.heading}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">{location.blurb}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-400 transition-colors hover:text-gold-300">
                  Learn more
                  <Icon name="arrow-right" className="h-4 w-4" />
                </span>
              </Card>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
