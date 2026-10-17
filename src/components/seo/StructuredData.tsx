/**
 * <StructuredData /> — the one place a page asks for its SEO output.
 *
 * Emits three things:
 *   1. Document head tags (title, description, canonical, Open Graph, Twitter) via <Seo />
 *   2. JSON-LD blocks (Organization, WebPage, BreadcrumbList, FAQPage, Person) via <ScriptJsonLd />
 *   3. A visible breadcrumb trail, when the current page declares one
 *
 * The same blocks are written into each pre-rendered file's <head> by scripts/prerender.mjs, so
 * crawlers never depend on JavaScript to see metadata or structured data.
 */

import type { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import type { Faq } from '@/data/faqs';
import { getPageMeta } from '@/routes';
import {
  buildPageSchema,
  buildOrganizationSchema,
  buildTeacherPersonSchemas,
  ORGANIZATION_ID,
} from './schema';
import type { JsonLdEntity } from './schema';
import { ScriptJsonLd } from './ScriptJsonLd';
import { Seo } from './Seo';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { BUSINESS } from '@/data/business';

interface StructuredDataProps {
  /** Override the canonical path (useful for trailing-slash variants). */
  canonicalPath?: string;
  /** FAQs to render into the visible FAQ section and FAQPage schema. */
  faqs?: Faq[];
  /** Breadcrumb items; falls back to the page manifest. */
  breadcrumb?: { name: string; path?: string }[];
  /** Additional structured data blocks for this page. */
  extra?: JsonLdEntity[];
  /** Render the visible breadcrumb trail above the children. */
  showBreadcrumb?: boolean;
  children?: ReactNode;
}

/** Composes SEO head metadata + JSON-LD + optional visible breadcrumbs for the current route. */
export function StructuredData({
  canonicalPath,
  faqs,
  breadcrumb,
  extra,
  showBreadcrumb = true,
  children,
}: StructuredDataProps): ReactNode {
  const location = useLocation();
  const meta = getPageMeta(location.pathname);

  const resolvedBreadcrumb = breadcrumb ?? meta?.breadcrumb;
  const resolvedFaqs = faqs ?? [];
  const isLocationPage =
    meta?.path === '/coaching-in-maharajgunj' ||
    meta?.path === '/tuition-in-chouparan' ||
    meta?.path === '/coaching-in-madhygopali';

  const pageExtra: JsonLdEntity[] = [...(extra ?? [])];
  if (location.pathname === '/teachers') {
    pageExtra.push(...(buildTeacherPersonSchemas() as JsonLdEntity[]));
  }

  const blocks: JsonLdEntity[] = buildPageSchema({
    path: meta?.path ?? location.pathname,
    title: meta?.title ?? BUSINESS.name,
    description: meta?.description ?? '',
    breadcrumb: resolvedBreadcrumb,
    faqs: resolvedFaqs.length > 0 ? resolvedFaqs : undefined,
    asLocalBusiness: isLocationPage,
    extra: pageExtra.length > 0 ? pageExtra : undefined,
  });

  // Guarantee the organization graph is present even on pages that omit it.
  if (!blocks.some((block) => block['@id'] === ORGANIZATION_ID)) {
    blocks.unshift(buildOrganizationSchema(false) as unknown as JsonLdEntity);
  }

  return (
    <>
      <Seo title={meta?.title ?? ''} description={meta?.description ?? ''} canonicalPath={canonicalPath} />
      <ScriptJsonLd data={blocks} />
      {showBreadcrumb && resolvedBreadcrumb && resolvedBreadcrumb.length > 0 && (
        <Breadcrumbs items={resolvedBreadcrumb} />
      )}
      {children}
    </>
  );
}
