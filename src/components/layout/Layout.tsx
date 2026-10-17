/**
 * Layout: the persistent chrome around every page.
 *
 * Order matters for accessibility — the skip link must be the first focusable element, the
 * header must come before the main content, and the footer last.
 */

import type { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { MobileActionBar } from '@/components/actions/MobileActionBar';
import { SkipLink } from '@/components/misc/SkipLink';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-ink-950">
      <SkipLink />
      <Header />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
      <MobileActionBar />
    </div>
  );
}
