// Generates public/sitemap.xml and public/robots.txt from the single route manifest.
//
// Runs as `prebuild` so the sitemap can never drift out of sync with src/routes.ts.
// Pass --check to only validate consistency (used by `npm run seo:check`).
//
// This script deliberately avoids importing the .ts source files: it re-declares the same list of
// URLs by parsing src/routes.ts as text, so it stays dependency-free and fast.

import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const PUBLIC_DIR = resolve(ROOT, 'public');
const ROUTES_TS = resolve(ROOT, 'src', 'routes.ts');
const SITE_URL = 'https://uppacademy.in';

const CHECK_ONLY = process.argv.includes('--check');

/** The routes that are meant to be crawled and indexed. */
const INDEXABLE = [
  { path: '/', changefreq: 'daily', priority: 1.0 },
  { path: '/coaching-in-maharajgunj', changefreq: 'weekly', priority: 0.9 },
  { path: '/tuition-in-chouparan', changefreq: 'weekly', priority: 0.9 },
  { path: '/coaching-in-madhygopali', changefreq: 'weekly', priority: 0.9 },
  { path: '/courses', changefreq: 'monthly', priority: 0.7 },
  { path: '/teachers', changefreq: 'monthly', priority: 0.7 },
  { path: '/contact', changefreq: 'monthly', priority: 0.6 },
];

/** Keep this in sync with INDEXABLE — used to verify the manifest matches the sitemap. */
function manifestPathsFromRoutesTs() {
  const source = readFileSync(ROUTES_TS, 'utf8');
  const paths = [...source.matchAll(/path:\s*'([^']+)'/g)].map((m) => m[1]);
  return paths;
}

function xmlEscape(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildSitemap(lastmod) {
  const urlsets = INDEXABLE.map((entry) => {
    const loc = `${SITE_URL}${entry.path}`;
    return `  <url>\n    <loc>${xmlEscape(loc)}</loc>\n    <lastmod>${xmlEscape(lastmod)}</lastmod>\n    <changefreq>${entry.changefreq}</changefreq>\n    <priority>${entry.priority.toFixed(1)}</priority>\n  </url>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlsets}\n</urlset>\n`;
}

function buildRobots() {
  return `# U++ Academy — coaching classes in Madhygopali, Maharajgunj, serving Chouparan
User-agent: *
Allow: /

# AI search and assistants are welcome: we publish factual NAP details only.
User-agent: GPTBot
Allow: /
User-agent: Google-Extended
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;
}

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

function main() {
  const manifest = manifestPathsFromRoutesTs();
  const expected = new Set(INDEXABLE.map((r) => r.path));
  const missing = [...expected].filter((p) => !manifest.includes(p));
  const unknown = manifest.filter((p) => p !== '*' && !expected.has(p));

  if (missing.length > 0) {
    console.error(`[sitemap] src/routes.ts is missing expected routes: ${missing.join(', ')}`);
    process.exitCode = 1;
  }
  if (unknown.length > 0) {
    console.error(`[sitemap] src/routes.ts has unlisted routes (add them to INDEXABLE): ${unknown.join(', ')}`);
    process.exitCode = 1;
  }

  if (CHECK_ONLY) {
    console.log(process.exitCode ? '[sitemap] consistency check FAILED' : `[sitemap] ${INDEXABLE.length} routes consistent with src/routes.ts`);
    return;
  }

  if (!existsSync(PUBLIC_DIR)) mkdirSync(PUBLIC_DIR, { recursive: true });

  const sitemap = buildSitemap(todayIso());
  writeFileSync(resolve(PUBLIC_DIR, 'sitemap.xml'), sitemap, 'utf8');
  writeFileSync(resolve(PUBLIC_DIR, 'robots.txt'), buildRobots(), 'utf8');

  console.log(`[sitemap] wrote public/sitemap.xml (${INDEXABLE.length} URLs) and public/robots.txt`);
}

main();
