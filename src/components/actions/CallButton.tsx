import type { ReactNode } from 'react';
import { Icon } from '@/components/ui/Icon';
import { cn } from '@/lib/cn';
import { BUSINESS, TEL_HREF } from '@/data/business';

interface CallButtonProps {
  children?: ReactNode;
  className?: string;
  variant?: 'compact' | 'footer' | 'mobile' | 'full';
}

const VARIANTS = {
  compact: 'btn-call btn-sm h-10 px-5',
  footer: 'btn-call btn-sm',
  mobile: 'btn-call btn-sm',
  full: 'btn-call',
} as const;

/** Click-to-call button. One of the two primary conversion actions on the site. */
export function CallButton({ children, className, variant = 'full' }: CallButtonProps) {
  return (
    <a
      href={TEL_HREF}
      className={cn(VARIANTS[variant], className)}
      aria-label={`Call ${BUSINESS.name} at ${BUSINESS.phone}`}
    >
      <Icon name="phone" className="h-[18px] w-[18px]" />
      {children ?? BUSINESS.phone}
    </a>
  );
}
