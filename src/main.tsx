import { createRoot } from 'react-dom/client';

// Import polyfills first
import './lib/polyfills.ts';

import '@fontsource-variable/inter';
import '@fontsource-variable/space-grotesk';

import { ErrorBoundary } from '@/components/ErrorBoundary';
import App from './App.tsx';
import './index.css';

/**
 * Apply the persisted theme to <html> before React mounts.
 *
 * The theme class is otherwise applied in an effect inside AppProvider, which
 * runs after the first paint — so a user who chose the light theme would see a
 * dark flash on every load (index.html ships class="dark"). Reading the stored
 * config here is synchronous and cheap, and keeps the strict CSP intact since
 * this is a same-origin module rather than an inline script.
 */
function applyInitialTheme() {
  const DEFAULT_THEME = 'dark';
  let theme: string = DEFAULT_THEME;

  try {
    const stored = localStorage.getItem('nostr:app-config');
    if (stored) {
      const parsed = JSON.parse(stored) as { theme?: string } | null;
      if (parsed?.theme) theme = parsed.theme;
    }
  } catch {
    // Malformed storage — fall back to the default theme.
  }

  const resolved =
    theme === 'system'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
      : theme;

  const root = document.documentElement;
  root.classList.remove('light', 'dark');
  root.classList.add(resolved === 'light' ? 'light' : 'dark');
}

applyInitialTheme();

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
