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
const React = (await import('react')).default ?? (await import('react'));
const { renderToPipeableStream } = await import('react-dom/server');

async function attempt(label, fn) {
  try {
    await new Promise((resolveP, rejectP) => {
      const { pipe } = renderToPipeableStream(fn(), {
        onShellReady() {
          let n = 0;
          pipe({
            write(c) { if (c) n++; return true; },
            end() { resolveP(); },
            destroy() { resolveP(); },
          });
        },
        onShellError: rejectP,
      });
    });
    console.log(label, ': SUCCESS');
  } catch (e) {
    console.log(label, ': FAILED:', e.message.slice(0, 100));
  }
}

const rrd = await ssr('react-router-dom');
await attempt('A: StaticRouter from react-router-dom', () =>
  React.createElement(rrd.StaticRouter, { location: '/' },
    React.createElement(Layout, null, React.createElement(PAGE_COMPONENTS.home)))
);

const rr = await ssr('react-router');
await attempt('B: Router from react-router + Routes', () => {
  const location = { pathname: '/', search: '', hash: '', state: null, key: 'default', mask: undefined };
  return React.createElement(rr.Router, { location, navigationType: 'POP', static: true, useTransitions: false },
    React.createElement(Layout, null,
      React.createElement(rr.Routes, null,
        React.createElement(rr.Route, { path: '/', element: React.createElement(PAGE_COMPONENTS.home) }),
      ))
  );
});

await _server?.close();
