'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Section, SectionHeading, CtaButton } from '@/components/digi/ui'
import { InfinityLogo } from '@/components/digi/brand'
import { useReducedMotion } from '@/components/digi/hooks'

/**
 * Scene 13 — Growth Loop (finale)
 * H2: "Discover → Attract → Convert → Measure → Optimise → Grow → ∞" (Source A §5 + §18, verbatim)
 * Lead (verbatim from Source A §5): "The loop should be interactive. Hovering or tapping a stage reveals its key capabilities."
 *
 * Set-piece (Master Prompt §5.7 compounding finale): the ∞ loop rendered LARGE
 * with 2–3 smaller ∞ loops fading/scaling in on whileInView at offsets, creating
 * a "spawning nested loops" feel. Reduced motion: show all loops statically.
 *
 * Interactive: 7 stage pills (Discover/Attract/Convert/Measure/Optimise/Grow/∞).
 * Hovering/tapping a pill reveals its 1-line gloss (Source A §3 + §5 + §18).
 */

type Stage = {
  name: string
  accent: string
  gloss: string
}

const STAGES: Stage[] = [
  {
    name: 'Discover',
    accent: '#02A3FE',
    gloss: 'Understand demand and become discoverable — market intelligence, SEO, AI Search, local, content.',
  },
  {
    name: 'Attract',
    accent: '#2E4BFE',
    gloss: 'Reach the audiences that matter — Google, Meta, YouTube, LinkedIn, social, creators.',
  },
  {
    name: 'Convert',
    accent: '#FF544D',
    gloss: 'Turn attention into action — web, landing pages, CRO, funnels, lead systems.',
  },
  {
    name: 'Measure',
    accent: '#7B3FFE',
    gloss: 'Know what actually drives value — analytics, attribution, CRM, revenue.',
  },
  {
    name: 'Optimise',
    accent: '#E93BF2',
    gloss: 'Test, measure, learn and improve — iterate against business outcomes, not platform metrics.',
  },
  {
    name: 'Grow',
    accent: '#FF8E2D',
    gloss: 'Optimise and scale what works — AI, automation, experimentation, expansion.',
  },
  {
    name: '∞',
    accent: '#FFB020',
    gloss: 'Compounding growth — referrals, reviews and content feed back into the loop as new demand.',
  },
]

export function SceneGrowthLoop() {
  const reduced = useReducedMotion()
  const [active, setActive] = React.useState<number>(0)

  return (
    <Section id="scene-13-growth-loop" scene="13" tone="dark">
      <SectionHeading
        eyebrow="SCENE 13 · GROWTH LOOP"
        align="center"
        h2={
          <span className="font-mono text-2xl font-extrabold sm:text-3xl lg:text-4xl">
            <span className="text-cyan">Discover</span>
            <span className="text-mist/40"> → </span>
            <span className="text-royal">Attract</span>
            <span className="text-mist/40"> → </span>
            <span className="text-coral">Convert</span>
            <span className="text-mist/40"> → </span>
            <span className="text-violet">Measure</span>
            <span className="text-mist/40"> → </span>
            <span className="text-magenta">Optimise</span>
            <span className="text-mist/40"> → </span>
            <span className="text-orange">Grow</span>
            <span className="text-mist/40"> → </span>
            <span className="text-amber">∞</span>
          </span>
        }
        lead={
          <span className="mx-auto max-w-2xl">
            The loop should be interactive. Hovering or tapping a stage reveals its key capabilities.
          </span>
        }
      />

      {/* Compounding ∞ finale: main large loop + 2–3 smaller loops spawning */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-15% 0px -10% 0px' }}
        transition={{ duration: 0.8 }}
        className="relative mt-10 flex h-[340px] items-center justify-center sm:h-[420px]"
      >
        {/* Background nested loops — fade/scale in on view */}
        <motion.div
          initial={reduced ? { opacity: 0.4 } : { opacity: 0, scale: 0.4, rotate: -12 }}
          whileInView={{ opacity: 0.45, scale: 1, rotate: -12 }}
          viewport={{ once: true, margin: '-15% 0px -10% 0px' }}
          transition={{ duration: 1.1, delay: 0.15, ease: 'easeOut' }}
          className="absolute -left-6 top-2 w-44 sm:w-56"
        >
          <InfinityLogo strokeWidth={22} withSparkle={false} withArrowhead={false} glow />
        </motion.div>
        <motion.div
          initial={reduced ? { opacity: 0.35 } : { opacity: 0, scale: 0.4, rotate: 18 }}
          whileInView={{ opacity: 0.4, scale: 1, rotate: 18 }}
          viewport={{ once: true, margin: '-15% 0px -10% 0px' }}
          transition={{ duration: 1.1, delay: 0.4, ease: 'easeOut' }}
          className="absolute -right-4 bottom-0 w-36 sm:w-48"
        >
          <InfinityLogo strokeWidth={22} withSparkle={false} withArrowhead={false} glow />
        </motion.div>
        <motion.div
          initial={reduced ? { opacity: 0.3 } : { opacity: 0, scale: 0.3 }}
          whileInView={{ opacity: 0.3, scale: 1 }}
          viewport={{ once: true, margin: '-15% 0px -10% 0px' }}
          transition={{ duration: 1.2, delay: 0.6, ease: 'easeOut' }}
          className="absolute right-12 top-0 w-24 sm:w-32"
        >
          <InfinityLogo strokeWidth={22} withSparkle={false} withArrowhead={false} />
        </motion.div>

        {/* Main large central ∞ */}
        <motion.div
          initial={reduced ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-15% 0px -10% 0px' }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="relative w-[280px] sm:w-[420px] lg:w-[520px]"
        >
          <InfinityLogo strokeWidth={20} withSparkle withArrowhead glow />
          {!reduced && (
            <div
              className="pointer-events-none absolute inset-0 -z-10 blur-2xl"
              style={{
                background:
                  'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(123,63,254,0.35), transparent 70%)',
              }}
            />
          )}
        </motion.div>

        {/* Floating "new starting node" sparkle on the right loop — the compounding feed */}
        <motion.div
          initial={reduced ? { opacity: 0.7 } : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 0.9, y: 0 }}
          viewport={{ once: true, margin: '-15% 0px -10% 0px' }}
          transition={{ duration: 0.6, delay: 1 }}
          className="absolute right-[28%] top-[18%] hidden text-center sm:block"
        >
          <p className="font-mono text-[10px] uppercase tracking-wider text-mist/60">referrals · reviews · content</p>
          <p className="font-mono text-[10px] uppercase tracking-wider text-amber">feed back into demand →</p>
        </motion.div>
      </motion.div>

      {/* Interactive stage pills */}
      <div className="mt-10">
        <div
          className="no-scrollbar flex flex-wrap items-stretch justify-center gap-2 sm:gap-3"
          role="tablist"
          aria-label="Growth loop stages"
        >
          {STAGES.map((s, i) => {
            const isActive = active === i
            return (
              <button
                key={s.name}
                role="tab"
                aria-selected={isActive}
                aria-controls={`stage-panel-${i}`}
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className="rounded-full px-3 py-1.5 font-mono text-xs font-semibold transition-all sm:px-4 sm:text-sm"
                style={{
                  color: isActive ? '#fff' : s.accent,
                  background: isActive ? s.accent : `${s.accent}1A`,
                  border: `1px solid ${isActive ? s.accent : `${s.accent}55`}`,
                  boxShadow: isActive ? `0 0 24px -4px ${s.accent}` : 'none',
                }}
              >
                {s.name}
              </button>
            )
          })}
        </div>

        {/* Active stage gloss panel */}
        <div className="relative mt-6 min-h-[88px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              id={`stage-panel-${active}`}
              role="tabpanel"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="mx-auto max-w-2xl rounded-2xl border border-white/10 bg-white/5 p-5 text-center backdrop-blur"
              style={{
                boxShadow: `inset 0 -2px 0 ${STAGES[active].accent}, 0 12px 40px -16px ${STAGES[active].accent}55`,
              }}
            >
              <p
                className="mb-1 font-mono text-[11px] font-bold uppercase tracking-wider"
                style={{ color: STAGES[active].accent }}
              >
                Stage {active + 1 < 7 ? `0${active + 1}` : '∞'} · {STAGES[active].name}
              </p>
              <p className="text-balance text-sm leading-relaxed text-mist/85 sm:text-base">
                {STAGES[active].gloss}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-12 flex justify-center">
        <CtaButton href="#growth-score" variant="primary">
          Get Your Digital Growth Score →
        </CtaButton>
      </div>
    </Section>
  )
}
