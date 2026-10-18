/**
 * Scrolls to the top when the route path changes, mirroring normal browser link behaviour.
 *
 * Kept separate from the router config so the behaviour can be reasoned about in one place.
 */

import { useEffect } from 'react';
import { useInRouterContext, useLocation } from 'react-router-dom';

export function ScrollToTop() {
  // The build prerenders this component outside a Router; guard with useInRouterContext so the
  // hook below is only called in a real router. Client-side branch order never changes (always
  // true), so React's hook-count invariant holds.
  const inRouter = useInRouterContext();
  const location = inRouter ? useLocation() : undefined;

  useEffect(() => {
    if (location) window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [location]);

  return null;
}
