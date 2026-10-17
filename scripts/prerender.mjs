// Build-time prerenderer for U++ Academy.
//
// Runs after `vite build`. Uses Vite's Node API to SSR-load the React components,
// then writes one complete HTML file per route into dist/<route>/index.html.
//
// Every file gets correct <title>, meta tags, canonical URL, Open Graph tags, and
// JSON-LD structured data baked into the <head> — so crawlers never need JavaScript.

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const DIST = resolve(ROOT, 'dist');
const VITE_CONFIG = resolve(ROOT, 'vite.config.ts');

// Node 18+ has Blob, AbortController, fetch, etc.
if (typeof Blob === 'undefined') globalThis.Blob = (await import('node:buffer')).Blob;

const { createServer } = await import('vite');
const { renderToPipeableStream, toBlob } = await import('react-dom/server');
const React = (await import('react')).default ?? (await import('react'));

// Load the app modules through Vite so tsconfig paths, TSX, and CSS imports all resolve.
const mod = async (id) => (await createServer({ configFile: VITE_CONFIG, logLevel: 'silent' })).ssrLoadModule(id);

let _server;
async function ssr(id) {
  _server ??= await createServer({
    configFile: VITE_CONFIG,
    logLevel: 'silent',
    server: { middlewareMode: true, hmr: false },
    optimizeDeps: { disabled: true },
  });
  return _server.ssrLoadModule(id);
}

const { Layout } = await ssr('/src/components/layout/Layout.tsx');
const { PAGE_COMPONENTS, PAGES } = await ssr('/src/routes.ts');
const { canonicalFor, escapeHtml } = await ssr('/src/components/seo/Seo.tsx');
const { buildPageSchema } = await ssr('/src/components/seo/schema.ts');
const router = await ssr('react-router');
const { StaticRouter } = router;

const SITE_URL = 'https://uppacademy.in';
const TEMPLATE = readFileSync(resolve(DIST, 'index.html'), 'utf8');
const HEAD_RE = /<head[^>]*>([\s\S]*)<\/head>/i;
const BODY_RE = /<body[^>]*>([\s\S]*)<\/body>/i;

const headMatch = TEMPLATE.match(HEAD_RE);
const bodyMatch = TEMPLATE.match(BODY_RE);
const ORIGINAL_HEAD = headMatch ? headMatch[1] : '';
const ORIGINAL_BODY = bodyMatch ? bodyMatch[1] : '';

// Extract the module scripts that Vite placed in the head (for client-side hydration).
const HEAD_SCRIPTS = [...ORIGINAL_HEAD.matchAll(/<script[^>]*\/?>([\s\S]*?)<\/script>/gi)].map(m => m[0]);
// Keep all non-script head content (meta, links, styles, etc.)
const HEAD_NON_SCRIPT = ORIGINAL_HEAD.replace(/<script[^>]*\/?>([\s\S]*?)<\/script>/gi, '').trim();

function xmlEscape(v) {
  return String(v)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

async function buildPageHead(page) {
  const canonical = canonicalFor(page.path);
  const isLocal = ['/coaching-in-maharajgunj', '/tuition-in-chouparan', '/coaching-in-madhygopali'].includes(page.path);
  let extra;
  if (page.key === 'teachers') {
    const { buildTeacherPersonSchemas } = await ssr('/src/components/seo/schema.ts');
    extra = buildTeacherPersonSchemas();
  }
  const blocks = buildPageSchema({
    path: page.path,
    title: page.title,
    description: page.description,
    breadcrumb: page.breadcrumb,
    asLocalBusiness: isLocal,
    extra,
  });

  const ld = blocks
    .map(b => {
      const safe = JSON.stringify(b)
        .replace(/</g, '\\u003c')
        .replace(/>/g, '\\u003e')
        .replace(/&/g, '\\u0026');
      return `<script type="application/ld+json">${safe}</script>`;
    })
    .join('\n');

  return [
    // All original head content except scripts (fonts, links, charset, etc.)
    ...HEAD_NON_SCRIPT.split('\n'),
    // Page-specific title and meta
    `<title>${xmlEscape(page.title)}</title>`,
    `<meta name="description" content="${xmlEscape(page.description)}" />`,
    `<meta name="author" content="U++ Academy" />`,
    `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />`,
    `<link rel="canonical" href="${canonical}" />`,
    // Open Graph
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="U++ Academy" />`,
    `<meta property="og:locale" content="en_IN" />`,
    `<meta property="og:title" content="${xmlEscape(page.title)}" />`,
    `<meta property="og:description" content="${xmlEscape(page.description)}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    // Twitter
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${xmlEscape(page.title)}" />`,
    `<meta name="twitter:description" content="${xmlEscape(page.description)}" />`,
    // JSON-LD
    ld,
    // Vite module scripts
    ...HEAD_SCRIPTS,
  ].join('\n');
}

async function buildFullHtml(head, body) {
  const before = TEMPLATE.slice(0, TEMPLATE.search(HEAD_RE));
  const after = TEMPLATE.slice(TEMPLATE.indexOf('</html>'));
  const root = body.match(/<div id="root">[\s\S]*?<\/div>/);
  const rootHtml = root ? root[0] : '<div id="root"></div>';
  return `${before}<head>\n${head}\n</head>\n<body>\n${rootHtml}\n</body>${after}`;
}

async function renderPageHtml(page) {
  const PageComponent = PAGE_COMPONENTS[page.key];
  const element = React.createElement(
    StaticRouter,
    { location: page.path },
    React.createElement(Layout, null, React.createElement(PageComponent)),
  );

  return new Promise((resolve, reject) => {
    let html = '';
    const { pipe } = renderToPipeableStream(element, {
      onShellReady() {
        pipe({
          write(chunk) { if (chunk) html += String(chunk); return true; },
          end() { resolve(html); },
          destroy() { resolve(html); },
        });
      },
      onShellError: reject,
    });
  });
}

async function main() {
  if (!existsSync(DIST) || !existsSync(VITE_CONFIG)) {
    console.error('[prerender] Missing dist/ or vite.config.ts — run `npm run build:client` first.');
    process.exit(1);
  }
  console.log(`[prerender] rendering ${PAGES.length} routes...`);

  for (const page of PAGES) {
    const html = await renderPageHtml(page);
    const outPath = page.path === '/'
      ? resolve(DIST, 'index.html')
      : resolve(DIST, page.path, 'index.html');
    mkdirSync(dirname(outPath), { recursive: true });
    const headHtml = buildPageHead(page);
    const fullHtml = await buildFullHtml(headHtml, html);
    writeFileSync(outPath, fullHtml, 'utf8');
    console.log(`  ✓ ${page.path || '/'} → ${outPath.replace(ROOT + '/', '')}`);
  }

  console.log(`[prerender] done — ${PAGES.length} files written to dist/`);
}

main()
  .catch(err => {
    console.error('[prerender] FAILED:', err.message);
    console.error(err.stack);
    process.exitCode = 1;
  })
  .finally(() => { if (_server) _server.close(); });
