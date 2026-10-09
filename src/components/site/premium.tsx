import { useEffect, useRef, useState } from 'react';
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
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (reduced) return;
    if (typeof window === 'undefined') return;
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    setEnabled(true);

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
  }, [reduced]);

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
   MarqueeBand — oversized kinetic type band. Pairs a filled and an outlined
   pass of the same phrase list for editorial contrast. Reuses the existing
   `marquee` keyframe (translateX 0 -> -50%) with two duplicated passes.
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
  reverse = false,
  duration = 38,
  className,
}: {
  items?: string[];
  reverse?: boolean;
  duration?: number;
  className?: string;
}) {
  const row = (outlined: boolean) => (
    <div className="flex shrink-0 items-center">
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
      aria-hidden="true"
      className={cn(
        'relative flex overflow-hidden border-y border-border/60 py-6 select-none [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]',
        className,
      )}
    >
      <div
        className={cn('flex w-max animate-marquee items-center', reverse && '[animation-direction:reverse]')}
        style={{ animationDuration: `${duration}s` }}
      >
        {row(false)}
        {row(true)}
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
   PageTransition — replays a short enter animation on every route change by
   keying off the pathname. Marketing pages rebuild on navigation anyway, so
   the remount cost is negligible and it removes the hard "flash" between pages.
   ──────────────────────────────────────────────────────────────────────────── */
export function PageTransition({ children }: { children: React.ReactNode }) {
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
}: {
  text: string;
  className?: string;
  delay?: number;
  step?: number;
}) {
  const words = text.split(' ');
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-flex overflow-hidden pb-[0.12em] align-bottom">
          <span
            className="animate-rise will-change-transform"
            style={{ animationDelay: `${delay + i * step}ms` }}
          >
            {word}
          </span>
          {i < words.length - 1 ? <span className="whitespace-pre"> </span> : null}
        </span>
      ))}
    </span>
  );
}