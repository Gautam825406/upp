/**
 * Keyboard-only skip link — the first focusable element on every page, so keyboard and
 * screen-reader users can bypass the header immediately. Uses a plain anchor (not a router
 * Link) so React Router never tries to interpret the fragment as a route.
 */

export function SkipLink() {
  return (
    <a href="#main-content" className="skip-link">
      Skip to main content
    </a>
  );
}
