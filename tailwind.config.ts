import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

/**
 * Palette indirection for theming.
 *
 * Every brand colour is emitted as `rgb(var(--c-*) / <alpha-value>)` rather than a literal hex.
 * The actual RGB triples live in src/styles/index.css as custom properties and are swapped by the
 * `.light` / `.dark` class on <html>. That means light/dark theming is a variable swap — no
 * `dark:` variants are needed on components.
 *
 * The palette is deliberately print-like, not app-like: warm paper, deep pine green, one saffron
 * accent. No purple, no cyan, no gradients. Buttons are flat solids; cards are flat paper with a
 * single hairline border.
 */
const themed = (token: string) => `rgb(var(${token}) / <alpha-value>)`;

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        /* Warm grey-green text ramp. Values are theme-swapped; see index.css. */
        slate: {
          50: themed('--c-slate-50'),
          100: themed('--c-slate-100'),
          200: themed('--c-slate-200'),
          300: themed('--c-slate-300'),
          400: themed('--c-slate-400'),
          500: themed('--c-slate-500'),
          600: themed('--c-slate-600'),
        },
        /* Paper / surface system. Inverts to deep green-ink in dark mode. */
        ink: {
          950: themed('--c-ink-950'),
          900: themed('--c-ink-900'),
          800: themed('--c-ink-800'),
          700: themed('--c-ink-700'),
          600: themed('--c-ink-600'),
        },
        /* "Contrasting against the page" — dark ink on paper, cream on dark green. */
        white: themed('--c-white'),
        /* Text that sits on a solid pine fill — cream in both themes. */
        onSolid: themed('--c-on-solid'),
        /* Primary brand: deep pine green. */
        pine: {
          300: themed('--c-pine-300'),
          400: themed('--c-pine-400'),
          500: themed('--c-pine-500'),
          600: themed('--c-pine-600'),
          700: themed('--c-pine-700'),
        },
        /* The one warm accent: saffron/amber, used sparingly (rules, eyebrows, small labels). */
        gold: {
          300: themed('--c-gold-300'),
          400: themed('--c-gold-400'),
          500: themed('--c-gold-500'),
          600: themed('--c-gold-600'),
          700: themed('--c-gold-700'),
        },
      },
      fontFamily: {
        sans: ['"Manrope Variable"', ...defaultTheme.fontFamily.sans],
        display: ['"Plus Jakarta Sans Variable"', ...defaultTheme.fontFamily.sans],
      },
      boxShadow: {
        card: 'var(--shadow-card)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
      },
      animation: {
        'fade-up': 'fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in': 'fade-in 0.6s ease-out both',
      },
      letterSpacing: {
        tightest: '-0.03em',
      },
      maxWidth: {
        '8xl': '88rem',
      },
    },
  },
  plugins: [],
};

export default config;
