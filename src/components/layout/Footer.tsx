/**
 * Site footer: NAP details, quick links, location links and the legal line.
 *
 * NAP here is pulled from the same data module as everywhere else, so the contact details
 * displayed to visitors always match the structured data sent to search engines.
 */

import { Link } from 'react-router-dom';
import { BUSINESS, TEL_HREF } from '@/data/business';
import { Logo } from '@/components/ui/Logo';
import { CallButton } from '@/components/actions/CallButton';
import { WhatsAppButton } from '@/components/actions/WhatsAppButton';
import { PAGES } from '@/routes';

function FooterColumn({ title, links }: { title: string; links: { label: string; to: string }[] }) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-400">{title}</h3>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.to}>
            <Link to={link.to} className="text-sm text-slate-300 transition-colors hover:text-white">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  const locationLinks = PAGES.filter((p) =>
    ['/coaching-in-maharajgunj', '/tuition-in-chouparan', '/coaching-in-madhygopali'].includes(p.path),
  );

  return (
    <footer className="relative border-t border-white/[0.08] bg-ink-900">
      <div className="bg-dot-grid absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="container-shell relative py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-slate-400">
              Coaching for Class 1 to 10 in {BUSINESS.boards.join(', ')} — based in{' '}
              {BUSINESS.address.addressLocality}, {BUSINESS.areaServed[1]} and serving nearby{' '}
              {BUSINESS.areaServed[2]}.
            </p>
            <div className="mt-5 flex gap-3">
              <CallButton variant="footer">Call</CallButton>
              <WhatsAppButton variant="footer">WhatsApp</WhatsAppButton>
            </div>
          </div>

          <FooterColumn
            title="Academy"
            links={[
              { label: 'Courses & Classes', to: '/courses' },
              { label: 'Meet Our Teachers', to: '/teachers' },
              { label: 'Admission Enquiry', to: '/contact' },
              { label: 'Home', to: '/' },
            ]}
          />

          <FooterColumn
            title="Areas We Serve"
            links={locationLinks.map((page) => ({
              label: (page.title.split('|')[0] ?? '').trim(),
              to: page.path,
            }))}
          />

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-400">
              Contact
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href={TEL_HREF}
                  className="font-semibold text-slate-100 transition-colors hover:text-gold-400"
                >
                  {BUSINESS.phone}
                </a>
              </li>
              <li className="text-slate-300">
                {BUSINESS.address.addressLocality}, {BUSINESS.address.addressRegion}
              </li>
              <li className="text-slate-400">
                {BUSINESS.classesPlain} · {BUSINESS.boards.join(', ')}
              </li>
              <li className="text-slate-400">
                Director: <span className="text-slate-200">{BUSINESS.director}</span>
              </li>
              <li>
                <a
                  href={BUSINESS.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-300 underline decoration-white/20 underline-offset-4 transition-colors hover:text-gold-400"
                >
                  View on Google Maps
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="rule-gold mt-12" aria-hidden="true" />

        <div className="mt-6 flex flex-col gap-3 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {BUSINESS.name}, {BUSINESS.address.addressLocality},{' '}
            {BUSINESS.address.addressRegion}. All rights reserved.
          </p>
          <p className="max-w-md text-balance">
            Information on this site describes the academy's own courses and contact details. No
            third-party reviews or ratings are published.
          </p>
        </div>
      </div>
    </footer>
  );
}
