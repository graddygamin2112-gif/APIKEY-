import { useId } from 'react';
import { cn } from '@/lib/utils';

interface LogoMarkProps {
  className?: string;
  /** Render the mark on a transparent background with a gradient stroke instead of a filled tile. */
  variant?: 'tile' | 'plain';
}

export function LogoMark({ className, variant = 'tile' }: LogoMarkProps) {
  const id = useId();
  const gradId = `cf-grad-${id}`;

  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      className={cn('size-9', className)}
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="var(--brand-cyan)" />
          <stop offset="0.5" stopColor="var(--brand-violet)" />
          <stop offset="1" stopColor="var(--brand-magenta)" />
        </linearGradient>
      </defs>
      {variant === 'tile' && <rect width="64" height="64" rx="16" fill={`url(#${gradId})`} />}
      <path
        d="M25.5 20.5 L46 32 L25.5 43.5 Z"
        fill={variant === 'tile' ? 'hsl(228 45% 7%)' : `url(#${gradId})`}
        opacity={variant === 'tile' ? 0.9 : 1}
      />
      <path
        d="M16 16 L34 32 L16 48"
        stroke={variant === 'tile' ? 'hsl(228 45% 7%)' : `url(#${gradId})`}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={variant === 'tile' ? 0.55 : 0.9}
      />
      <circle cx="47" cy="17" r="4.5" fill="#FDE68A" />
    </svg>
  );
}

interface LogoProps {
  className?: string;
  showWordmark?: boolean;
}

export function Logo({ className, showWordmark = true }: LogoProps) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <LogoMark />
      {showWordmark && (
        <span className="font-display text-lg font-semibold tracking-tight">
          Cut<span className="text-gradient">Forge</span>
          <span className="ml-1 hidden text-xs font-medium tracking-widest text-muted-foreground uppercase sm:inline">
            Studio
          </span>
        </span>
      )}
    </span>
  );
}