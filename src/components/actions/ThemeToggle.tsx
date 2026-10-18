/**
 * Light/dark theme toggle.
 *
 * Both icons are always rendered and cross-faded, so there is no layout shift and the control reads
 * as a single switch. `aria-pressed` carries the state for assistive tech.
 */

import { Icon } from '@/components/ui/Icon';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/cn';

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, toggle } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={isDark}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className={cn(
        'relative inline-flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl',
        'border border-white/10 bg-white/[0.04] text-slate-200 transition-colors',
        'hover:border-white/25 hover:bg-white/[0.08] active:bg-white/[0.12]',
        className,
      )}
    >
      <Icon
        name="sun"
        className={cn(
          'absolute h-5 w-5 transition-all duration-300',
          isDark ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-50 opacity-0',
        )}
      />
      <Icon
        name="moon"
        className={cn(
          'absolute h-5 w-5 transition-all duration-300',
          isDark ? 'rotate-90 scale-50 opacity-0' : 'rotate-0 scale-100 opacity-100',
        )}
      />
    </button>
  );
}
