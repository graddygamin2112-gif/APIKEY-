import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDownload } from './DownloadDialog';
import { Magnetic, Marquee, Reveal } from './motion';
import { cn } from '@/lib/utils';

export function CtaBand({
  className,
  title = 'Your next edit deserves a better studio.',
  description = 'Download CutForge Studio free and cut your first project in under an hour. Upgrade only when you outgrow it.',
}: {
  className?: string;
  title?: string;
  description?: string;
}) {
  const { open } = useDownload();

  return (
    <Reveal variant="scale" className={cn('relative isolate', className)}>
      <div className="relative isolate overflow-hidden rounded-3xl border border-border/70 bg-card/60 p-8 text-center sm:p-14">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 animate-aurora bg-[radial-gradient(ellipse_at_top,rgba(124,58,237,0.32),transparent_60%)]"
        />
        <div
          aria-hidden="true"
          className="absolute -right-20 -bottom-24 -z-10 size-72 animate-glow-pulse rounded-full bg-brand-cyan/20 blur-[110px]"
        />
        <div
          aria-hidden="true"
          className="absolute -top-24 -left-16 -z-10 size-64 animate-glow-pulse rounded-full bg-brand-magenta/15 blur-[110px]"
          style={{ animationDelay: '-2s' }}
        />

        <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold tracking-wide text-primary uppercase">
          <Sparkles className="size-3.5" />
          14-day Creator trial included
        </span>

        <h2 className="mx-auto mt-5 max-w-2xl font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
          {description}
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Magnetic strength={8}>
            <Button size="lg" className="shadow-lg shadow-primary/20" onClick={() => open()}>
              Download free
              <ArrowRight />
            </Button>
          </Magnetic>
          <Button size="lg" variant="outline" asChild>
            <Link to="/pricing">Compare plans</Link>
          </Button>
        </div>

        <p className="mt-5 text-xs text-muted-foreground">
          macOS · Windows · Linux — no credit card required
        </p>
      </div>
    </Reveal>
  );
}

export function LogoStrip({
  items,
  className,
}: {
  items: string[];
  className?: string;
}) {
  return (
    <div className={cn('relative', className)}>
      <p className="text-center text-xs font-semibold tracking-widest text-muted-foreground uppercase">
        Trusted by studios, agencies and 2.4M creators
      </p>

      {/* Edge fade so the infinite marquee bleeds off cleanly on both sides */}
      <div className="relative mt-6 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <Marquee duration={34}>
          {items.map((name) => (
            <span
              key={name}
              className="px-8 font-display text-lg font-semibold tracking-tight text-muted-foreground/70 transition-colors hover:text-foreground"
            >
              {name}
            </span>
          ))}
        </Marquee>
      </div>
    </div>
  );
}