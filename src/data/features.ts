import type { LucideIcon } from 'lucide-react';
import {
  Cpu,
  Layers,
  Gauge,
  Wand2,
  Users,
  Music,
  Palette,
  ShieldCheck,
  Cloud,
  MonitorPlay,
  Type,
  Sparkles,
} from 'lucide-react';

export interface Feature {
  id: string;
  icon: LucideIcon;
  title: string;
  tagline: string;
  description: string;
  bullets: string[];
  /** Visual emphasis on the features page */
  categories: FeatureCategory[];
}

export type FeatureCategory =
  | 'Performance'
  | 'Creative'
  | 'Collaboration'
  | 'Color & Audio'
  | 'Delivery';

export const FEATURE_CATEGORIES: FeatureCategory[] = [
  'Performance',
  'Creative',
  'Collaboration',
  'Color & Audio',
  'Delivery',
];

export const features: Feature[] = [
  {
    id: 'timeline-engine',
    icon: Gauge,
    title: 'Zero-Lag Timeline Engine',
    tagline: 'Edit 8K footage like it is a sticky note.',
    description:
      'Our GPU-accelerated compositing core renders playback at up to 8K/120fps in real time — no proxies, no render bar, no waiting. Native Apple Silicon, NVIDIA and AMD acceleration out of the box.',
    bullets: [
      'Real-time 8K/120fps playback with proxy-free editing',
      'Smart cache predicts the next 90 seconds of your timeline',
      'Background rendering that never interrupts your flow',
    ],
    categories: ['Performance'],
  },
  {
    id: 'ai-assist',
    icon: Sparkles,
    title: 'AI Editing Assistant',
    tagline: 'A second pair of eyes that never blinks.',
    description:
      'Describe the cut you want in plain language and watch CutForge assemble a first-pass edit from your bins — matching tone, pacing and beat. Then refine it the way you would any timeline.',
    bullets: [
      'Text-to-timeline: "cut a 45s teaser from the best moments"',
      'Auto-detect scenes, speakers, smiles, silence and b-roll',
      'Generate subtitles in 42 languages with per-word timing',
    ],
    categories: ['Creative'],
  },
  {
    id: 'multicam',
    icon: Layers,
    title: 'Multicam & Nested Sequences',
    tagline: 'Sixteen angles. One keystroke.',
    description:
      'Sync unlimited camera angles in seconds with waveform or timecode matching, then switch live with the number keys. Nested sequences and adjustment layers stay fully editable at any depth.',
    bullets: [
      'Auto-sync up to 32 angles by audio waveform',
      'Live-switch multicam with keyboard scrubbing',
      'Unlimited nested sequences and adjustment layers',
    ],
    categories: ['Creative'],
  },
  {
    id: 'color',
    icon: Palette,
    title: 'Cinema-Grade Color Suite',
    tagline: 'From flat log to festival-ready.',
    description:
      'Node-based grading with ACES color management, true HDR scopes, and film emulation derived from real stock scans. Apply a look in one click, then take it apart node by node.',
    bullets: [
      'ACES & DaVinci-compatible LUT pipeline',
      'HDR waveform, vectorscope and false-color tools',
      '18 film emulations, 240+ designed color presets',
    ],
    categories: ['Color & Audio'],
  },
  {
    id: 'audio',
    icon: Music,
    title: 'Studio Audio Workstation',
    tagline: 'Broadcast sound without leaving the edit.',
    description:
      'A built-in mixer with AI noise removal, stem separation, loudness targeting to EBU R128 / ATSC A/85, and adaptive music ducking that follows your dialogue automatically.',
    bullets: [
      'One-click voice isolation and de-reverb',
      'Instant stem split: dialogue, music, effects',
      'Loudness metering and auto-levelling for every platform',
    ],
    categories: ['Color & Audio'],
  },
  {
    id: 'motion',
    icon: Wand2,
    title: 'Motion & VFX Studio',
    tagline: 'Keyframes that feel like animation.',
    description:
      'A rebuilt keyframe model with bezier easing, motion blur, and a full 3D camera. Track, rotoscope and stabilize with planar tracking accurate to sub-pixel.',
    bullets: [
      'Planar and point tracking with sub-pixel accuracy',
      'AI-assisted rotoscoping and object removal',
      'Cloud-rendered particle, fire and smoke generators',
    ],
    categories: ['Creative', 'Performance'],
  },
  {
    id: 'collaboration',
    icon: Users,
    title: 'Realtime Collaboration',
    tagline: 'The whole team, one timeline.',
    description:
      'Multiple editors, one project. Presence cursors, comment threads pinned to frames, version history you can branch, and review links that play back in the browser with zero installs.',
    bullets: [
      'Live multiplayer editing with frame-accurate presence',
      'Timecoded comments, approvals and task assignment',
      'Branchable version history with visual timeline diffing',
    ],
    categories: ['Collaboration'],
  },
  {
    id: 'titles',
    icon: Type,
    title: 'Titles, Captions & Brand Kits',
    tagline: 'On-brand in every frame.',
    description:
      'Animated, fully-vector title templates with data binding — pull names, stats and lower-thirds straight from a spreadsheet or your CMS. Lock a brand kit and every asset inherits it.',
    bullets: [
      'Vector animated titles with variable font support',
      'Data-driven lower thirds from CSV, JSON or API',
      'Shareable brand kits enforce fonts, colors and logos',
    ],
    categories: ['Creative', 'Collaboration'],
  },
  {
    id: 'delivery',
    icon: MonitorPlay,
    title: 'One-Click Delivery Everywhere',
    tagline: 'Every platform, every ratio, at once.',
    description:
      'Define your deliverables once and export programmatically to any aspect ratio, codec or platform spec. Direct publish to YouTube, TikTok, Vimeo and FTP/S3 with metadata intact.',
    bullets: [
      'Automatic reframing for 16:9, 9:16, 1:1 and 4:5',
      'Hardware HEVC, ProRes, AV1 and H.264 encoding',
      'Direct upload with titles, thumbnails and chapters',
    ],
    categories: ['Delivery', 'Performance'],
  },
  {
    id: 'cloud',
    icon: Cloud,
    title: 'Cloud Bins & Media Sync',
    tagline: 'Your footage, on every machine.',
    description:
      'Everything lives in a synced cloud library with smart proxies. Start on a workstation, finish on a laptop on the train — clips, caches and project state follow you both ways.',
    bullets: [
      'Conflict-free media sync across all your devices',
      'Smart proxy generation and background upload',
      '1TB of high-speed cloud storage on Studio plans',
    ],
    categories: ['Collaboration', 'Delivery'],
  },
  {
    id: 'security',
    icon: ShieldCheck,
    title: 'Private by Default',
    tagline: 'Your unreleased cuts stay unreleased.',
    description:
      'End-to-end encrypted project storage, watermarking on review links, SSO/SAML for teams, and granular role permissions. We never train models on your media. Ever.',
    bullets: [
      'End-to-end encryption at rest and in transit',
      'SOC 2 Type II, GDPR and TPN-compliant workflows',
      'SSO/SAML, audit logs and role-based access control',
    ],
    categories: ['Collaboration'],
  },
  {
    id: 'plugins',
    icon: Cpu,
    title: 'Open Plugin Platform',
    tagline: 'Extend it your way.',
    description:
      'A modern JavaScript and Python API for effects, panels and export automation. Ship plugins to the CutForge Marketplace and reach thousands of editors.',
    bullets: [
      'JavaScript + Python scripting with a live console',
      'Full REST, webhook and command-line automation',
      'Marketplace distribution with revenue share',
    ],
    categories: ['Delivery', 'Performance'],
  },
];