'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  Compass,
  Layers,
  Rocket,
  Activity,
  Sparkles,
  Zap,
  TrendingUp,
  CheckCircle2,
  Cpu,
  BarChart3,
  RefreshCw,
} from 'lucide-react'
import { AnimatedCounter } from '@/components/ui/animated-counter'
import { cn } from '@/lib/utils'

export interface WorkflowStage {
  index: string
  title: string
  copy: string
  accent: string
  hudStatus: string
  focusTags: string[]
  metrics: {
    label: string
    value: number
    prefix?: string
    suffix?: string
  }[]
}

export const WORKFLOW_STAGES: WorkflowStage[] = [
  {
    index: '01',
    title: 'Diagnose',
    copy: 'Understand the business, audience, market and current digital footprint.',
    accent: '#02A3FE',
    hudStatus: 'DEEP AUDIT ENGINE ACTIVE',
    focusTags: ['Digital Footprint', 'Search Intent', 'Leak Diagnostics', 'Tech Stack'],
    metrics: [
      { label: 'Data Signals Scanned', value: 12480, suffix: '+' },
      { label: 'Audit Baseline', value: 68, suffix: '/100' },
      { label: 'Growth Gaps Found', value: 7, suffix: ' vectors' },
    ],
  },
  {
    index: '02',
    title: 'Strategise',
    copy: 'Identify the highest-value opportunities and define the roadmap.',
    accent: '#2E4BFE',
    hudStatus: 'ROADMAP SYNTHESIS ACTIVE',
    focusTags: ['Opportunity Matrix', 'CAC Reduction', 'Channel Allocation', '90-Day Blueprint'],
    metrics: [
      { label: 'High-ROI Vectors', value: 6, suffix: ' mapped' },
      { label: 'Execution Horizon', value: 90, suffix: ' days' },
      { label: 'Strategic Confidence', value: 98, suffix: '%' },
    ],
  },
  {
    index: '03',
    title: 'Build',
    copy: 'Create the campaigns, content, digital experiences and measurement system.',
    accent: '#7B3FFE',
    hudStatus: 'ARCHITECTURE & ASSET STACK',
    focusTags: ['Landing Pages', 'High-Converting Copy', 'Server Attribution', 'CRM Automation'],
    metrics: [
      { label: 'Engineered Assets', value: 42, suffix: ' ready' },
      { label: 'Attribution Fidelity', value: 100, suffix: '%' },
      { label: 'Speed & UX Score', value: 99, suffix: '/100' },
    ],
  },
  {
    index: '04',
    title: 'Activate',
    copy: 'Launch the growth channels and customer journeys.',
    accent: '#E93BF2',
    hudStatus: 'OMNICHANNEL LAUNCH ENGINE',
    focusTags: ['Google Search', 'Meta Performance', 'LinkedIn B2B', 'Lifecycle Flows'],
    metrics: [
      { label: 'Live Channel Streams', value: 6, suffix: ' active' },
      { label: 'Signal Velocity', value: 95, suffix: '%' },
      { label: 'Audience Nodes', value: 28, suffix: ' engaged' },
    ],
  },
  {
    index: '05',
    title: 'Optimise',
    copy: 'Test, measure, learn and improve.',
    accent: '#FF544D',
    hudStatus: 'ADAPTIVE EXPERIMENTATION',
    focusTags: ['Multivariate CRO', 'Creative Testing', 'Marginal CPA Tuning', 'Weekly Sprints'],
    metrics: [
      { label: 'Weekly Test Sprints', value: 36, suffix: ' cycles' },
      { label: 'Conversion Lift', value: 43, prefix: '+', suffix: '%' },
      { label: 'CPA Reduction', value: 29, prefix: '-', suffix: '%' },
    ],
  },
  {
    index: '06',
    title: 'Scale',
    copy: 'Automate what works and expand intelligently.',
    accent: '#FF8E2D',
    hudStatus: 'COMPOUNDING INFINITY LOOP',
    focusTags: ['Budget Multiplication', 'Flywheel Dynamics', 'Market Expansion', 'Self-Sustaining'],
    metrics: [
      { label: 'Scale Multiplier', value: 4, suffix: '.8x' },
      { label: 'Automated Workflows', value: 94, suffix: '%' },
      { label: 'Compounding Velocity', value: 100, suffix: '%' },
    ],
  },
]

export function InteractiveWorkflowVisualizer({
  activeStageIndex,
  onSelectStage,
}: {
  activeStageIndex: number
  onSelectStage?: (index: number) => void
}) {
  const stage = WORKFLOW_STAGES[activeStageIndex] || WORKFLOW_STAGES[0]

  return (
    <div className="relative w-full">
      {/* Outer Glow Halo synced to current active stage accent */}
      <div
        className="pointer-events-none absolute -inset-3 rounded-3xl opacity-35 blur-2xl transition-all duration-700"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${stage.accent} 0%, transparent 70%)`,
        }}
        aria-hidden="true"
      />

      {/* Main Glass Console Card */}
      <div
        className="relative overflow-hidden rounded-3xl border border-ink/10 dark:border-white/10 bg-white/95 dark:bg-slate-950/85 p-3.5 shadow-xl dark:shadow-2xl backdrop-blur-xl sm:p-5 lg:p-4.5 xl:p-6"
        style={{
          boxShadow: `0 0 0 1px ${stage.accent}33, 0 20px 60px -15px ${stage.accent}40`,
        }}
      >
        {/* Ambient Top Scanline Grid Pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0,0,0,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.15) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
          aria-hidden="true"
        />

        {/* Console Header Bar */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 border-b border-ink/10 dark:border-white/10 pb-3 sm:pb-3.5">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-3 w-3">
              <span
                className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                style={{ background: stage.accent }}
              />
              <span
                className="relative inline-flex h-3 w-3 rounded-full shadow-lg"
                style={{ background: stage.accent }}
              />
            </span>
            <div className="flex flex-col">
              <span className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-ink/60 dark:text-mist/60">
                Workflow Cockpit
              </span>
              <span
                className="text-xs font-semibold tracking-wider transition-colors duration-300"
                style={{ color: stage.accent }}
              >
                {stage.hudStatus}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 rounded-full border border-ink/10 dark:border-white/10 bg-ink/5 dark:bg-white/5 px-2.5 py-0.5 text-[10px] sm:text-[11px] font-mono text-ink/80 dark:text-mist/80 backdrop-blur-md">
            <span className="text-ink/40 dark:text-mist/40">STAGE</span>
            <span className="font-bold text-ink dark:text-mist">{stage.index}</span>
            <span className="text-ink/40 dark:text-mist/40">/</span>
            <span className="text-ink/50 dark:text-mist/50">06</span>
          </div>
        </div>

        {/* Central Stage Dynamic Visual Canvas */}
        <div className="relative my-3 flex min-h-[220px] w-full items-center justify-center overflow-hidden rounded-2xl border border-ink/10 dark:border-white/5 bg-gradient-to-b from-slate-100 to-slate-200/70 dark:from-slate-900/60 dark:to-black/80 p-3 sm:my-3.5 sm:min-h-[260px] lg:min-h-[240px] xl:min-h-[270px] sm:p-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={stage.index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="relative flex h-full w-full items-center justify-center"
            >
              {stage.index === '01' && <DiagnoseVisual accent={stage.accent} />}
              {stage.index === '02' && <StrategiseVisual accent={stage.accent} />}
              {stage.index === '03' && <BuildVisual accent={stage.accent} />}
              {stage.index === '04' && <ActivateVisual accent={stage.accent} />}
              {stage.index === '05' && <OptimiseVisual accent={stage.accent} />}
              {stage.index === '06' && <ScaleVisual accent={stage.accent} />}
            </motion.div>
          </AnimatePresence>

          {/* Real-time Stage Watermark */}
          <div className="pointer-events-none absolute bottom-3 right-3 font-mono text-[9px] uppercase tracking-widest text-ink/30 dark:text-mist/30">
            {stage.title} · Interactive HUD
          </div>
        </div>

        {/* Live Metrics Grid (Dynamic Counter) */}
        <div className="relative z-10 grid grid-cols-3 gap-1.5 rounded-2xl border border-ink/10 dark:border-white/10 bg-slate-50 dark:bg-white/[0.03] p-2 text-center sm:gap-2 sm:p-3">
          {stage.metrics.map((m, idx) => (
            <div key={idx} className="flex flex-col items-center justify-center">
              <span className="text-[10px] sm:text-[11px] font-medium text-ink/70 dark:text-mist/60">
                {m.label}
              </span>
              <div
                className="mt-0.5 sm:mt-1 flex items-baseline font-mono text-sm sm:text-base xl:text-lg font-bold"
                style={{ color: stage.accent }}
              >
                {m.prefix && <span>{m.prefix}</span>}
                <AnimatedCounter value={m.value} />
                {m.suffix && <span className="text-xs sm:text-sm font-semibold">{m.suffix}</span>}
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Quick Stage Jumper Strip */}
        <div className="relative z-10 mt-3 flex items-center justify-between gap-1.5 border-t border-ink/10 dark:border-white/10 pt-3">
          <span className="hidden font-mono text-[10px] uppercase tracking-widest text-ink/40 dark:text-mist/40 sm:inline-block">
            Jump to Stage:
          </span>
          <div className="flex w-full sm:w-auto items-center justify-between sm:justify-end gap-1.5">
            {WORKFLOW_STAGES.map((s, idx) => {
              const isActive = idx === activeStageIndex
              return (
                <button
                  key={s.index}
                  onClick={() => onSelectStage?.(idx)}
                  className={cn(
                    'group relative flex h-7 sm:h-8 flex-1 sm:flex-initial items-center justify-center rounded-lg px-2 sm:px-2.5 font-mono text-[11px] font-semibold transition-all duration-200',
                    isActive
                      ? 'border shadow-md'
                      : 'border border-transparent bg-ink/5 text-ink/60 hover:bg-ink/10 hover:text-ink dark:bg-white/5 dark:text-mist/50 dark:hover:bg-white/10 dark:hover:text-mist',
                  )}
                  style={{
                    backgroundColor: isActive ? `${s.accent}20` : undefined,
                    borderColor: isActive ? s.accent : 'transparent',
                    color: isActive ? s.accent : undefined,
                    boxShadow: isActive ? `0 0 12px ${s.accent}40` : undefined,
                  }}
                  title={`Stage ${s.index}: ${s.title}`}
                >
                  <span>{s.index}</span>
                  {isActive && (
                    <motion.span
                      layoutId="active-stage-indicator"
                      className="absolute -bottom-1 h-0.5 w-3 rounded-full"
                      style={{ background: s.accent }}
                    />
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Interactive Laser Connector Beam pointing towards Right Side */}
        <div
          className="pointer-events-none absolute -right-3 top-1/2 hidden h-1.5 w-6 -translate-y-1/2 rounded-full lg:block"
          style={{
            background: `linear-gradient(90deg, ${stage.accent}, transparent)`,
            boxShadow: `0 0 14px ${stage.accent}`,
          }}
          aria-hidden="true"
        />
      </div>
    </div>
  )
}

/* ====================================================================== */
/* Stage 01: Diagnose Radar Animation                                      */
/* ====================================================================== */
function DiagnoseVisual({ accent }: { accent: string }) {
  return (
    <div className="relative flex h-64 w-64 items-center justify-center sm:h-72 sm:w-72">
      {/* Concentric Radar Rings */}
      {[0.3, 0.55, 0.8, 1].map((scale, i) => (
        <div
          key={i}
          className="absolute rounded-full border border-dashed transition-all"
          style={{
            width: `${scale * 100}%`,
            height: `${scale * 100}%`,
            borderColor: `${accent}${i === 3 ? '44' : '22'}`,
          }}
        />
      ))}

      {/* Crosshair Lines */}
      <div
        className="absolute h-full w-px opacity-20"
        style={{ background: `linear-gradient(to bottom, transparent, ${accent}, transparent)` }}
      />
      <div
        className="absolute h-px w-full opacity-20"
        style={{ background: `linear-gradient(to right, transparent, ${accent}, transparent)` }}
      />

      {/* Rotating Sweeper Beam */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 4.5, ease: 'linear' }}
        className="absolute inset-0 flex items-center justify-center origin-center"
      >
        <div
          className="absolute right-1/2 top-1/2 h-1/2 w-1/2 origin-bottom-right"
          style={{
            background: `conic-gradient(from 180deg at 100% 100%, ${accent}66 0deg, ${accent}11 45deg, transparent 70deg)`,
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 h-px w-1/2 origin-left"
          style={{
            background: `linear-gradient(to right, ${accent}, transparent)`,
            boxShadow: `0 0 8px ${accent}`,
          }}
        />
      </motion.div>

      {/* Center Radar Core */}
      <div
        className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-slate-950 shadow-lg"
        style={{ boxShadow: `0 0 20px ${accent}` }}
      >
        <Search className="h-4 w-4 animate-pulse" style={{ color: accent }} />
      </div>

      {/* Radar Blips (Audit Findings) */}
      {[
        { x: -55, y: -45, label: 'Search Gap', delay: 0 },
        { x: 60, y: -30, label: 'Tech Stack', delay: 1.2 },
        { x: -35, y: 55, label: 'Drop-off -32%', delay: 2.1 },
        { x: 50, y: 45, label: 'CAC Leak', delay: 3.0 },
      ].map((blip, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0.8, opacity: 0.3 }}
          animate={{ scale: [0.9, 1.2, 0.9], opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 2.4, delay: blip.delay }}
          className="absolute flex items-center gap-1.5 rounded-full border border-white/10 bg-slate-900/90 px-2 py-0.5 text-[9px] font-mono text-mist/90 backdrop-blur-md shadow-md"
          style={{
            transform: `translate(${blip.x}px, ${blip.y}px)`,
            borderColor: `${accent}66`,
            boxShadow: `0 0 10px ${accent}44`,
          }}
        >
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
          <span>{blip.label}</span>
        </motion.div>
      ))}
    </div>
  )
}

/* ====================================================================== */
/* Stage 02: Strategise Opportunity Matrix Network                         */
/* ====================================================================== */
function StrategiseVisual({ accent }: { accent: string }) {
  const nodes = [
    { id: 'start', x: 20, y: 70, label: 'Baseline' },
    { id: 'seo', x: 80, y: 30, label: 'High Intent' },
    { id: 'funnel', x: 140, y: 80, label: 'CPA Vector' },
    { id: 'scale', x: 200, y: 40, label: 'LTV Scale' },
  ]

  return (
    <div className="relative flex h-64 w-full max-w-[280px] items-center justify-center">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 240 140">
        <defs>
          <linearGradient id="strat-line" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#02A3FE" />
            <stop offset="100%" stopColor="#7B3FFE" />
          </linearGradient>
        </defs>

        {/* Background Network Links */}
        <path
          d="M 20,70 Q 50,20 80,30 T 140,80 T 200,40"
          fill="none"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="2"
          strokeDasharray="4 4"
        />
        <path
          d="M 20,70 L 140,80"
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="1.5"
        />
        <path
          d="M 80,30 L 200,40"
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="1.5"
        />

        {/* Primary Highway Path */}
        <motion.path
          d="M 20,70 Q 50,20 80,30 T 140,80 T 200,40"
          fill="none"
          stroke="url(#strat-line)"
          strokeWidth="3.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.8, ease: 'easeInOut' }}
        />

        {/* Pulsing Signal Particles on Path */}
        <motion.circle
          r="4.5"
          fill={accent}
          filter="drop-shadow(0 0 6px #2E4BFE)"
        >
          <animateMotion
            path="M 20,70 Q 50,20 80,30 T 140,80 T 200,40"
            dur="3.2s"
            repeatCount="indefinite"
          />
        </motion.circle>
      </svg>

      {/* Floating Node Labels */}
      {nodes.map((node, i) => (
        <motion.div
          key={node.id}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: i * 0.15, duration: 0.4 }}
          className="absolute flex flex-col items-center"
          style={{
            left: `${(node.x / 240) * 100}%`,
            top: `${(node.y / 140) * 100}%`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div
            className="flex h-6 w-6 items-center justify-center rounded-full border border-white/30 bg-slate-900 shadow-md"
            style={{ boxShadow: `0 0 12px ${accent}66` }}
          >
            <Compass className="h-3 w-3" style={{ color: accent }} />
          </div>
          <span className="mt-1 whitespace-nowrap rounded bg-slate-950/80 px-1.5 py-0.5 font-mono text-[9px] font-semibold text-mist/90 border border-white/5">
            {node.label}
          </span>
        </motion.div>
      ))}
    </div>
  )
}

/* ====================================================================== */
/* Stage 03: Build Modular System Blueprint                                */
/* ====================================================================== */
function BuildVisual({ accent }: { accent: string }) {
  const layers = [
    { title: 'CRO Web & Funnels', desc: 'Next.js · Fast UX', icon: Layers },
    { title: 'Creative & Copy Engine', desc: 'Multi-Format Bank', icon: Zap },
    { title: 'Server Attribution', desc: 'Cookieless · GA4 & CAPI', icon: Cpu },
  ]

  return (
    <div className="relative flex w-full max-w-[260px] flex-col items-center gap-2.5">
      {layers.map((layer, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.15, duration: 0.5 }}
          className="relative flex w-full items-center justify-between rounded-xl border border-white/10 bg-slate-900/80 p-3 shadow-lg backdrop-blur-md"
          style={{
            borderLeft: `3px solid ${accent}`,
            boxShadow: `0 4px 20px -5px ${accent}33`,
          }}
        >
          <div className="flex items-center gap-2.5">
            <div
              className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/5"
              style={{ color: accent }}
            >
              <layer.icon className="h-4 w-4" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-semibold text-mist">{layer.title}</span>
              <span className="font-mono text-[10px] text-mist/50">{layer.desc}</span>
            </div>
          </div>
          <span
            className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider"
            style={{ color: accent }}
          >
            WIRED
          </span>
        </motion.div>
      ))}

      {/* Assembly status badge */}
      <div className="mt-1 flex items-center gap-1.5 font-mono text-[10px] text-mist/60">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full" style={{ background: accent }} />
        <span>100% Modularity · Production Calibrated</span>
      </div>
    </div>
  )
}

/* ====================================================================== */
/* Stage 04: Activate Omnichannel Emitter                                  */
/* ====================================================================== */
function ActivateVisual({ accent }: { accent: string }) {
  const channels = [
    { name: 'Google Ads', angle: 45, dist: 80 },
    { name: 'Meta & IG', angle: 135, dist: 80 },
    { name: 'LinkedIn B2B', angle: 225, dist: 80 },
    { name: 'Organic SEO', angle: 315, dist: 80 },
  ]

  return (
    <div className="relative flex h-64 w-64 items-center justify-center">
      {/* Central Launch Core */}
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 2.2 }}
        className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-slate-950 shadow-2xl"
        style={{ boxShadow: `0 0 25px ${accent}` }}
      >
        <Rocket className="h-6 w-6" style={{ color: accent }} />
      </motion.div>

      {/* Radiating Pulse Waves */}
      {[1, 1.6, 2.2].map((s, i) => (
        <motion.div
          key={i}
          animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
          transition={{ repeat: Infinity, duration: 2.4, delay: i * 0.7 }}
          className="pointer-events-none absolute h-14 w-14 rounded-full border"
          style={{ borderColor: accent }}
        />
      ))}

      {/* Orbiting Satellite Channels */}
      {channels.map((ch, i) => {
        const rad = (ch.angle * Math.PI) / 180
        const x = Math.cos(rad) * ch.dist
        const y = Math.sin(rad) * ch.dist
        return (
          <div
            key={i}
            className="absolute flex items-center justify-center"
            style={{ transform: `translate(${x}px, ${y}px)` }}
          >
            {/* Connector Beam to center */}
            <div
              className="pointer-events-none absolute h-px w-20 origin-left"
              style={{
                transform: `rotate(${ch.angle + 180}deg)`,
                background: `linear-gradient(to right, ${accent}88, transparent)`,
              }}
            />
            <div
              className="relative z-10 flex items-center gap-1.5 rounded-full border border-white/10 bg-slate-900/90 px-2.5 py-1 text-[10px] font-semibold text-mist backdrop-blur-md shadow-md"
              style={{ boxShadow: `0 0 10px ${accent}44` }}
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
              <span>{ch.name}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

/* ====================================================================== */
/* Stage 05: Optimise Feedback Loop & Lift Meter                          */
/* ====================================================================== */
function OptimiseVisual({ accent }: { accent: string }) {
  return (
    <div className="relative flex w-full max-w-[270px] flex-col items-center gap-3">
      {/* A/B Split Test Comparison Gauge */}
      <div className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-slate-900/80 p-3 shadow-md backdrop-blur-md">
        <div className="flex flex-col items-start">
          <span className="font-mono text-[9px] uppercase tracking-wider text-mist/50">Control (A)</span>
          <span className="text-xs font-semibold text-mist/70">Baseline Funnel</span>
          <span className="font-mono text-xs text-mist/60">2.4% CVR</span>
        </div>
        <div className="flex flex-col items-center px-2">
          <TrendingUp className="h-4 w-4" style={{ color: accent }} />
          <span className="font-mono text-[9px] font-bold text-emerald-400">+43%</span>
        </div>
        <div className="flex flex-col items-end">
          <span className="font-mono text-[9px] uppercase tracking-wider text-emerald-400">Winner (B)</span>
          <span className="text-xs font-semibold text-mist">Optimised Funnel</span>
          <span className="font-mono text-xs font-bold text-emerald-400">3.43% CVR</span>
        </div>
      </div>

      {/* Real-time Oscillating CRO Frequency Graph */}
      <div className="relative flex h-24 w-full items-center justify-center overflow-hidden rounded-xl border border-white/5 bg-black/40 p-2">
        <svg className="h-full w-full" viewBox="0 0 240 60">
          <path
            d="M 0,40 Q 30,50 60,35 T 120,38 T 180,25 T 240,15"
            fill="none"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />
          <motion.path
            d="M 0,45 Q 30,35 60,25 T 120,20 T 180,12 T 240,8"
            fill="none"
            stroke={accent}
            strokeWidth="2.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
          />
        </svg>
        <div className="absolute bottom-1.5 left-2 font-mono text-[9px] text-mist/40">
          Adaptive Algorithmic Lift Sprints
        </div>
      </div>
    </div>
  )
}

/* ====================================================================== */
/* Stage 06: Scale Infinity Compounding Engine                             */
/* ====================================================================== */
function ScaleVisual({ accent }: { accent: string }) {
  return (
    <div className="relative flex h-64 w-64 items-center justify-center">
      {/* Dual Compounding Orbital Vortex Rings */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 12, ease: 'linear' }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div
          className="h-44 w-44 rounded-full border border-dashed opacity-40"
          style={{ borderColor: accent }}
        />
      </motion.div>

      {/* Luminous Infinity Symbol SVG */}
      <svg
        className="relative z-10 h-28 w-48"
        viewBox="0 0 200 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="infinity-scale-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#02A3FE" />
            <stop offset="33%" stopColor="#7B3FFE" />
            <stop offset="66%" stopColor="#FF544D" />
            <stop offset="100%" stopColor="#FF8E2D" />
          </linearGradient>
        </defs>

        {/* Glow backdrop track */}
        <path
          d="M 50,50 C 20,20 0,35 0,50 C 0,65 20,80 50,50 C 80,20 100,50 100,50 C 100,50 120,80 150,50 C 180,20 200,35 200,50 C 200,65 180,80 150,50 C 120,20 100,50 100,50 C 100,50 80,80 50,50 Z"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="6"
          strokeLinecap="round"
        />

        {/* Glowing Ribbon Track */}
        <motion.path
          d="M 50,50 C 20,20 0,35 0,50 C 0,65 20,80 50,50 C 80,20 100,50 100,50 C 100,50 120,80 150,50 C 180,20 200,35 200,50 C 200,65 180,80 150,50 C 120,20 100,50 100,50 C 100,50 80,80 50,50 Z"
          stroke="url(#infinity-scale-grad)"
          strokeWidth="4"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'linear' }}
          style={{ filter: 'drop-shadow(0 0 10px rgba(255,142,45,0.6))' }}
        />
      </svg>

      {/* Flywheel Compounding Status Badge */}
      <div className="absolute bottom-2 flex items-center gap-1.5 rounded-full border border-orange/40 bg-orange/10 px-3 py-1 font-mono text-[10px] font-bold text-orange backdrop-blur-md">
        <Sparkles className="h-3 w-3" />
        <span>COMPOUNDING VELOCITY: UNLOCKED</span>
      </div>
    </div>
  )
}
