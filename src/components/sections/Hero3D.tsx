import { lazy, Suspense } from 'react';
import { Reveal } from '@/components/ui/Reveal';
import { CallButton } from '@/components/actions/CallButton';
import { WhatsAppButton } from '@/components/actions/WhatsAppButton';
import { Icon } from '@/components/ui/Icon';
import { BUSINESS, LOCATION_LABEL } from '@/data/business';
import { useCoarsePointer, useReducedMotion } from '@/components/three/useReducedMotion';

const LazyAcademyScene = lazy(() => import('@/components/three/AcademyScene'));

/** Short proof points shown under the hero CTAs. All are facts the academy has stated. */
const PROOF_POINTS = [
  'Class 8 to 12',
  'Arts & Science',
  'JAC · CBSE · ICSE',
];

export function Hero3D() {
  const reduced = useReducedMotion();
  const coarse = useCoarsePointer();

  return (
    <section
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-24 pb-32 sm:pt-20 sm:pb-28"
      style={{
        background:
          'radial-gradient(60% 60% at 20% 20%, rgba(109,91,255,0.28) 0%, transparent 60%), radial-gradient(50% 50% at 85% 15%, rgba(255,194,75,0.20) 0%, transparent 60%), radial-gradient(70% 70% at 50% 100%, rgba(34,211,238,0.12) 0%, transparent 60%)',
      }}
    >
      <div className="bg-dot-grid absolute inset-0" aria-hidden="true" />

      {/* Soft colour wash. On phones this is the only "depth" behind the hero, since the WebGL
          scene is skipped for coarse pointers — so it carries the ambience instead. */}
      {!reduced && (
        <>
          <div
            className="aurora left-[-18%] top-[-6%] h-64 w-64 bg-iris-500/25 sm:h-96 sm:w-96"
            aria-hidden="true"
          />
          <div
            className="aurora right-[-22%] top-[8%] h-56 w-56 bg-gold-500/20 sm:h-80 sm:w-80"
            style={{ animationDelay: '-4.5s' }}
            aria-hidden="true"
          />
          <div
            className="aurora bottom-[-14%] left-[24%] h-52 w-52 bg-aqua-400/15 sm:h-72 sm:w-72"
            style={{ animationDelay: '-2s' }}
            aria-hidden="true"
          />
        </>
      )}

      {!reduced && !coarse && (
        <Suspense fallback={null}>
          <div className="absolute inset-0 z-0">
            <LazyAcademyScene />
          </div>
        </Suspense>
      )}

      <div className="container-shell relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_auto]">
          <div className="max-w-3xl">
            <Reveal>
              <span className="eyebrow">
                <Icon name="map-pin" className="h-3.5 w-3.5" />
                {LOCATION_LABEL} · Jharkhand
              </span>
            </Reveal>

            <Reveal delay={120}>
              <h1 className="mt-6 text-[2.1rem] font-extrabold leading-[1.1] tracking-tightest text-slate-50 sm:mt-7 sm:text-6xl lg:text-7xl">
                Best coaching for{' '}
                <span className="text-gradient-gold">Class 8 to 12</span>
                <br />
                Arts &amp; Science in Maharajgunj
              </h1>
            </Reveal>

            <Reveal delay={240}>
              <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-slate-300 sm:mt-6 sm:text-xl">
                U++ Academy supports JAC, CBSE and ICSE students with concept
                clarity, personalised attention, and special support for weak
                students — based in Madhygopali, serving nearby Chouparan.
              </p>
            </Reveal>

            {/* Contact actions are intentionally hidden on phones: the sticky bottom bar already
                provides them on every screen, so repeating them here just clutters the hero. */}
            <Reveal delay={360}>
              <div className="mt-8 hidden sm:mt-9 sm:flex sm:flex-wrap sm:items-center sm:gap-3.5">
                <WhatsAppButton>WhatsApp Enquiry</WhatsAppButton>
                <CallButton>Call {BUSINESS.phone}</CallButton>
              </div>
            </Reveal>

            <Reveal delay={480}>
              <ul className="mt-7 grid grid-cols-1 gap-2 sm:mt-9 sm:flex sm:flex-wrap sm:items-center sm:gap-x-5 sm:gap-y-3">
                {PROOF_POINTS.map((point) => (
                  <li
                    key={point}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-[13px] font-semibold text-slate-200"
                  >
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold-400" />
                    {point}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Director card. Shown on every breakpoint now — on phones it becomes a compact
              identity card under the CTAs instead of disappearing entirely. */}
          <Reveal delay={300} className="lg:pl-4">
            <div className="flex flex-col items-center gap-5">
              <div className="relative">
                <div
                  className="absolute -inset-4 rounded-full bg-gold-500/10 blur-2xl"
                  aria-hidden="true"
                />
                <div
                  className="absolute -inset-1 rounded-full border border-gold-500/25"
                  aria-hidden="true"
                />
                <img
                  src="/umesh%20kumar.png"
                  alt="Umesh Kumar, Director of U++ Academy"
                  className="relative h-36 w-36 rounded-full border-2 border-gold-500/40 object-cover object-top shadow-2xl sm:h-44 sm:w-44 lg:h-60 lg:w-60"
                />
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-gold-500/30 bg-ink-900/90 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-gold-400 backdrop-blur">
                  Director
                </span>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold tracking-tight text-slate-50 sm:text-xl">
                  Umesh Kumar
                </p>
                <p className="mt-1 text-sm text-slate-400 sm:text-sm">
                  U++ Academy · Madhygopali
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
