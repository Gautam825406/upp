/**
 * Promo video embed for the landing page.
 *
 * The source is a YouTube Short, so this renders an iframe rather than a local <video>. That is the
 * right call here: hosting the file ourselves would mean shipping several MB down a mobile
 * connection that is likely the slowest thing on the page, whereas YouTube serves it from an edge
 * cache near the visitor.
 *
 * DESIGN NOTE — why there is no YT.Player here.
 * An earlier version constructed a real YouTube IFrame API player into a React-owned node
 * (`host.innerHTML = ''` followed by `new YT.Player(host, …)`). That reliably broke: the API injects
 * its own iframe into the node, and the next React render reconciled children it believed it still
 * owned and destroyed the player, surfacing as a spurious "video could not be loaded" even though
 * the embed itself was working. So the iframe here is plain and untouched by React, and mute control
 * is sent over `postMessage`, which mutates no DOM and cannot desynchronise the tree.
 *
 * AUTOPLAY — MUTED, SO IT ACTUALLY PLAYS ON LOAD
 * The video must be visibly playing the moment the page loads, on phones as well as desktops.
 * Browsers block autoplay WITH sound everywhere until the visitor interacts, so asking for
 * audible autoplay (`mute=0`) means the video sits paused on most first visits — exactly the
 * "video not working on load" failure. Muted autoplay (`mute=1`) is the only autoplay browsers
 * reliably allow, so the embed starts muted and playing on load, and a prominent
 * "Tap for sound" button is shown from the start so the visitor can unmute in one tap.
 * `mute=0` is NOT used: the `mute` URL parameter only ever *enables* mute; there is no value
 * that un-mutes an already-muted embed, so starting muted would mean silent everywhere if we
 * relied on the URL alone — unmuting is done via postMessage (`unMute`) when the visitor taps.
 *
 * Under `prefers-reduced-motion` autoplay is suppressed entirely and the video renders paused.
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { Icon } from '@/components/ui/Icon';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { parseYouTubeId } from '@/lib/youtube';
import { cn } from '@/lib/cn';

interface PromoVideoProps {
  /** Full YouTube URL or bare video id. */
  video?: string | null;
  className?: string;
}

export function PromoVideo({ video, className }: PromoVideoProps) {
  const reducedMotion = useReducedMotion();

  const frameRef = useRef<HTMLIFrameElement>(null);
  // Shown from the start (not after a delay): the video autoplays muted by design, so the
  // visitor needs the unmute action visible immediately, on every load.
  const [showSoundButton, setShowSoundButton] = useState(!reducedMotion);

  const videoId = parseYouTubeId(video);

  /**
   * Ask the embed to unmute and play. Sent as a postMessage command rather than through the
   * IFrame API's `YT.Player`, because that would mean letting the API own this DOM node — see the
   * design note in the file header.
   */
  const enableSound = useCallback(() => {
    const frame = frameRef.current?.contentWindow;
    if (!frame) return;
    frame.postMessage(
      JSON.stringify({ event: 'command', func: 'unMute', args: [''] }),
      'https://www.youtube.com',
    );
    frame.postMessage(
      JSON.stringify({ event: 'command', func: 'setVolume', args: [100] }),
      'https://www.youtube.com',
    );
    frame.postMessage(
      JSON.stringify({ event: 'command', func: 'playVideo', args: [''] }),
      'https://www.youtube.com',
    );
    setShowSoundButton(false);
  }, []);

  /**
   * The embed posts a `infoDelivery` message whenever its state changes. If we ever see it playing
   * with audio, the sound button is unnecessary — hide it.
   */
  useEffect(() => {
    function onMessage(event: MessageEvent) {
      // Only accept messages from the YouTube embed itself.
      if (
        event.origin !== 'https://www.youtube-nocookie.com' &&
        event.origin !== 'https://www.youtube.com'
      )
        return;
      if (typeof event.data !== 'string' || !event.data.includes('infoDelivery')) return;
      try {
        const payload = JSON.parse(event.data) as {
          event?: string;
          info?: { playerState?: number; isMuted?: boolean };
        };
        if (payload.info?.playerState === 1 && payload.info.isMuted === false) {
          setShowSoundButton(false);
        }
      } catch {
        // Not one of ours — ignore.
      }
    }

    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  if (!videoId) {
    return (
      <div
        className={cn(
          'flex aspect-[9/16] items-center justify-center rounded-2xl border sm:aspect-video sm:rounded-xl',
          'border-ink-700 bg-ink-800/60 p-6 text-center',
          className,
        )}
      >
        <p className="text-sm text-slate-400">
          The promo video link is not a valid YouTube URL.
        </p>
      </div>
    );
  }

  const origin = typeof window !== 'undefined' ? window.location.origin : '';

  return (
    <div
      className={cn(
        // A Short is vertical 9:16. Keeping that ratio on phones lets it fill the frame instead of
        // collapsing to a sliver between black bars; side-by-side on desktop, 16:9 sits better.
        'relative aspect-[9/16] w-full overflow-hidden rounded-2xl border sm:aspect-video sm:rounded-xl',
        'border-ink-700 bg-ink-800/60 shadow-card',
        'mx-auto max-w-[420px] lg:max-w-none',
        className,
      )}
    >
      <iframe
        ref={frameRef}
        src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=${reducedMotion ? 0 : 1}&mute=1&loop=1&playlist=${videoId}&controls=1&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&origin=${encodeURIComponent(origin)}`}
        title="U++ Academy — see a class in action"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className="absolute inset-0 h-full w-full border-0"
      />

      {/* The video autoplays muted by design, so this is shown from the start — the one
          action that gets sound. Hidden once the embed reports it is playing unmuted. */}
      {showSoundButton && !reducedMotion && (
        <button
          type="button"
          onClick={enableSound}
          className="absolute inset-x-0 bottom-16 z-10 mx-auto flex w-[calc(100%-2rem)] max-w-xs items-center justify-center gap-2 rounded-lg border border-ink-700 bg-ink-800 px-4 py-3 text-sm font-semibold text-gold-600 shadow-card transition-transform active:scale-[0.98]"
        >
          <Icon name="volume" className="h-4 w-4" />
          Tap for sound
        </button>
      )}

      {/* No "Watch on YouTube" link anywhere here: the video plays inside this website only.
          The iframe itself needs no JavaScript to play, so there is no no-JS fallback overlay
          covering it — a visitor with JavaScript off still sees the video inline. */}
    </div>
  );
}
