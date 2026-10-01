'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Section, SectionHeading, CtaButton } from '@/components/digi/ui'
import { Illustrative } from '@/components/digi/brand'
import { useReducedMotion } from '@/components/digi/hooks'
import { cn } from '@/lib/utils'

/**
 * Scene 9 — Convert (lead-birth moment) (Source A §11 + Master Prompt §5.6)
 *
 * H2: "Don't just bring visitors. Give them a reason to act."
 * Conversion journey: Visitor → Lead → Qualified Lead → Opportunity → Customer
 *
 * 3D set-piece (the emotional peak — Master Prompt §5.6 lead-birth):
 * particles (small divs with gradient bg + glow) funnel from the left into
 * a "landing page" rectangle, then a "lead card" ignites in coral/orange
 * and lifts off (translateY up + fade). Framer Motion whileInView with a
 * staggered timeline. Reduced motion: show final state statically.
 *
 * Tone: dark. Accent: coral #FF544D → orange #FF8E2D.
 */

const JOURNEY = [
  { name: 'Visitor', color: '#FF544D' },
  { name: 'Lead', color: '#FF8E2D' },
  { name: 'Qualified Lead', color: '#FFB020' },
  { name: 'Opportunity', color: '#FF544D' },
  { name: 'Customer', color: '#FF8E2D' },
] as const

const PARTICLE_COUNT = 22

const VIEWPORT = { once: true, margin: '-15% 0px -10% 0px' } as const

/** Deterministic pseudo-random — same input → same output on server AND client
 *  (avoids React hydration mismatch warnings). */
function rand(i: number, salt: number): number {
  const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453
  return x - Math.floor(x)
}

/** Pre-computed particle config — stable across SSR + client hydration. */
const PARTICLES = Array.from({ length: PARTICLE_COUNT }, (_, i) => {
  const startX = -20 - rand(i, 1) * 120
  const startY = 30 + rand(i, 2) * 220
  const targetX = 360 + (rand(i, 3) - 0.5) * 60
  const targetY = 160
  const color = i % 2 === 0 ? '#FF544D' : '#FF8E2D'
  return { startX, startY, targetX, targetY, color }
})

export function SceneConvert() {
  const reduced = useReducedMotion()
  return (
    <Section id="scene-9-convert" scene="9" tone="dark">
      <SectionHeading
        eyebrow="SCENE 9 — CONVERT"
        h2={<>Don&rsquo;t just bring visitors. Give them a reason to act.</>}
        lead={
          <>
            We build digital experiences around user intent, trust and measurable conversion.
            The lead-birth moment below shows how attention becomes a qualified opportunity —
            and how that feeds back into the growth system.
          </>
        }
        align="center"
        tone="dark"
        className="mx-auto items-center"
      />

      {/* Conversion journey — horizontal flow of 5 glowing nodes */}
      <JourneyFlow reduced={reduced} />

      {/* 3D set-piece — lead-birth */}
      <LeadBirth reduced={reduced} />

      {/* CTA */}
      <div className="mt-12 flex justify-center">
        <CtaButton href="#contact" variant="primary">
          Improve My Conversion Journey →
        </CtaButton>
      </div>

      <p className="mt-8 flex items-center justify-center gap-2 text-xs text-mist/50">
        <Illustrative /> Stylised dramatisation of the lead-birth moment. Actual conversion
        rates vary by industry and landing-page maturity.
      </p>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* Journey flow                                                       */
/* ------------------------------------------------------------------ */

function JourneyFlow({ reduced }: { reduced: boolean }) {
  return (
    <motion.ol
      initial={reduced ? undefined : { opacity: 0 }}
      whileInView={reduced ? undefined : { opacity: 1 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.6 }}
      className="relative mt-12 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:gap-2"
      aria-label="Conversion journey"
    >
      {/* Connecting line on desktop */}
      <div
        className="absolute left-0 right-0 top-1/2 hidden h-[3px] -translate-y-1/2 bg-ribbon sm:block"
        aria-hidden="true"
      />
      {JOURNEY.map((stage, i) => (
        <motion.li
          key={stage.name}
          initial={reduced ? undefined : { opacity: 0, y: 16 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.5, ease: 'easeOut', delay: reduced ? 0 : 0.2 + i * 0.15 }}
          className="relative flex flex-1 items-center justify-center"
        >
          <div
            className="glass-dark relative z-10 flex flex-col items-center gap-1 rounded-2xl px-3 py-2.5 sm:min-w-[110px]"
            style={{
              boxShadow: `0 0 0 1px ${stage.color}33, 0 8px 24px -8px ${stage.color}55`,
            }}
          >
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{ background: stage.color, boxShadow: `0 0 12px ${stage.color}` }}
            />
            <p className="font-mono text-[10px] tabular text-mist/50">
              {String(i + 1).padStart(2, '0')}
            </p>
            <p className="text-center text-xs font-semibold text-mist sm:text-sm">
              {stage.name}
            </p>
          </div>
        </motion.li>
      ))}
    </motion.ol>
  )
}

/* ------------------------------------------------------------------ */
/* Lead-birth set-piece                                              */
/* ------------------------------------------------------------------ */

function LeadBirth({ reduced }: { reduced: boolean }) {
  // Gate decorative motion particles behind mount so SSR + client produce identical HTML
  // (avoids Framer Motion transform-precision hydration mismatches).
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])

  if (reduced) {
    return <LeadBirthStatic />
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.6 }}
      className="relative mx-auto mt-16 h-80 max-w-4xl"
      role="img"
      aria-label="Particles funnel from the left into a landing page, igniting a coral-orange lead card that lifts off"
    >
      {/* Funnel arrow track */}
      <svg
        className="absolute inset-x-0 top-1/2 hidden h-1 w-full -translate-y-1/2 sm:block"
        viewBox="0 0 800 4"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="lead-funnel" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#FF544D" />
            <stop offset="1" stopColor="#FF8E2D" />
          </linearGradient>
        </defs>
        <line x1="0" y1="2" x2="800" y2="2" stroke="url(#lead-funnel)" strokeWidth="2" strokeDasharray="6 6" opacity="0.55" />
      </svg>

      {/* Particles funneling in — mounted-gated to avoid SSR/client transform mismatch */}
      {mounted && PARTICLES.map((p, i) => {
        return (
          <motion.span
            key={i}
            className="absolute h-2 w-2 rounded-full"
            style={{
              background: p.color,
              boxShadow: `0 0 8px ${p.color}, 0 0 16px ${p.color}77`,
              left: 0,
              top: 0,
            }}
            initial={{ x: p.startX, y: p.startY, opacity: 0, scale: 0.4 }}
            whileInView={{
              x: p.targetX,
              y: p.targetY,
              opacity: [0, 1, 1, 0],
              scale: [0.4, 1.2, 1, 0],
            }}
            viewport={VIEWPORT}
            transition={{
              duration: 1.4,
              delay: 0.3 + (i / PARTICLE_COUNT) * 1.6,
              ease: 'easeInOut',
            }}
          />
        )
      })}

      {/* Landing page rectangle */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={VIEWPORT}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="absolute left-1/2 top-1/2 h-32 w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/15 bg-ink-deep/80 p-3"
        style={{ boxShadow: '0 0 0 1px rgba(255,255,255,0.04), 0 16px 60px -10px rgba(255,84,77,0.35)' }}
      >
        <div className="mb-2 h-2 w-1/3 rounded-full bg-white/20" />
        <div className="mb-1.5 h-1.5 w-2/3 rounded-full bg-white/15" />
        <div className="mb-3 h-1.5 w-1/2 rounded-full bg-white/10" />
        <div
          className="rounded-lg bg-ribbon px-3 py-1.5 text-center text-[10px] font-bold text-white"
          style={{ boxShadow: '0 0 24px -6px rgba(255,84,77,0.7)' }}
        >
          Get Your Digital Growth Score →
        </div>
        <p className="mt-1.5 text-center text-[9px] text-mist/40">Landing page · CTA</p>
      </motion.div>

      {/* Lead card ignition + lift off */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2"
        initial={{ y: 0, opacity: 0, scale: 0.6 }}
        whileInView={{
          y: -160,
          opacity: [0, 0, 1, 1, 0.85],
          scale: [0.6, 0.7, 1.05, 1, 1],
        }}
        viewport={VIEWPORT}
        transition={{
          duration: 2.2,
          delay: 1.6,
          ease: 'easeOut',
          times: [0, 0.2, 0.5, 0.7, 1],
        }}
        style={{ boxShadow: '0 24px 60px -16px rgba(255,84,77,0.55)' }}
      >
        <LeadCard />
      </motion.div>

      {/* Burst flash under the lead card at ignition */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(255,84,77,0.5), transparent 70%)' }}
        initial={{ opacity: 0, scale: 0.4 }}
        whileInView={{
          opacity: [0, 0.7, 0],
          scale: [0.4, 1.8, 2.4],
        }}
        viewport={VIEWPORT}
        transition={{ duration: 1.2, delay: 1.4, ease: 'easeOut' }}
        aria-hidden="true"
      />
    </motion.div>
  )
}

function LeadBirthStatic() {
  // Reduced motion: show the final state statically (lead card already lifted)
  return (
    <div
      className="relative mx-auto mt-16 h-80 max-w-4xl"
      role="img"
      aria-label="Particles have already funnelled into a landing page; a coral-orange lead card is lifted off"
    >
      {/* Landing page */}
      <div className="absolute left-1/2 top-1/2 h-32 w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/15 bg-ink-deep/80 p-3"
        style={{ boxShadow: '0 0 0 1px rgba(255,255,255,0.04), 0 16px 60px -10px rgba(255,84,77,0.35)' }}
      >
        <div className="mb-2 h-2 w-1/3 rounded-full bg-white/20" />
        <div className="mb-1.5 h-1.5 w-2/3 rounded-full bg-white/15" />
        <div className="mb-3 h-1.5 w-1/2 rounded-full bg-white/10" />
        <div
          className="rounded-lg bg-ribbon px-3 py-1.5 text-center text-[10px] font-bold text-white"
          style={{ boxShadow: '0 0 24px -6px rgba(255,84,77,0.7)' }}
        >
          Get Your Digital Growth Score →
        </div>
        <p className="mt-1.5 text-center text-[9px] text-mist/40">Landing page · CTA</p>
      </div>

      {/* Lead card lifted (final state) */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[200px]"
        style={{ boxShadow: '0 24px 60px -16px rgba(255,84,77,0.55)' }}
      >
        <LeadCard />
      </div>

      {/* Static glow halo */}
      <div
        className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50"
        style={{ background: 'radial-gradient(circle, rgba(255,84,77,0.4), transparent 70%)' }}
        aria-hidden="true"
      />
    </div>
  )
}

function LeadCard() {
  return (
    <div
      className="w-[260px] rounded-2xl border border-coral/40 bg-ink-deep p-3 text-mist glow-coral"
      style={{ boxShadow: '0 0 0 1px rgba(255,84,77,0.5), 0 24px 60px -16px rgba(255,84,77,0.7)' }}
    >
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-coral">
          <span className="inline-block h-2 w-2 rounded-full bg-coral" style={{ boxShadow: '0 0 12px #FF544D' }} />
          New Lead · Ignited
        </span>
        <span className="font-mono text-[9px] text-mist/40">Now</span>
      </div>
      <p className="mt-2 text-sm font-bold text-mist">Qualified opportunity</p>
      <p className="text-[11px] text-mist/65">Routed to CRM · triggered nurturing sequence</p>
      <div className="mt-2 flex items-center gap-1">
        <span className="rounded-full bg-coral/15 px-1.5 py-0.5 text-[9px] font-semibold text-coral">Source: Landing page</span>
        <span className="rounded-full bg-orange/15 px-1.5 py-0.5 text-[9px] font-semibold text-orange">Score: warm</span>
      </div>
    </div>
  )
}
