'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { Section, CtaButton, Eyebrow } from '@/components/digi/ui'
import { GradientRule, Sparkle } from '@/components/digi/brand'
import { useReducedMotion, scrollToSection } from '@/components/digi/hooks'
import { cn } from '@/lib/utils'

/**
 * Scene 0 — Hero (Master Prompt §6 / Content Pack Source A §5)
 *
 * Single H1 of the page (every other scene uses <h2>).
 * Eyebrow from Source B hero line, body from Source A §5.
 * 7+1 stage strip: Discover → Attract → Engage → Convert → Measure → Nurture → Grow → ∞
 * Renders as an SVG ribbon + stage pills, animated with Framer Motion whileInView.
 * On mobile, stacks vertically.
 */

const STAGES = [
  'Discover',
  'Attract',
  'Engage',
  'Convert',
  'Measure',
  'Nurture',
  'Grow',
  '∞',
] as const

const STAGE_GLOSSES: Record<(typeof STAGES)[number], string> = {
  Discover: 'Understand demand',
  Attract: 'Reach audiences',
  Engage: 'Earn trust',
  Convert: 'Turn into action',
  Measure: 'Know what drives value',
  Nurture: 'Build relationships',
  Grow: 'Optimise & scale',
  '∞': 'Keep compounding',
}

const HERO_PHRASES = [
  'Measurable Growth.',
  'Predictable Revenue.',
  'AI Visibility.',
  'Compounding Scale.',
]

const VIEWPORT = { once: true, margin: '-15% 0px -10% 0px' } as const

export function SceneHero() {
  const reduced = useReducedMotion()
  const [phraseIndex, setPhraseIndex] = React.useState(0)

  React.useEffect(() => {
    if (reduced) return
    const interval = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % HERO_PHRASES.length)
    }, 3200)
    return () => clearInterval(interval)
  }, [reduced])

  return (
    <Section id="scene-0-hero" scene="0" tone="dark" full className="min-h-dvh pt-28 sm:pt-32 lg:pt-40">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 text-center">
        {/* Eyebrow (Source B hero line) */}
        <motion.div
          initial={reduced ? undefined : { opacity: 0, y: 12 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <Eyebrow className="text-mist/85">
            Your business is online. But is it digitally discoverable?
          </Eyebrow>
        </motion.div>

        {/* H1 — the only h1 on the page with animated dynamic word rotator */}
        <motion.h1
          initial={reduced ? undefined : { opacity: 0, y: 24 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.05 }}
          className="text-balance text-4xl font-extrabold leading-[1.06] tracking-tight text-mist text-glow-ribbon sm:text-5xl lg:text-6xl"
        >
          Turn Digital Into{' '}
          <span className="inline-block relative overflow-hidden align-bottom min-w-[280px] sm:min-w-[420px] text-left">
            <AnimatePresence mode="wait">
              <motion.span
                key={phraseIndex}
                initial={reduced ? undefined : { y: 24, opacity: 0, filter: 'blur(6px)' }}
                animate={reduced ? undefined : { y: 0, opacity: 1, filter: 'blur(0px)' }}
                exit={reduced ? undefined : { y: -24, opacity: 0, filter: 'blur(6px)' }}
                transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
                className="inline-block text-ribbon-animated font-extrabold"
              >
                {HERO_PHRASES[phraseIndex]}
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.h1>

        {/* Body (Source A §5) */}
        <motion.p
          initial={reduced ? undefined : { opacity: 0, y: 16 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.18 }}
          className="mx-auto max-w-3xl text-balance text-base leading-relaxed text-mist/75 sm:text-lg"
        >
          Digi∞Artha connects performance marketing, search, creative, conversion, data and
          automation into one continuous growth system—helping businesses become more visible,
          acquire the right customers and grow with measurable outcomes.
        </motion.p>

        {/* Micro-proof line */}
        <motion.p
          initial={reduced ? undefined : { opacity: 0 }}
          animate={reduced ? undefined : { opacity: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.32 }}
          className="font-mono text-xs uppercase tracking-[0.32em] text-mist/55"
        >
          Strategy. Execution. Measurement. Optimisation.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={reduced ? undefined : { opacity: 0, y: 16 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.42 }}
          className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4"
        >
          <CtaButton href="#growth-score" variant="primary" className="px-6 py-3 text-base">
            Get Your Digital Growth Score →
          </CtaButton>
          <CtaButton href="#contact" variant="ghost" className="px-6 py-3 text-base">
            Talk to a Growth Strategist →
          </CtaButton>
        </motion.div>
      </div>

      {/* 7+1 stage strip — horizontal glowing ribbon with stage pills */}
      <StageStrip reduced={reduced} />

      {/* Scroll affordance */}
      <motion.button
        type="button"
        onClick={() => scrollToSection('scene-1-problem')}
        initial={reduced ? undefined : { opacity: 0 }}
        animate={reduced ? undefined : { opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.7 }}
        className="mx-auto mt-14 flex flex-col items-center gap-1 text-mist/50 transition hover:text-mist"
        aria-label="Scroll to explore"
      >
        <span className="text-[11px] font-medium uppercase tracking-[0.28em]">Scroll to explore</span>
        <motion.span
          animate={reduced ? undefined : { y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="h-4 w-4" />
        </motion.span>
      </motion.button>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* Stage strip — 7+1 stage nodes on a horizontal gradient ribbon      */
/* ------------------------------------------------------------------ */

function StageStrip({ reduced }: { reduced: boolean }) {
  return (
    <motion.div
      initial={reduced ? undefined : { opacity: 0, y: 20 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.7, ease: 'easeOut', delay: 0.5 }}
      className="relative mx-auto mt-16 w-full max-w-6xl"
      aria-label="Digi∞Artha growth stages"
    >
      {/* SVG ribbon backdrop (desktop horizontal, mobile vertical) */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1000 4"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="hero-stage-ribbon" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#02A3FE" />
            <stop offset="0.18" stopColor="#2E4BFE" />
            <stop offset="0.38" stopColor="#7B3FFE" />
            <stop offset="0.58" stopColor="#E93BF2" />
            <stop offset="0.8" stopColor="#FF544D" />
            <stop offset="1" stopColor="#FF8E2D" />
          </linearGradient>
        </defs>
        <line
          x1="0"
          y1="2"
          x2="1000"
          y2="2"
          stroke="url(#hero-stage-ribbon)"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>

      {/* Stage pills */}
      <ol
        className={cn(
          'relative flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between',
        )}
      >
        {STAGES.map((stage, i) => {
          const isInfinity = stage === '∞'
          return (
            <motion.li
              key={stage}
              initial={reduced ? undefined : { opacity: 0, y: 14 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{
                duration: 0.5,
                ease: 'easeOut',
                delay: reduced ? 0 : 0.55 + i * 0.08,
              }}
              className="flex items-center gap-3 sm:flex-col sm:items-center sm:gap-1"
            >
              <StageDot index={i} isInfinity={isInfinity} reduced={reduced} />
              <div className="sm:text-center">
                <p
                  className={cn(
                    'text-sm font-bold tracking-tight',
                    isInfinity ? 'text-ribbon' : 'text-mist',
                  )}
                >
                  {stage}
                </p>
                <p className="text-[11px] text-mist/55">{STAGE_GLOSSES[stage]}</p>
              </div>
            </motion.li>
          )
        })}
      </ol>

      {/* The gradient rule below the strip as a strong visual close */}
      <div className="mt-12 flex justify-center">
        <GradientRule className="h-px w-24" />
      </div>
    </motion.div>
  )
}

function StageDot({
  index,
  isInfinity,
  reduced,
}: {
  index: number
  isInfinity: boolean
  reduced: boolean
}) {
  // Distribute accent colors across the 7 stages, ∞ loops back to gradient
  const accents = [
    '#02A3FE',
    '#2E4BFE',
    '#7B3FFE',
    '#E93BF2',
    '#FF544D',
    '#FF8E2D',
    '#FFB020',
  ]
  const accent = isInfinity ? undefined : accents[index]
  const glowClass = isInfinity
    ? 'bg-ribbon glow-ribbon animate-ribbon-flow'
    : 'animate-pulse-glow'

  return (
    <span className="relative inline-flex h-8 w-8 items-center justify-center">
      <span
        className={cn('absolute inset-0 rounded-full', glowClass)}
        style={accent ? { background: accent, boxShadow: `0 0 16px ${accent}AA` } : undefined}
        aria-hidden="true"
      />
      {isInfinity && (
        <Sparkle size={14} className="relative z-10" mono />
      )}
      <span className="sr-only">{isInfinity ? 'Infinity stage' : `Stage ${index + 1}`}</span>
    </span>
  )
}
