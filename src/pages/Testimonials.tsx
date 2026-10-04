import { useState } from 'react';
import { useSeoMeta } from '@unhead/react';
import { ArrowRight, Quote, Star, TrendingUp } from 'lucide-react';
import { SiteLayout, Section, SectionHeading } from '@/components/site/SiteLayout';
import { TestimonialCard, Stars } from '@/components/site/TestimonialCard';
import { CtaBand } from '@/components/site/CtaBand';
import { Counter, Reveal } from '@/components/site/motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  testimonials,
  testimonialStats,
  testimonialTags,
  type TestimonialTag,
} from '@/data/testimonials';
import { cn } from '@/lib/utils';

const caseStudies = [
  {
    company: 'Northlight Pictures',
    title: 'A 10-episode series delivered in half the time',
    description:
      'A documentary team moved from three-day episode turnarounds to under a day by pairing the AI assembly pass with live collaboration. Same crew, twice the output.',
    metrics: [
      { value: '2×', label: 'episodes per week' },
      { value: '−54%', label: 'post schedule' },
      { value: '10', label: 'editors, one timeline' },
    ],
  },
  {
    company: 'Meridian Studios',
    title: 'Cutting render spend without cutting quality',
    description:
      'A scripted studio consolidated five separate finishing tools into CutForge and moved heavy renders to the cloud queue. Procurement was signed off in a single quarter.',
    metrics: [
      { value: '38%', label: 'lower render cost' },
      { value: '6', label: 'series on one platform' },
      { value: '0', label: 'conform days' },
    ],
  },
  {
    company: 'Theo Vance',
    title: 'One creator, four publishes a week',
    description:
      'A solo channel with 2.1M subscribers publishes four times a week with no team — using multicam, auto captions and automatic vertical reframes in a single pass.',
    metrics: [
      { value: '4×', label: 'output per week' },
      { value: '1', label: 'person team' },
      { value: '12h', label: 'saved weekly' },
    ],
  },
];

const Testimonials = () => {
  const [active, setActive] = useState<TestimonialTag | 'All'>('All');

  useSeoMeta({
    title: 'Testimonials — What Editors Say About CutForge Studio',
    description:
      'Real reviews from film, TV, YouTube, agency and documentary editors. See why 2.4M creators and 18,000 studios trust CutForge Studio for professional video editing.',
  });

  const featured = testimonials.filter((t) => t.featured);
  const visible =
    active === 'All' ? testimonials : testimonials.filter((t) => t.tag === active);
  const spotlight = featured[0];

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative pt-16 pb-10 sm:pt-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="outline" className="mb-5 border-primary/40 bg-primary/10 text-primary">
              <Star className="size-3.5 fill-current" /> 4.9/5 from 12,400 verified reviews
            </Badge>
            <h1 className="font-display text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              Editors do not switch tools lightly.{' '}
              <span className="text-gradient">Here is why they switch to us.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              From Oscar-shortlisted documentaries to million-subscriber channels,
              CutForge Studio is where professionals ship. These are their words,
              not ours.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <Section className="py-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {testimonialStats.map((stat, i) => (
            <Reveal key={stat.label} variant="scale" delay={i * 80} className="h-full">
              <Card className="h-full border-border/70 bg-card/60 text-center transition-colors duration-300 hover:border-primary/40">
                <CardContent className="space-y-1">
                  <p className="font-display text-4xl font-bold text-gradient">
                    <Counter value={Number(stat.value)} suffix={stat.suffix} decimals={stat.decimals} />
                  </p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Spotlight */}
      {spotlight && (
        <Section className="pt-4">
          <Reveal variant="scale">
            <Card className="relative overflow-hidden border-primary/40 bg-primary/[0.06]">
              <div
                aria-hidden="true"
                className="absolute inset-0 animate-aurora bg-[radial-gradient(ellipse_at_top_left,rgba(124,58,237,0.22),transparent_60%)]"
              />
              <CardContent className="relative grid gap-8 py-4 lg:grid-cols-[1.4fr_1fr] lg:items-center">
                <div>
                  <Quote className="size-9 text-primary/50" aria-hidden="true" />
                  <blockquote className="mt-5 font-display text-xl leading-relaxed font-medium text-balance sm:text-2xl">
                    “{spotlight.quote}”
                  </blockquote>
                  <div className="mt-6 flex items-center gap-4">
                    <span
                      aria-hidden="true"
                      className={cn(
                        'grid size-12 place-items-center rounded-full bg-gradient-to-br text-sm font-semibold text-white',
                        spotlight.avatarGradient,
                      )}
                    >
                      {spotlight.initials}
                    </span>
                    <div>
                      <p className="text-sm font-semibold">{spotlight.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {spotlight.role} · {spotlight.company}
                      </p>
                      <Stars rating={spotlight.rating} className="mt-1" />
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                  {[
                    { icon: TrendingUp, value: '2×', label: 'faster episode delivery' },
                    { icon: Star, value: '10', label: 'editors on one timeline' },
                    { icon: Quote, value: '70%', label: 'of the rough cut automated' },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center gap-3 rounded-xl border border-border/60 bg-card/50 px-4 py-3 transition-colors duration-300 hover:border-primary/40"
                    >
                      <item.icon className="size-5 text-primary" aria-hidden="true" />
                      <div>
                        <p className="font-display text-lg font-bold">{item.value}</p>
                        <p className="text-xs text-muted-foreground">{item.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Reveal>
        </Section>
      )}

      {/* Filterable grid */}
      <Section className="border-y border-border/60 bg-card/30">
        <Reveal>
          <SectionHeading
            eyebrow="Success stories"
            title="Filter by the kind of work you do"
            description="Every discipline has different pressures. Find the editors who feel yours."
          />
        </Reveal>

        <div
          className="mt-10 flex flex-wrap justify-center gap-2"
          role="group"
          aria-label="Filter testimonials by category"
        >
          {(['All', ...testimonialTags] as (TestimonialTag | 'All')[]).map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setActive(tag)}
              aria-pressed={active === tag}
              className={cn(
                'rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-300 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none',
                active === tag
                  ? 'border-primary bg-primary/15 text-foreground shadow-md shadow-primary/10'
                  : 'border-border/70 bg-secondary/30 text-muted-foreground hover:border-primary/40 hover:text-foreground',
              )}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((t, i) => (
            <Reveal key={t.id} delay={(i % 3) * 80} className="h-full">
              <TestimonialCard testimonial={t} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Case studies */}
      <Section>
        <Reveal>
          <SectionHeading
            eyebrow="Measured outcomes"
            title="What changes after the switch"
            description="Not vibes — numbers. Here is what teams report within their first quarter on CutForge Studio."
          />
        </Reveal>

        <div className="mt-14 space-y-6">
          {caseStudies.map((study, i) => (
            <Reveal key={study.company} variant={i % 2 === 0 ? 'left' : 'right'} delay={i * 60}>
              <Card className="overflow-hidden border-border/70 bg-card/60 transition-colors duration-300 hover:border-primary/40">
                <CardContent className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-center">
                  <div>
                    <Badge variant="secondary" className="mb-3">
                      {study.company}
                    </Badge>
                    <h3 className="font-display text-xl font-semibold text-balance sm:text-2xl">
                      {study.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {study.description}
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {study.metrics.map((metric) => (
                      <div
                        key={metric.label}
                        className="rounded-xl border border-border/60 bg-secondary/30 p-4 text-center"
                      >
                        <p className="font-display text-2xl font-bold text-gradient">
                          {metric.value}
                        </p>
                        <p className="mt-1 text-[11px] leading-tight text-muted-foreground">
                          {metric.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>

        <Reveal delay={80} className="mt-10 flex justify-center">
          <Button size="lg" variant="outline" asChild>
            <a href="/#download">
              Join them — download free <ArrowRight />
            </a>
          </Button>
        </Reveal>
      </Section>

      <Section className="pt-0">
        <CtaBand title="Write your own success story." />
      </Section>
    </SiteLayout>
  );
};

export default Testimonials;