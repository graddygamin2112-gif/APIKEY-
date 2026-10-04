import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { Testimonial } from '@/data/testimonials';

export function Stars({ rating, className }: { rating: number; className?: string }) {
  return (
    <div
      className={cn('flex items-center gap-0.5', className)}
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={cn(
            'size-3.5',
            i < rating ? 'fill-amber-400 text-amber-400' : 'fill-muted text-muted',
          )}
        />
      ))}
    </div>
  );
}

function Avatar({ testimonial }: { testimonial: Testimonial }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'grid size-11 shrink-0 place-items-center rounded-full bg-gradient-to-br text-sm font-semibold text-white shadow-inner',
        testimonial.avatarGradient,
      )}
    >
      {testimonial.initials}
    </span>
  );
}

export function TestimonialCard({
  testimonial,
  className,
  compact = false,
}: {
  testimonial: Testimonial;
  className?: string;
  compact?: boolean;
}) {
  return (
    <Card
      className={cn(
        'group relative h-full overflow-hidden border-border/70 bg-card/60 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10',
        className,
      )}
    >
      {/* Gradient edge that fades in on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-16 size-48 rounded-full bg-brand-violet/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
      />
      <CardContent className={cn('relative flex h-full flex-col gap-4', compact && 'gap-3')}>
        <Quote
          className="size-6 text-primary/40 transition-all duration-300 group-hover:scale-110 group-hover:text-primary/70"
          aria-hidden="true"
        />
        <blockquote className={cn('flex-1 text-sm leading-relaxed text-foreground/90', compact && 'text-[13px]')}>
          {testimonial.quote}
        </blockquote>

        {testimonial.metric && (
          <div className="flex items-baseline gap-2 rounded-lg border border-border/60 bg-secondary/30 px-3 py-2">
            <span className="font-display text-xl font-bold text-gradient">
              {testimonial.metric.value}
            </span>
            <span className="text-xs text-muted-foreground">{testimonial.metric.label}</span>
          </div>
        )}

        <div className="flex items-center gap-3 border-t border-border/60 pt-4">
          <Avatar testimonial={testimonial} />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{testimonial.name}</p>
            <p className="truncate text-xs text-muted-foreground">
              {testimonial.role} · {testimonial.company}
            </p>
          </div>
          <Stars rating={testimonial.rating} />
        </div>

        <div className="flex items-center justify-between gap-2">
          <Badge variant="outline" className="text-muted-foreground">
            {testimonial.tag}
          </Badge>
          <span className="truncate text-[11px] text-muted-foreground italic">
            {testimonial.project}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}