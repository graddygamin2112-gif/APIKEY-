import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Scrolls to the top on navigation, or to the in-page anchor when the URL
 * carries a hash (e.g. `/#download`). Without the hash branch, cross-page
 * anchor links such as the header "Download free" button would land at the top
 * of the target page instead of the section they point at.
 *
 * Scrolling is forced to `instant` so the CSS `scroll-behavior: smooth` does
 * not animate every route change from the previous scroll position.
 */
export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1));

      // The target page mounts in the same commit as this effect, but its
      // layout may not be measurable yet. Wait one frame, then scroll.
      const raf = requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          window.scrollTo({ top: 0, behavior: 'instant' });
        }
      });

      return () => cancelAnimationFrame(raf);
    }

    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname, hash]);

  return null;
}