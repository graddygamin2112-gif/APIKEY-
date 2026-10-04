import { useMemo, useState } from 'react';
import { useSeoMeta } from '@unhead/react';
import {
  Play,
  Clock,
  BookOpen,
  GraduationCap,
  Route,
  Search,
  X,
  ArrowRight,
  Signal,
} from 'lucide-react';
import { SiteLayout, Section, SectionHeading } from '@/components/site/SiteLayout';
import { CtaBand } from '@/components/site/CtaBand';
import { Counter, Magnetic, Reveal, TiltCard } from '@/components/site/motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useDownload } from '@/components/site/DownloadDialog';
import {
  tutorials,
  tutorialCategories,
  learningPaths,
  type TutorialCategory,
} from '@/data/tutorials';
import { cn } from '@/lib/utils';

const levels = ['Beginner', 'Intermediate', 'Advanced'] as const;

const levelStyles: Record<(typeof levels)[number], string> = {
  Beginner: 'bg-emerald-500/15 text-emerald-400',
  Intermediate: 'bg-amber-500/15 text-amber-400',
  Advanced: 'bg-rose-500/15 text-rose-400',
};

const Tutorials = () => {
  const { open } = useDownload();
  const [category, setCategory] = useState<TutorialCategory | 'All'>('All');
  const [level, setLevel] = useState<(typeof levels)[number] | 'All'>('All');
  const [query, setQuery] = useState('');

  useSeoMeta({
    title: 'Tutorials — Learn CutForge Studio Video Editing',
    description:
      'Free CutForge Studio tutorials and learning paths. Learn the timeline, AI editing, cinematic color, audio repair, motion tracking and HDR delivery from working editors.',
  });

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tutorials.filter((t) => {
      if (category !== 'All' && t.category !== category) return false;
      if (level !== 'All' && t.level !== level) return false;
      if (!q) return true;
      return (
        t.title.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.topics.some((topic) => topic.toLowerCase().includes(q))
      );
    });
  }, [category, level, query]);

  const isFiltered = category !== 'All' || level !== 'All' || query.trim() !== '';

  const reset = () => {
    setCategory('All');
    setLevel('All');
    setQuery('');
  };

  const totalDuration = tutorials.reduce((acc, t) => {
    const minutes = t.duration.includes('h')
      ? parseInt(t.duration.split('h')[0]) * 60 + parseInt(t.duration.split('h')[1].replace(/[^0-9]/g, '') || '0')
      : parseInt(t.duration);
    return acc + minutes;
  }, 0);

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative pt-16 pb-10 sm:pt-24">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            <div>
              <Reveal variant="fade">
                <Badge variant="outline" className="mb-5 border-primary/40 bg-primary/10 text-primary">
                  <GraduationCap className="size-3.5" /> {tutorials.length} courses · free forever
                </Badge>
              </Reveal>
              <Reveal delay={60}>
                <h1 className="font-display text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
                  Learn the craft.{' '}
                  <span className="text-gradient-animate">Borrow the shortcuts.</span>
                </h1>
              </Reveal>
              <Reveal delay={120}>
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
                  Short, focused lessons from working editors — not 40-minute rambles.
                  Whether you are cutting your first vlog or grading a festival
                  feature, there is a path built for exactly where you are.
                </p>
              </Reveal>
              <Reveal delay={180}>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Magnetic strength={8}>
                    <Button size="lg" className="shadow-lg shadow-primary/20" onClick={() => open()}>
                      Download free &amp; start
                    </Button>
                  </Magnetic>
                  <Button size="lg" variant="outline" asChild>
                    <a href="#library">
                      <BookOpen />
                      Browse the library
                    </a>
                  </Button>
                </div>
              </Reveal>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: BookOpen, value: tutorials.length, suffix: '', label: 'structured courses' },
                { icon: Play, value: tutorials.reduce((a, t) => a + t.lessons, 0), suffix: '', label: 'bite-sized lessons' },
                { icon: Clock, value: Math.round(totalDuration / 60), suffix: 'h', label: 'of free training' },
                { icon: Route, value: learningPaths.length, suffix: '', label: 'guided learning paths' },
              ].map((stat, i) => (
                <Reveal key={stat.label} variant="scale" delay={i * 80} className="h-full">
                  <Card className="h-full border-border/70 bg-card/60 transition-colors duration-300 hover:border-primary/40">
                    <CardContent className="space-y-1.5">
                      <stat.icon className="size-5 text-primary" aria-hidden="true" />
                      <p className="font-display text-2xl font-bold">
                        <Counter value={stat.value} suffix={stat.suffix} />
                      </p>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                    </CardContent>
                  </Card>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Learning paths */}
      <Section className="border-y border-border/60 bg-card/30 py-14">
        <Reveal>
          <SectionHeading
            eyebrow="Guided paths"
            title="Not sure where to start?"
            description="Pick the path that matches your work and follow it in order. Each one ends with a finished, publishable project."
          />
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {learningPaths.map((path, i) => (
            <Reveal key={path.title} delay={i * 90} className="h-full">
              <Card className="group h-full overflow-hidden border-border/70 bg-card/60 transition-colors duration-300 hover:border-primary/40">
                <div className={cn('h-1.5 w-full bg-gradient-to-r', path.gradient)} />
                <CardContent className="space-y-4 pt-2">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-display text-lg font-semibold">{path.title}</h3>
                    <Badge variant="secondary" className="text-[11px]">
                      {path.duration}
                    </Badge>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">{path.description}</p>
                  <ol className="space-y-2">
                    {path.steps.map((step, idx) => (
                      <li key={step} className="flex items-start gap-2.5 text-sm">
                        <span className="grid size-5 shrink-0 place-items-center rounded-full bg-primary/15 text-[10px] font-bold text-primary transition-colors group-hover:bg-primary/25">
                          {idx + 1}
                        </span>
                        <span className="text-foreground/90">{step}</span>
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Library */}
      <Section id="library">
        <Reveal>
          <SectionHeading
            eyebrow="Course library"
            title="Every course, all in one place"
            description="Filter by discipline or difficulty. Search by topic, tool or technique."
          />
        </Reveal>

        {/* Search + filters */}
        <div className="mt-10 space-y-5">
          <div className="relative mx-auto max-w-md">
            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <Input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search tutorials, topics, techniques…"
              aria-label="Search tutorials"
              className="pl-9"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Filter by category">
            {(['All', ...tutorialCategories] as (TutorialCategory | 'All')[]).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                aria-pressed={category === cat}
                className={cn(
                  'rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-300 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none',
                  category === cat
                    ? 'border-primary bg-primary/15 text-foreground shadow-md shadow-primary/10'
                    : 'border-border/70 bg-secondary/30 text-muted-foreground hover:border-primary/40 hover:text-foreground',
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <Signal className="size-3.5" /> Level:
            </span>
            {(['All', ...levels] as const).map((lvl) => (
              <button
                key={lvl}
                type="button"
                onClick={() => setLevel(lvl)}
                aria-pressed={level === lvl}
                className={cn(
                  'rounded-full border px-3 py-1 text-xs font-medium transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none',
                  level === lvl
                    ? 'border-primary/60 bg-primary/15 text-foreground'
                    : 'border-border/70 bg-secondary/20 text-muted-foreground hover:text-foreground',
                )}
              >
                {lvl}
              </button>
            ))}

            {isFiltered && (
              <Button variant="ghost" size="xs" onClick={reset} className="ml-1 text-muted-foreground">
                <X /> Clear
              </Button>
            )}
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground" aria-live="polite">
          Showing {visible.length} of {tutorials.length} courses
        </p>

        {/* Grid */}
        {visible.length > 0 ? (
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {visible.map((tutorial, i) => (
              <Reveal key={tutorial.id} delay={(i % 3) * 70} className="h-full">
                <TiltCard className="h-full [&>div]:h-full">
                  <Card className="group flex h-full flex-col overflow-hidden border-border/70 bg-card/60 transition-colors duration-300 hover:border-primary/40">
                    <div className={cn('relative aspect-video overflow-hidden bg-gradient-to-br', tutorial.thumbGradient)}>
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.25),transparent_55%)] transition-transform duration-500 group-hover/tilt:scale-105" />
                      <span className="absolute inset-0 grid place-items-center">
                        <span className="grid size-12 place-items-center rounded-full bg-black/40 text-white backdrop-blur transition-transform duration-300 group-hover/tilt:scale-110">
                          <Play className="size-5 fill-current" />
                        </span>
                      </span>
                      <span
                        className={cn(
                          'absolute top-3 left-3 rounded-full px-2.5 py-1 text-[10px] font-semibold backdrop-blur',
                          levelStyles[tutorial.level],
                        )}
                      >
                        {tutorial.level}
                      </span>
                      <span className="absolute right-3 bottom-3 flex items-center gap-1 rounded bg-black/50 px-2 py-1 text-[10px] font-medium text-white backdrop-blur">
                        <Clock className="size-3" /> {tutorial.duration}
                      </span>
                    </div>

                    <CardContent className="flex flex-1 flex-col gap-3 pt-5">
                      <p className="text-xs font-semibold tracking-wide text-brand-cyan uppercase">
                        {tutorial.category}
                      </p>
                      <h3 className="font-display text-lg font-semibold">{tutorial.title}</h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {tutorial.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5">
                        {tutorial.topics.slice(0, 3).map((topic) => (
                          <Badge key={topic} variant="outline" className="text-[10px] text-muted-foreground">
                            {topic}
                          </Badge>
                        ))}
                      </div>

                      <div className="mt-auto flex items-center gap-3 border-t border-border/60 pt-4">
                        <span
                          aria-hidden="true"
                          className={cn(
                            'grid size-9 shrink-0 place-items-center rounded-full bg-gradient-to-br text-[11px] font-semibold text-white',
                            tutorial.avatarGradient,
                          )}
                        >
                          {tutorial.initials}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-xs font-medium">{tutorial.instructor}</p>
                          <p className="text-[11px] text-muted-foreground">
                            {tutorial.lessons} lessons · {tutorial.duration}
                          </p>
                        </div>
                        <Button
                          size="icon-sm"
                          variant="ghost"
                          aria-label={`Start ${tutorial.title}`}
                          className="text-primary group-hover/tilt:bg-primary/15"
                        >
                          <ArrowRight />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        ) : (
          <Card className="mt-8 border-dashed">
            <CardContent className="px-8 py-12 text-center">
              <p className="mx-auto max-w-sm text-muted-foreground">
                No tutorials match those filters yet. Try a different topic or clear
                the filters to see the full library.
              </p>
              <Button variant="outline" size="sm" className="mt-5" onClick={reset}>
                <X /> Clear filters
              </Button>
            </CardContent>
          </Card>
        )}
      </Section>

      <Section className="pt-0">
        <CtaBand
          title="Download the software, follow along as you go."
          description="Every tutorial uses the free Solo plan and sample footage you can download right now. No credit card, no setup."
        />
      </Section>
    </SiteLayout>
  );
};

export default Tutorials;