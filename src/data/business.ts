/**
 * NAP (Name, Address, Phone) single source of truth for U++ Academy.
 *
 * Every place on the site that displays or embeds contact details — header, footer, hero,
 * structured data, click-to-call buttons, WhatsApp links, Google Maps — reads from this file.
 * That guarantees NAP consistency site-wide by construction, which is what Google local ranking
 * rewards.
 *
 * VERIFIED DATA ONLY. Nothing here was guessed. Fields that were never supplied to us are left
 * undefined or omitted entirely rather than filled with plausible-looking values, because a wrong
 * NAP is worse than a missing one.
 */

/**
 * Canonical domain used for canonical URLs, sitemap and Open Graph.
 * TODO(owner): confirm this is the final production domain, then update scripts/generate-sitemap.mjs.
 */
export const SITE_URL = 'https://uppacademy.in';

/** Contact details shown everywhere. Kept as a single object so spelling can never drift. */
export const BUSINESS = {
  name: 'U++ Academy',
  legalName: 'U++ Academy',

  /** Director of the academy. */
  director: 'Umesh Kumar',

  phone: '+91 9065792628',
  phoneE164: '+919065792628',
  /** Digits only — used for wa.me, which must not contain separators. */
  phoneDigits: '919065792628',

  classes: '1–10',
  classesPlain: 'Class 1 to 10',
  boards: ['JAC', 'CBSE', 'ICSE'] as const,

  /**
   * Address with ONLY the fields we were actually given. `streetAddress` and `postalCode` are
   * intentionally absent — inventing a PIN code or house number would create NAP mismatch risk
   * against the Google Business Profile.
   * TODO(owner): add streetAddress and postalCode once the exact premises are confirmed.
   */
  address: {
    addressLocality: 'Madhygopali',
    addressRegion: 'Jharkhand',
    addressCountry: 'IN',
  } as {
    streetAddress?: string;
    addressLocality: string;
    addressRegion: string;
    addressCountry: string;
    postalCode?: string;
  },

  /** The three areas the academy wants to be discovered for. */
  areaServed: ['Madhygopali', 'Maharajgunj', 'Chouparan'] as const,

  /** The one place U++ Academy physically operates from. */
  primaryLocation: {
    name: 'Madhygopali, Maharajgunj',
    label: 'Madhygopali',
  },

  /**
   * Google Maps deep link.
   * TODO(owner): replace with the direct Maps URL of the verified U++ Academy listing.
   * Until then this is a Maps *search* link for the academy's stated location, which is honest —
   * we do not create fake Maps locations.
   */
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=U%2B%2B+Academy+Madhygopali+Maharajgunj+Jharkhand',

  /**
   * Google Business Profile link.
   * TODO(owner): paste the real Google Business Profile / Google Maps listing URL here once it
   * exists and is claimed. Kept as a Maps search link rather than removed, so the link is always
   * functional; `sameAs` in structured data only includes it when it is a real profile URL.
   */
  googleBusinessProfileUrl:
    'https://www.google.com/maps/search/?api=1&query=U%2B%2B+Academy+Maharajgunj+Jharkhand',

  /** Whether the GBP URL above is a genuine claimed profile. Flip to true after TODO(owner). */
  hasVerifiedGoogleBusinessProfile: false,
} as const;

/** Click-to-call href, e.g. `tel:+919065792628`. */
export const TEL_HREF = `tel:${BUSINESS.phoneE164}`;

/** WhatsApp click-to-chat href with a short, factual prefilled message. */
export function whatsappHref(message?: string): string {
  const text =
    message ??
    `Hello U++ Academy, I would like to know about Class 1-10 coaching (JAC / CBSE / ICSE) for my child.`;
  return `https://wa.me/${BUSINESS.phoneDigits}?text=${encodeURIComponent(text)}`;
}

/** Human readable location string used in prose and JSON-LD `@type` prose. */
export const LOCATION_LABEL = `${BUSINESS.address.addressLocality}, ${BUSINESS.areaServed[1]}`;
