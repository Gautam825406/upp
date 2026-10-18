/**
 * Sticky bottom action bar on small screens: one tap to call, one tap to message on WhatsApp.
 *
 * These are the two conversion actions most parents will use, so on mobile they must be
 * reachable without scrolling. Hidden on desktop where the header and CTAs already cover this.
 */

import { BUSINESS, TEL_HREF, whatsappHref } from '@/data/business';
import { Icon } from '@/components/ui/Icon';

export function MobileActionBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-ink-900/95 px-3 py-2.5 backdrop-blur-xl lg:hidden"
      style={{ paddingBottom: 'max(0.625rem, env(safe-area-inset-bottom))' }}
      role="group"
      aria-label="Contact U++ Academy"
    >
      <div className="mx-auto flex max-w-md gap-2.5">
        <a
          href={TEL_HREF}
          className="btn-call flex-1 py-3 text-sm active:scale-[0.98]"
          aria-label={`Call ${BUSINESS.name} at ${BUSINESS.phone}`}
        >
          <Icon name="phone" className="h-4 w-4" />
          Call Now
        </a>
        <a
          href={whatsappHref()}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-whatsapp flex-1 py-3 text-sm active:scale-[0.98]"
          aria-label={`Message ${BUSINESS.name} on WhatsApp`}
        >
          <Icon name="whatsapp" className="h-4 w-4" />
          WhatsApp
        </a>
      </div>
    </div>
  );
}
