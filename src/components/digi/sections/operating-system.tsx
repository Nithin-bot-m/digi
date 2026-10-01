'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, ArrowUp } from 'lucide-react'
import {
  Section,
  SectionHeading,
  CtaButton,
} from '@/components/digi/ui'
import { Illustrative } from '@/components/digi/brand'
import { useReducedMotion } from '@/components/digi/hooks'

/**
 * SectionOperatingSystem — Digital Growth Operating System
 * Diagram (Master Prompt §10): Discover / Acquire / Convert → Measure →
 * Nurture → Retain → Scale (closing the loop back to Discover via Optimise).
 * Tone: dark. Accent: violet #7B3FFE.
 */

type Node = { index: string; title: string; gloss: string }

const FRONT: Node[] = [
  {
    index: '01',
    title: 'Discover',
    gloss: 'Understand the market, audience and opportunity before spending.',
  },
  {
    index: '02',
    title: 'Acquire',
    gloss: 'Build visibility across search, AI, paid, social and content.',
  },
  {
    index: '03',
    title: 'Convert',
    gloss: 'Turn attention into leads, qualified opportunities and sales.',
  },
]

const BACK: Node[] = [
  { index: '04', title: 'Nurture', gloss: 'Develop relationships across email, WhatsApp and CRM.' },
  { index: '05', title: 'Retain', gloss: 'Strengthen loyalty, LTV and repeat purchase.' },
  { index: '06', title: 'Scale', gloss: 'Automate what works and expand across markets.' },
]

const ACCENT = '#7B3FFE'

export function SectionOperatingSystem() {
  const reduced = useReducedMotion()

  return (
    <Section id="operating-system" scene="OS" tone="dark">
      <SectionHeading
        eyebrow="DIGITAL GROWTH OPERATING SYSTEM"
        h2={
          <>
            One operating system for{' '}
            <span className="text-ribbon">digital growth</span>.
          </>
        }
        lead="The loop never truly ends — the last scene loops back and the ∞ grows larger."
        align="center"
      />

      <div className="mt-16 flex flex-col items-center gap-8 lg:gap-12">
        {/* Row 1 — front of the loop */}
        <NodeRow nodes={FRONT} reduced={reduced} />

        {/* Vertical connector — Measure (down) + Optimise (up) */}
        <div className="relative flex flex-col items-center gap-3 py-2">
          {/* down arrow */}
          <div className="flex flex-col items-center gap-1">
            <span
              className="rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider"
              style={{
                color: ACCENT,
                background: `${ACCENT}1A`,
                border: `1px solid ${ACCENT}33`,
              }}
            >
              Measure
            </span>
            <motion.div
              initial={reduced ? undefined : { opacity: 0, scaleY: 0 }}
              whileInView={{ opacity: 1, scaleY: 1 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="flex flex-col items-center"
              style={{ transformOrigin: 'top' }}
            >
              <div
                className="h-10 w-px"
                style={{ background: `linear-gradient(${ACCENT}, #E93BF2)` }}
                aria-hidden
              />
              <ArrowDown size={16} style={{ color: ACCENT }} aria-hidden />
            </motion.div>
          </div>

          {/* up arrow (closing loop) */}
          <motion.div
            initial={reduced ? undefined : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
            className="flex flex-col items-center gap-1"
          >
            <ArrowUp size={16} style={{ color: '#FF8E2D' }} aria-hidden />
            <div
              className="h-10 w-px"
              style={{ background: `linear-gradient(#FF544D, #FF8E2D)` }}
              aria-hidden
            />
            <span
              className="rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider"
              style={{
                color: '#FF8E2D',
                background: '#FF8E2D1A',
                border: '1px solid #FF8E2D33',
              }}
            >
              Optimise
            </span>
          </motion.div>
        </div>

        {/* Row 2 — back of the loop */}
        <NodeRow nodes={BACK} reduced={reduced} />
      </div>

      <motion.p
        initial={reduced ? undefined : { opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.15 }}
        className="mx-auto mt-10 max-w-2xl text-center text-sm text-mist/60"
      >
        The loop never truly ends — the last scene loops back and the ∞ grows larger.
        <span className="ml-2 inline-flex align-middle">
          <Illustrative />
        </span>
      </motion.p>

      <div className="mt-10 flex justify-center">
        <CtaButton href="#contact" variant="primary">
          Build My Growth Operating System →
        </CtaButton>
      </div>
    </Section>
  )
}

function NodeRow({ nodes, reduced }: { nodes: Node[]; reduced: boolean }) {
  return (
    <motion.ol
      initial={reduced ? undefined : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-15% 0px -10% 0px' }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className="grid w-full max-w-5xl grid-cols-1 items-stretch gap-4 sm:grid-cols-3 lg:gap-6"
      aria-label="Growth operating system stage"
    >
      {nodes.map((n, i) => (
        <li key={n.index} className="contents">
          <div className="flex items-stretch gap-3 sm:contents sm:gap-0">
            <div
              className="glass-dark relative flex h-full flex-col gap-2 rounded-2xl p-5"
              style={{
                boxShadow: `0 0 0 1px ${ACCENT}22, 0 14px 40px -16px ${ACCENT}55`,
              }}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs tabular" style={{ color: ACCENT }}>
                  {n.index}
                </span>
                <span
                  className="inline-block h-2 w-2 rounded-full"
                  style={{ background: ACCENT, boxShadow: `0 0 12px ${ACCENT}` }}
                  aria-hidden
                />
              </div>
              <h3 className="text-lg font-bold text-mist">{n.title}</h3>
              <p className="text-sm leading-relaxed text-mist/70">{n.gloss}</p>
            </div>

            {/* Ribbon connector between cards (desktop) */}
            {i < nodes.length - 1 && (
              <div
                className="hidden h-px w-6 self-center bg-ribbon sm:block"
                aria-hidden
                style={{ minHeight: 2 }}
              />
            )}
          </div>
        </li>
      ))}
    </motion.ol>
  )
}
