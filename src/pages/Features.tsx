import { useState } from 'react';
import { useSeoMeta } from '@unhead/react';
import {
  Check,
  X,
  Gauge,
  Sparkles,
  Palette,
  Users,
  ArrowRight,
  Cpu,
} from 'lucide-react';
import { SiteLayout, Section, SectionHeading } from '@/components/site/SiteLayout';
import { CtaBand } from '@/components/site/CtaBand';
import { Counter, Magnetic, Reveal, TiltCard } from '@/components/site/motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useDownload } from '@/components/site/DownloadDialog';
import { features, FEATURE_CATEGORIES, type FeatureCategory } from '@/data/features';
import { cn } from '@/lib/utils';

const performanceStats = [
  { value: 8, prefix: '', decimals: 0, suffix: 'K/120', label: 'Preview resolution', detail: 'Real time, no proxies' },
  { value: 16, prefix: '<', decimals: 0, suffix: 'ms', label: 'Timeline latency', detail: 'Measured keystroke to pixel' },
  { value: 42, prefix: '', decimals: 0, suffix: '', label: 'Native codecs', detail: 'Including RAW & ProRes' },
  { value: 99.98, prefix: '', decimals: 2, suffix: '%', label: 'Render uptime', detail: 'Cloud render queue, 90 days' },
];

const oldWay = [
  'Transcode or proxy every clip before you can start',
  'Conform between the edit, the grade and the mix',
  'Re-version the same edit for every aspect ratio',
  'Email timecodes back and forth for review',
  'Five subscriptions, five media libraries, five crashes',
];

const newWay = [
  'Native playback the moment media lands — 8K included',
  'Grade, mix and finish inside the same project',
  'One timeline, every ratio delivered automatically',
  'Frame-accurate comments pinned right on the cut',
  'One studio, one library, one monthly price',
];

const deepDives = [
  {
    id: 'ai',
    icon: Sparkles,
    eyebrow: 'The AI assistant',
    title: 'It watches every take so you do not have to',
    description:
      'The assistant indexes your entire shoot — faces, speakers, scenes, emotion, audio quality, even which take was in focus. Ask for what you need and it assembles a structured rough cut you can take apart clip by clip.',
    points: [
      'Text-to-timeline from a natural-language brief',
      'Finds the best take of each line automatically',
      'Generates subtitles in 42 languages with per-word timing',
      'Suggests cut points that respect pacing and beats',
    ],
  },
  {
    id: 'color',
    icon: Palette,
    eyebrow: 'Color & finishing',
    title: 'A grading suite that holds up on a cinema screen',
    description:
      'Node-based grading, ACES color management, true HDR scopes and film emulations derived from real stock scans. Nail the look in the edit and ship it without a conform.',
    points: [
      'ACES and DaVinci-compatible LUT pipeline',
      'HDR waveform, vectorscope and false-color tools',
      '18 film emulations and 240+ designed presets',
      'Skin-tone and sky masking that actually tracks',
    ],
  },
  {
    id: 'collab',
    icon: Users,
    eyebrow: 'Realtime collaboration',
    title: 'The whole team on one timeline, at the same time',
    description:
      'Multiplayer editing with frame-accurate presence, branchable version history and review links that play back in any browser with zero installs. Stop emailing project files.',
    points: [
      'Live multiplayer cursors and frame-level presence',
      'Timecoded comments, approvals and task assignment',
      'Branchable history with visual timeline diffing',
      'Lockable brand kits keep every asset on-system',
    ],
  },
];

const platformFacts = [
  'Apple Silicon native',
  'NVIDIA & AMD GPU acceleration',
  'Windows 10 & 11',
  'macOS 12+',
  'Ubuntu, Fedora & Arch',
  'REST, webhook & CLI automation',
  'JavaScript & Python plugins',
  'SOC 2 Type II certified',
];

const Features = () => {
  const { open } = useDownload();
  const [active, setActive] = useState<FeatureCategory | 'All'>('All');

  useSeoMeta({
    title: 'Features — CutForge Studio Video Editing Software',
    description:
      'Explore every CutForge Studio feature: zero-lag 8K timeline, AI editing assistant, multicam, cinema color, broadcast audio, motion graphics, realtime collaboration and one-click delivery.',
  });

  const visible = active === 'All' ? features : features.filter((f) => f.categories.includes(active));

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative pt-16 pb-10 sm:pt-24">
        <div className="container">
          <div className="max-w-3xl">
            <Reveal variant="fade">
              <Badge variant="outline" className="mb-5 border-primary/40 bg-primary/10 text-primary">
                <Cpu className="size-3.5" /> Version 6 · 12 fully integrated toolsets
              </Badge>
            </Reveal>
            <Reveal delay={60}>
              <h1 className="font-display text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
                Every tool a professional edit needs,{' '}
                <span className="text-gradient-animate">in one project.</span>
              </h1>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                CutForge replaces the scattered stack of editing, grading, sound and
                motion apps with one GPU-native studio. Native media, real-time 8K,
                a genuine AI collaborator and delivery to every platform.
              </p>
            </Reveal>
            <Reveal delay={180}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Magnetic strength={8}>
                  <Button size="lg" className="shadow-lg shadow-primary/20" onClick={() => open()}>
                    Download free
                  </Button>
                </Magnetic>
                <Button size="lg" variant="outline" asChild>
                  <a href="#matrix">
                    Compare feature sets <ArrowRight />
                  </a>
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Performance band */}
      <Section className="py-10 sm:py-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {performanceStats.map((stat, i) => (
            <Reveal key={stat.label} variant="scale" delay={i * 80} className="h-full">
              <Card className="h-full border-border/70 bg-card/60 transition-colors duration-300 hover:border-primary/40">
                <CardContent className="space-y-1">
                  <p className="font-display text-3xl font-bold text-gradient">
                    <Counter
                      value={stat.value}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                      decimals={stat.decimals ?? 0}
                    />
                  </p>
                  <p className="text-sm font-medium">{stat.label}</p>
                  <p className="text-xs text-muted-foreground">{stat.detail}</p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Feature explorer */}
      <Section id="matrix" className="pt-4">
        <Reveal>
          <SectionHeading
            eyebrow="Feature explorer"
            title="Filter by what you do most"
            description="Twelve toolsets, each built to be the best tool for the job — not a checkbox feature bolted onto an editor."
          />
        </Reveal>

        <div
          className="mt-10 flex flex-wrap justify-center gap-2"
          role="group"
          aria-label="Filter features by category"
        >
          {(['All', ...FEATURE_CATEGORIES] as (FeatureCategory | 'All')[]).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActive(cat)}
              aria-pressed={active === cat}
              className={cn(
                'rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-300 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none',
                active === cat
                  ? 'border-primary bg-primary/15 text-foreground shadow-md shadow-primary/10'
                  : 'border-border/70 bg-secondary/30 text-muted-foreground hover:border-primary/40 hover:text-foreground',
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((feature, i) => (
            <Reveal key={feature.id} delay={(i % 3) * 70} className="h-full">
              <TiltCard className="h-full [&>div]:h-full">
                <Card className="group flex h-full flex-col border-border/70 bg-card/60 transition-colors duration-300 hover:border-primary/40">
                  <CardContent className="flex flex-1 flex-col gap-4">
                    <div className="flex items-start justify-between gap-3">
                      <span className="grid size-11 place-items-center rounded-xl bg-primary/12 text-primary ring-1 ring-primary/20 transition-colors group-hover/tilt:bg-primary/20">
                        <feature.icon className="size-5" />
                      </span>
                      <div className="flex flex-wrap justify-end gap-1">
                        {feature.categories.map((c) => (
                          <Badge key={c} variant="outline" className="text-[10px] text-muted-foreground">
                            {c}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-semibold">{feature.title}</h3>
                      <p className="mt-1 text-sm font-medium text-brand-cyan">{feature.tagline}</p>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
                    <ul className="mt-auto space-y-2 border-t border-border/60 pt-4">
                      {feature.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2 text-xs text-muted-foreground">
                          <Check className="mt-0.5 size-3.5 shrink-0 text-primary" aria-hidden="true" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Deep dives */}
      <Section className="border-y border-border/60 bg-card/30">
        <Reveal>
          <SectionHeading
            eyebrow="Deep dives"
            title="The three features people switch for"
            description="Ask any editor who moved from another suite. These are the moments that make the switch obvious."
          />
        </Reveal>

        <div className="mt-16 space-y-16">
          {deepDives.map((dive, i) => {
            const reversed = i % 2 === 1;
            return (
              <div
                key={dive.id}
                className={cn(
                  'grid gap-10 lg:grid-cols-2 lg:items-center',
                  reversed && 'lg:[&>*:first-child]:order-2',
                )}
              >
                <Reveal variant={reversed ? 'right' : 'left'}>
                  <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-secondary/40 px-3 py-1 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                    <dive.icon className="size-3.5 text-primary" />
                    {dive.eyebrow}
                  </span>
                  <h3 className="mt-5 font-display text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
                    {dive.title}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                    {dive.description}
                  </p>
                  <ul className="mt-6 space-y-3">
                    {dive.points.map((p) => (
                      <li key={p} className="flex items-start gap-3 text-sm">
                        <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                        <span className="text-foreground/90">{p}</span>
                      </li>
                    ))}
                  </ul>
                </Reveal>

                {/* Visual panel */}
                <Reveal variant={reversed ? 'left' : 'right'} delay={80}>
                  <Card className="relative overflow-hidden border-border/70 bg-card/60">
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 animate-aurora bg-[radial-gradient(ellipse_at_top_right,rgba(124,58,237,0.22),transparent_65%)]"
                    />
                    <CardContent className="relative flex min-h-[18rem] flex-col justify-center gap-4">
                      <dive.icon className="size-10 text-primary" aria-hidden="true" />
                      <p className="font-display text-xl font-semibold">
                        {dive.id === 'ai' && '“Cut a 45-second teaser from the best moments.”'}
                        {dive.id === 'color' && 'Teal &amp; Orange 35mm · Node 04 of 07'}
                        {dive.id === 'collab' && '4 editors online · 12 comments · v14'}
                      </p>
                      <div className="space-y-2">
                        {(dive.id === 'ai'
                          ? ['Scanning 1,284 clips…', 'Selected 23 best takes', 'Assembled 45s rough cut']
                          : dive.id === 'color'
                            ? ['Exposure +0.4', 'Contrast 44', 'Highlight roll-off 62%']
                            : ['Maya O. is cutting V2', 'Sofia M. approved frame 00:04:12', 'Jordan E. created branch “alt-ending”']
                        ).map((line, idx) => (
                          <div
                            key={line}
                            className="flex items-center gap-3 rounded-lg border border-border/60 bg-secondary/30 px-3 py-2"
                          >
                            <span
                              className={cn(
                                'size-2 animate-pulse rounded-full',
                                idx === 0 ? 'bg-brand-cyan' : idx === 1 ? 'bg-brand-violet' : 'bg-brand-magenta',
                              )}
                            />
                            <span className="text-xs text-muted-foreground">{line}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </Reveal>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Old way vs new way */}
      <Section>
        <Reveal>
          <SectionHeading
            eyebrow="Why switch"
            title="The old way is a pile of workarounds"
            description="Everything below is a sentence an editor has actually said out loud. CutForge exists to delete those sentences."
          />
        </Reveal>
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <Reveal variant="left">
            <Card className="h-full border-border/70 bg-card/40">
              <CardContent className="space-y-4">
                <h3 className="font-display text-lg font-semibold text-muted-foreground">
                  The old way
                </h3>
                <ul className="space-y-3">
                  {oldWay.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <X className="mt-0.5 size-4 shrink-0 text-destructive" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </Reveal>

          <Reveal variant="right" delay={80}>
            <Card className="relative h-full overflow-hidden border-primary/50 bg-primary/[0.07]">
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px animate-gradient-pan bg-gradient-to-r from-transparent via-primary to-transparent bg-[length:200%_100%]"
              />
              <CardContent className="space-y-4">
                <h3 className="font-display text-lg font-semibold">With CutForge Studio</h3>
                <ul className="space-y-3">
                  {newWay.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-foreground/90">
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </Section>

      {/* Platform facts */}
      <Section className="pt-0">
        <Reveal variant="scale">
          <div className="rounded-3xl border border-border/70 bg-card/40 p-8 sm:p-10">
            <div className="flex items-center gap-3">
              <Gauge className="size-6 text-primary" aria-hidden="true" />
              <h2 className="font-display text-xl font-semibold">Built for the hardware you already own</h2>
            </div>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {platformFacts.map((fact) => (
                <Badge key={fact} variant="secondary" className="px-3 py-1.5 text-xs">
                  {fact}
                </Badge>
              ))}
            </div>
          </div>
        </Reveal>
      </Section>

      <Section className="pt-0">
        <CtaBand title="See the whole studio for yourself." />
      </Section>
    </SiteLayout>
  );
};

export default Features;