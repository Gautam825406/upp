/**
 * Theme state.
 *
 * The site ships dark-first. Light mode is a custom-property swap on <html> (see
 * src/styles/index.css) rather than `dark:` variants, so switching the class re-themes every
 * component with no re-render of the tree.
 *
 * The initial class is written by a small inline script in index.html so that the very first paint
 * is already correct — reading it back here just keeps React in sync with what the DOM is showing.
 */

import { useCallback, useEffect, useState } from 'react';

export type Theme = 'dark' | 'light';

const STORAGE_KEY = 'upp-theme';

/** Class applied to <html>. `.dark` is the default, so an unrecognised value reads as dark. */
const root = () => document.documentElement;

function readTheme(): Theme {
  if (typeof window === 'undefined') return 'dark';
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === 'light' || stored === 'dark') return stored;
  return root().classList.contains('light') ? 'light' : 'dark';
}

function applyTheme(theme: Theme) {
  const el = root();
  el.classList.toggle('light', theme === 'light');
  el.classList.toggle('dark', theme === 'dark');
  // Keeps the mobile browser chrome (address bar) in step with the page.
  el.style.colorScheme = theme;
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    meta.setAttribute('content', theme === 'light' ? '#f8fafc' : '#0b1026');
  }
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(readTheme);

  useEffect(() => {
    applyTheme(theme);
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Private browsing / storage disabled — the toggle still works for this session.
    }
  }, [theme]);

  const toggle = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  return { theme, toggle };
}
