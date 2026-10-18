// Build-time prerenderer for U++ Academy.
//
// Runs after `vite build`. Uses Vite's Node API to SSR-load the React components,
// then writes one complete HTML file per route into dist/<route>/index.html.
//
// Every file gets correct <title>, meta tags, canonical URL, Open Graph tags, and
// JSON-LD structured data baked into the <head> — so crawlers never need JavaScript.

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { Writable } from 'node:stream';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const DIST = resolve(ROOT, 'dist');
const VITE_CONFIG = resolve(ROOT, 'vite.config.ts');

// Node 18+ has Blob, AbortController, fetch, etc.
if (typeof Blob === 'undefined') globalThis.Blob = (await import('node:buffer')).Blob;

const { createServer } = await import('vite');
const { renderToPipeableStream } = await import('react-dom/server');
const React = (await import('react')).default ?? (await import('react'));

// Load the app modules through Vite so tsconfig paths, TSX, and CSS imports all resolve.
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
const { canonicalFor } = await ssr('/src/components/seo/Seo.tsx');
const seoSchema = await ssr('/src/components/seo/schema.ts');
const { buildPageSchema } = seoSchema;
const { buildTeacherPersonSchemas } = seoSchema;
// Load react-router via a bare Node import (NOT through Vite's SSR module graph).
// Vite SSR-loads `react` under the project name ("react"), but react-router's own
// module-graph instance sees it under its own name, so contexts and components from the two
// instances don't interoperate — every <Link> rendered under a Vite-SSR-loaded StaticRouter
// throws "Cannot destructure property 'basename'". A bare `import` keeps the whole router
// chain on Node's default resolver, which matches the plain `react` import above.
const { StaticRouter } = await import('react-router');

const TEMPLATE = readFileSync(resolve(DIST, 'index.html'), 'utf8');
const HEAD_RE = /<head[^>]*>([\s\S]*)<\/head>/i;
const BODY_RE = /<body[^>]*>([\s\S]*)<\/body>/i;

const headMatch = TEMPLATE.match(HEAD_RE);
const bodyMatch = TEMPLATE.match(BODY_RE);
const ORIGINAL_HEAD = headMatch ? headMatch[1] : '';

// Extract the module scripts that Vite placed in the head (for client-side hydration).
// Vite rewrites `<script type="module" src="/src/main.tsx">` into hashed asset
// references like `<script type="module" src="/assets/index-xxxx.js">` and injects
// them into <head>. These must be preserved so the browser can hydrate the SSR'd markup.
const HEAD_SCRIPTS = [...ORIGINAL_HEAD.matchAll(/<script[^>]*\/?>([\s\S]*?)<\/script>/gi)].map(m => m[0]);
// Non-script head content that survives across all routes (font preloads, theme init, etc.).
// Strips hardcoded SEO tags (title, description, canonical, OG, Twitter) — buildPageHead
// emits route-specific replacements for those. Everything else (inline theme-init script,
// font links, favicon) is kept here so it isn't lost.
// Strip the template's hardcoded SEO tags — buildPageHead emits route-specific replacements
// for each one. Also removes all <script> tags so only truly non-script, non-SEO content
// (charset, viewport, font links, favicon, og:type/static meta, etc.) is carried over,
// avoiding double-inclusion of any script that HEAD_SCRIPTS already captured.
const HEAD_NON_SCRIPT = ORIGINAL_HEAD
  .replace(/<title>[\s\S]*?<\/title>/g, '')
  .replace(/<script[\s\S]*?<\/script>/gi, '')
  .replace(/<meta\s+name="(?:description|keywords|author|robots)"[^>]*\/?>(?:\n\s*)*/g, '')
  .replace(/<meta\s+property="og:[^"]*"[^>]*\/?>(?:\n\s*)*/g, '')
  .replace(/<meta\s+name="twitter:[^"]*"[^>]*\/?>(?:\n\s*)*/g, '')
  .replace(/<link\s+rel="canonical"[^>]*\/?>/g, '')
  .trim();

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
  const extra = page.key === 'teachers' ? buildTeacherPersonSchemas() : undefined;
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
  // The client entry (src/main.tsx) expects to find pre-rendered markup inside #root so it can
// hydrate rather than re-render from scratch. The SSR output IS the body content; the module
// scripts Vite injected into <head> are already included in `head` (via HEAD_SCRIPTS), so no
// further injection is needed here.
const headContent = String(await head);
return `${before}<head>\n${headContent}\n</head>\n<body>\n<div id="root">${body}</div>\n</body>${after}`;
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
      onAllReady() {
        // react-dom's pipe() expects a real Writable stream (it wires 'error'/'drain'
        // handlers on it), not a plain { write, end, destroy } sink object.
        const sink = new Writable({
          write(chunk, _enc, cb) {
            html += String(chunk);
            cb();
          },
        });
        pipe(sink);
        sink.on('finish', () => resolve(html));
        sink.on('error', reject);
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
      ? join(DIST, 'index.html')
      : join(DIST, page.path, 'index.html');
    mkdirSync(dirname(outPath), { recursive: true });
    const headHtml = await buildPageHead(page);
    const fullHtml = await buildFullHtml(headHtml, html);
    writeFileSync(outPath, fullHtml, 'utf8');
    const rel = outPath.replace(ROOT, '').replace(/\\/g, '/');
    console.log(`  ✓ ${page.path || '/'} → ${rel}`);
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
