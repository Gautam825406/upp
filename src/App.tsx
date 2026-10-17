/**
 * App shell: layout + route table.
 *
 * Routes come from the lazy component map in src/routes.ts so every page is its own network
 * chunk. The home page is NOT lazy — it should never sit behind a lazy load.
 */

import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { ScrollToTop } from '@/components/misc/ScrollToTop';
import { PageLoader } from '@/components/ui/PageLoader';
import Home from '@/pages/HomePage';
import {
  LAZY_PAGE_COMPONENTS,
  LAZY_NOT_FOUND,
} from '@/routes';

export function App() {
  return (
    <>
      <ScrollToTop />
      <Layout>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/coaching-in-maharajgunj"
              element={<LAZY_PAGE_COMPONENTS.maharajgunj />}
            />
            <Route path="/tuition-in-chouparan" element={<LAZY_PAGE_COMPONENTS.chouparan />} />
            <Route path="/coaching-in-madhygopali" element={<LAZY_PAGE_COMPONENTS.madhygopali />} />
            <Route path="/courses" element={<LAZY_PAGE_COMPONENTS.courses />} />
            <Route path="/teachers" element={<LAZY_PAGE_COMPONENTS.teachers />} />
            <Route path="/contact" element={<LAZY_PAGE_COMPONENTS.contact />} />
            <Route path="*" element={<LAZY_NOT_FOUND />} />
          </Routes>
        </Suspense>
      </Layout>
    </>
  );
}
