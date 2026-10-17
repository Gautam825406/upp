/**
 * U++ Academy wordmark. SVG so it stays crisp at any size and adds no network request.
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
    <svg
      viewBox="0 0 44 44"
      className={cn('h-9 w-9', className)}
      aria-hidden="true"
      fill="none"
    >
      <defs>
        <linearGradient id="logo-g" x1="6" y1="4" x2="38" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffe3a3" />
          <stop offset="55%" stopColor="#ffc24b" />
          <stop offset="100%" stopColor="#8b7bff" />
        </linearGradient>
        <linearGradient id="logo-inner" x1="14" y1="12" x2="30" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#ffe3a3" stopOpacity="0.85" />
        </linearGradient>
      </defs>
      {/* Open book, the academy's core mark */}
      <path
        d="M6 12.5C9.5 10.6 13.5 10 17 10.8 19 11.2 20.6 12 22 13.2 23.4 12 25 11.2 27 10.8 30.5 10 34.5 10.6 38 12.5V30.5C34.5 28.6 30.5 28 27 28.8 25 29.2 23.4 30 22 31.2 20.6 30 19 29.2 17 28.8 13.5 28 9.5 28.6 6 30.5V12.5Z"
        fill="url(#logo-g)"
      />
      <path d="M22 13.2V31.2" stroke="#0b1026" strokeOpacity="0.45" strokeWidth="1.4" />
      <path
        d="M10 17.2C12 16.3 14 16 15.8 16.4M10 21.2C12 20.3 14 20 15.8 20.4M10 25.2C12 24.3 14 24 15.8 24.4"
        stroke="#0b1026"
        strokeOpacity="0.3"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M34 17.2C32 16.3 30 16 28.2 16.4M34 21.2C32 20.3 30 20 28.2 20.4M34 25.2C32 24.3 30 24 28.2 24.4"
        stroke="#0b1026"
        strokeOpacity="0.3"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Logo({ className, asLink = true, compact = false }: LogoProps) {
  const wordmark = (
    <span className={cn('flex items-center gap-2.5', className)}>
      <LogoMark />
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-lg font-extrabold tracking-tight text-slate-50">
            U<span className="text-gradient-gold">++</span> Academy
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
