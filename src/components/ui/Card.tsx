/**
 * Flat paper card used for course groups, focus areas, teachers and location highlights.
 * One hairline border, no blur, no glow, no lift animation — a card should look like a card
 * on a notice board, not like a floating panel.
 */

import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface CardProps {
  children: ReactNode;
  className?: string;
  /** Kept for callers; no longer lifts — flat cards do not float. */
  lift?: boolean;
  /** Kept for callers; no longer adds a gradient ring. */
  ring?: boolean;
  /** Kept for callers; strong and regular cards now share the same flat surface. */
  strong?: boolean;
}

export function Card({ children, className }: CardProps) {
  return <div className={cn('card-flat p-5 sm:p-7', className)}>{children}</div>;
}

interface CardIconProps {
  children: ReactNode;
  className?: string;
  tone?: 'gold' | 'pine';
}

const TONES: Record<NonNullable<CardIconProps['tone']>, string> = {
  gold: 'border-gold-500/30 bg-gold-500/10 text-gold-600',
  pine: 'border-pine-500/30 bg-pine-500/10 text-pine-600',
};

/** Square icon well that sits at the top of a card. */
export function CardIcon({ children, className, tone = 'gold' }: CardIconProps) {
  return (
    <span
      className={cn(
        'inline-flex h-12 w-12 items-center justify-center rounded-lg border',
        TONES[tone],
        className,
      )}
      aria-hidden="true"
    >
      {children}
    </span>
  );
}
