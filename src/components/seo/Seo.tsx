/**
 * <Seo /> — manages the document head for the current route in the browser.
 *
 * Why this exists: React Router is client-side, so without this a visitor who navigates from `/`
 * to `/coaching-in-maharajgunj` would still see the homepage title in their tab.
 *
 * The two paths are intentionally separate:
 *   build time → scripts/prerender.mjs writes correct <title>/meta/canonical/JSON-LD into each
 *                file, so crawlers and social crawlers see real content with no JS execution
 *   runtime    → <Seo /> rewrites the same tags on navigation for humans using the browser
 *
 * The component renders nothing.
 */

import { useEffect } from 'react';
import { useInRouterContext, useLocation } from 'react-router-dom';
import { getPageMeta } from '@/routes';
import { BUSINESS, SITE_URL } from '@/data/business';

interface SeoProps {
  title: string;
  description: string;
  /** Root-relative canonical target. Defaults to the current route. */
  canonicalPath?: string;
  /** Robots directive. Defaults to index,follow. */
  robots?: string;
  /** Type override for Open Graph. */
  ogType?: 'website' | 'article';
}

const DEFAULT_ROBOTS = 'index, follow, max-image-preview:large, max-snippet:-1';

export function canonicalFor(path: string): string {
  const normalized = path === '/' ? '/' : `/${path.replace(/^\/+|\/+$/g, '')}`;
  return /^https?:\/\//.test(normalized) ? normalized : `${SITE_URL}${normalized}`;
}

/** Escape a value for safe inclusion in generated HTML. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function setTitle(title: string): void {
  if (typeof document === 'undefined') return;
  document.title = title;
}

function setMeta(name: string, content: string, property = false): void {
  const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
  const tag = document.querySelector<HTMLElement>(selector);
  if (tag) {
    tag.setAttribute('content', content);
  } else {
    const created = document.createElement('meta');
    if (property) created.setAttribute('property', name);
    else created.setAttribute('name', name);
    created.setAttribute('content', content);
    document.head.appendChild(created);
  }
}

function setCanonical(url: string): void {
  const existing = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (existing) {
    existing.href = url;
  } else {
    const link = document.createElement('link');
    link.rel = 'canonical';
    link.href = url;
    document.head.appendChild(link);
  }
}

/** Renders nothing. Applies head metadata in the browser. */
export function Seo({ title, description, canonicalPath, robots, ogType = 'website' }: SeoProps): null {
  // The build prerenders this component outside a Router; guard with useInRouterContext so the
  // hook below is only called in a real router. Client-side branch order never changes (always
  // true), so React's hook-count invariant holds.
  const inRouter = useInRouterContext();
  const location = inRouter ? useLocation() : undefined;
  const meta = getPageMeta(location?.pathname ?? '');

  useEffect(() => {
    if (typeof document === 'undefined') return;

    const resolvedTitle = title || meta?.title || BUSINESS.name;
    const resolvedDescription = description || meta?.description || '';
    const canonical = canonicalFor(canonicalPath ?? location?.pathname ?? '/');

    setTitle(resolvedTitle);
    setMeta('description', resolvedDescription);
    setMeta('robots', robots ?? DEFAULT_ROBOTS);
    setMeta('author', BUSINESS.name);

    // Open Graph
    setMeta('og:type', ogType, true);
    setMeta('og:site_name', BUSINESS.name, true);
    setMeta('og:title', resolvedTitle, true);
    setMeta('og:description', resolvedDescription, true);
    setMeta('og:url', canonical, true);
    setMeta('og:locale', 'en_IN', true);

    // Twitter
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', resolvedTitle);
    setMeta('twitter:description', resolvedDescription);

    // Canonical
    setCanonical(canonical);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description, canonicalPath, robots, ogType, location?.pathname]);

  return null;
}
