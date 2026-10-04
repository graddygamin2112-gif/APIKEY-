import { cn } from '@/lib/utils';

export function BillingToggle({
  annual,
  onChange,
  className,
}: {
  annual: boolean;
  onChange: (annual: boolean) => void;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-1 rounded-full border border-border/70 bg-secondary/40 p-1',
        className,
      )}
      role="group"
      aria-label="Billing period"
    >
      <button
        type="button"
        onClick={() => onChange(false)}
        aria-pressed={!annual}
        className={cn(
          'rounded-full px-4 py-1.5 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none',
          !annual ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground',
        )}
      >
        Monthly
      </button>
      <button
        type="button"
        onClick={() => onChange(true)}
        aria-pressed={annual}
        className={cn(
          'flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none',
          annual ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground',
        )}
      >
        Annual
        <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-semibold text-primary">
          Save 20%
        </span>
      </button>
    </div>
  );
}