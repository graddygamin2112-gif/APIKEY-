import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
} from 'react';
import { cn } from '@/lib/utils';

/* ────────────────────────────────────────────────────────────────────────────
   usePrefersReducedMotion — single source of truth so every motion primitive
   respects the user's OS-level preference.
   ──────────────────────────────────────────────────────────────────────────── */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return reduced;
}

/* ────────────────────────────────────────────────────────────────────────────
   useInView — IntersectionObserver once-trigger hook.
   ──────────────────────────────────────────────────────────────────────────── */
export function useInView<T extends HTMLElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  const optionsRef = useRef(options);
  optionsRef.current = options;

  useEffect(() => {
    const node = ref.current;
    if (!node || inView) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    }, optionsRef.current ?? { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });

    observer.observe(node);
    return () => observer.disconnect();
  }, [inView]);

  return { ref, inView };
}

/* ────────────────────────────────────────────────────────────────────────────
   Reveal — scroll-triggered entrance with directional + stagger support.
   ──────────────────────────────────────────────────────────────────────────── */
interface RevealProps {
  children: ReactNode;
  /** Direction of travel as the element enters the viewport. */
  variant?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade';
  /** Stagger delay in milliseconds. */
  delay?: number;
  className?: string;
  as?: ElementType;
}

export function Reveal({
  children,
  variant = 'up',
  delay = 0,
  className,
  as: Tag = 'div',
}: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <Tag
      ref={ref}
      data-reveal={variant}
      data-revealed={inView}
      style={{ transitionDelay: `${delay}ms` } as CSSProperties}
      className={className}
    >
      {children}
    </Tag>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
   Magnetic — element drifts toward the pointer, springs back on leave.
   Great for primary CTAs.
   ──────────────────────────────────────────────────────────────────────────── */
interface MagneticProps {
  children: ReactNode;
  className?: string;
  /** How far the element may travel, in px. */
  strength?: number;
}

export function Magnetic({ children, className, strength = 10 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  const onMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || reduced) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };

  const reset = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'translate(0, 0)';
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={cn(
        'inline-block transition-transform duration-300 ease-out will-change-transform motion-reduce:transform-none',
        className,
      )}
    >
      {children}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
   TiltCard — pointer-tracked 3D tilt with a moving sheen highlight.
   ──────────────────────────────────────────────────────────────────────────── */
interface TiltCardProps {
  children: ReactNode;
  className?: string;
  /** Maximum rotation in degrees. */
  max?: number;
}

export function TiltCard({ children, className, max = 6 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  const onMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || reduced) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rx = (0.5 - py) * max * 2;
    const ry = (px - 0.5) * max * 2;
    el.style.transform = `perspective(1100px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
    el.style.setProperty('--sheen-x', `${px * 100}%`);
    el.style.setProperty('--sheen-y', `${py * 100}%`);
  };

  const reset = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'perspective(1100px) rotateX(0deg) rotateY(0deg)';
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={cn(
        'card-3d group/tilt relative transition-transform duration-300 ease-out motion-reduce:transform-none',
        className,
      )}
    >
      {children}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/tilt:opacity-100"
        style={{
          background:
            'radial-gradient(320px circle at var(--sheen-x,50%) var(--sheen-y,50%), color-mix(in srgb, var(--brand-violet) 22%, transparent), transparent 60%)',
        }}
      />
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
   Parallax — translates its child as the page scrolls past it.
   ──────────────────────────────────────────────────────────────────────────── */
interface ParallaxProps {
  children: ReactNode;
  className?: string;
  /** Positive moves slower/up, negative moves faster/down. */
  speed?: number;
}

export function Parallax({ children, className, speed = 0.12 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const offset = (center - window.innerHeight / 2) * speed;
      el.style.transform = `translate3d(0, ${-offset}px, 0)`;
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [reduced, speed]);

  return (
    <div ref={ref} className={cn('will-change-transform motion-reduce:transform-none', className)}>
      {children}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
   Marquee — seamless infinite horizontal scroll of duplicated children.
   ──────────────────────────────────────────────────────────────────────────── */
interface MarqueeProps {
  children: ReactNode;
  className?: string;
  /** Seconds for one full loop. */
  duration?: number;
  reverse?: boolean;
  pauseOnHover?: boolean;
}

export function Marquee({
  children,
  className,
  duration = 40,
  reverse = false,
  pauseOnHover = true,
}: MarqueeProps) {
  return (
    <div className={cn('group/marquee relative flex overflow-hidden', className)}>
      <div
        className={cn(
          'flex w-max animate-marquee items-center gap-4',
          pauseOnHover && 'group-hover/marquee:[animation-play-state:paused]',
          reverse && '[animation-direction:reverse]',
        )}
        style={{ animationDuration: `${duration}s` }}
      >
        <div className="flex shrink-0 items-center gap-4">{children}</div>
        <div className="flex shrink-0 items-center gap-4" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
   Counter — animated number roll-up when scrolled into view.
   ──────────────────────────────────────────────────────────────────────────── */
interface CounterProps {
  value: number;
  /** Text rendered before the number (e.g. "$"). */
  prefix?: string;
  /** Text rendered after the number (e.g. "M+" or "%"). */
  suffix?: string;
  decimals?: number;
  className?: string;
  duration?: number;
}

export function Counter({
  value,
  prefix = '',
  suffix = '',
  decimals = 0,
  className,
  duration = 1400,
}: CounterProps) {
  const { ref, inView } = useInView<HTMLSpanElement>({ threshold: 0.4 });
  const reduced = usePrefersReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setDisplay(value);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      // easeOutExpo
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setDisplay(value * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced, value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}