/**
 * U++ Academy wordmark, using the academy's official logo.
 *
 * The logo file is the real brand mark — gold U++ with a graduation cap and an open book on
 * black, inside a gold circle (public/logo.jpg, supplied by the academy). It is shown as a
 * round badge: the black disc reads as a seal on the paper background, and the circle crop
 * hides the square image's black corners. The wordmark text beside it stays as real text
 * (readable, searchable) rather than relying on the tiny text baked into the image.
 */

import { Link } from 'react-router-dom';
import { cn } from '@/lib/cn';
import { BUSINESS } from '@/data/business';

interface LogoProps {
  className?: string;
  /** Renders as a decorative span (no link) when the caller already wraps it. */
  asLink?: boolean;
  /** Show only the mark, used in small spaces. */
  compact?: boolean;
}

export function LogoMark({ className }: { className?: string }) {
  return (
    <img
      src="/logo.jpg"
      alt=""
      aria-hidden="true"
      width={64}
      height={64}
      className={cn('h-9 w-9 shrink-0 rounded-full object-cover', className)}
    />
  );
}

export function Logo({ className, asLink = true, compact = false }: LogoProps) {
  const wordmark = (
    <span className={cn('flex items-center gap-2.5', className)}>
      <LogoMark />
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-lg font-extrabold tracking-tight text-slate-50">
            U<span className="text-gold-600">++</span> Academy
          </span>
          <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">
            Maharajgunj · Madhygopali
          </span>
        </span>
      )}
    </span>
  );

  if (!asLink) return wordmark;

  return (
    <Link
      to="/"
      className="rounded-lg focus-visible:outline-2"
      aria-label={`${BUSINESS.name} — home`}
    >
      {wordmark}
    </Link>
  );
}
