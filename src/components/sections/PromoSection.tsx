/**
 * Promotional video section on the landing page.
 *
 * The video is a YouTube Short. `PROMO_VIDEO` accepts any YouTube URL shape (watch, youtu.be,
 * /shorts/, /embed/) or a bare video id — `parseYouTubeId` in PromoVideo.tsx normalises it.
 */

import { Reveal } from '@/components/ui/Reveal';
import { PromoVideo } from '@/components/sections/PromoVideo';
import { Icon } from '@/components/ui/Icon';
import { BUSINESS } from '@/data/business';

const PROMO_VIDEO = 'https://youtube.com/shorts/3FjF-WYljbs';

const HIGHLIGHTS = [
  'Classes 1 to 10',
  'JAC · CBSE · ICSE',
  'Concept-focused teaching',
  'Personal attention per student',
];

export function PromoSection() {
  return (
    <section id="promo" className="relative overflow-hidden py-14 sm:py-20">
      <div className="container-shell">
        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
          <Reveal>
            <PromoVideo video={PROMO_VIDEO} />
          </Reveal>

          <Reveal delay={140}>
            <div>
              <span className="eyebrow">
                <Icon name="sparkles" className="h-3.5 w-3.5" />
                See it in action
              </span>

              <h2 className="mt-5 text-[1.75rem] font-bold leading-[1.15] tracking-tight sm:mt-6 sm:text-4xl">
                Watch a{' '}
                <span className="text-gradient-gold">class at U++ Academy</span>
              </h2>

              <p className="mt-4 text-[15px] leading-relaxed text-slate-400 sm:text-lg">
                A short look at how we teach — the board, the classroom and the way concepts are
                explained to students of different levels.
              </p>

              <ul className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {HIGHLIGHTS.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-slate-300">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-gold-500/25 bg-gold-500/10">
                      <Icon name="check" className="h-3 w-3 text-gold-400" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <p className="mt-7 text-sm text-slate-500">
                Based in {BUSINESS.address.addressLocality}, {BUSINESS.areaServed[1]}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
