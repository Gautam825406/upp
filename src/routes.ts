/**
 * The single route manifest for U++ Academy.
 *
 * This is the authoritative list of indexable routes. It drives React Router (browser), the
 * sitemap, and the build-time prerenderer, so there is exactly one place to add a page.
 *
 * Two component maps are derived from the same metadata:
 *   - `PAGE_COMPONENTS`    eager imports, used by the prerenderer and by <Layout> metadata lookup
 *   - `LAZY_PAGE_COMPONENTS` lazy imports, used by the browser for route-level code splitting
 *
 * `path` strings must match `INDEXABLE` in scripts/generate-sitemap.mjs.
 */

import { lazy } from 'react';
import type { ComponentType, LazyExoticComponent } from 'react';
import type { JsonLdEntity } from '@/components/seo/schema';
import { BUSINESS } from '@/data/business';
import Home from '@/pages/HomePage';
import Maharajgunj from '@/pages/MaharajgunjPage';
import Chouparan from '@/pages/ChouparanPage';
import Madhygopali from '@/pages/MadhygopaliPage';
import Courses from '@/pages/CoursesPage';
import Teachers from '@/pages/TeachersPage';
import Contact from '@/pages/ContactPage';
import NotFound from '@/pages/NotFoundPage';

/* ---------- Browser-facing lazy components (code splitting) ---------- */

export const LAZY_PAGE_COMPONENTS = {
  home: lazy(() => import('@/pages/HomePage')),
  maharajgunj: lazy(() => import('@/pages/MaharajgunjPage')),
  chouparan: lazy(() => import('@/pages/ChouparanPage')),
  madhygopali: lazy(() => import('@/pages/MadhygopaliPage')),
  courses: lazy(() => import('@/pages/CoursesPage')),
  teachers: lazy(() => import('@/pages/TeachersPage')),
  contact: lazy(() => import('@/pages/ContactPage')),
} as const;

export type PageKey = keyof typeof LAZY_PAGE_COMPONENTS;

export const LAZY_NOT_FOUND: LazyExoticComponent<ComponentType> = lazy(
  () => import('@/pages/NotFoundPage'),
);

/* ---------- Eager components (prerender + metadata lookup) ---------- */

export const PAGE_COMPONENTS: Record<string, ComponentType> = {
  home: Home,
  maharajgunj: Maharajgunj,
  chouparan: Chouparan,
  madhygopali: Madhygopali,
  courses: Courses,
  teachers: Teachers,
  contact: Contact,
};

export { NotFound };

/* ---------- Metadata ---------- */

export interface PageMeta {
  key: PageKey;
  path: string;
  title: string;
  description: string;
  /** Target keywords. Informational for the owner; not emitted as a meta tag. */
  keywords: string[];
  /** Visible + JSON-LD breadcrumb trail. Omitted on the homepage. */
  breadcrumb?: { name: string; path?: string }[];
  /** Per-page structured data, rendered in addition to the site-wide organization data. */
  jsonLd?: JsonLdEntity[];
}

/** Homepage metadata, exactly as specified. */
export const HOME_TITLE = `${BUSINESS.name} | Coaching in Maharajgunj, Madhygopali & Chouparan`;
export const HOME_DESCRIPTION =
  'U++ Academy offers Class 1–10 coaching for JAC, CBSE and ICSE students in Madhygopali, Maharajgunj, serving nearby Chouparan. Call 9065792628.';

export const PAGES: PageMeta[] = [
  {
    key: 'home',
    path: '/',
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    keywords: [
      'Best coaching institute in Maharajgunj',
      'Best tuition classes in Chouparan',
      'Coaching classes in Madhygopali',
      'Class 1 to 10 coaching',
      'JAC CBSE ICSE coaching Maharajgunj',
      'Umesh Kumar U++ Academy',
    ],
  },
  {
    key: 'maharajgunj',
    path: '/coaching-in-maharajgunj',
    title: 'Coaching Classes in Maharajgunj | U++ Academy',
    description:
      'Coaching classes in Maharajgunj for Class 1 to 10 covering JAC, CBSE and ICSE. Personalised academic support and admissions at U++ Academy — call +91 9065792628.',
    keywords: [
      'Best coaching institute in Maharajgunj',
      'Tuition classes near Maharajgunj',
      'JAC coaching in Maharajgunj',
      'Umesh Kumar teacher Maharajgunj',
      'Experienced teachers in Maharajgunj',
      'Class 1 to 10 coaching Maharajgunj',
    ],
    breadcrumb: [{ name: 'Home', path: '/' }, { name: 'Coaching in Maharajgunj' }],
  },
  {
    key: 'chouparan',
    path: '/tuition-in-chouparan',
    title: 'Tuition Classes Near Chouparan | U++ Academy',
    description:
      'Looking for tuition classes near Chouparan? Students and parents from Chouparan can enquire about Class 1 to 10 coaching at U++ Academy, Madhygopali, Maharajgunj. Call +91 9065792628.',
    keywords: [
      'Best tuition classes in Chouparan',
      'Class 1 to 10 coaching in Chouparan',
      'CBSE tuition in Chouparan',
      'Tuition classes near Chouparan',
      'Coaching for students from Chouparan',
    ],
    breadcrumb: [{ name: 'Home', path: '/' }, { name: 'Tuition near Chouparan' }],
  },
  {
    key: 'madhygopali',
    path: '/coaching-in-madhygopali',
    title: 'Coaching Classes in Madhygopali | U++ Academy',
    description:
      'U++ Academy is based in Madhygopali, Maharajgunj — coaching for Class 1 to 10 in JAC, CBSE and ICSE with concept clarity and special attention for weak students. Call +91 9065792628.',
    keywords: [
      'Coaching classes in Madhygopali',
      'ICSE coaching near Madhygopali',
      'JAC coaching in Madhygopali',
      'Coaching classes near Madhygopali',
      'U++ Academy Madhygopali',
    ],
    breadcrumb: [{ name: 'Home', path: '/' }, { name: 'Coaching in Madhygopali' }],
  },
  {
    key: 'courses',
    path: '/courses',
    title: 'Classes 1 to 10 Coaching | JAC, CBSE & ICSE | U++ Academy',
    description:
      'U++ Academy runs coaching for Class 1 to 10 supporting JAC, CBSE and ICSE students in Madhygopali, Maharajgunj. Concept clarity, personalised attention and academic improvement.',
    keywords: [
      'Class 1 to 10 coaching Maharajgunj',
      'JAC coaching Maharajgunj',
      'CBSE coaching Madhygopali',
      'ICSE coaching Madhygopali',
      'Academic improvement coaching',
    ],
    breadcrumb: [{ name: 'Home', path: '/' }, { name: 'Courses' }],
  },
  {
    key: 'teachers',
    path: '/teachers',
    title: 'Meet Our Teachers | U++ Academy, Maharajgunj',
    description:
      'Meet the U++ Academy teaching team: Director Umesh Kumar and the teaching team supporting the academy student-focused learning mission in Maharajgunj, Madhygopali and Chouparan.',
    keywords: [
      'U++ Academy teachers',
      'Umesh Kumar teacher Maharajgunj',
      'Umesh Kumar U++ Academy',
      'Experienced teachers in Maharajgunj',
    ],
    breadcrumb: [{ name: 'Home', path: '/' }, { name: 'Meet Our Teachers' }],
  },
  {
    key: 'contact',
    path: '/contact',
    title: 'Contact U++ Academy | Admission Enquiry, Maharajgunj',
    description:
      'Contact U++ Academy in Madhygopali, Maharajgunj for admission enquiries. Call +91 9065792628 or message on WhatsApp about Class 1 to 10 coaching for JAC, CBSE and ICSE students.',
    keywords: [
      'U++ Academy contact',
      'Coaching admission enquiry Maharajgunj',
      'Coaching in Madhygopali contact',
      'Contact Umesh Kumar U++ Academy',
    ],
    breadcrumb: [{ name: 'Home', path: '/' }, { name: 'Contact' }],
  },
];

export const PAGE_PATHS = PAGES.map((page) => page.path);

/** Look up page metadata by route path. Returns undefined for unknown paths. */
export function getPageMeta(pathname: string): PageMeta | undefined {
  return PAGES.find((page) => page.path === pathname);
}
