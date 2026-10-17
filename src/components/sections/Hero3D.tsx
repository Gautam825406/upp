import { lazy, Suspense } from 'react';
import { Reveal } from '@/components/ui/Reveal';
import { CallButton } from '@/components/actions/CallButton';
import { WhatsAppButton } from '@/components/actions/WhatsAppButton';
import { BUSINESS, LOCATION_LABEL } from '@/data/business';
import { useCoarsePointer, useReducedMotion } from '@/components/three/useReducedMotion';

const LazyAcademyScene = lazy(() => import('@/components/three/AcademyScene'));

export function Hero3D() {
  const reduced = useReducedMotion();
  const coarse = useCoarsePointer();

  return (
    <section
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-20 pb-28"
      style={{
        background:
          'radial-gradient(60% 60% at 20% 20%, rgba(109,91,255,0.28) 0%, transparent 60%), radial-gradient(50% 50% at 85% 15%, rgba(255,194,75,0.20) 0%, transparent 60%), radial-gradient(70% 70% at 50% 100%, rgba(34,211,238,0.12) 0%, transparent 60%)',
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(rgba(255,255,255,0.045) 1px, transparent 1px)',
          backgroundSize: '26px 26px',
        }}
      />

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
                {LOCATION_LABEL} · Jharkhand
              </span>
            </Reveal>

            <Reveal delay={120}>
              <h1 className="mt-7 text-4xl font-extrabold leading-[1.08] tracking-tightest text-slate-50 sm:text-6xl lg:text-7xl">
                Best coaching for{' '}
                <span className="text-gradient-gold">Class 1 to 10</span>
                <br />
                in Maharajgunj
              </h1>
            </Reveal>

            <Reveal delay={240}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300 sm:text-xl">
                U++ Academy supports JAC, CBSE and ICSE students with concept
                clarity, personalised attention, and special support for weak
                students — based in Madhygopali, serving nearby Chouparan.
              </p>
            </Reveal>

            <Reveal delay={360}>
              <div className="mt-9 flex flex-wrap items-center gap-3.5">
                <CallButton>Call {BUSINESS.phone}</CallButton>
                <WhatsAppButton>WhatsApp Enquiry</WhatsAppButton>
              </div>
            </Reveal>

            <Reveal delay={480}>
              <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-slate-400">
                {(['JAC', 'CBSE', 'ICSE'] as const).map((board) => (
                  <span
                    key={board}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 font-semibold text-slate-200"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
                    {board}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={300} className="hidden lg:block">
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
                  className="relative h-60 w-60 rounded-full border-2 border-gold-500/40 object-cover object-top shadow-2xl"
                />
              </div>
              <div className="text-center">
                <span className="inline-flex items-center rounded-full border border-gold-500/25 bg-gold-500/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-gold-400">
                  Director
                </span>
                <p className="mt-2.5 text-xl font-bold tracking-tight text-slate-50">Umesh Kumar</p>
                <p className="mt-1 text-sm text-slate-400">U++ Academy · Madhygopali</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
