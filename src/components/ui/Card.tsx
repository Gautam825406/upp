/**
 * Glass card used for course groups, focus areas, teachers and location highlights.
 * `as` lets it render as a link or article where semantics require it.
 */

import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface CardProps {
  children: ReactNode;
  className?: string;
  /** Enable the hover lift used in card grids. */
  lift?: boolean;
  /** Stronger surface for cards that need more visual weight. */
  strong?: boolean;
  /** Adds the animated gold gradient border. */
  ring?: boolean;
}

export function Card({ children, className, lift = false, strong = false, ring = false }: CardProps) {
  return (
    <div
      className={cn(
        strong ? 'glass-strong' : 'glass',
        lift && 'card-lift',
        ring && 'glow-ring',
        'p-6 sm:p-7',
        className,
      )}
    >
      {children}
    </div>
  );
}

interface CardIconProps {
  children: ReactNode;
  className?: string;
  tone?: 'gold' | 'iris' | 'aqua';
}

const TONES: Record<NonNullable<CardIconProps['tone']>, string> = {
  gold: 'border-gold-500/25 bg-gold-500/10 text-gold-400',
  iris: 'border-iris-400/25 bg-iris-400/10 text-iris-400',
  aqua: 'border-aqua-400/25 bg-aqua-400/10 text-aqua-400',
};

/** Rounded icon well that sits at the top of a card. */
export function CardIcon({ children, className, tone = 'gold' }: CardIconProps) {
  return (
    <span
      className={cn(
        'inline-flex h-12 w-12 items-center justify-center rounded-xl border',
        TONES[tone],
        className,
      )}
      aria-hidden="true"
    >
      {children}
    </span>
  );
}
