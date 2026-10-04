export interface Tutorial {
  id: string;
  title: string;
  description: string;
  category: TutorialCategory;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  lessons: number;
  instructor: string;
  avatarGradient: string;
  initials: string;
  /** Tailwind gradient used for the generated thumbnail */
  thumbGradient: string;
  featured?: boolean;
  topics: string[];
}

export type TutorialCategory =
  | 'Getting Started'
  | 'Editing'
  | 'Color'
  | 'Audio'
  | 'Motion & VFX'
  | 'AI Tools'
  | 'Delivery';

export const tutorialCategories: TutorialCategory[] = [
  'Getting Started',
  'Editing',
  'Color',
  'Audio',
  'Motion & VFX',
  'AI Tools',
  'Delivery',
];

export const tutorials: Tutorial[] = [
  {
    id: 'foundations',
    title: 'CutForge Foundations',
    description:
      'The complete tour. Import your first footage, learn the timeline, make your first cut and export a finished video — all in under an hour.',
    category: 'Getting Started',
    level: 'Beginner',
    duration: '58 min',
    lessons: 12,
    instructor: 'Rosa Delgado',
    avatarGradient: 'from-violet-500 to-indigo-500',
    initials: 'RD',
    thumbGradient: 'from-violet-600 via-indigo-600 to-blue-600',
    featured: true,
    topics: ['Interface tour', 'Importing media', 'First cut', 'Export basics'],
  },
  {
    id: 'ai-first-pass',
    title: 'Let the AI Cut Your First Pass',
    description:
      'Turn a bin of raw footage into a structured rough cut using text-to-timeline, then learn how to steer it with better prompting.',
    category: 'AI Tools',
    level: 'Beginner',
    duration: '34 min',
    lessons: 8,
    instructor: 'Priya Raghunathan',
    avatarGradient: 'from-cyan-500 to-blue-500',
    initials: 'PR',
    thumbGradient: 'from-cyan-600 via-sky-600 to-indigo-600',
    featured: true,
    topics: ['Text-to-timeline', 'Scene detection', 'Prompting', 'Refining'],
  },
  {
    id: 'cinematic-color',
    title: 'Cinematic Color From Scratch',
    description:
      'Build a signature look node by node. Log conversion, primary balance, secondary isolation, and a final film emulation that holds up on the big screen.',
    category: 'Color',
    level: 'Intermediate',
    duration: '1h 24min',
    lessons: 16,
    instructor: 'Sofia Marchetti',
    avatarGradient: 'from-fuchsia-500 to-rose-500',
    initials: 'SM',
    thumbGradient: 'from-rose-600 via-fuchsia-600 to-purple-700',
    featured: true,
    topics: ['ACES pipeline', 'Node grading', 'Skin tones', 'Film emulation'],
  },
  {
    id: 'multicam-live',
    title: 'Live Multicam & Event Editing',
    description:
      'Sync sixteen angles and cut a live show on the fly. Waveform sync, keyboard switching, angle grouping and fast polishing passes.',
    category: 'Editing',
    level: 'Intermediate',
    duration: '47 min',
    lessons: 10,
    instructor: 'Daniel Reyes',
    avatarGradient: 'from-amber-500 to-orange-600',
    initials: 'DR',
    thumbGradient: 'from-amber-600 via-orange-600 to-red-600',
    topics: ['Waveform sync', 'Live switching', 'Angle groups', 'Clean-up'],
  },
  {
    id: 'audio-repair',
    title: 'Audio Repair & Mix Mastery',
    description:
      'Rescue impossible dialogue. Voice isolation, de-reverb, noise removal, stem separation, music ducking and loudness delivery targets.',
    category: 'Audio',
    level: 'Advanced',
    duration: '1h 05min',
    lessons: 14,
    instructor: 'Lena Petrova',
    avatarGradient: 'from-sky-500 to-indigo-600',
    initials: 'LP',
    thumbGradient: 'from-sky-700 via-blue-700 to-indigo-800',
    topics: ['Voice isolation', 'Stem split', 'Ducking', 'Loudness'],
  },
  {
    id: 'motion-tracking',
    title: 'Motion Tracking & Rotoscope',
    description:
      'Planar tracks, sub-pixel roto, object removal and 3D camera moves. Everything you need for clean compositing inside the edit.',
    category: 'Motion & VFX',
    level: 'Advanced',
    duration: '1h 12min',
    lessons: 15,
    instructor: 'Kai Tanaka',
    avatarGradient: 'from-pink-500 to-purple-600',
    initials: 'KT',
    thumbGradient: 'from-pink-600 via-purple-600 to-indigo-700',
    topics: ['Planar track', 'Rotoscope AI', 'Object removal', '3D camera'],
  },
  {
    id: 'vertical-reframe',
    title: 'One Edit, Every Platform',
    description:
      'Set up automatic reframing so a single 16:9 timeline produces pristine 9:16, 1:1 and 4:5 deliverables with subject-aware crops.',
    category: 'Delivery',
    level: 'Beginner',
    duration: '29 min',
    lessons: 7,
    instructor: 'Theo Vance',
    avatarGradient: 'from-emerald-500 to-teal-600',
    initials: 'TV',
    thumbGradient: 'from-emerald-600 via-teal-600 to-cyan-700',
    topics: ['Auto reframe', 'Subject tracking', 'Platform presets', 'Batch export'],
  },
  {
    id: 'story-structure',
    title: 'Story Structure That Lands',
    description:
      'The craft behind the cut. Pacing, tension, emotional beats and the invisible editing rules that make audiences lean in.',
    category: 'Editing',
    level: 'Intermediate',
    duration: '52 min',
    lessons: 11,
    instructor: 'Amara Nkemelu',
    avatarGradient: 'from-emerald-500 to-teal-600',
    initials: 'AN',
    thumbGradient: 'from-teal-700 via-emerald-700 to-green-800',
    topics: ['Pacing', 'J-cuts & L-cuts', 'Tension', 'Emotional beats'],
  },
  {
    id: 'collab-workflow',
    title: 'Collaboration & Team Workflows',
    description:
      'Multiplayer editing, review links, frame-accurate comments, version branching and brand kits for teams that ship every week.',
    category: 'Getting Started',
    level: 'Intermediate',
    duration: '41 min',
    lessons: 9,
    instructor: 'Marcus Webb',
    avatarGradient: 'from-lime-500 to-emerald-600',
    initials: 'MW',
    thumbGradient: 'from-lime-600 via-emerald-600 to-teal-700',
    topics: ['Multiplayer', 'Review links', 'Comments', 'Brand kits'],
  },
  {
    id: 'titles-brand',
    title: 'Animated Titles & Brand Kits',
    description:
      'Design vector titles, bind them to data, and lock a brand kit so every asset in your project inherits the same type and color system.',
    category: 'Motion & VFX',
    level: 'Intermediate',
    duration: '38 min',
    lessons: 9,
    instructor: 'Inez Ferreira',
    avatarGradient: 'from-rose-500 to-orange-500',
    initials: 'IF',
    thumbGradient: 'from-rose-600 via-orange-500 to-amber-600',
    topics: ['Vector titles', 'Data binding', 'Brand kits', 'Type animation'],
  },
  {
    id: 'plugin-dev',
    title: 'Build Your First Plugin',
    description:
      'Go under the hood with the CutForge JS and Python APIs. Build a custom panel, call the REST API, and publish to the marketplace.',
    category: 'Delivery',
    level: 'Advanced',
    duration: '1h 33min',
    lessons: 18,
    instructor: 'Jordan Ellery',
    avatarGradient: 'from-purple-500 to-pink-500',
    initials: 'JE',
    thumbGradient: 'from-purple-700 via-violet-700 to-fuchsia-800',
    topics: ['Plugin API', 'Custom panels', 'Automation', 'Publishing'],
  },
  {
    id: 'hdr-master',
    title: 'HDR & Dolby Vision Delivery',
    description:
      'Grade and deliver in true HDR. Tone mapping, PQ and HLG workflows, Dolby Vision metadata and platform-specific delivery specs.',
    category: 'Delivery',
    level: 'Advanced',
    duration: '1h 08min',
    lessons: 13,
    instructor: 'Lena Petrova',
    avatarGradient: 'from-sky-500 to-indigo-600',
    initials: 'LP',
    thumbGradient: 'from-indigo-700 via-blue-700 to-sky-700',
    topics: ['PQ & HLG', 'Tone mapping', 'DV metadata', 'QC'],
  },
];

export interface LearningPath {
  title: string;
  description: string;
  steps: string[];
  duration: string;
  gradient: string;
}

export const learningPaths: LearningPath[] = [
  {
    title: 'New to editing',
    description: 'From zero to your first published video, with no prior experience.',
    steps: ['CutForge Foundations', 'One Edit, Every Platform', 'AI Tools first pass'],
    duration: '≈ 2h 30m',
    gradient: 'from-violet-600 to-indigo-600',
  },
  {
    title: 'Content creator',
    description: 'Ship faster with AI assists, brand kits and batch delivery.',
    steps: ['Let the AI Cut Your First Pass', 'Animated Titles & Brand Kits', 'Collaboration workflows'],
    duration: '≈ 3h 15m',
    gradient: 'from-cyan-600 to-blue-600',
  },
  {
    title: 'Professional post',
    description: 'Master color, audio and VFX for broadcast and streaming delivery.',
    steps: ['Cinematic Color', 'Audio Repair & Mix Mastery', 'HDR & Dolby Vision'],
    duration: '≈ 4h 45m',
    gradient: 'from-fuchsia-600 to-rose-600',
  },
];