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
 * POSTMESSAGE TARGET — THIS IS THE BUG THAT KILLED SOUND (25 Nov 2026)
 * The embed lives on `youtube-nocookie.com`, so API commands MUST be posted with targetOrigin
 * `https://www.youtube-nocookie.com`. An earlier version posted them to `https://www.youtube.com`
 * and the browser discarded every one (targetOrigin mismatch) — the video played, but "Tap for
 * sound" and the first-tap auto-unmute silently did nothing. The message *listener* below still
 * accepts both origins, because the embed can report from either.
 *
 * AUTOPLAY — MUTED, SO IT ACTUALLY PLAYS ON LOAD
 * The video must be visibly playing the moment the page loads, on phones as well as desktops.
 * Browsers block autoplay WITH sound everywhere until the visitor interacts, so asking for
 * audible autoplay (`mute=0`) means the video sits paused on most first visits — exactly the
 * "video not working on load" failure. Muted autoplay (`mute=1`) is the only autoplay browsers
 * reliably allow. There is NO code, parameter or trick that makes a browser play sound on load
 * before the visitor touches the page — Chrome, Safari and Firefox all enforce this, on every
 * website. So this component does the closest thing that is actually possible: the video starts
 * muted and playing on load, and sound switches on the moment the visitor does anything on the
 * page (tap, click or key press anywhere), or taps the sound button.
 * `mute=0` is NOT used: the `mute` URL parameter only ever *enables* mute; there is no value
 * that un-mutes an already-muted embed, so starting muted would mean silent everywhere if we
 * relied on the URL alone — unmuting is done via postMessage (`unMute`) after interaction.
 *
 * NOT LOOKING LIKE YOUTUBE
 * `controls=0` hides YouTube's own control bar, progress bar and buttons, and `modestbranding=1`
 * removes the YouTube logo from the chrome, so what the visitor sees is just the video itself
 * with this site's own sound button on top — no YouTube player furniture. Two limits remain,
 * both imposed by the embed itself: hovering the video can still show YouTube's title bar at
 * the top, and the video is still served by YouTube. Removing those entirely needs the video
 * file hosted on this site instead of a YouTube embed (then the player is 100% ours).
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
  // The embed starts muted (browsers allow no other autoplay), so the visitor needs the
  // sound control visible immediately, on every load.
  const [isMuted, setIsMuted] = useState(true);

  const videoId = parseYouTubeId(video);

  /** Send one IFrame API command to the embed over postMessage (no DOM mutation).
   * The target MUST be the embed's own origin (youtube-nocookie.com) — posting to
   * youtube.com gets silently discarded by the browser. */
  const sendCommand = useCallback((func: string, args: (string | number)[]) => {
    const frame = frameRef.current?.contentWindow;
    if (!frame) return;
    frame.postMessage(
      JSON.stringify({ event: 'command', func, args }),
      'https://www.youtube-nocookie.com',
    );
  }, []);

  /**
   * Ask the embed to unmute and play. Called from the sound button and from the first
   * interaction anywhere on the page — sound is only allowed after the visitor acts.
   */
  const enableSound = useCallback(() => {
    sendCommand('unMute', ['']);
    sendCommand('setVolume', [100]);
    sendCommand('playVideo', ['']);
    setIsMuted(false);
  }, [sendCommand]);

  /** Mute again (keeps playing). */
  const disableSound = useCallback(() => {
    sendCommand('mute', ['']);
    setIsMuted(true);
  }, [sendCommand]);

  const toggleSound = useCallback(() => {
    if (isMuted) enableSound();
    else disableSound();
  }, [isMuted, enableSound, disableSound]);

  /**
   * Sound on at the first tap / click / key press anywhere on the page. This is the closest
   * browsers allow to "sound on load": the video is already playing muted, and the first
   * thing the visitor does — scrolling, tapping a link, anything — turns the sound on.
   * Runs once; the sound button stays available for muting again.
   */
  useEffect(() => {
    if (reducedMotion) return;
    const onFirstInteraction = () => enableSound();
    window.addEventListener('pointerdown', onFirstInteraction, { once: true });
    window.addEventListener('keydown', onFirstInteraction, { once: true });
    return () => {
      window.removeEventListener('pointerdown', onFirstInteraction);
      window.removeEventListener('keydown', onFirstInteraction);
    };
  }, [reducedMotion, enableSound]);

  /**
   * The embed posts an `infoDelivery` message whenever its state changes. Track the real
   * mute state so the sound button always shows the truth (e.g. if the visitor mutes from
   * the keyboard, or the embed reports itself unmuted).
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
        if (typeof payload.info?.isMuted === 'boolean') {
          setIsMuted(payload.info.isMuted);
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
        src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=${reducedMotion ? 0 : 1}&mute=1&loop=1&playlist=${videoId}&controls=0&disablekb=1&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&origin=${encodeURIComponent(origin)}`}
        title="U++ Academy — see a class in action"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className="absolute inset-0 h-full w-full border-0"
      />

      {/* Tap-catcher over the video while it is still muted. Taps inside a cross-origin
          iframe never reach this page, so without this layer a tap on the video itself
          would never trigger the auto-unmute — only taps outside the video would. The
          layer vanishes once sound is on, so later taps reach the player and play/pause
          the video as normal. */}
      {isMuted && (
        <div
          aria-hidden="true"
          onPointerDown={enableSound}
          className="absolute inset-0 z-10 cursor-pointer bg-transparent"
        />
      )}

      {/* Our own sound control, in the site's design — YouTube's control bar is hidden
          (controls=0), so the visitor never sees YouTube's player furniture. The wrapper
          ignores pointer events so taps pass through to the video everywhere except on
          the button itself. */}
      {(
        <div className="pointer-events-none absolute inset-x-0 bottom-3 z-20 flex justify-center">
          <button
            type="button"
            onClick={toggleSound}
            aria-pressed={!isMuted}
            aria-label={isMuted ? 'Turn sound on' : 'Mute the video'}
            className="pointer-events-auto flex items-center justify-center gap-2 rounded-lg border border-ink-700 bg-ink-800 px-4 py-3 text-sm font-semibold text-gold-600 shadow-card transition-transform active:scale-[0.98]"
          >
            <Icon name={isMuted ? 'volume' : 'volume-off'} className="h-4 w-4" />
            {isMuted ? 'Tap for sound' : 'Mute'}
          </button>
        </div>
      )}

      {/* No "Watch on YouTube" link anywhere here: the video plays inside this website only.
          The iframe itself needs no JavaScript to play, so there is no no-JS fallback overlay
          covering it — a visitor with JavaScript off still sees the video inline. */}
    </div>
  );
}
