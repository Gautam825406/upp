/**
 * Renders JSON-LD <script> tags into the document.
 *
 * Used by <StructuredData /> for client-side navigation. The prerenderer emits the same blocks
 * directly into each pre-rendered file's <head>, so crawlers never depend on this component.
 */

import { useEffect, useRef } from 'react';
import type { JsonLdEntity } from './schema';

interface ScriptJsonLdProps {
  data: JsonLdEntity[];
}

/** Keeps prior JSON-LD tags stable across navigation by clearing and re-emitting. */
export function ScriptJsonLd({ data }: ScriptJsonLdProps): null {
  const serialized = useRef<string>(JSON.stringify(data));

  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (serialized.current === JSON.stringify(data)) return;
    serialized.current = JSON.stringify(data);

    document.querySelectorAll('script[data-json-ld="uppp"]').forEach((node) => node.remove());
    const root = document.getElementById('root');
    for (const entity of data) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-json-ld', 'uppp');
      script.textContent = JSON.stringify(entity);
      root?.prepend(script);
    }
  }, [data]);

  return null;
}
