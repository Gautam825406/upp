/**
 * IntersectionObserver-based scroll reveal.
 *
 * Observes once and then unobserves, so the animation is paid for exactly once per element.
 * The element remains fully visible without JavaScript (default state is shown; the "hidden"
 * state is only applied when the observer is supported and prefers-reduced-motion is off).
 *
 * This means the pre-rendered HTML always contains visible content — important for crawlers and
 * for users with JavaScript disabled.
 */

import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Delay in ms before the reveal transition starts. */
  delay?: number;
  /** Pixel offset at the bottom of the viewport that triggers the reveal. */
  threshold?: number;
}

export function Reveal({ children, className, delay = 0, threshold = 0.12 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  // Initial state is visible (true) so pre-rendered HTML always contains fully-visible content.
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === 'undefined' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    // Only hide + animate elements that are below the fold on mount.
    // Above-fold elements stay visible from the start (matches SSR output).
    if (node.getBoundingClientRect().top >= window.innerHeight) {
      setVisible(false);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        }
      },
      { threshold, rootMargin: '0px 0px -40px 0px' },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  const style: CSSProperties = {
    transitionDelay: `${delay}ms`,
    opacity: visible ? 1 : 0,
    transform: visible ? 'none' : 'translateY(24px)',
  };

  return (
    <div
      ref={ref}
      style={style}
      className={cn(
        'transition-[opacity,transform] duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]',
        className,
      )}
    >
      {children}
    </div>
  );
}
