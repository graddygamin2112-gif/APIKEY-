import { useState } from 'react';
import { useSeoMeta } from '@unhead/react';
import {
  Check,
  Minus,
  Sparkles,
  ShieldCheck,
  CreditCard,
  GraduationCap,
  Building2,
  RefreshCw,
} from 'lucide-react';
import { SiteLayout, Section, SectionHeading } from '@/components/site/SiteLayout';
import { PricingCard, SpecValue } from '@/components/site/PricingCard';
import { BillingToggle } from '@/components/site/BillingToggle';
import { CtaBand } from '@/components/site/CtaBand';
import { Reveal } from '@/components/site/motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { plans, pricingFaqs } from '@/data/pricing';

const trustPoints = [
  { icon: RefreshCw, label: 'Cancel anytime, prorated to the day' },
  { icon: CreditCard, label: 'No credit card for the free plan' },
  { icon: ShieldCheck, label: 'SOC 2 Type II · GDPR compliant' },
  { icon: GraduationCap, label: '60% student & educator discount' },
];

const addOns = [
  {
    icon: GraduationCap,
    title: 'Education',
    price: '60% off',
    description:
      'Verified students, educators and non-profits get the Creator plan at 60% off, plus free classroom seats.',
  },
  {
    icon: Building2,
    title: 'Enterprise',
    price: 'Custom',
    description:
      'SSO/SAML, pooled storage, region pinning, procurement and invoicing, audit logs and a named success manager.',
  },
  {
    icon: Sparkles,
    title: 'Cloud Render',
    price: 'From $9/mo',
    description:
      'Offload heavy renders and AI jobs to our GPUs on demand. Billed per minute with generous free credits.',
  },
];

const Pricing = () => {
  const [annual, setAnnual] = useState(true);

  useSeoMeta({
    title: 'Pricing — CutForge Studio Video Editing Software',
    description:
      'Simple CutForge Studio pricing. Start free forever, or unlock unlimited AI, 6K/8K delivery, cloud collaboration and team controls from $23/month. Compare every plan.',
  });

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative pt-16 pb-10 sm:pt-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal variant="fade">
              <Badge variant="outline" className="mb-5 border-primary/40 bg-primary/10 text-primary">
                <Sparkles className="size-3.5" /> 14-day Creator trial on every download
              </Badge>
            </Reveal>
            <Reveal delay={60}>
              <h1 className="font-display text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
                Start free. <span className="text-gradient-animate">Scale when you ship.</span>
              </h1>
            </Reveal>
            <Reveal delay={120}>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                Every plan includes the complete editing engine — the 8K timeline, the
                AI assistant, the color suite. Paid plans unlock watermark-free
                delivery, unlimited AI and real team collaboration.
              </p>
            </Reveal>

            <Reveal delay={180} variant="scale" className="mt-8 flex justify-center">
              <BillingToggle annual={annual} onChange={setAnnual} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Plan cards */}
      <Section className="pt-4">
        <div className="grid gap-6 lg:grid-cols-3 lg:items-stretch">
          {plans.map((plan, i) => (
            <Reveal key={plan.id} variant="scale" delay={i * 110} className="h-full">
              <PricingCard plan={plan} annual={annual} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={80}>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {trustPoints.map((point) => (
              <div
                key={point.label}
                className="flex items-center gap-2.5 rounded-xl border border-border/70 bg-card/40 px-4 py-3 transition-colors duration-300 hover:border-primary/40"
              >
                <point.icon className="size-4 shrink-0 text-primary" aria-hidden="true" />
                <span className="text-xs text-muted-foreground">{point.label}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* Comparison table */}
      <Section className="border-y border-border/60 bg-card/30">
        <Reveal>
          <SectionHeading
            eyebrow="Full comparison"
            title="Compare every plan, line by line"
            description="No hidden tiers, no feature gates you discover later. Here is exactly what each plan includes."
          />
        </Reveal>

        <Reveal variant="scale" delay={80} className="mt-12">
          <div className="overflow-hidden rounded-2xl border border-border/70 bg-card/50">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="min-w-[13rem] py-4 text-sm">Feature</TableHead>
                  {plans.map((plan) => (
                    <TableHead key={plan.id} className="min-w-[9rem] py-4 text-center text-sm">
                      <div className="flex flex-col items-center gap-1">
                        <span className="font-display text-base font-semibold text-foreground">
                          {plan.name}
                        </span>
                        <span className="text-xs font-normal text-muted-foreground">
                          ${annual ? plan.annual : plan.monthly}/mo
                        </span>
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {plans[0].specs.map((spec, index) => (
                  <TableRow key={spec.label} className={index % 2 === 1 ? 'bg-secondary/10' : undefined}>
                    <TableCell className="py-3.5 text-sm font-medium">{spec.label}</TableCell>
                    {plans.map((plan) => (
                      <TableCell key={plan.id} className="text-center">
                        <span className="inline-flex justify-center">
                          <SpecValue value={plan.specs[index].included} />
                        </span>
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
                <TableRow className="hover:bg-transparent">
                  <TableCell className="py-5" />
                  {plans.map((plan) => (
                    <TableCell key={plan.id} className="py-5 text-center">
                      <Button
                        variant={plan.featured ? 'default' : 'outline'}
                        size="sm"
                        onClick={() =>
                          document.getElementById('final-cta')?.scrollIntoView({ behavior: 'smooth' })
                        }
                      >
                        {plan.cta}
                      </Button>
                    </TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </Reveal>
      </Section>

      {/* Add-ons / specialty plans */}
      <Section>
        <Reveal>
          <SectionHeading
            eyebrow="Beyond the plans"
            title="Special programs and add-ons"
            description="Something more specific? We almost certainly have a program for it."
          />
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {addOns.map((item, i) => (
            <Reveal key={item.title} delay={i * 90} className="h-full">
              <Card className="h-full border-border/70 bg-card/60 transition-colors duration-300 hover:border-primary/40">
                <CardContent className="space-y-3">
                  <span className="grid size-11 place-items-center rounded-xl bg-primary/12 text-primary ring-1 ring-primary/20">
                    <item.icon className="size-5" />
                  </span>
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="font-display text-lg font-semibold">{item.title}</h3>
                    <span className="text-sm font-semibold text-brand-cyan">{item.price}</span>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section className="border-t border-border/60">
        <Reveal>
          <SectionHeading
            eyebrow="Questions"
            title="Everything you might be wondering"
            description="Still unsure? Our team answers every message, usually within a few hours."
          />
        </Reveal>
        <Reveal delay={80} className="mx-auto mt-12 max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {pricingFaqs.map((faq, i) => (
              <AccordionItem key={faq.question} value={`faq-${i}`}>
                <AccordionTrigger className="font-display text-base font-semibold hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <Check className="size-4 text-primary" /> 30-day money-back guarantee
            </span>
            <span className="flex items-center gap-2">
              <Minus className="size-4 text-primary" /> No setup fees, ever
            </span>
          </div>
        </Reveal>
      </Section>

      <Section id="final-cta" className="pt-0">
        <CtaBand
          title="Try the full Studio plan free for 14 days."
          description="Every download includes a 14-day Creator trial — unlimited AI, watermark-free 6K delivery and cloud collaboration. No credit card required."
        />
      </Section>
    </SiteLayout>
  );
};

export default Pricing;