/**
 * Download App section — where students get the U++ Academy Android app.
 *
 * One link only: the academy's own Google Play listing (BUSINESS.playStoreUrl, verified live).
 * The button opens Google Play in a new tab; the app itself is installed from there, so the
 * student is never asked to sideload an APK file from this site. Copy is taken from the Play
 * listing itself (recorded and live classes, study material, expert guidance) — nothing invented.
 */

import { Reveal } from '@/components/ui/Reveal';
import { Icon } from '@/components/ui/Icon';
import { BUSINESS } from '@/data/business';

const APP_FEATURES = [
  'Live classes with experienced faculty',
  'Recorded classes to revise anytime',
  'Study material and expert guidance',
];

export function DownloadApp() {
  return (
    <section id="download-app" className="py-16 sm:py-20">
      <div className="container-shell">
        <div className="rounded-xl bg-pine-600 px-6 py-10 sm:px-12 sm:py-14">
          <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14">
            <Reveal>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-onSolid/70">
                Download the app
              </p>
              <h2 className="mt-4 max-w-2xl text-3xl font-extrabold leading-[1.15] tracking-tight text-onSolid sm:text-4xl">
                Get the U++ Academy app on your phone
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-onSolid/85 sm:text-lg">
                Recorded and live classes, study material and expert guidance — for Class 6 to 12
                students, wherever you are.
              </p>

              <ul className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {APP_FEATURES.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-onSolid/90">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/10">
                      <Icon name="check" className="h-3 w-3 text-onSolid" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={150}>
              <div className="flex flex-col items-start gap-3 lg:items-end">
                <a
                  href={BUSINESS.playStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-cream inline-flex items-center gap-3"
                >
                  <Icon name="play" className="h-5 w-5" />
                  <span className="text-left leading-tight">
                    <span className="block text-[11px] font-semibold uppercase tracking-[0.12em] opacity-70">
                      Get it on
                    </span>
                    <span className="block text-base font-extrabold">Google Play</span>
                  </span>
                </a>
                <p className="text-sm text-onSolid/70 lg:text-right">
                  Free · For Android phones · Search “U++ Academy” on Google Play
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
