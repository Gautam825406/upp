import { Link } from 'react-router-dom';
import { Reveal } from '@/components/ui/Reveal';
import { CallButton } from '@/components/actions/CallButton';
import { WhatsAppButton } from '@/components/actions/WhatsAppButton';
import { BUSINESS, LOCATION_LABEL } from '@/data/business';

/**
 * Homepage hero — flat, editorial, no 3D scene.
 *
 * The previous hero ran a WebGL torus knot with floating books (~900 KB of Three.js) behind the
 * headline. It said nothing about the academy and cost every visitor a heavy download, so it is
 * gone. What is left is the information a parent actually needs: which classes, which boards,
 * where the academy is, who runs it, and how to reach it.
 *
 * Facts only: Class 6 to 12, Arts & Science in 11–12, JAC / CBSE / ICSE, Madhygopali,
 * Maharajgunj, Chouparan, Director Umesh Kumar, phone 8862958656.
 */
const AT_A_GLANCE: { label: string; value: string }[] = [
  { label: 'Classes', value: 'Class 6 to 12' },
  { label: 'Boards', value: 'JAC · CBSE · ICSE' },
  { label: 'Class 11 – 12', value: 'Arts & Science' },
  { label: 'Based in', value: 'Madhygopali, Maharajgunj' },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-14 pt-28 sm:pb-20 sm:pt-32">
      {/* Thin saffron rule at the top, like a newspaper masthead. */}
      <div className="absolute inset-x-0 top-0 h-[3px] bg-gold-500" aria-hidden="true" />

      <div className="container-shell relative">
        <div className="grid items-start gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <div className="max-w-2xl">
            <Reveal>
              <p className="eyebrow">
                {LOCATION_LABEL} · Jharkhand
              </p>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="mt-5 text-4xl font-extrabold leading-[1.08] tracking-tightest text-slate-50 sm:text-6xl">
                Coaching for{' '}
                <span className="text-pine-600">Class 6 to 12</span>
                {' '}— Arts &amp; Science — in Maharajgunj
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
                U++ Academy supports JAC, CBSE and ICSE students with concept
                clarity, personal attention, and special support for weak
                students — based in Madhygopali, serving nearby Chouparan.
              </p>
            </Reveal>

            {/* Desktop only: on phones the sticky bottom bar already carries Call and
                WhatsApp, so showing the same two big buttons in the hero is a duplicate.
                On mobile the hero keeps a single quiet next step instead — a link to the
                courses — and the sticky bar stays the way to call or message. */}
            <Reveal delay={300} className="hidden lg:block">
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <WhatsAppButton>WhatsApp Enquiry</WhatsAppButton>
                <CallButton>Call {BUSINESS.phone}</CallButton>
              </div>
            </Reveal>

            <Reveal delay={300} className="lg:hidden">
              <Link
                to="/courses"
                className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-600 underline decoration-gold-600/40 underline-offset-4 transition-colors hover:text-slate-50"
              >
                Explore Class 6–12 courses
                <span aria-hidden="true">→</span>
              </Link>
            </Reveal>

            <Reveal delay={400}>
              <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-ink-700 pt-6 sm:grid-cols-4">
                {AT_A_GLANCE.map((item) => (
                  <div key={item.label}>
                    <dt className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">
                      {item.label}
                    </dt>
                    <dd className="mt-1 text-sm font-semibold leading-snug text-slate-100">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          {/* Director card — a framed photograph with a caption, like a notice-board photo.
              The photograph is real (Umesh Kumar); nothing here is a stock image. */}
          <Reveal delay={250} className="mx-auto w-full max-w-sm lg:mx-0 lg:max-w-none">
            <figure className="card-flat overflow-hidden">
              <img
                src="/umesh-kumar.webp"
                alt="Umesh Kumar, Director of U++ Academy"
                width={720}
                height={832}
                loading="eager"
                className="aspect-[4/5] w-full object-cover object-top"
              />
              <figcaption className="border-t border-ink-700 px-5 py-4">
                <p className="text-base font-bold text-slate-50">Umesh Kumar</p>
                <p className="mt-0.5 text-sm text-slate-400">
                  Director · U++ Academy, Madhygopali
                </p>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
