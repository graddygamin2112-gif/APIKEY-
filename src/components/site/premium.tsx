import { Fragment, useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { usePrefersReducedMotion } from './motion';

/* ────────────────────────────────────────────────────────────────────────────
   GrainOverlay — a fixed, tiled film-grain layer. Real photos/film carry a
   little noise; a faint grain layer is what makes flat dark UIs read as
   "produced" rather than "rendered". Pure CSS background, so it costs nothing
   on scroll. Pointer-events are disabled so it never blocks interaction.
   ──────────────────────────────────────────────────────────────────────────── */
const GRAIN_TILE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export function GrainOverlay({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none fixed inset-0 z-[1] opacity-[0.05] mix-blend-overlay',
        className,
      )}
      style={{ backgroundImage: GRAIN_TILE, backgroundSize: '180px 180px' }}
    />
  );
}

/* ────────────────────────────────────────────────────────────────────────────
   Cursor — a bespoke two-part cursor (instant dot + eased ring) that scales up
   over interactive targets. Only activates on fine pointers without a reduced
   motion preference; touch devices and reduced-motion users keep the native
   cursor untouched.
   ──────────────────────────────────────────────────────────────────────────── */
export function Cursor() {
  const reduced = usePrefersReducedMotion();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  // Computed synchronously (not in an effect) so the cursor elements and their
  // refs exist on the very first effect pass. Setting this from inside the
  // effect would deadlock: the effect bails out when the refs are null, so it
  // could never enable itself.
  const [enabled] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(pointer: fine)').matches,
  );

  useEffect(() => {
    if (!enabled || reduced) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const root = document.documentElement;
    root.classList.add('has-custom-cursor');

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let hovering = false;
    let pressing = false;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setActive(true);
      const target = e.target as HTMLElement | null;
      hovering = Boolean(
        target?.closest('a, button, [role="button"], [data-cursor="hover"], input, textarea, select, label'),
      );
    };

    const onDown = () => {
      pressing = true;
    };
    const onUp = () => {
      pressing = false;
    };
    const onLeave = () => {
      setActive(false);
    };

    const tick = () => {
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      const scale = (hovering ? 2.1 : 1) * (pressing ? 0.82 : 1);
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${scale})`;
      ring.style.opacity = hovering ? '1' : '0.55';
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    document.addEventListener('mouseleave', onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      root.classList.remove('has-custom-cursor');
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseleave', onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [enabled, reduced]);

  if (!enabled) return null;

  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none fixed inset-0 z-[9999] transition-opacity duration-300',
        active ? 'opacity-100' : 'opacity-0',
      )}
    >
      <div
        ref={dotRef}
        className="absolute top-0 left-0 size-1.5 rounded-full bg-brand-cyan shadow-[0_0_12px_var(--brand-cyan)] will-change-transform"
      />
      <div
        ref={ringRef}
        className="absolute top-0 left-0 size-9 rounded-full border border-brand-violet/70 bg-brand-violet/5 backdrop-blur-[1px] will-change-transform"
      />
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
   MarqueeBand — oversized kinetic type band that reacts to scroll velocity.

   Award-site flourish (the "scroll-velocity marquee"): the strip idles at a
   lazy drift, then accelerates, skews into the direction of travel, and even
   reverses when you scroll up. One scroll listener only *records* the delta;
   a single rAF loop does every write (never write transforms inside a scroll
   handler). See the reference implementation rationale:
   https://codefronts.com/motion/css-infinite-marquee/scroll-velocity-reactive-marquee/

   Renders two identical copies of the phrase list so the modulo wrap
   (`x % half`) is seamless at any speed. Under reduced motion the listener is
   never attached and the band stays perfectly static.
   ──────────────────────────────────────────────────────────────────────────── */
const DEFAULT_BAND = [
  'Real-time 8K',
  'AI collaborator',
  'Cinema color',
  'Broadcast audio',
  'Multicam',
  'One-click delivery',
];

export function MarqueeBand({
  items = DEFAULT_BAND,
  className,
  speed = 55,
  velocityFactor = 0.22,
  maxSkew = 9,
}: {
  items?: string[];
  className?: string;
  /** Idle drift in px/second. */
  speed?: number;
  /** How strongly page scroll drives the strip. 0.5+ is chaotic, 0.1 subtle. */
  velocityFactor?: number;
  /** Maximum skew lean, in degrees. */
  maxSkew?: number;
}) {
  const reduced = usePrefersReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced) return;
    const track = trackRef.current;
    if (!track) return;

    let x = 0;
    let half = 0;
    let velocity = 0;
    let smooth = 0;
    let lastScroll = window.scrollY;
    let prev = performance.now();
    let raf = 0;
    let visible = true;

    const measure = () => {
      // Two identical copies are rendered, so one copy is exactly half.
      half = track.scrollWidth / 2;
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);

    // The scroll handler only records; direction is implied by the sign.
    const onScroll = () => {
      velocity += (window.scrollY - lastScroll) * 0.6;
      lastScroll = window.scrollY;
    };

    const frame = (now: number) => {
      if (!visible) {
        raf = 0;
        return;
      }
      const dt = Math.min((now - prev) / 1000, 0.05);
      prev = now;

      velocity *= 0.9; // decay: the effect relaxes when scrolling stops
      smooth += (velocity - smooth) * 0.1; // lerp: spiky wheel → liquid motion
      x += (speed + smooth * velocityFactor) * dt;
      if (half > 0) x = ((x % half) + half) % half; // modulo = no seam

      const skew = Math.max(-maxSkew, Math.min(maxSkew, -smooth * 0.04));
      track.style.transform = `translate3d(${-x}px, 0, 0) skewX(${skew}deg)`;

      raf = requestAnimationFrame(frame);
    };

    // Pause the loop while off-screen so an idle page costs nothing.
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !raf) {
          prev = performance.now();
          raf = requestAnimationFrame(frame);
        }
      },
      { rootMargin: '120px' },
    );
    io.observe(track);

    window.addEventListener('scroll', onScroll, { passive: true });
    raf = requestAnimationFrame(frame);

    return () => {
      window.removeEventListener('scroll', onScroll);
      io.disconnect();
      ro.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduced, speed, velocityFactor, maxSkew]);

  const row = (outlined: boolean, copy: number) => (
    <div className="flex shrink-0 items-center" aria-hidden={copy > 0 ? 'true' : undefined}>
      {items.map((item, i) => (
        <span key={`${item}-${i}`} className="flex items-center">
          <span
            className={cn(
              'px-6 font-display text-4xl font-semibold tracking-tight whitespace-nowrap uppercase sm:text-6xl lg:text-7xl',
              outlined ? 'text-outline' : 'text-foreground/90',
            )}
          >
            {item}
          </span>
          <span className="text-2xl text-brand-cyan/70 sm:text-4xl" aria-hidden="true">
            ✳
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <div
      className={cn(
        'relative flex overflow-hidden border-y border-border/60 py-6 select-none [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]',
        className,
      )}
    >
      <div ref={trackRef} className="flex w-max items-center will-change-transform">
        {row(false, 0)}
        {row(true, 1)}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
   PageTransition — replays a short enter animation on every route change by
   keying off the pathname. Marketing pages rebuild on navigation anyway, so
   the remount cost is negligible and it removes the hard "flash" between pages.
   ──────────────────────────────────────────────────────────────────────────── */
export function PageTransition({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  return (
    <div key={pathname} className="animate-page-in">
      {children}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
   SplitText — reveals a headline word by word for a kinetic, editorial feel.
   Each word sits in an overflow-hidden mask so it slides up from behind the
   line. Falls back to instant visibility under reduced motion (handled in CSS).
   ──────────────────────────────────────────────────────────────────────────── */
export function SplitText({
  text,
  className,
  delay = 0,
  step = 60,
  blur = true,
}: {
  text: string;
  className?: string;
  delay?: number;
  step?: number;
  /** Start each word slightly blurred and resolved (the "BlurText" reveal). */
  blur?: boolean;
}) {
  const words = text.split(' ');
  return (
    <span className={className}>
      {words.map((word, i) => (
        // The space lives *between* the masks (not inside), so words keep
        // normal spacing and lines can still wrap at the spaces.
        <Fragment key={`${word}-${i}`}>
          <span className="inline-block overflow-hidden align-bottom pb-[0.14em]">
            <span
              className={cn(
                'inline-block will-change-transform',
                blur ? 'animate-rise-blur' : 'animate-rise',
              )}
              style={{ animationDelay: `${delay + i * step}ms` }}
            >
              {word}
            </span>
          </span>
          {i < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </span>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
   ClipReveal — unclips its content as it scrolls into view (inset clip-path
   wipe), settling to a full frame. Award sites use this to make media feel
   "revealed" rather than merely faded. Transform/clip-path only, fired once,
   and disabled under reduced motion where the content simply shows.
   ──────────────────────────────────────────────────────────────────────────── */
export function ClipReveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.dataset.revealed = 'true';
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.dataset.revealed = 'true';
        observer.disconnect();
      },
      { threshold: 0.2, rootMargin: '0px 0px -8% 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-clip
      style={{ '--clip-delay': `${delay}ms` } as CSSProperties}
      className={className}
    >
      {children}
    </div>
  );
}