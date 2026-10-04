export interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  monthly: number;
  annual: number; // effective per-month price when billed annually
  featured?: boolean;
  cta: string;
  badge?: string;
  highlights: string[];
  /** Full feature matrix for the comparison table */
  specs: {
    label: string;
    included: boolean | string;
  }[];
}

export const plans: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Solo',
    tagline: 'For creators finding their voice.',
    monthly: 0,
    annual: 0,
    cta: 'Download free',
    highlights: [
      'Full editing timeline',
      '1080p export with watermark',
      '50GB cloud bins',
      'Access to all tutorials',
    ],
    specs: [
      { label: 'Timeline & editing', included: true },
      { label: 'AI editing assistant', included: '25 runs / mo' },
      { label: 'Color suite', included: 'Core tools' },
      { label: 'Motion & VFX', included: 'Essentials' },
      { label: 'Collaboration seats', included: '1' },
      { label: 'Cloud storage', included: '50GB' },
      { label: 'Max export', included: '1080p' },
      { label: 'Watermark-free', included: false },
      { label: 'Priority render queue', included: false },
      { label: 'SSO / admin controls', included: false },
    ],
  },
  {
    id: 'creator',
    name: 'Creator',
    tagline: 'For professional editors shipping weekly.',
    monthly: 29,
    annual: 23,
    featured: true,
    badge: 'Most popular',
    cta: 'Start 14-day trial',
    highlights: [
      'No watermarks, 4K & 6K export',
      'Unlimited AI assistant',
      '1TB cloud bins + smart sync',
      'Full color, audio & VFX suite',
      '3 collaboration seats',
    ],
    specs: [
      { label: 'Timeline & editing', included: true },
      { label: 'AI editing assistant', included: 'Unlimited' },
      { label: 'Color suite', included: 'Full + ACES' },
      { label: 'Motion & VFX', included: 'Complete' },
      { label: 'Collaboration seats', included: '3' },
      { label: 'Cloud storage', included: '1TB' },
      { label: 'Max export', included: '6K' },
      { label: 'Watermark-free', included: true },
      { label: 'Priority render queue', included: true },
      { label: 'SSO / admin controls', included: false },
    ],
  },
  {
    id: 'studio',
    name: 'Studio',
    tagline: 'For teams and production houses.',
    monthly: 79,
    annual: 63,
    cta: 'Talk to sales',
    highlights: [
      '8K & HDR deliverable pipeline',
      '10 collaboration seats included',
      '5TB pooled team storage',
      'SSO/SAML + audit logs',
      'Dedicated success manager',
    ],
    specs: [
      { label: 'Timeline & editing', included: true },
      { label: 'AI editing assistant', included: 'Unlimited' },
      { label: 'Color suite', included: 'Full + ACES' },
      { label: 'Motion & VFX', included: 'Complete' },
      { label: 'Collaboration seats', included: '10' },
      { label: 'Cloud storage', included: '5TB pooled' },
      { label: 'Max export', included: '8K HDR' },
      { label: 'Watermark-free', included: true },
      { label: 'Priority render queue', included: 'Dedicated' },
      { label: 'SSO / admin controls', included: true },
    ],
  },
];

export const pricingFaqs = [
  {
    question: 'Can I switch plans later?',
    answer:
      'Absolutely. Upgrade, downgrade or cancel at any time from your account page. Changes are prorated to the day, so you only ever pay for what you use.',
  },
  {
    question: 'Do I need a powerful machine to run CutForge?',
    answer:
      'CutForge runs comfortably on any machine from the last five years. If your hardware is older, Cloud Render offloads heavy renders and AI jobs to our GPUs so your editor stays responsive.',
  },
  {
    question: 'What happens to my projects if I cancel?',
    answer:
      'Your projects remain yours forever. You keep full read and export access to everything in your cloud bins for 12 months, and you can download your entire library as an archive any time.',
  },
  {
    question: 'Is there a discount for students or educators?',
    answer:
      'Yes — verified students, educators and non-profits get 60% off the Creator plan. Apply through the verification portal and the discount is applied instantly.',
  },
  {
    question: 'Do you offer team or enterprise agreements?',
    answer:
      'The Studio plan scales from 2 to 5,000 seats with pooled storage, SSO/SAML, granular permissions, audit logging and a named success manager. Custom procurement and invoicing are available.',
  },
  {
    question: 'Do you train AI models on my footage?',
    answer:
      'Never. Your media is private by default, encrypted end-to-end, and is never used to train any model. Enterprise customers can pin their data to a specific region.',
  },
];