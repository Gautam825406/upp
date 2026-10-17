/**
 * Application entry point.
 *
 * Uses `hydrateRoot` rather than `createRoot`: scripts/prerender.mjs writes real HTML for every
 * route, so the browser should adopt that markup and layer the interactivity on top of it instead
 * of tearing it down and re-rendering from scratch. That is what makes first paint fast.
 */

import { StrictMode } from 'react';
import { hydrateRoot, createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from '@/App';
import '@/styles/index.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element #root not found — check index.html');
}

/**
 * Prefer hydration when the pre-rendered markup is present (i.e. every built route page). If
 * someone runs the dev server or opens a non-pre-rendered path, fall back to a normal mount.
 */
if (rootElement.hasChildNodes()) {
  hydrateRoot(
    rootElement,
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>,
  );
} else {
  createRoot(rootElement).render(
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>,
  );
}
