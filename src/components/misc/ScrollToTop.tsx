/**
 * Scrolls to the top when the route path changes, mirroring normal browser link behaviour.
 *
 * Kept separate from the router config so the behaviour can be reasoned about in one place.
 */

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);

  return null;
}
