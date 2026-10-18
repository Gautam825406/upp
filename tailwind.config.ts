import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

/**
 * Palette indirection for theming.
 *
 * Every brand colour is emitted as `rgb(var(--c-*) / <alpha-value>)` rather than a literal hex.
 * The actual RGB triples live in src/styles/index.css as custom properties and are swapped by the
 * `.dark` class on <html>. That means light/dark theming is a variable swap — no `dark:` variants
 * are needed on components, and the `white` scale can invert with the theme so the many
 * `border-white/10` / `text-white` usages (which are really "contrast against the page" rather
 * than literal white) keep working in both themes.
 */
const themed = (token: string) => `rgb(var(${token}) / <alpha-value>)`;

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    // We keep the default palette in place (no `extend`/`colors` merge trap) and only add the
    // academy's own brand colours, fonts, shadows and motion.
    extend: {
      colors: {
        /* Light text ramp on dark surfaces. Values are theme-swapped; see index.css. */
        slate: {
          50: themed('--c-slate-50'),
          100: themed('--c-slate-100'),
          200: themed('--c-slate-200'),
          300: themed('--c-slate-300'),
          400: themed('--c-slate-400'),
          500: themed('--c-slate-500'),
          600: themed('--c-slate-600'),
        },
        /* Deep ink-navy background system. These invert to near-white in light mode. */
        ink: {
          950: themed('--c-ink-950'),
          900: themed('--c-ink-900'),
          800: themed('--c-ink-800'),
          700: themed('--c-ink-700'),
          600: themed('--c-ink-600'),
        },
        /* Literal white is really "contrasting against the page" throughout the UI. */
        white: themed('--c-white'),
        /* Text that sits on a solid gold fill — stays dark in light mode. */
        onGold: themed('--c-on-gold'),
        /* Text that sits on a saturated indigo/green gradient fill — always white. */
        onSolid: themed('--c-on-solid'),
        /* Primary brand: warm gold -> "premium education" */
        gold: {
          300: themed('--c-gold-300'),
          400: themed('--c-gold-400'),
          500: themed('--c-gold-500'),
          600: themed('--c-gold-600'),
          700: themed('--c-gold-700'),
        },
        /* Secondary brand: electric indigo */
        iris: {
          300: themed('--c-iris-300'),
          400: themed('--c-iris-400'),
          500: themed('--c-iris-500'),
          600: themed('--c-iris-600'),
          700: themed('--c-iris-700'),
        },
        /* Tertiary accent used sparingly for CTAs */
        aqua: {
          300: themed('--c-aqua-300'),
          400: themed('--c-aqua-400'),
          500: themed('--c-aqua-500'),
        },
      },
      fontFamily: {
        sans: ['"Manrope Variable"', ...defaultTheme.fontFamily.sans],
        display: ['"Plus Jakarta Sans Variable"', ...defaultTheme.fontFamily.sans],
      },
      boxShadow: {
        // Shadows need to soften in light mode, where a heavy black shadow reads as smudge.
        glow: 'var(--shadow-glow)',
        gold: 'var(--shadow-gold)',
        card: 'var(--shadow-card)',
      },
      backgroundImage: {
        'hero-gradient': 'var(--gradient-hero)',
        'mesh-navy': 'var(--gradient-mesh)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        'gradient-pan': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in': 'fade-in 0.9s ease-out both',
        float: 'float 7s ease-in-out infinite',
        'gradient-pan': 'gradient-pan 8s ease-in-out infinite',
        marquee: 'marquee 34s linear infinite',
        shimmer: 'shimmer 2.4s linear infinite',
      },
      letterSpacing: {
        tightest: '-0.045em',
      },
      maxWidth: {
        '8xl': '88rem',
      },
    },
  },
  plugins: [],
};

export default config;
