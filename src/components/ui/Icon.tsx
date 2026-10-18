/**
 * Inline SVG icon set. Icons are inline (not an icon font, not an extra request) so the site
 * ships no icon network dependency and stays fast on mobile.
 */

import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

export type IconName =
  | 'phone'
  | 'whatsapp'
  | 'map-pin'
  | 'arrow-right'
  | 'arrow-left'
  | 'chevron-down'
  | 'chevron-right'
  | 'check'
  | 'star'
  | 'users'
  | 'book'
  | 'award'
  | 'shield'
  | 'sparkles'
  | 'target'
  | 'menu'
  | 'close'
  | 'mail'
  | 'clock'
  | 'graduation'
  | 'calendar'
  | 'eye'
  | 'trending-up'
  | 'compass'
  | 'external'
  | 'plus'
  | 'minus'
  | 'sun'
  | 'moon'
  | 'volume'
  | 'volume-off'
  | 'play'
  | 'replay';

const PATHS: Record<IconName, ReactNode> = {
  phone: (
    <path
      d="M5 4.5c0-.8.7-1.5 1.5-1.5H8c.6 0 1 .4 1.2 1l.9 3c.1.5-.1 1-.5 1.3L8.4 10c.8 1.8 2 3 3.8 3.8l1.2-1.2c.3-.4.8-.6 1.3-.5l3 .9c.6.2 1 .6 1 1.2v1.5c0 .8-.7 1.5-1.5 1.5C10 18.2 5.8 14 5 4.5Z"
      fill="currentColor"
    />
  ),
  whatsapp: (
    <path
      d="M12 2.6a9.2 9.2 0 0 0-7.9 13.8L2.6 21.4l5.2-1.4A9.2 9.2 0 1 0 12 2.6Zm0 16.7a7.6 7.6 0 0 1-3.9-1.1l-.3-.2-3.1.8.8-3-.2-.3A7.6 7.6 0 1 1 12 19.3Zm4.2-5.7c-.2-.1-1.3-.7-1.5-.7s-.4-.1-.5.1-.5.7-.7.8-.3.2-.5.1a6.2 6.2 0 0 1-3.1-2.7c-.2-.4.2-.4.6-1.2 0-.2 0-.3-.1-.4l-.6-1.6c-.2-.4-.4-.4-.5-.4h-.5a.9.9 0 0 0-.6.3 2.8 2.8 0 0 0-.9 2.1c0 1.2.9 2.4 1 2.6s1.8 2.9 4.5 4c3.2 1.3 3.2.9 3.8.8.6-.1 1.7-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.2-.2-.4-.3Z"
      fill="currentColor"
    />
  ),
  'map-pin': (
    <path
      d="M12 2.2a7.2 7.2 0 0 0-7.2 7.2c0 5.5 6.5 11.8 6.8 12.1a.9.9 0 0 0 1.2 0c.3-.3 6.8-6.6 6.8-12.1A7.2 7.2 0 0 0 12 2.2Zm0 9.7a2.7 2.7 0 1 1 0-5.4 2.7 2.7 0 0 1 0 5.4Z"
      fill="currentColor"
    />
  ),
  'arrow-right': <path d="M4 12h15m0 0-5.5-5.5M19 12l-5.5 5.5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />,
  'arrow-left': <path d="M20 12H5m0 0 5.5-5.5M5 12l5.5 5.5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />,
  'chevron-down': <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />,
  'chevron-right': <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />,
  check: <path d="M4.5 12.5l4.8 4.8L19.5 6.6" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />,
  star: <path d="M12 2.6l2.8 5.9 6.4.9-4.7 4.5 1.2 6.4L12 17.9 6.3 20.8l1.2-6.4L2.8 9.4l6.4-.9L12 2.6Z" fill="currentColor" />,
  users: (
    <path
      d="M8.5 11a3.4 3.4 0 1 0 0-6.8 3.4 3.4 0 0 0 0 6.8Zm0 2c-3 0-6 1.5-6 4.2V19h12v-1.8c0-2.7-3-4.2-6-4.2Zm7.4-2.1a2.9 2.9 0 0 0 0-5.8 2.9 2.9 0 0 0 0 5.8Zm.9 2.3c2.6.3 4.6 1.8 4.6 4v1.6h-4.4v-1.6c0-1.6-.6-3-1.6-4Z"
      fill="currentColor"
    />
  ),
  book: <path d="M5 4h11a3 3 0 0 1 3 3v11H8a3 3 0 0 0-3 2V4Zm0 14a1 1 0 0 0 1 1h12V8a2 2 0 0 0-2-2H5v12Z" fill="currentColor" />,
  award: <path d="M12 2a4.6 4.6 0 0 0-4.4 6 4 4 0 0 0-2.2 4.6 4 4 0 0 0 4.5 3 4 4 0 0 0 4.2 1.6 4 4 0 0 0 4.5-3A4 4 0 0 0 16.4 8 4.6 4.6 0 0 0 12 2Zm0 11.2a2.6 2.6 0 1 1 0-5.2 2.6 2.6 0 0 1 0 5.2Z" fill="currentColor" />,
  shield: <path d="M12 2 4 5v6.3C4 15.9 7.5 20 12 22c4.5-2 8-6.1 8-10.7V5l-8-3Zm3.8 8.6L13 15l-2.8-2.6.9-1 1.9 1.7 3.4-3.2.4 1Z" fill="currentColor" />,
  sparkles: <path d="M11 2.5l1.6 4.2 4.2 1.6-4.2 1.6L11 14.1 9.4 9.9 5.2 8.3l4.2-1.6L11 2.5Zm7 10.4.9 2.3 2.3.9-2.3.9-.9 2.3-.9-2.3-2.3-.9 2.3-.9.9-2.3ZM5 15.5l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8.8-2Z" fill="currentColor" />,
  target: <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 4.6a5.4 5.4 0 1 1 0 10.8 5.4 5.4 0 0 1 0-10.8Zm0 3.6a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6Z" fill="currentColor" />,
  menu: <path d="M4 7h16M4 12h16M4 17h10" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />,
  close: <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" fill="none" stroke-linecap="round" />,
  mail: <path d="M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm8 7.6L4.8 6.6h14.4L12 12.6Zm0 2.5L3.6 7v11h16.8V7L12 15.1Z" fill="currentColor" />,
  clock: <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 4.6a5.4 5.4 0 1 1 0 10.8 5.4 5.4 0 0 1 0-10.8Zm.9-2.3v6.3l4.2 2.4 1-1.7-3.4-2V4.3h-1.8Z" fill="currentColor" />,
  graduation: <path d="M12 3 1 8l11 5 9-4.1V17h2V8L12 3Zm-7 8.6V17c0 1.7 3.1 3 7 3s7-1.3 7-3v-5.4l-7 3.2-7-3.2Z" fill="currentColor" />,
  calendar: <path d="M7 2v2.5H4A1 1 0 0 0 3 5.5v14A1 1 0 0 0 4 20.5h16a1 1 0 0 0 1-1v-14a1 1 0 0 0-1-1h-3V2h-2.5v2.5h-5V2H7Zm-2 6h14v11H5V8Zm2.5 3v2h3v-2h-3Zm5 0v2h3v-2h-3Zm-5 4v2h3v-2h-3Zm5 0v2h3v-2h-3Z" fill="currentColor" />,
  eye: <path d="M12 5c-5 0-8.6 3.9-9.9 5.9a1 1 0 0 0 0 1.2C3.4 14.1 7 18 12 18s8.6-3.9 9.9-5.9a1 1 0 0 0 0-1.2C20.6 8.9 17 5 12 5Zm0 3.2a3.8 3.8 0 1 1 0 7.6 3.8 3.8 0 0 1 0-7.6Zm0 1.8a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" fill="currentColor" />,
  'trending-up': <path d="M3.5 16.5 9 11l4 4 8-8.5m0 0H14m5-1v6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />,
  compass: <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm4.2 5.6-2.6 6-6 2.6 2.6-6 6-2.6ZM12 10.6a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8Z" fill="currentColor" />,
  external: <path d="M14 3h7v7h-2V6.4l-8 8-1.4-1.4 8-8H14V3ZM5 5h8v2H7v10h10v-6h2v8H5V5Z" fill="currentColor" />,
  plus: <path d="M11 5h2v6h6v2h-6v6h-2v-6H5v-2h6V5Z" fill="currentColor" />,
  minus: <path d="M5 11h14v2H5z" fill="currentColor" />,
  sun: (
    <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="4.2" fill="currentColor" stroke="none" />
      <path d="M12 2.4v2.3M12 19.3v2.3M2.4 12h2.3M19.3 12h2.3M5.2 5.2l1.6 1.6M17.2 17.2l1.6 1.6M18.8 5.2l-1.6 1.6M6.8 17.2l-1.6 1.6" />
    </g>
  ),
  moon: (
    <path
      d="M20.2 14.6a8.4 8.4 0 0 1-10.8-10.8.9.9 0 0 0-1.2-1.2A10.2 10.2 0 1 0 21.4 15.8a.9.9 0 0 0-1.2-1.2Z"
      fill="currentColor"
    />
  ),
  volume: (
    <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 9.5h3.2L12 5.4v13.2L7.2 14.5H4a.9.9 0 0 1-.9-.9V10.4a.9.9 0 0 1 .9-.9Z" fill="currentColor" stroke="none" />
      <path d="M15.6 9.4a3.7 3.7 0 0 1 0 5.2M18.3 6.8a7.3 7.3 0 0 1 0 10.4" />
    </g>
  ),
  'volume-off': (
    <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 9.5h3.2L12 5.4v13.2L7.2 14.5H4a.9.9 0 0 1-.9-.9V10.4a.9.9 0 0 1 .9-.9Z" fill="currentColor" stroke="none" />
      <path d="m16.2 9.6 4.6 4.8M20.8 9.6l-4.6 4.8" />
    </g>
  ),
  play: <path d="M7.5 5.2 19 12 7.5 18.8V5.2Z" fill="currentColor" />,
  replay: (
    <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.4 12a8.4 8.4 0 1 1-2.6-6.1" />
      <path d="M20.6 4.2v4.6H16" />
    </g>
  ),
};

interface IconProps {
  name: IconName;
  className?: string;
  /** Visually hidden label when the icon conveys meaning on its own. */
  'aria-label'?: string;
}

export function Icon({ name, className, ...aria }: IconProps) {
  const hasLabel = Boolean(aria['aria-label']);
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn('h-5 w-5 shrink-0', className)}
      aria-hidden={hasLabel ? undefined : true}
      aria-label={aria['aria-label']}
      focusable="false"
    >
      {PATHS[name]}
    </svg>
  );
}
