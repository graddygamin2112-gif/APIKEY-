import { useEffect, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { Magnetic } from './motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

/**
 * Shared marketing shell: sticky glass navbar + footer + ambient background.
 * Used by every public page so the navigation and footer stay consistent.
 */
export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="isolate relative flex min-h-screen flex-col overflow-x-clip bg-background">
      <AmbientBackground />
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}

function AmbientBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-40 -left-32 size-[38rem] animate-aurora rounded-full bg-brand-violet/20 blur-[140px]" />
      <div
        className="absolute top-1/3 -right-40 size-[34rem] animate-aurora rounded-full bg-brand-cyan/15 blur-[150px]"
        style={{ animationDelay: '-6s' }}
      />
      <div
        className="absolute bottom-0 left-1/4 size-[30rem] animate-aurora rounded-full bg-brand-magenta/10 blur-[150px]"
        style={{ animationDelay: '-12s' }}
      />
      <div className="studio-grid absolute inset-0 opacity-[0.35] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
    </div>
  );
}

const navLinks = [
  { to: '/features', label: 'Features' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/testimonials', label: 'Testimonials' },
  { to: '/tutorials', label: 'Tutorials' },
];

function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 border-b transition-all duration-300',
        scrolled
          ? 'border-border/60 glass-panel shadow-lg shadow-black/10'
          : 'border-transparent bg-transparent',
      )}
    >
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link to="/" className="group shrink-0 rounded-lg focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none" aria-label="CutForge Studio home">
          <span className="inline-block transition-transform duration-300 group-hover:scale-[1.03]">
            <Logo />
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="group relative rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              {link.label}
              <span
                aria-hidden="true"
                className="absolute inset-x-3 -bottom-px h-0.5 origin-left scale-x-0 rounded-full bg-gradient-to-r from-brand-cyan to-brand-violet transition-transform duration-300 group-hover:scale-x-100"
              />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
            <Link to="/pricing">Sign in</Link>
          </Button>
          <Magnetic strength={6}>
            <Button asChild size="sm" className="shadow-lg shadow-primary/20">
              <Link to="/#download">Download free</Link>
            </Button>
          </Magnetic>
        </div>
      </div>

      <ScrollProgress />

      {/* Mobile nav */}
      <nav aria-label="Primary mobile" className="border-t border-border/60 md:hidden">
        <div className="container flex items-center gap-1 overflow-x-auto py-2">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="shrink-0 rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary/60 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}

/** Reading-progress bar pinned to the bottom edge of the header. */
function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0);
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
  }, []);

  return (
    <div className="absolute inset-x-0 -bottom-px h-0.5 overflow-hidden" aria-hidden="true">
      <div
        className="h-full origin-left bg-gradient-to-r from-brand-cyan via-brand-violet to-brand-magenta transition-transform duration-100 ease-out"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}

const footerColumns = [
  {
    title: 'Product',
    links: [
      { label: 'Features', to: '/features' },
      { label: 'Pricing', to: '/pricing' },
      { label: 'Tutorials', to: '/tutorials' },
      { label: 'Testimonials', to: '/testimonials' },
      { label: 'Download', to: '/#download' },
    ],
  },
  {
    title: 'Learn',
    links: [
      { label: 'Getting started', to: '/tutorials' },
      { label: 'Color & audio', to: '/tutorials' },
      { label: 'AI tools', to: '/tutorials' },
      { label: 'Plugin API', to: '/tutorials' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', to: '/' },
      { label: 'Careers', to: '/' },
      { label: 'Press kit', to: '/' },
      { label: 'Contact', to: '/' },
    ],
  },
];

function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-card/40">
      <div className="container py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              The professional video editing software built for the era of endless
              deliverables. Real-time 8K editing, a genuine AI collaborator, and a
              color suite that holds up on the big screen.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild size="sm" className="shadow-lg shadow-primary/20">
                <Link to="/#download">Download free</Link>
              </Button>
              <Button asChild size="sm" variant="outline">
                <Link to="/pricing">See pricing</Link>
              </Button>
            </div>
          </div>

          {footerColumns.map((col) => (
            <div key={col.title}>
              <h3 className="font-display text-sm font-semibold tracking-wide">{col.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border/60 pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} CutForge Studio. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            {`Vibed with `}
            <a
              href="https://shakespeare.diy"
              target="_blank"
              rel="noreferrer noopener"
              className="font-medium text-foreground underline decoration-primary/50 underline-offset-4 hover:decoration-primary"
            >
              Shakespeare
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

/** Consistent section wrapper with vertical rhythm. */
export function Section({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn('py-20 sm:py-28', className)}>
      <div className="container">{children}</div>
    </section>
  );
}

/** Small eyebrow label above a section heading. */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full border border-border/70 bg-secondary/40 px-3 py-1 text-xs font-semibold tracking-widest text-muted-foreground uppercase',
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-primary" aria-hidden="true" />
      {children}
    </span>
  );
}

/** Centered section heading block. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'center' | 'left';
  className?: string;
}) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4',
        align === 'center' ? 'mx-auto max-w-3xl items-center text-center' : 'items-start',
        className,
      )}
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
        {title}
      </h2>
      {description && (
        <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}