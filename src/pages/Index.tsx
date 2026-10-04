import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSeoMeta } from '@unhead/react';
import {
  ArrowRight,
  Check,
  Download,
  Gauge,
  Play,
  Sparkles,
  Star,
  Users,
  Palette,
  Zap,
  ShieldCheck,
} from 'lucide-react';
import { SiteLayout, Section, SectionHeading, Eyebrow } from '@/components/site/SiteLayout';
import { EditorMockup } from '@/components/site/EditorMockup';
import { TestimonialCard } from '@/components/site/TestimonialCard';
import { PricingCard } from '@/components/site/PricingCard';
import { BillingToggle } from '@/components/site/BillingToggle';
import { CtaBand, LogoStrip } from '@/components/site/CtaBand';
import { useDownload } from '@/components/site/DownloadDialog';
import { Counter, Magnetic, Parallax, Reveal, TiltCard } from '@/components/site/motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { features } from '@/data/features';
import { testimonials, trustedBy } from '@/data/testimonials';
import { plans } from '@/data/pricing';
import { tutorials } from '@/data/tutorials';

const rotatingWords = ['faster.', 'smarter.', 'together.', 'at 8K.', 'everywhere.'];

const heroStats = [
  { icon: Gauge, value: 8, decimals: 0, suffix: 'K/120', label: 'real-time playback' },
  { icon: Users, value: 2.4, decimals: 1, suffix: 'M+', label: 'editors worldwide' },
  { icon: Palette, value: 240, decimals: 0, suffix: '+', label: 'color presets' },
];

const workflowSteps = [
  {
    step: '01',
    title: 'Ingest anything',
    description:
      'Drop in cameras, phones, drones, screen recordings and cloud links. CutForge reads every codec natively and starts smart proxies in the background.',
  },
  {
    step: '02',
    title: 'Cut with an AI partner',
    description:
      'Describe the story you want. The assistant assembles a first pass from your best takes, then you refine it on a timeline that never stutters.',
  },
  {
    step: '03',
    title: 'Grade, mix and finish',
    description:
      'Cinema color, broadcast audio and motion graphics live in the same project, so there are no conform days and no version chaos.',
  },
  {
    step: '04',
    title: 'Deliver everywhere at once',
    description:
      'One click produces every aspect ratio, codec and platform spec — and publishes directly with metadata, chapters and thumbnails intact.',
  },
];

const differentiators = [
  {
    icon: Zap,
    title: 'No proxies. No render bar.',
    description:
      'Our compositing core is GPU-native from the ground up, so scrubbing 8K multicam feels like scrubbing a text file.',
  },
  {
    icon: Sparkles,
    title: 'AI that respects the craft',
    description:
      'The assistant proposes an edit you can take apart. It accelerates the boring 70% so you can obsess over the story.',
  },
  {
    icon: ShieldCheck,
    title: 'Your cuts stay yours',
    description:
      'End-to-end encryption, SOC 2 Type II, and a promise: we never train models on your footage. Ever.',
  },
];

const Home = () => {
  const { open } = useDownload();
  const [wordIndex, setWordIndex] = useState(0);
  const [annual, setAnnual] = useState(true);

  useSeoMeta({
    title: 'CutForge Studio — Professional Video Editing at 8K, Real Time',
    description:
      'CutForge Studio is the professional video editing software with a zero-lag 8K timeline, a genuine AI editing assistant, cinema color, broadcast audio and one-click delivery to every platform. Download free.',
  });

  useEffect(() => {
    const id = window.setInterval(() => {
      setWordIndex((i) => (i + 1) % rotatingWords.length);
    }, 2400);
    return () => window.clearInterval(id);
  }, []);

  const featuredTestimonials = testimonials.filter((t) => t.featured).slice(0, 3);
  const featuredTutorials = tutorials.filter((t) => t.featured).slice(0, 3);
  const homeFeatures = features.slice(0, 6);

  return (
    <SiteLayout>
      {/* ───────────────────────── Hero ───────────────────────── */}
      <section className="relative pt-16 pb-8 sm:pt-24">
        <div className="container">
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
            <div className="flex flex-col items-start">
              <Reveal variant="fade">
                <Eyebrow>Version 6 · Real-time 8K</Eyebrow>
              </Reveal>

              <Reveal delay={60}>
                <h1 className="mt-6 font-display text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl lg:leading-[1.05]">
                  The video editor that thinks{' '}
                  <span className="relative inline-block">
                    <span
                      key={wordIndex}
                      className="text-gradient-animate inline-block animate-in fade-in slide-in-from-bottom-2 duration-500"
                    >
                      {rotatingWords[wordIndex]}
                    </span>
                  </span>
                </h1>
              </Reveal>

              <Reveal delay={120}>
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
                  CutForge Studio pairs a zero-lag 8K timeline with an AI collaborator
                  that understands story — plus cinema color, broadcast audio and
                  one-click delivery to every platform. All in one project.
                </p>
              </Reveal>

              <Reveal delay={180}>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Magnetic strength={8}>
                    <Button size="lg" className="shadow-lg shadow-primary/25" onClick={() => open()}>
                      <Download />
                      Download free
                    </Button>
                  </Magnetic>
                  <Button size="lg" variant="outline" asChild>
                    <Link to="/tutorials">
                      <Play />
                      Watch it in action
                    </Link>
                  </Button>
                </div>
              </Reveal>

              <Reveal delay={240}>
                <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Check className="size-4 text-primary" /> Free forever plan
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Check className="size-4 text-primary" /> No credit card
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Star className="size-4 fill-amber-400 text-amber-400" /> 4.9/5 from 12,400 reviews
                  </span>
                </div>
              </Reveal>

              <Reveal delay={300} className="mt-10 w-full">
                <dl className="grid w-full grid-cols-3 gap-4 border-t border-border/60 pt-6">
                  {heroStats.map((stat) => (
                    <div key={stat.label} className="flex flex-col gap-1">
                      <stat.icon className="size-4 text-primary" aria-hidden="true" />
                      <dt className="font-display text-xl font-bold sm:text-2xl">
                        <Counter value={stat.value} suffix={stat.suffix} decimals={stat.decimals ?? 0} />
                      </dt>
                      <dd className="text-xs leading-tight text-muted-foreground">{stat.label}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>

            <Reveal variant="scale" delay={120} className="relative">
              <div
                aria-hidden="true"
                className="absolute -inset-6 -z-10 animate-glow-pulse rounded-[2rem] bg-gradient-to-br from-brand-violet/25 via-transparent to-brand-cyan/20 blur-2xl"
              />
              <Parallax speed={0.06}>
                <EditorMockup />
              </Parallax>
              <p className="mt-3 text-center text-xs text-muted-foreground">
                Live preview — the real CutForge timeline, mocked in your browser
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───────────────────────── Logos ───────────────────────── */}
      <Section className="py-14 sm:py-16">
        <Reveal variant="fade">
          <LogoStrip items={trustedBy} />
        </Reveal>
      </Section>

      {/* ───────────────────────── Feature grid ───────────────────────── */}
      <Section id="features" className="pt-4">
        <Reveal>
          <SectionHeading
            eyebrow="Everything in one studio"
            title={
              <>
                Trim the busywork. Keep the{' '}
                <span className="text-gradient-animate">craft.</span>
              </>
            }
            description="Twelve deeply integrated toolsets replace a stack of five apps — so your project, your media and your team stay in one place from first import to final delivery."
          />
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {homeFeatures.map((feature, i) => (
            <Reveal key={feature.id} delay={i * 70} className="h-full">
              <TiltCard className="h-full [&>div]:h-full">
                <Card className="h-full border-border/70 bg-card/60 transition-colors duration-300 hover:border-primary/40">
                  <CardContent className="flex flex-col gap-4">
                    <span className="grid size-11 place-items-center rounded-xl bg-primary/12 text-primary ring-1 ring-primary/20 transition-colors group-hover/tilt:bg-primary/20">
                      <feature.icon className="size-5" />
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-semibold">{feature.title}</h3>
                      <p className="mt-1 text-sm font-medium text-brand-cyan">{feature.tagline}</p>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
                    <ul className="mt-1 space-y-1.5">
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

        <Reveal delay={80} className="mt-10 flex justify-center">
          <Button size="lg" variant="outline" asChild>
            <Link to="/features">
              Explore all features
              <ArrowRight />
            </Link>
          </Button>
        </Reveal>
      </Section>

      {/* ───────────────────────── Workflow ───────────────────────── */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <Reveal>
              <SectionHeading
                align="left"
                eyebrow="From card to canvas"
                title="A workflow that never makes you wait"
                description="Four steps, zero hand-offs. No round-trips between apps, no relinking media, no conform. Just the edit."
              />
            </Reveal>
            <div className="mt-10 space-y-8">
              {workflowSteps.map((step, i) => (
                <Reveal key={step.step} variant="left" delay={i * 80}>
                  <div className="flex gap-5">
                    <span className="font-display text-2xl font-bold text-gradient">{step.step}</span>
                    <div>
                      <h3 className="font-display text-lg font-semibold">{step.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="grid gap-5">
            {differentiators.map((item, i) => (
              <Reveal key={item.title} variant="right" delay={i * 90}>
                <Card className="border-border/70 bg-card/60 transition-colors duration-300 hover:border-primary/40">
                  <CardContent className="flex gap-4">
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-cyan/12 text-brand-cyan ring-1 ring-brand-cyan/20">
                      <item.icon className="size-5" />
                    </span>
                    <div>
                      <h3 className="font-display text-base font-semibold">{item.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* ───────────────────────── Testimonials ───────────────────────── */}
      <Section className="border-y border-border/60 bg-card/30">
        <Reveal>
          <SectionHeading
            eyebrow="Loved by editors"
            title="The people who ship every day trust CutForge"
            description="From one-person channels to six-series studio slates — here is what happens when the editing software finally keeps up."
          />
        </Reveal>
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featuredTestimonials.map((t, i) => (
            <Reveal key={t.id} delay={i * 90} className="h-full">
              <TestimonialCard testimonial={t} />
            </Reveal>
          ))}
        </div>
        <Reveal delay={80} className="mt-10 flex justify-center">
          <Button size="lg" variant="outline" asChild>
            <Link to="/testimonials">
              Read all success stories
              <ArrowRight />
            </Link>
          </Button>
        </Reveal>
      </Section>

      {/* ───────────────────────── Pricing ───────────────────────── */}
      <Section id="pricing">
        <Reveal>
          <SectionHeading
            eyebrow="Simple pricing"
            title="Start free. Upgrade when you outgrow it."
            description="Every plan includes the full editing engine. Paid plans unlock watermark-free delivery, unlimited AI and cloud collaboration."
          />
        </Reveal>
        <Reveal delay={80} className="mt-8 flex justify-center">
          <BillingToggle annual={annual} onChange={setAnnual} />
        </Reveal>
        <div className="mt-12 grid gap-6 lg:grid-cols-3 lg:items-stretch">
          {plans.map((plan, i) => (
            <Reveal key={plan.id} variant="scale" delay={i * 110} className="h-full">
              <PricingCard plan={plan} annual={annual} />
            </Reveal>
          ))}
        </div>
        <Reveal delay={80}>
          <p className="mt-8 text-center text-sm text-muted-foreground">
            Need something custom?{' '}
            <Link to="/pricing" className="font-medium text-foreground underline decoration-primary/50 underline-offset-4 hover:decoration-primary">
              Compare every plan in detail
            </Link>
            .
          </p>
        </Reveal>
      </Section>

      {/* ───────────────────────── Tutorials teaser ───────────────────────── */}
      <Section className="border-y border-border/60 bg-card/30">
        <Reveal>
          <SectionHeading
            eyebrow="Learn in minutes"
            title="Free tutorials for every level"
            description="Short, focused lessons from working editors. Start with the Foundations course and you will be exporting your first project today."
          />
        </Reveal>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {featuredTutorials.map((tutorial, i) => (
            <Reveal key={tutorial.id} delay={i * 90} className="h-full">
              <Link to="/tutorials" className="group block h-full">
                <Card className="h-full overflow-hidden border-border/70 bg-card/60 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-primary/40">
                  <div className={cn('relative aspect-video overflow-hidden bg-gradient-to-br', tutorial.thumbGradient)}>
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.28),transparent_55%)] transition-transform duration-500 group-hover:scale-105" />
                    <span className="absolute inset-0 grid place-items-center">
                      <span className="grid size-12 place-items-center rounded-full bg-black/40 text-white backdrop-blur transition-transform duration-300 group-hover:scale-110">
                        <Play className="size-5 fill-current" />
                      </span>
                    </span>
                    <Badge className="absolute top-3 left-3 bg-black/50 text-white backdrop-blur">
                      {tutorial.level}
                    </Badge>
                    <span className="absolute right-3 bottom-3 rounded bg-black/50 px-2 py-1 text-[10px] font-medium text-white backdrop-blur">
                      {tutorial.duration}
                    </span>
                  </div>
                  <CardContent className="space-y-2 pt-5">
                    <p className="text-xs font-semibold tracking-wide text-brand-cyan uppercase">
                      {tutorial.category}
                    </p>
                    <h3 className="font-display text-lg font-semibold">{tutorial.title}</h3>
                    <p className="line-clamp-2 text-sm text-muted-foreground">{tutorial.description}</p>
                  </CardContent>
                </Card>
              </Link>
            </Reveal>
          ))}
        </div>
        <Reveal delay={80} className="mt-10 flex justify-center">
          <Button size="lg" variant="outline" asChild>
            <Link to="/tutorials">
              Browse all tutorials
              <ArrowRight />
            </Link>
          </Button>
        </Reveal>
      </Section>

      {/* ───────────────────────── Final CTA ───────────────────────── */}
      <Section id="download">
        <CtaBand />
      </Section>
    </SiteLayout>
  );
};

export default Home;