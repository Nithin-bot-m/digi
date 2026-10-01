'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Section, SectionHeading } from '@/components/digi/ui'
import { useReducedMotion } from '@/components/digi/hooks'
import { cn } from '@/lib/utils'

/**
 * Scene 2 — Ecosystem (Master Prompt §6 Scene 2 + Source C flow)
 *
 * H2: "From Digital Presence to Business Growth"
 * Flow: Market → Presence → Visibility → Traffic → Conversion → Revenue → Retention
 *
 * 3D set-piece: 7 nodes in a horizontal line, each lights up in sequence
 * (staggered whileInView), connected by a gradient ribbon segment that
 * grows left-to-right. Each node is a small card with the stage name +
 * a one-line gloss. Accent: royal #2E4BFE.
 *
 * Tone: dark.
 */

const FLOW = [
  { name: 'Market', gloss: 'Understand demand and audience' },
  { name: 'Presence', gloss: 'Establish across surfaces that matter' },
  { name: 'Visibility', gloss: 'Become discoverable where they search' },
  { name: 'Traffic', gloss: 'Reach qualified audiences' },
  { name: 'Conversion', gloss: 'Turn attention into action' },
  { name: 'Revenue', gloss: 'Tie activity to business outcomes' },
  { name: 'Retention', gloss: 'Grow relationships and lifetime value' },
] as const

const ACCENT = '#2E4BFE'
const NODE_COLORS = ['#02A3FE', '#2E4BFE', '#7B3FFE', '#E93BF2', '#FF544D', '#FF8E2D', '#FFB020']

const VIEWPORT = { once: true, margin: '-15% 0px -10% 0px' } as const

export function SceneEcosystem() {
  const reduced = useReducedMotion()
  return (
    <Section id="scene-2-ecosystem" scene="2" tone="dark">
      <SectionHeading
        eyebrow="SCENE 2 — ECOSYSTEM"
        h2={<>From Digital Presence to Business Growth</>}
        lead={
          <>
            Each stage compounds into the next. Visibility without traffic is wasted.
            Traffic without conversion is expensive. Conversion without retention leaks value.
          </>
        }
        align="center"
        tone="dark"
        className="mx-auto items-center"
      />

      {/* 3D set-piece: 7 nodes lighting up in sequence + growing ribbon */}
      <FlowNodes reduced={reduced} />

      {/* Plain-HTML mirror (always visible for screen readers / no-JS) */}
      <ol className="sr-only">
        {FLOW.map((s) => (
          <li key={s.name}>
            <strong>{s.name}</strong> — {s.gloss}
          </li>
        ))}
      </ol>
    </Section>
  )
}

function FlowNodes({ reduced }: { reduced: boolean }) {
  return (
    <motion.div
      initial={reduced ? undefined : { opacity: 0 }}
      whileInView={reduced ? undefined : { opacity: 1 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.6 }}
      className="relative mt-16"
    >
      {/* Ribbon backdrop — a gradient segment that grows left-to-right */}
      <svg
        className="absolute left-0 right-0 top-7 hidden h-1 w-full sm:block"
        viewBox="0 0 1000 4"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="eco-ribbon" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#02A3FE" />
            <stop offset="0.18" stopColor="#2E4BFE" />
            <stop offset="0.38" stopColor="#7B3FFE" />
            <stop offset="0.58" stopColor="#E93BF2" />
            <stop offset="0.8" stopColor="#FF544D" />
            <stop offset="1" stopColor="#FF8E2D" />
          </linearGradient>
        </defs>
        <motion.line
          x1="0"
          y1="2"
          x2="1000"
          y2="2"
          stroke="url(#eco-ribbon)"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: reduced ? 1 : 0, opacity: 0.4 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={VIEWPORT}
          transition={{ duration: 1.8, ease: 'easeInOut', delay: 0.2 }}
        />
      </svg>

      {/* Mobile vertical connector */}
      <div
        className="absolute left-1/2 top-7 bottom-7 w-[3px] -translate-x-1/2 bg-ribbon sm:hidden"
        aria-hidden="true"
      />

      {/* Nodes */}
      <ol className="relative grid grid-cols-1 gap-y-10 sm:grid-cols-7 sm:gap-x-2 sm:gap-y-0">
        {FLOW.map((node, i) => {
          const color = NODE_COLORS[i]
          return (
            <motion.li
              key={node.name}
              className="relative flex flex-row items-center gap-3 sm:flex-col sm:items-center sm:text-center"
              initial={reduced ? undefined : { opacity: 0, y: 18, scale: 0.85 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0, scale: 1 }}
              viewport={VIEWPORT}
              transition={{
                duration: 0.55,
                ease: 'easeOut',
                delay: reduced ? 0 : 0.3 + i * 0.18,
              }}
            >
              <NodeDot color={color} index={i + 1} reduced={reduced} />
              <div className="sm:mt-4 sm:min-h-[64px]">
                <p className="text-sm font-bold text-mist sm:text-base">{node.name}</p>
                <p className="mt-0.5 text-[11px] leading-snug text-mist/60 sm:text-xs">
                  {node.gloss}
                </p>
              </div>
            </motion.li>
          )
        })}
      </ol>

      {/* Loop hint back to start — retention → market */}
      <motion.p
        initial={reduced ? undefined : { opacity: 0 }}
        whileInView={reduced ? undefined : { opacity: 1 }}
        viewport={VIEWPORT}
        transition={{ duration: 0.6, delay: 1.4 }}
        className="mt-12 text-center text-xs uppercase tracking-[0.28em] text-mist/50"
      >
        Retention feeds the next loop — <span className="text-ribbon">∞</span>
      </motion.p>
    </motion.div>
  )
}

function NodeDot({
  color,
  index,
  reduced,
}: {
  color: string
  index: number
  reduced: boolean
}) {
  return (
    <span className="relative inline-flex h-14 w-14 shrink-0 items-center justify-center">
      <motion.span
        className="absolute inset-0 rounded-full"
        initial={reduced ? { opacity: 0.9 } : { opacity: 0, scale: 0.5 }}
        whileInView={reduced ? undefined : { opacity: 1, scale: 1 }}
        viewport={VIEWPORT}
        transition={{ duration: 0.5, delay: reduced ? 0 : 0.3 + index * 0.18 }}
        style={{
          background: `${color}22`,
          border: `1.5px solid ${color}`,
          boxShadow: `0 0 24px -4px ${color}99, inset 0 0 12px ${color}33`,
        }}
        aria-hidden="true"
      />
      {reduced && (
        <span
          className="absolute inset-0 rounded-full"
          style={{
            background: `${color}22`,
            border: `1.5px solid ${color}`,
            boxShadow: `0 0 24px -4px ${color}99`,
          }}
        />
      )}
      <span
        className={cn('relative font-mono text-sm tabular font-bold')}
        style={{ color }}
      >
        {String(index).padStart(2, '0')}
      </span>
    </span>
  )
}
