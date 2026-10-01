'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Section, SectionHeading } from '@/components/digi/ui'
import { Illustrative } from '@/components/digi/brand'
import { useReducedMotion } from '@/components/digi/hooks'
import { cn } from '@/lib/utils'

/**
 * Scene 1 — Problem (Content Pack Source A §5 Section 2)
 *
 * H2: "Being online isn't enough."
 * Body verbatim.
 * Transition quote: "Digi∞Artha connects the system." — large gradient text.
 *
 * 3D set-piece: scattered glowing fragments (small divs with gradient borders
 * + glow) that snap onto a horizontal ribbon line on whileInView.
 * Reduced-motion: static row of fragments already on the line.
 *
 * Tone: dark. Accent: cyan #02A3FE.
 */

const FRAGMENTS = [
  { label: 'SEO', color: '#02A3FE' },
  { label: 'Ads', color: '#2E4BFE' },
  { label: 'Content', color: '#7B3FFE' },
  { label: 'Website', color: '#E93BF2' },
  { label: 'CRM', color: '#FF544D' },
  { label: 'Analytics', color: '#FF8E2D' },
] as const

const VIEWPORT = { once: true, margin: '-15% 0px -10% 0px' } as const

export function SceneProblem() {
  const reduced = useReducedMotion()
  return (
    <Section id="scene-1-problem" scene="1" tone="dark">
      <SectionHeading
        eyebrow="SCENE 1 — PROBLEM"
        h2={<>Being online isn&rsquo;t enough.</>}
        lead={
          <>
            Customers search. They compare. They watch. They ask AI. They read reviews.
            They visit websites. They message brands. They make decisions across multiple
            digital touchpoints. When SEO, ads, content, website, CRM and analytics operate
            separately, growth becomes harder to understand and harder to scale.
          </>
        }
        tone="dark"
      />

      {/* 3D set-piece: scattered fragments snap onto a horizontal ribbon line */}
      <FragmentsToRibbon reduced={reduced} />

      {/* Transition quote — large gradient text */}
      <motion.blockquote
        initial={reduced ? undefined : { opacity: 0, y: 16 }}
        whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
        viewport={VIEWPORT}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
        className="mx-auto mt-16 max-w-3xl text-center"
      >
        <p className="text-balance text-3xl font-extrabold leading-[1.1] sm:text-4xl lg:text-5xl">
          <span className="text-ribbon">&ldquo;Digi∞Artha connects the system.&rdquo;</span>
        </p>
      </motion.blockquote>

      {/* Footnote-style tag explaining that the diagram is illustrative */}
      <p className="mt-6 flex items-center justify-center gap-2 text-xs text-mist/50">
        <Illustrative /> Stylised diagram — actual channel mix varies per business.
      </p>
    </Section>
  )
}

function FragmentsToRibbon({ reduced }: { reduced: boolean }) {
  if (reduced) {
    // Static fallback: fragments already on the line
    return (
      <div className="mt-12">
        <div className="relative h-px w-full bg-ribbon opacity-80" />
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          {FRAGMENTS.map((f) => (
            <span
              key={f.label}
              className="inline-flex items-center gap-2 rounded-full border bg-ink-soft/60 px-3 py-1.5 text-xs font-semibold text-mist"
              style={{ borderColor: `${f.color}66`, boxShadow: `0 0 12px -2px ${f.color}55` }}
            >
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ background: f.color }}
              />
              {f.label}
            </span>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div
      className="relative mt-12 h-64 sm:h-56"
      role="img"
      aria-label="Disconnected channel fragments snapping onto the Digi∞Artha growth ribbon"
    >
      {/* The horizontal ribbon line that fragments will snap onto */}
      <motion.div
        className="absolute left-0 right-0 top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-ribbon glow-ribbon"
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={VIEWPORT}
        transition={{ duration: 1.0, ease: 'easeOut', delay: 0.4 }}
        style={{ transformOrigin: 'left center' }}
      />

      {/* Fragments: start scattered (above/below the line), snap onto the line in sequence */}
      <div className="absolute inset-0">
        {FRAGMENTS.map((f, i) => {
          // distribute across horizontal axis
          const leftPct = 8 + i * (84 / (FRAGMENTS.length - 1))
          // initial scatter: alternate above / below the line
          const above = i % 2 === 0
          const scatterY = above ? -80 - (i % 3) * 16 : 60 + (i % 3) * 16
          const rotate = above ? -8 - (i % 5) * 3 : 6 + (i % 5) * 3
          return (
            <motion.div
              key={f.label}
              className="absolute top-1/2 -translate-y-1/2"
              style={{ left: `${leftPct}%` }}
              initial={{ y: scatterY, opacity: 0, rotate, scale: 0.6 }}
              whileInView={{ y: 0, opacity: 1, rotate: 0, scale: 1 }}
              viewport={VIEWPORT}
              transition={{
                duration: 0.9,
                ease: 'easeOut',
                delay: 0.6 + i * 0.12,
                type: 'spring',
                stiffness: 120,
                damping: 14,
              }}
            >
              <FragmentChip color={f.color} label={f.label} />
            </motion.div>
          )
        })}
      </div>

      {/* Sparkle connectors — small dots that travel left-to-right while snapping */}
      <motion.span
        className="absolute top-1/2 left-0 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-mist"
        initial={{ left: '0%', opacity: 0 }}
        whileInView={{ left: '100%', opacity: [0, 1, 1, 0] }}
        viewport={VIEWPORT}
        transition={{ duration: 1.4, ease: 'easeInOut', delay: 0.4 }}
        style={{ boxShadow: '0 0 12px rgba(255,255,255,0.85)' }}
        aria-hidden="true"
      />
    </div>
  )
}

function FragmentChip({ color, label }: { color: string; label: string }) {
  return (
    <span
      className={cn(
        'shine-sweep inline-flex -translate-x-1/2 items-center gap-2.5 rounded-xl px-3.5 py-2 text-xs font-semibold text-mist transition-all duration-300 hover:scale-110 hover:-translate-y-1',
        'glass-dark',
      )}
      style={{
        borderColor: `${color}66`,
        boxShadow: `0 0 0 1px ${color}33, 0 0 20px -6px ${color}77`,
      }}
    >
      <span
        className="pulse-ring-badge relative inline-block h-2.5 w-2.5 rounded-full"
        style={{ background: color, color: color, boxShadow: `0 0 10px ${color}` }}
      />
      {label}
    </span>
  )
}
