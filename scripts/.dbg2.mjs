import { resolve } from 'node:path';
if (typeof Blob === 'undefined') globalThis.Blob = (await import('node:buffer')).Blob;
const { createServer } = await import('vite');

let _server;
async function ssr(id) {
  _server ??= await createServer({
    configFile: resolve('E:/upp/vite.config.ts'),
    logLevel: 'silent',
    server: { middlewareMode: true, hmr: false },
    optimizeDeps: { disabled: true },
  });
  return _server.ssrLoadModule(id);
}

const { Layout } = await ssr('/src/components/layout/Layout.tsx');
const { PAGE_COMPONENTS } = await ssr('/src/routes.ts');

// Load react-router via Vite SSR so it shares the exact module graph with Layout
const routerMod = await ssr('react-router');
const { StaticRouter } = routerMod;

// react-dom/server loaded via Vite too
const ReactDOMServer = await ssr('react-dom/server');
const React = await ssr('react');

const Home = PAGE_COMPONENTS['home'];
const element = React.createElement(
  StaticRouter,
  { location: '/' },
  React.createElement(Layout, null, React.createElement(Home)),
);

await new Promise((resolve2, reject) => {
  const { pipe } = ReactDOMServer.renderToPipeableStream(element, {
    onShellReady() {
      let html = '';
      pipe({
        write(c) { if (c) html += String(c); return true; },
        end() { console.log('OK! html length:', html.length, html.slice(0, 200)); resolve2(); },
        destroy() { resolve2(); },
      });
    },
    onShellError: reject,
  });
});
await _server?.close();
