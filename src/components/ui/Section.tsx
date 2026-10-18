/**
 * Section primitives: a consistent vertical rhythm and section heading treatment across the site.
 */

import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Reveal } from './Reveal';

interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  /** Dim the section background slightly to separate it visually. */
  subtle?: boolean;
}

export function Section({ children, id, className, subtle = false }: SectionProps) {
  return (
    <section id={id} className={cn('relative py-16 sm:py-24 lg:py-28', subtle && 'bg-ink-900/60', className)}>
      <div className="container-shell">{children}</div>
    </section>
  );
}

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
}: SectionHeadingProps) {
  return (
    <Reveal className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className="mt-4 text-[1.75rem] font-bold leading-[1.15] tracking-tight sm:mt-5 sm:text-4xl lg:text-[2.75rem]">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-[15px] leading-relaxed text-slate-400 sm:mt-5 sm:text-lg">
          {description}
        </p>
      )}
    </Reveal>
  );
}
