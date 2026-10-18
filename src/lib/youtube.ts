/**
 * YouTube URL helpers.
 *
 * Kept out of the component file so that module exports only components — mixing a named function
 * export in with components disables React Fast Refresh for that module in development.
 */

/**
 * Pull the 11-character id out of any of the URL shapes YouTube hands out
 * (watch?v=, youtu.be/, /shorts/, /embed/) or accept a bare id, so the site owner can paste
 * whichever link they happen to have.
 */
export function parseYouTubeId(input: string | undefined | null): string | null {
  if (!input) return null;
  const trimmed = String(input).trim();
  if (!trimmed) return null;
  if (/^[\w-]{11}$/.test(trimmed)) return trimmed;

  const patterns = [
    /[?&]v=([\w-]{11})/,
    /youtu\.be\/([\w-]{11})/,
    /\/shorts\/([\w-]{11})/,
    /\/embed\/([\w-]{11})/,
  ];
  for (const pattern of patterns) {
    const match = trimmed.match(pattern);
    if (match?.[1]) return match[1];
  }
  return null;
}
