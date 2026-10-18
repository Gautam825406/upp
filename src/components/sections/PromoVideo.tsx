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
 * AUTOPLAY WITH SOUND
 * The owner asked for sound on load, and the embed asks for it — but the outcome is decided by the
 * browser, not by us:
 *
 *   - Audible autoplay succeeds where the visitor has already interacted with the page (most
 *     desktops).
 *   - On phones — iOS Safari and Chrome Android alike — autoplay with sound is blocked outright.
 *     The video starts muted and a prominent "Tap for sound" button appears so the visitor can
 *     unmute in one tap.
 *
 * `mute=0` is deliberate. The `mute` URL parameter only ever *enables* mute; there is no value that
 * un-mutes an already-muted embed, so starting muted would mean silent everywhere. We ask for
 * unmuted autoplay and fall back, which is what produces sound where the browser permits it.
 *
 * Under `prefers-reduced-motion` autoplay is suppressed entirely and the video renders paused.
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { Icon } from '@/components/ui/Icon';
import { useReducedMotion } from '@/components/three/useReducedMotion';
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
  const [showSoundButton, setShowSoundButton] = useState(false);

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

  /**
   * If audible autoplay was refused, the video is sitting there muted with no visible indication
   * that the site owner intended sound. Offer the one-tap fix.
   */
  useEffect(() => {
    if (reducedMotion || !videoId) return;
    const timer = window.setTimeout(() => setShowSoundButton(true), 1600);
    return () => window.clearTimeout(timer);
  }, [reducedMotion, videoId]);

  if (!videoId) {
    return (
      <div
        className={cn(
          'flex aspect-[9/16] items-center justify-center rounded-2xl border sm:aspect-video sm:rounded-3xl',
          'border-white/10 bg-ink-800/60 p-6 text-center',
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
        'relative aspect-[9/16] w-full overflow-hidden rounded-2xl border sm:aspect-video sm:rounded-3xl',
        'border-white/10 bg-ink-800/60 shadow-glow',
        'mx-auto max-w-[420px] lg:max-w-none',
        className,
      )}
    >
      <iframe
        ref={frameRef}
        src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=${reducedMotion ? 0 : 1}&mute=0&loop=1&playlist=${videoId}&controls=1&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&origin=${encodeURIComponent(origin)}`}
        title="U++ Academy — see a class in action"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className="absolute inset-0 h-full w-full border-0"
      />

      {/* Shown only when audible autoplay was refused — the one action that actually gets sound. */}
      {showSoundButton && !reducedMotion && (
        <button
          type="button"
          onClick={enableSound}
          className="absolute inset-x-0 bottom-16 z-10 mx-auto flex w-[calc(100%-2rem)] max-w-xs items-center justify-center gap-2 rounded-full border border-gold-500/35 bg-ink-950/85 px-4 py-3 text-sm font-semibold text-gold-400 shadow-gold backdrop-blur-md transition-transform active:scale-[0.98]"
        >
          <Icon name="volume" className="h-4 w-4" />
          Tap for sound
        </button>
      )}

      {/* Last-resort fallback if the embed is blocked (strict privacy settings, corporate network,
          or the video being private). The link still works. */}
      <noscript>
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-ink-900/95 p-6 text-center">
          <Icon name="play" className="h-8 w-8 text-gold-400" />
          <p className="text-sm text-slate-300">
            Enable JavaScript to watch the video, or{' '}
            <a
              href={`https://www.youtube.com/watch?v=${videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-gold-400 underline underline-offset-4"
            >
              watch it on YouTube
            </a>
            .
          </p>
        </div>
      </noscript>
    </div>
  );
}
