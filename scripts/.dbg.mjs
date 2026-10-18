import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = 'E:/upp';
if (typeof Blob === 'undefined') globalThis.Blob = (await import('node:buffer')).Blob;

const { createServer } = await import('vite');

let _server;
async function ssr(id) {
  _server ??= await createServer({
    configFile: resolve(ROOT, 'vite.config.ts'),
    logLevel: 'silent',
    server: { middlewareMode: true, hmr: false },
    optimizeDeps: { disabled: true },
  });
  return _server.ssrLoadModule(id);
}

const { Layout } = await ssr('/src/components/layout/Layout.tsx');
const { PAGE_COMPONENTS } = await ssr('/src/routes.ts');
const React = (await import('react')).default ?? (await import('react'));
const { renderToPipeableStream } = await import('react-dom/server');

// Try the router BOTH ways: from the SSR-loaded module and from a bare node import
const routerA = await ssr('react-router');
const routerB = await import('react-router');
console.log('StaticRouter identical?', routerA.StaticRouter === routerB.StaticRouter);
console.log('react-router module resolved to:', routerA.constructor ? 'object' : 'unknown');

for (const [label, router] of [['via-svr', routerA], ['bare', routerB]]) {
  const { StaticRouter } = router;
  try {
    const Home = PAGE_COMPONENTS['home'];
    const element = React.createElement(
      StaticRouter,
      { location: '/' },
      React.createElement(Layout, null, React.createElement(Home)),
    );
    await new Promise((resolve2, reject) => {
      const { pipe } = renderToPipeableStream(element, {
        onShellReady() {
          pipe({ write: () => true, end: () => resolve2(), destroy: () => resolve2() });
        },
        onShellError: reject,
      });
    });
    console.log(label, ': OK');
  } catch (e) {
    console.log(label, ': FAILED ->', e.message.slice(0, 100));
  }
}
await _server?.close();
