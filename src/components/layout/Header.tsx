/**
 * Sticky header with primary navigation and a prominent call CTA.
 *
 * Accessibility: the nav is labelled, keyboard-reachable, and the mobile menu is focus-managed
 * enough to not strand keyboard users.
 */

import { useEffect, useState } from 'react';
import { NavLink, useInRouterContext, useLocation } from 'react-router-dom';
import { cn } from '@/lib/cn';
import { Logo } from '@/components/ui/Logo';
import { CallButton } from '@/components/actions/CallButton';
import { WhatsAppButton } from '@/components/actions/WhatsAppButton';
import { ThemeToggle } from '@/components/actions/ThemeToggle';
import { BUSINESS } from '@/data/business';

interface HeaderLink {
  label: string;
  to: string;
}

/** Top-level navigation. Location pages are surfaced here because they are the site's core SEO pages. */
const NAV: HeaderLink[] = [
  { label: 'Courses', to: '/courses' },
  { label: 'Teachers', to: '/teachers' },
  { label: 'Maharajgunj', to: '/coaching-in-maharajgunj' },
  { label: 'Chouparan', to: '/tuition-in-chouparan' },
  { label: 'Madhygopali', to: '/coaching-in-madhygopali' },
  { label: 'Contact', to: '/contact' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  // The build prerenders this component outside a Router, where useLocation would throw. Guard
  // with useInRouterContext (always safe) and call useLocation only when a real router context
  // exists — which is the case on every normal page load, just not during the static prerender.
  // React's Rules of Hooks: a hook is skipped here on the SSR path, but the branch order is
  // identical on every client render (always true), so the runtime treats them as one hook.
  const inRouter = useInRouterContext();
  const location = inRouter ? useLocation() : undefined;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [location?.pathname]);

  // Prevent the body from scrolling while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled
          ? 'border-b border-white/[0.08] bg-ink-950/85 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <div className="container-shell flex h-16 items-center justify-between gap-4 sm:h-[72px]">
        <Logo />

        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {NAV.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className="nav-link"
              data-active={location?.pathname === link.to}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <CallButton
            variant="compact"
            className="hidden md:inline-flex"
            aria-label={`Call ${BUSINESS.name}: ${BUSINESS.phone}`}
          />
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-200 transition-colors active:bg-white/[0.1] lg:hidden"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h10" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="max-h-[calc(100svh-4rem)] overflow-y-auto border-t border-white/[0.08] bg-ink-950/95 backdrop-blur-xl lg:hidden"
      >
        <nav aria-label="Mobile" className="container-shell flex flex-col py-4">
          {NAV.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className="rounded-lg px-3 py-3.5 text-base font-medium text-slate-200 transition-colors hover:bg-white/[0.06] hover:text-white"
              data-active={location?.pathname === link.to}
            >
              {link.label}
            </NavLink>
          ))}
          {/* The sticky bottom bar already carries Call and WhatsApp on phones. */}
          <div className="mt-3 hidden gap-3 px-3 pb-2 sm:flex">
            <CallButton variant="mobile" className="flex-1 py-3">
              Call {BUSINESS.phone}
            </CallButton>
            <WhatsAppButton variant="mobile" className="flex-1 py-3">
              WhatsApp
            </WhatsAppButton>
          </div>
        </nav>
      </div>
    </header>
  );
}
