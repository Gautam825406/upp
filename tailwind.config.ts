import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    // We keep the default palette in place (no `extend`/`colors` merge trap) and only add the
    // academy's own brand colours, fonts, shadows and motion.
    extend: {
      colors: {
        /* Deep ink-navy background system */
        ink: {
          950: '#05070f',
          900: '#070b18',
          800: '#0b1026',
          700: '#111a3a',
          600: '#1a2450',
        },
        /* Primary brand: warm gold -> "premium education" */
        gold: {
          300: '#ffe3a3',
          400: '#ffd479',
          500: '#ffc24b',
          600: '#f0a723',
          700: '#c9860f',
        },
        /* Secondary brand: electric indigo */
        iris: {
          300: '#b3a6ff',
          400: '#8b7bff',
          500: '#6d5bff',
          600: '#5642e0',
          700: '#4331b0',
        },
        /* Tertiary accent used sparingly for CTAs */
        aqua: {
          300: '#93f2ff',
          400: '#5ee6f7',
          500: '#22d3ee',
        },
      },
      fontFamily: {
        sans: ['"Manrope Variable"', ...defaultTheme.fontFamily.sans],
        display: ['"Plus Jakarta Sans Variable"', ...defaultTheme.fontFamily.sans],
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(255,255,255,0.06), 0 24px 60px -20px rgba(109,91,255,0.45)',
        gold: '0 18px 45px -18px rgba(255,194,75,0.55)',
        card: '0 1px 0 0 rgba(255,255,255,0.05) inset, 0 20px 50px -30px rgba(0,0,0,0.9)',
      },
      backgroundImage: {
        'hero-gradient':
          'radial-gradient(60% 60% at 20% 20%, rgba(109,91,255,0.28) 0%, transparent 60%), radial-gradient(50% 50% at 85% 15%, rgba(255,194,75,0.20) 0%, transparent 60%), radial-gradient(70% 70% at 50% 100%, rgba(34,211,238,0.12) 0%, transparent 60%)',
        'mesh-navy': 'linear-gradient(160deg, #05070f 0%, #0b1026 45%, #111a3a 100%)',
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
