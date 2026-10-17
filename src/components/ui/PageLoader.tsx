/**
 * Suspense fallback shown while a lazy route chunk is downloading.
 *
 * `role="status"` + `aria-live="polite"` announces the wait to screen readers without
 * interrupting anything else.
 */

export function PageLoader() {
  return (
    <div
      className="flex min-h-[60vh] items-center justify-center pt-24"
      role="status"
      aria-live="polite"
      aria-label="Loading page"
    >
      <div className="flex items-center gap-3 text-slate-400">
        <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-400 opacity-60" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-gold-500" />
        </span>
        <span className="text-sm font-medium tracking-wide">Loading U++ Academy…</span>
      </div>
    </div>
  );
}
