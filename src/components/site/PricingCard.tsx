import { Check, Minus } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { PricingPlan } from '@/data/pricing';
import { useDownload } from './DownloadDialog';

function SpecValue({ value }: { value: boolean | string }) {
  if (value === true) {
    return <Check className="size-4 text-primary" aria-label="Included" />;
  }
  if (value === false) {
    return <Minus className="size-4 text-muted-foreground/50" aria-label="Not included" />;
  }
  return <span className="text-xs font-medium text-foreground">{value}</span>;
}

export function PricingCard({
  plan,
  annual,
  className,
}: {
  plan: PricingPlan;
  annual: boolean;
  className?: string;
}) {
  const { open } = useDownload();
  const price = annual ? plan.annual : plan.monthly;
  const isFree = price === 0;

  return (
    <Card
      className={cn(
        'relative h-full overflow-hidden border-border/70 bg-card/60 transition-all duration-300',
        plan.featured
          ? 'border-primary/60 shadow-2xl shadow-primary/10 lg:-translate-y-2 lg:scale-[1.02]'
          : 'hover:-translate-y-0.5 hover:border-primary/40',
        className,
      )}
    >
      {plan.featured && (
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px animate-gradient-pan bg-gradient-to-r from-transparent via-primary to-transparent bg-[length:200%_100%]"
        />
      )}
      {plan.featured && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 -right-24 size-64 animate-glow-pulse rounded-full bg-primary/15 blur-3xl"
          style={{ animationDelay: '-1.5s' }}
        />
      )}
      <CardHeader className="gap-3">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-display text-xl font-semibold">{plan.name}</h3>
          {plan.badge && <Badge className="bg-primary/15 text-primary">{plan.badge}</Badge>}
        </div>
        <p className="text-sm text-muted-foreground">{plan.tagline}</p>

        <div className="mt-2 flex items-end gap-2">
          <span className="font-display text-5xl font-bold tracking-tight">
            ${price}
          </span>
          {!isFree && (
            <span className="mb-1.5 text-sm text-muted-foreground">
              /{annual ? 'mo, billed yearly' : 'month'}
            </span>
          )}
          {isFree && <span className="mb-2 text-sm text-muted-foreground">forever</span>}
        </div>
        {!isFree && annual && (
          <p className="text-xs font-medium text-brand-cyan">
            Save ${(plan.monthly - plan.annual) * 12}/year
          </p>
        )}
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-5">
        <Button
          size="lg"
          variant={plan.featured ? 'default' : 'outline'}
          className={cn('w-full', plan.featured && 'shadow-lg shadow-primary/20')}
          onClick={() => open()}
        >
          {plan.cta}
        </Button>

        <ul className="space-y-2.5">
          {plan.highlights.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-sm">
              <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
              <span className="text-foreground/90">{item}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

export { SpecValue };