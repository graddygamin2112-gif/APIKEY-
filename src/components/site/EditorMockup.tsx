import { useEffect, useState } from 'react';
import {
  Play,
  Pause,
  Scissors,
  Wand2,
  Layers,
  Palette,
  Music,
  SkipBack,
  SkipForward,
  ZoomIn,
} from 'lucide-react';
import { cn } from '@/lib/utils';

/** A recorded sequence of clip layouts used by the timeline. */
const tracks: {
  name: string;
  type: 'video' | 'audio';
  clips: { label: string; width: number; gradient: string; start: number }[];
}[] = [
  {
    name: 'V2 · B-Roll',
    type: 'video',
    clips: [
      { label: '', width: 22, gradient: 'from-cyan-500/80 to-blue-600/80', start: 6 },
      { label: '', width: 16, gradient: 'from-fuchsia-500/80 to-purple-600/80', start: 42 },
      { label: '', width: 20, gradient: 'from-amber-400/80 to-orange-600/80', start: 74 },
    ],
  },
  {
    name: 'V1 · Main',
    type: 'video',
    clips: [
      { label: 'INT. STUDIO — 01', width: 34, gradient: 'from-violet-500/90 to-indigo-600/90', start: 2 },
      { label: 'CLOSE-UP — 02', width: 28, gradient: 'from-indigo-500/90 to-sky-600/90', start: 38 },
      { label: 'WIDE — 03', width: 30, gradient: 'from-sky-500/90 to-cyan-600/90', start: 68 },
    ],
  },
  {
    name: 'A1 · Dialogue',
    type: 'audio',
    clips: [{ label: '', width: 96, gradient: 'from-emerald-500/60 to-teal-600/60', start: 1 }],
  },
];

function Waveform({ className }: { className?: string }) {
  const bars = Array.from({ length: 40 }, (_, i) => 20 + Math.abs(Math.sin(i * 1.7)) * 70);
  return (
    <div className={cn('flex h-full items-center gap-px', className)} aria-hidden="true">
      {bars.map((h, i) => (
        <span
          key={i}
          className="w-px shrink-0 rounded-full bg-white/50"
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  );
}

export function EditorMockup({ className }: { className?: string }) {
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(28);

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => {
      setProgress((p) => (p >= 100 ? 8 : p + 0.6));
    }, 80);
    return () => window.clearInterval(id);
  }, [playing]);

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl border border-border/70 bg-[hsl(228_38%_7%)] shadow-2xl shadow-black/50 ring-1 ring-white/5',
        className,
      )}
    >
      {/* Window chrome */}
      <div className="flex items-center gap-2 border-b border-white/5 bg-white/[0.03] px-4 py-2.5">
        <span className="size-3 rounded-full bg-red-400/80" />
        <span className="size-3 rounded-full bg-amber-400/80" />
        <span className="size-3 rounded-full bg-emerald-400/80" />
        <div className="ml-3 flex items-center gap-1.5 truncate text-[11px] font-medium text-white/50">
          <span className="hidden sm:inline">CutForge Studio</span>
          <span className="text-white/25">/</span>
          <span className="truncate">Aurora_Teaser_v14.cfproj</span>
        </div>
        <div className="ml-auto flex items-center gap-1 text-white/40">
          <ZoomIn className="size-3.5" />
          <span className="text-[10px] font-medium">100%</span>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-1 border-b border-white/5 px-3 py-2">
        {[Scissors, Layers, Palette, Music, Wand2].map((Icon, i) => (
          <span
            key={i}
            className={cn(
              'grid size-8 place-items-center rounded-md text-white/45',
              i === 0 && 'bg-primary/20 text-primary',
            )}
          >
            <Icon className="size-4" />
          </span>
        ))}
        <span className="mx-2 h-5 w-px bg-white/10" />
        <div className="flex items-center gap-1.5 rounded-md bg-white/[0.04] px-2.5 py-1.5">
          <Wand2 className="size-3.5 text-brand-cyan" />
          <span className="text-[10px] font-medium text-white/60">AI assistant</span>
          <span className="flex gap-0.5" aria-hidden="true">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="size-1 animate-pulse rounded-full bg-brand-cyan"
                style={{ animationDelay: `${i * 160}ms` }}
              />
            ))}
          </span>
        </div>
      </div>

      <div className="grid gap-0 md:grid-cols-[minmax(0,1fr)_12rem]">
        {/* Preview + timeline */}
        <div className="min-w-0">
          {/* Preview monitor */}
          <div className="relative m-3 aspect-video overflow-hidden rounded-lg border border-white/5">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-indigo-700 to-cyan-600" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(255,255,255,0.35),transparent_55%)]" />
            {/* Render scan sweep */}
            <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-24 animate-scan bg-gradient-to-b from-transparent via-white/12 to-transparent" />
            </div>
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent" />
            {/* Fake subject silhouette */}
            <div className="absolute bottom-0 left-1/2 h-[62%] w-[26%] -translate-x-1/2 rounded-t-[40%] bg-black/25 blur-[1px]" />
            <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded bg-black/40 px-2 py-1 text-[10px] font-semibold text-white/80 backdrop-blur">
              <span className="size-1.5 rounded-full bg-red-500" />
              REC · A-ROLL
            </div>
            <div className="absolute right-3 bottom-3 rounded bg-black/50 px-2 py-1 font-mono text-[10px] text-emerald-300 backdrop-blur">
              00:00:{String(Math.floor(progress * 0.24)).padStart(2, '0')}:{String(Math.floor(progress * 6)).padStart(2, '0')}
            </div>
            {/* Playback controls */}
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-2 pb-2 opacity-0 transition-opacity group-hover:opacity-100">
              <span className="text-white/70" />
            </div>
          </div>

          {/* Transport bar */}
          <div className="flex items-center gap-3 px-3 pb-2">
            <div className="flex items-center gap-1 text-white/50">
              <SkipBack className="size-3.5" />
              <button
                type="button"
                onClick={() => setPlaying((p) => !p)}
                className="grid size-7 place-items-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                aria-label={playing ? 'Pause preview' : 'Play preview'}
              >
                {playing ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
              </button>
              <SkipForward className="size-3.5" />
            </div>
            <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-brand-cyan to-brand-violet transition-[width] duration-100 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Timeline */}
          <div className="border-t border-white/5 bg-black/20 p-3">
            <div className="mb-2 flex justify-between font-mono text-[9px] text-white/30">
              {['00:00', '00:05', '00:10', '00:15', '00:20', '00:25'].map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
            <div className="relative space-y-1.5">
              {/* Playhead */}
              <div
                className="pointer-events-none absolute -top-2 bottom-0 z-10 w-px bg-brand-cyan transition-[left] duration-100 ease-linear"
                style={{ left: `${progress}%` }}
              >
                <span className="absolute -top-1 -left-[3px] size-2 rotate-45 bg-brand-cyan" />
              </div>
              {tracks.map((track) => (
                <div key={track.name} className="flex items-center gap-2">
                  <span className="w-20 shrink-0 truncate text-[9px] font-medium text-white/40">
                    {track.name}
                  </span>
                  <div className="relative h-8 flex-1 rounded-md bg-white/[0.03]">
                    {track.clips.map((clip, i) => (
                      <div
                        key={i}
                        className={cn(
                          'absolute top-0 h-full overflow-hidden rounded-md border border-white/10 bg-gradient-to-r',
                          clip.gradient,
                        )}
                        style={{ left: `${clip.start}%`, width: `${clip.width}%` }}
                      >
                        {clip.label && (
                          <span className="absolute top-1 left-2 truncate text-[8px] font-semibold tracking-wide text-white/90 uppercase">
                            {clip.label}
                          </span>
                        )}
                        {track.type === 'audio' && <Waveform className="px-1 pt-1" />}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Inspector */}
        <aside className="hidden border-l border-white/5 bg-white/[0.02] p-3 md:block">
          <p className="text-[10px] font-semibold tracking-widest text-white/40 uppercase">
            Color scopes
          </p>
          {/* Waveform scope */}
          <div className="mt-3 space-y-1 rounded-lg border border-white/5 bg-black/40 p-2">
            <svg viewBox="0 0 100 40" className="h-16 w-full" aria-hidden="true">
              <defs>
                <linearGradient id="scope" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="var(--brand-cyan)" />
                  <stop offset="1" stopColor="var(--brand-magenta)" />
                </linearGradient>
              </defs>
              {Array.from({ length: 34 }, (_, i) => {
                const h = 6 + Math.abs(Math.sin(i * 0.9) * Math.cos(i * 0.4)) * 34;
                return (
                  <rect
                    key={i}
                    x={i * 3 + 1}
                    y={40 - h}
                    width="1.6"
                    height={h}
                    rx="0.8"
                    fill="url(#scope)"
                    opacity={0.85}
                  />
                );
              })}
            </svg>
          </div>

          <p className="mt-4 text-[10px] font-semibold tracking-widest text-white/40 uppercase">
            Inspector
          </p>
          <div className="mt-2 space-y-2">
            {[
              { label: 'Exposure', value: 62 },
              { label: 'Contrast', value: 44 },
              { label: 'Saturation', value: 71 },
            ].map((row) => (
              <div key={row.label} className="space-y-1">
                <div className="flex justify-between text-[9px] text-white/45">
                  <span>{row.label}</span>
                  <span>{row.value}</span>
                </div>
                <div className="h-1 rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-brand-cyan to-brand-violet"
                    style={{ width: `${row.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-lg border border-brand-violet/30 bg-brand-violet/10 p-2">
            <p className="text-[9px] font-semibold text-white/70">Look applied</p>
            <p className="text-[10px] font-medium text-brand-cyan">Teal &amp; Orange 35mm</p>
          </div>
        </aside>
      </div>
    </div>
  );
}