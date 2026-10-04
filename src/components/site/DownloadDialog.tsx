import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { Apple, Monitor, Terminal, Check, Download, Sparkles, ArrowRight } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

type Platform = 'macOS' | 'Windows' | 'Linux';

const platforms: { name: Platform; icon: typeof Apple; note: string; size: string }[] = [
  { name: 'macOS', icon: Apple, note: 'Apple Silicon & Intel', size: '1.4 GB' },
  { name: 'Windows', icon: Monitor, note: 'Windows 10 & 11', size: '1.5 GB' },
  { name: 'Linux', icon: Terminal, note: 'Ubuntu, Fedora, Arch', size: '1.4 GB' },
];

interface DownloadContextValue {
  open: (platform?: Platform) => void;
}

const DownloadContext = createContext<DownloadContextValue | null>(null);

export function useDownload() {
  const ctx = useContext(DownloadContext);
  if (!ctx) throw new Error('useDownload must be used within DownloadProvider');
  return ctx;
}

export function DownloadProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [platform, setPlatform] = useState<Platform>('macOS');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const open = useCallback((preset?: Platform) => {
    if (preset) setPlatform(preset);
    setSubmitted(false);
    setIsOpen(true);
  }, []);

  const value = useMemo(() => ({ open }), [open]);

  return (
    <DownloadContext.Provider value={value}>
      {children}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">
              {submitted ? 'You’re all set' : 'Download CutForge Studio'}
            </DialogTitle>
            <DialogDescription>
              {submitted
                ? 'Check your inbox for the download link and your 14-day Creator trial.'
                : 'Free forever on the Solo plan. No credit card required. Unlock Creator free for 14 days.'}
            </DialogDescription>
          </DialogHeader>

          {submitted ? (
            <div className="flex flex-col items-center gap-4 py-6 text-center">
              <span className="grid size-14 place-items-center rounded-full bg-primary/15 text-primary">
                <Check className="size-7" />
              </span>
              <p className="max-w-sm text-sm text-muted-foreground">
                We sent a download link to{' '}
                <span className="font-medium text-foreground">{email}</span>. Meanwhile, start
                with the Foundations tutorial to get cutting in minutes.
              </p>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Button asChild>
                  <a href="/tutorials">
                    Explore tutorials <ArrowRight />
                  </a>
                </Button>
                <Button variant="outline" onClick={() => setIsOpen(false)}>
                  Close
                </Button>
              </div>
            </div>
          ) : (
            <form
              className="space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
            >
              <fieldset className="space-y-2">
                <legend className="mb-2 text-sm font-medium">Choose your platform</legend>
                <div className="grid gap-2 sm:grid-cols-3">
                  {platforms.map((p) => {
                    const active = platform === p.name;
                    return (
                      <button
                        key={p.name}
                        type="button"
                        onClick={() => setPlatform(p.name)}
                        aria-pressed={active}
                        className={cn(
                          'flex flex-col items-start gap-2 rounded-xl border p-3 text-left transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none',
                          active
                            ? 'border-primary bg-primary/10'
                            : 'border-border bg-secondary/30 hover:border-primary/50',
                        )}
                      >
                        <p.icon className={cn('size-5', active ? 'text-primary' : 'text-muted-foreground')} />
                        <span className="text-sm font-semibold">{p.name}</span>
                        <span className="text-[11px] leading-tight text-muted-foreground">
                          {p.note}
                          <br />
                          {p.size}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <div className="space-y-2">
                <Label htmlFor="download-email">Work email (optional)</Label>
                <Input
                  id="download-email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@studio.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  We’ll send your download link and trial reminder. No spam, unsubscribe anytime.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button type="submit" size="lg" className="shadow-lg shadow-primary/20">
                  <Download />
                  Download for {platform}
                </Button>
                <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Sparkles className="size-3.5 text-brand-cyan" />
                  Includes 14 days of Creator, free
                </p>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </DownloadContext.Provider>
  );
}

/** Convenience button that opens the download dialog. */
export function DownloadButton({
  children = 'Download free',
  size = 'lg',
  variant = 'default',
  className,
  platform,
}: {
  children?: ReactNode;
  size?: 'sm' | 'lg' | 'default';
  variant?: 'default' | 'outline' | 'secondary' | 'ghost';
  className?: string;
  platform?: Platform;
}) {
  const { open } = useDownload();
  return (
    <Button
      size={size}
      variant={variant}
      className={className}
      onClick={() => open(platform)}
    >
      {children}
    </Button>
  );
}