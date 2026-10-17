import type { ReactNode } from 'react';
import { Icon } from '@/components/ui/Icon';
import { cn } from '@/lib/cn';
import { BUSINESS, whatsappHref } from '@/data/business';

interface WhatsAppButtonProps {
  children?: ReactNode;
  className?: string;
  variant?: 'compact' | 'footer' | 'mobile' | 'full';
  /** Override the prefilled message for contextual CTAs. */
  message?: string;
}

const VARIANTS = {
  compact: 'btn-whatsapp btn-sm h-10 px-5',
  footer: 'btn-whatsapp btn-sm',
  mobile: 'btn-whatsapp btn-sm',
  full: 'btn-whatsapp',
} as const;

/** WhatsApp click-to-chat button, the second primary conversion action. */
export function WhatsAppButton({ children, className, variant = 'full', message }: WhatsAppButtonProps) {
  return (
    <a
      href={whatsappHref(message)}
      className={cn(VARIANTS[variant], className)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Message ${BUSINESS.name} on WhatsApp (${BUSINESS.phone})`}
    >
      <Icon name="whatsapp" className="h-[18px] w-[18px]" />
      {children ?? 'WhatsApp Enquiry'}
    </a>
  );
}
