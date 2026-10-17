/**
 * Structured data builders for U++ Academy.
 *
 * Builders are plain functions returning JSON-LD objects, so they can be rendered in the browser
 * (<script type="application/ld+json">) and reused by the build-time prerenderer without any
 * React dependency.
 *
 * HONESTY RULES APPLIED HERE:
 *  - No `aggregateRating` and no `review` — we publish no fake ratings or reviews.
 *  - No `openingHours` — never supplied.
 *  - No `priceRange` — never supplied, and inventing fees would misrepresent the academy.
 *  - No additional locations / branches — U++ Academy has one location.
 */

import { BUSINESS, SITE_URL } from '@/data/business';
import { TEACHERS } from '@/data/teachers';
import type { Faq } from '@/data/faqs';

export type JsonLdEntity = Record<string, unknown>;

export interface OrganizationJsonLd {
  '@context': string;
  '@id': string;
  '@type': string[];
  name: string;
  legalName: string;
  url: string;
  telephone: string;
  address: {
    '@type': 'PostalAddress';
    addressLocality: string;
    addressRegion: string;
    addressCountry: string;
    streetAddress?: string;
    postalCode?: string;
  };
  areaServed: string[];
  sameAs: string[];
  employee: Record<string, unknown>[];
  founder: Record<string, unknown>;
}

/** Stable node ids, kept identical in every schema block so Google can link the graph. */
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const CONTACT_PAGE_URL = `${SITE_URL}/contact`;
export const TEACHERS_PAGE_URL = `${SITE_URL}/teachers`;

/** Director Umesh Kumar as a Person node. */
export function directorPerson(): Record<string, unknown> {
  return {
    '@type': 'Person',
    '@id': `${ORGANIZATION_ID}#director`,
    name: BUSINESS.director,
    jobTitle: 'Director',
    worksFor: { '@id': ORGANIZATION_ID },
  };
}

/** Person nodes for every teacher we know about, ordered as in `TEACHERS`. */
export function teacherPersons(): Record<string, unknown>[] {
  return TEACHERS.map(() => directorPerson());
}

/**
 * Site-wide organization schema. `asLocalBusiness` adds LocalBusiness to the type list, which is
 * appropriate on location landing pages where the business's local service area matters.
 */
export function buildOrganizationSchema(asLocalBusiness = false): OrganizationJsonLd {
  const address: OrganizationJsonLd['address'] = {
    '@type': 'PostalAddress',
    addressLocality: BUSINESS.address.addressLocality,
    addressRegion: BUSINESS.address.addressRegion,
    addressCountry: BUSINESS.address.addressCountry,
  };
  if (BUSINESS.address.streetAddress) {
    address.streetAddress = BUSINESS.address.streetAddress;
  }
  if (BUSINESS.address.postalCode) {
    address.postalCode = BUSINESS.address.postalCode;
  }

  const sameAs: string[] = [BUSINESS.mapsUrl];
  // Only link the GBP URL when it is a real claimed profile — never a search placeholder.
  if (BUSINESS.hasVerifiedGoogleBusinessProfile) sameAs.push(BUSINESS.googleBusinessProfileUrl);

  return {
    '@context': 'https://schema.org',
    '@id': ORGANIZATION_ID,
    '@type': asLocalBusiness
      ? ['EducationalOrganization', 'LocalBusiness']
      : ['EducationalOrganization'],
    name: BUSINESS.name,
    legalName: BUSINESS.legalName,
    url: SITE_URL,
    telephone: BUSINESS.phoneE164,
    address,
    areaServed: [...BUSINESS.areaServed],
    sameAs,
    employee: teacherPersons(),
    founder: directorPerson(),
  };
}

/** FAQPage schema. Answers must match the visible FAQ text verbatim. */
export function buildFaqSchema(faqs: Faq[]): JsonLdEntity {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => {
      const question: Record<string, unknown> = {
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      };
      return question;
    }),
  };
}

/** BreadcrumbList schema matching the visible breadcrumb navigation. */
export function buildBreadcrumbSchema(items: { name: string; path?: string }[]): JsonLdEntity {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => {
      const entry: Record<string, unknown> = {
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
      };
      if (item.path) entry.item = `${SITE_URL}${item.path}`;
      return entry;
    }),
  };
}

/** WebPage schema tying a page's title and description to the organization. */
export function buildWebPageSchema(opts: {
  path: string;
  title: string;
  description: string;
}): JsonLdEntity {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}${opts.path}`,
    url: `${SITE_URL}${opts.path}`,
    name: opts.title,
    description: opts.description,
    isPartOf: { '@id': ORGANIZATION_ID },
    inLanguage: 'en-IN',
  };
}

/**
 * Person schema for the /teachers page. Includes only verified facts — name, role and employer.
 * No education, alumni, address or employmentDates, because none were provided.
 */
export function buildTeacherPersonSchemas(): JsonLdEntity[] {
  return TEACHERS.map((teacher) => {
    const person: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': `${TEACHERS_PAGE_URL}#${teacher.id}`,
      name: teacher.name,
      jobTitle: teacher.role,
      worksFor: { '@id': ORGANIZATION_ID },
    };
    if (teacher.role === 'Director') {
      person.additionalRole = { '@id': ORGANIZATION_ID };
    }
    return person;
  });
}

/** Convenience: the full set of schema blocks a page should render. */
export interface PageSchemaOptions {
  path: string;
  title: string;
  description: string;
  breadcrumb?: { name: string; path?: string }[];
  faqs?: Faq[];
  asLocalBusiness?: boolean;
  extra?: JsonLdEntity[];
}

export function buildPageSchema(opts: PageSchemaOptions): JsonLdEntity[] {
  const blocks: JsonLdEntity[] = [
    buildOrganizationSchema(opts.asLocalBusiness) as unknown as JsonLdEntity,
    buildWebPageSchema({ path: opts.path, title: opts.title, description: opts.description }),
  ];
  if (opts.breadcrumb && opts.breadcrumb.length > 0) {
    blocks.push(buildBreadcrumbSchema(opts.breadcrumb));
  }
  if (opts.faqs && opts.faqs.length > 0) blocks.push(buildFaqSchema(opts.faqs));
  if (opts.extra) blocks.push(...opts.extra);
  return blocks;
}
