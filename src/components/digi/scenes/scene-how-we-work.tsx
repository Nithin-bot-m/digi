'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Section, SectionHeading, GlassNode } from '@/components/digi/ui'
import { useReducedMotion } from '@/components/digi/hooks'

/**
 * Scene 17 — How We Work
 * H2: "How we work" (Source A §7 Section 10)
 *
 * 6-step path — VERBATIM from Source A §7 Section 10:
 *   01 Diagnose — Understand the business, audience, market and current digital footprint.
 *   02 Strategise — Identify the highest-value opportunities and define the roadmap.
 *   03 Build — Create the campaigns, content, digital experiences and measurement system.
 *   04 Activate — Launch the growth channels and customer journeys.
 *   05 Optimise — Test, measure, learn and improve.
 *   06 Scale — Automate what works and expand intelligently.
 *
 * Set-piece: vertical zig-zag path (alternating left/right) connected by a
 * gradient ribbon. Each step is a GlassNode with index="01".."06".
 * Reduced motion: simple vertical list (alternation still readable).
 *
 * Accent: violet #7B3FFE.
 *
 * Per dispatch note: stick with Source A's 6-step variant — do NOT blend with
 * Source B's Diagnose→Prioritise→Build→Launch→Optimise→Scale variant.
 */

type Step = {
  index: string
  title: string
  copy: string
  accent: string
}

const STEPS: Step[] = [
  {
    index: '01',
    title: 'Diagnose',
    copy: 'Understand the business, audience, market and current digital footprint.',
    accent: '#02A3FE',
  },
  {
    index: '02',
    title: 'Strategise',
    copy: 'Identify the highest-value opportunities and define the roadmap.',
    accent: '#2E4BFE',
  },
  {
    index: '03',
    title: 'Build',
    copy: 'Create the campaigns, content, digital experiences and measurement system.',
    accent: '#7B3FFE',
  },
  {
    index: '04',
    title: 'Activate',
    copy: 'Launch the growth channels and customer journeys.',
    accent: '#E93BF2',
  },
  {
    index: '05',
    title: 'Optimise',
    copy: 'Test, measure, learn and improve.',
    accent: '#FF544D',
  },
  {
    index: '06',
    title: 'Scale',
    copy: 'Automate what works and expand intelligently.',
    accent: '#FF8E2D',
  },
]

export function SceneHowWeWork() {
  const reduced = useReducedMotion()

  return (
    <Section id="scene-17-how-we-work" scene="17" tone="dark">
      <SectionHeading
        eyebrow="SCENE 17 · HOW WE WORK"
        h2={
          <>
            How we <span className="text-ribbon">work</span>
          </>
        }
        lead="A six-step path that connects diagnosis to scale — strategy before execution, measurement connected to outcomes, automation that compounds what already works."
      />

      {reduced ? (
        // Reduced motion — simple vertical list
        <ol className="mt-12 space-y-3">
          {STEPS.map((s) => (
            <li key={s.index}>
              <GlassNode index={s.index} title={s.title} accent={s.accent}>
                <p className="text-sm leading-relaxed text-mist/80">{s.copy}</p>
              </GlassNode>
            </li>
          ))}
        </ol>
      ) : (
        // Zig-zag path with gradient ribbon
        <div className="relative mt-16">
          {/* The vertical gradient ribbon running down the middle on lg, left on mobile */}
          <div
            className="absolute left-4 top-0 hidden h-full w-1 bg-ribbon sm:block lg:left-1/2 lg:-translate-x-1/2"
            aria-hidden="true"
            style={{ boxShadow: '0 0 24px -4px rgba(123,63,254,0.55)' }}
          />
          {/* Mobile vertical ribbon */}
          <div
            className="absolute left-4 top-0 h-full w-1 bg-ribbon sm:hidden"
            aria-hidden="true"
            style={{ boxShadow: '0 0 24px -4px rgba(123,63,254,0.55)' }}
          />

          <ol className="relative space-y-8 sm:space-y-12">
            {STEPS.map((s, i) => {
              const isLeft = i % 2 === 0
              return (
                <li
                  key={s.index}
                  className="relative grid grid-cols-1 items-center gap-4 sm:grid-cols-2 sm:gap-12"
                >
                  {/* Connecting node on the ribbon */}
                  <span
                    className="absolute left-4 top-6 z-10 inline-block h-3 w-3 -translate-x-1/2 rounded-full bg-mist sm:left-1/2"
                    style={{ boxShadow: `0 0 16px ${s.accent}, 0 0 0 3px ${s.accent}` }}
                    aria-hidden="true"
                  />

                  <motion.div
                    initial={{ opacity: 0, x: isLeft ? -24 : 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-15% 0px -10% 0px' }}
                    transition={{ duration: 0.55, ease: 'easeOut' }}
                    className={isLeft ? 'sm:order-1 sm:pr-8' : 'sm:order-2 sm:col-start-2 sm:pl-8'}
                    style={{ marginLeft: '1.5rem' }} // clear the mobile ribbon
                  >
                    <div className="sm:ml-0" style={{ marginLeft: 0 }}>
                      <GlassNode index={s.index} title={s.title} accent={s.accent}>
                        <p className="text-sm leading-relaxed text-mist/80">{s.copy}</p>
                        <div className="mt-3 flex items-center gap-2 text-[11px] text-mist/50">
                          <span
                            className="inline-block h-1.5 w-8 rounded-full"
                            style={{ background: s.accent, boxShadow: `0 0 12px ${s.accent}` }}
                          />
                          <span className="font-mono uppercase tracking-wider">{`Stage ${s.index}`}</span>
                        </div>
                      </GlassNode>
                    </div>
                  </motion.div>

                  {/* Empty side to preserve zig-zag layout on lg */}
                  <div className="hidden sm:block" aria-hidden="true" />
                </li>
              )
            })}
          </ol>
        </div>
      )}

      {/* Closing beat — automation + expansion arrow */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-15% 0px -10% 0px' }}
        transition={{ duration: 0.55 }}
        className="mt-12 text-center font-mono text-xs uppercase tracking-[0.28em] text-amber"
      >
        Diagnose → Strategise → Build → Activate → Optimise → Scale → ∞
      </motion.p>
    </Section>
  )
}
