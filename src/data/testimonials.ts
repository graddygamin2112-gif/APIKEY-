export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  project: string;
  rating: number;
  /** Tailwind gradient classes for the generated avatar */
  avatarGradient: string;
  initials: string;
  featured?: boolean;
  metric?: { value: string; label: string };
  tag: TestimonialTag;
}

export type TestimonialTag =
  | 'Film & TV'
  | 'YouTube'
  | 'Agency'
  | 'Documentary'
  | 'Music Video'
  | 'Sports'
  | 'Corporate'
  | 'Social';

export const testimonialTags: TestimonialTag[] = [
  'Film & TV',
  'YouTube',
  'Agency',
  'Documentary',
  'Music Video',
  'Sports',
  'Corporate',
  'Social',
];

export const testimonials: Testimonial[] = [
  {
    id: 'maya',
    quote:
      'CutForge collapsed our post schedule by half. We were cutting a 10-episode doc series on a timeline that used to take a full team a week per episode. The AI assembly gets us 70% of the way there before the first coffee.',
    name: 'Maya Okonkwo',
    role: 'Supervising Editor',
    company: 'Northlight Pictures',
    project: 'The Long Current (Netflix)',
    rating: 5,
    avatarGradient: 'from-violet-500 to-fuchsia-500',
    initials: 'MO',
    featured: true,
    metric: { value: '2×', label: 'faster delivery' },
    tag: 'Documentary',
  },
  {
    id: 'theo',
    quote:
      'I run a one-person channel with a million subscribers. CutForge is the only reason that is possible. Multistream multicam, auto captions, and one-click vertical reframes mean I publish four times a week without a team.',
    name: 'Theo Vance',
    role: 'Creator',
    company: 'Theo Vance (2.1M subs)',
    project: 'Weekly tech reviews',
    rating: 5,
    avatarGradient: 'from-cyan-500 to-blue-500',
    initials: 'TV',
    featured: true,
    metric: { value: '4×', label: 'output per week' },
    tag: 'YouTube',
  },
  {
    id: 'sofia',
    quote:
      'The color suite genuinely rivals dedicated grading apps, and staying inside the edit means no round-trips, no XML nightmares, no conform days. Our clients notice the difference immediately.',
    name: 'Sofia Marchetti',
    role: 'Head of Post',
    company: 'Ardent Agency',
    project: 'Global brand campaign for a Fortune 100 client',
    rating: 5,
    avatarGradient: 'from-fuchsia-500 to-rose-500',
    initials: 'SM',
    featured: true,
    metric: { value: '18h', label: 'saved per campaign' },
    tag: 'Agency',
  },
  {
    id: 'daniel',
    quote:
      'We shot 14 cameras across a three-day festival. CutForge synced every angle from waveform in under two minutes. Switching live with the number keys felt like conducting an orchestra.',
    name: 'Daniel Reyes',
    role: 'Lead Editor',
    company: 'Rooftop Live',
    project: 'Summer Sound Festival 2026',
    rating: 5,
    avatarGradient: 'from-amber-500 to-orange-600',
    initials: 'DR',
    tag: 'Sports',
  },
  {
    id: 'amara',
    quote:
      'Frame-accurate comments changed how we work with directors. No more "can you send me that timecode again" emails at midnight. They just click the frame and leave a note.',
    name: 'Amara Nkemelu',
    role: 'Producer',
    company: 'Halcyon Films',
    project: 'Feature documentary, festival circuit',
    rating: 5,
    avatarGradient: 'from-emerald-500 to-teal-600',
    initials: 'AN',
    tag: 'Film & TV',
  },
  {
    id: 'lena',
    quote:
      'The stem separation and voice isolation are absurd. We rescued dialogue recorded next to a generator and the grade still got approved without an ADR session. That saved the shoot.',
    name: 'Lena Petrova',
    role: 'Re-recording Mixer',
    company: 'Freelance',
    project: 'Indie thriller feature',
    rating: 5,
    avatarGradient: 'from-sky-500 to-indigo-600',
    initials: 'LP',
    tag: 'Film & TV',
  },
  {
    id: 'kai',
    quote:
      'Our label sends out a music video a week. The brand kit keeps every artist on-system, and the vertical reframes mean the same edit ships to four platforms without manual recuts.',
    name: 'Kai Tanaka',
    role: 'Creative Director',
    company: 'Neon Groove Records',
    project: 'Artist roster, 30+ videos',
    rating: 5,
    avatarGradient: 'from-pink-500 to-purple-600',
    initials: 'KT',
    tag: 'Music Video',
  },
  {
    id: 'priya',
    quote:
      'As a studio our biggest cost was idle render time. The pooled team storage and priority queue basically paid for the migration in the first quarter. Procurement was painless.',
    name: 'Priya Raghunathan',
    role: 'VP Production Technology',
    company: 'Meridian Studios',
    project: 'Slate of 6 scripted series',
    rating: 5,
    avatarGradient: 'from-indigo-500 to-violet-600',
    initials: 'PR',
    metric: { value: '38%', label: 'lower render cost' },
    tag: 'Film & TV',
  },
  {
    id: 'marcus',
    quote:
      'I teach a 400-student editing course. CutForge runs on the lab machines, on Chromebooks, on students\u2019 home laptops. Same project opens everywhere. That has never been true before.',
    name: 'Marcus Webb',
    role: 'Professor of Media Arts',
    company: 'Coastal State University',
    project: 'Undergraduate editing curriculum',
    rating: 5,
    avatarGradient: 'from-lime-500 to-emerald-600',
    initials: 'MW',
    tag: 'Corporate',
  },
  {
    id: 'inez',
    quote:
      'We localise content into nine languages. Generate-once subtitles with per-word timing and data-bound titles turned a three-day job into a three-hour one. Genuinely transformative.',
    name: 'Inez Ferreira',
    role: 'Localisation Lead',
    company: 'Frame Global',
    project: 'Multi-language streaming delivery',
    rating: 5,
    avatarGradient: 'from-rose-500 to-orange-500',
    initials: 'IF',
    tag: 'Corporate',
  },
  {
    id: 'jordan',
    quote:
      'The AI assistant is a genuine collaborator, not a gimmick. I describe the tone and pacing and it hands me a rough cut that respects the story instead of dumping clips in order.',
    name: 'Jordan Ellery',
    role: 'Independent Filmmaker',
    company: 'Ellery & Co.',
    project: 'Award-winning short, Sundance selection',
    rating: 5,
    avatarGradient: 'from-purple-500 to-pink-500',
    initials: 'JE',
    featured: true,
    tag: 'Documentary',
  },
];

export interface TestimonialStat {
  /** Numeric value that the counter animates up to. */
  value: number;
  /** Rendered after the number, e.g. "M+" or "/5". */
  suffix?: string;
  decimals?: number;
  label: string;
}

export const testimonialStats: TestimonialStat[] = [
  { value: 2.4, decimals: 1, suffix: 'M+', label: 'editors worldwide' },
  { value: 4.9, decimals: 1, suffix: '/5', label: 'average rating' },
  { value: 18000, suffix: '+', label: 'studios & teams' },
  { value: 9, suffix: ' min', label: 'median render saved per export' },
];

/** Recognisable clients / festivals for the logo strip */
export const trustedBy: string[] = [
  'Northlight Pictures',
  'Meridian Studios',
  'Ardent Agency',
  'Rooftop Live',
  'Neon Groove',
  'Halcyon Films',
  'Frame Global',
  'Coastal State',
];