'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Section, SectionHeading, CtaButton, GlassNode } from '@/components/digi/ui'
import { useReducedMotion } from '@/components/digi/hooks'

/**
 * Scene 12 — Optimise & Scale
 * H2: "Use AI where it creates real business value." (Source A §14 H1)
 * Accent: amber #FFB020
 *
 * Set-piece: 3 lanes (Organic / Paid / Performance) as horizontal bars. On
 * whileInView the "best" lane (Performance, coral → orange) thickens while
 * the others stay thin — the "best lanes thicken" beat from Master Prompt
 * §6 Scene 12. Three GlassNode cards list the AI Marketing / AI Automation /
 * AI Technology service bullets verbatim from Source A §14.
 */

const PILLARS = [
  {
    title: 'AI Marketing',
    accent: '#7B3FFE',
    bullets: [
      'AI content workflows',
      'Campaign analysis',
      'AI reporting',
      'Creative assistance',
      'AI search monitoring',
      'Brand monitoring',
    ],
  },
  {
    title: 'AI Automation',
    accent: '#E93BF2',
    bullets: [
      'AI chatbots',
      'Lead qualification',
      'Automated routing',
      'CRM workflows',
      'Personalisation',
      'Customer support',
      'Predictive analytics',
    ],
  },
  {
    title: 'AI Technology',
    accent: '#FFB020',
    bullets: [
      'AI agents',
      'Custom AI workflows',
      'Custom AI tools',
      'Marketing automation',
      'Business process automation',
    ],
  },
]

const LANES = [
  { id: 'Organic', lane: 'lane-organic', accent: '#02A3FE', tagline: 'Steady compounding glow' },
  { id: 'Paid', lane: 'lane-inorganic', accent: '#7B3FFE', tagline: 'Fast targeted pulses' },
  { id: 'Performance', lane: 'lane-performance', accent: '#FF544D', tagline: 'Precise measured beats — best lane' },
]

export function SceneOptimise() {
  const reduced = useReducedMotion()

  return (
    <Section id="scene-12-optimise" scene="12" tone="dark">
      <SectionHeading
        eyebrow="SCENE 12 · OPTIMISE & SCALE"
        h2={
          <>
            Use AI where it creates <span className="text-ribbon">real business value.</span>
          </>
        }
        lead={
          <>
            We use AI to improve marketing workflows, analysis, content operations, customer journeys and automation —
            without treating AI as a substitute for strategy.
          </>
        }
      />

      {/* 3 pillars */}
      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {PILLARS.map((p, i) => (
          <GlassNode key={p.title} index={`0${i + 1}`} title={p.title} accent={p.accent}>
            <ul className="mt-1 space-y-1.5">
              {p.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm text-mist/80">
                  <span
                    className="mt-1.5 inline-block h-1 w-1 flex-none rounded-full"
                    style={{ background: p.accent, boxShadow: `0 0 8px ${p.accent}` }}
                  />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </GlassNode>
        ))}
      </div>

      {/* Lane set-piece — best lane (Performance) thickens */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-15% 0px -10% 0px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="mt-14"
      >
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-mist/60">
          Best lanes thicken — automation routes budget toward what compounds
        </h3>
        <div className="space-y-4">
          {LANES.map((lane, i) => {
            const isBest = lane.id === 'Performance'
            return (
              <div key={lane.id} className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                <div className="w-32 flex-none">
                  <p className="font-mono text-sm font-bold text-mist">{lane.id}</p>
                  <p className="text-[11px] text-mist/50">{lane.tagline}</p>
                </div>
                <div className="relative flex-1">
                  <motion.div
                    initial={false}
                    whileInView={
                      reduced
                        ? undefined
                        : isBest
                          ? { height: 28, opacity: 1 }
                          : { height: 6, opacity: 0.6 }
                    }
                    viewport={{ once: true, margin: '-15% 0px -10% 0px' }}
                    transition={{ duration: 0.7, delay: i * 0.12, ease: 'easeOut' }}
                    style={{ height: isBest ? 28 : 6, opacity: isBest ? 1 : 0.6 }}
                    className={`${lane.lane} relative overflow-hidden rounded-full`}
                  >
                    {!reduced && (
                      <div
                        className="absolute inset-0 rounded-full"
                        style={{
                          background:
                            'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.45) 50%, transparent 100%)',
                          backgroundSize: '200% 100%',
                          animation: 'ribbon-flow 5s linear infinite',
                        }}
                      />
                    )}
                  </motion.div>
                  {isBest && (
                    <span
                      className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-[11px] font-bold uppercase tracking-wider text-white"
                    >
                      best-performing lane
                    </span>
                  )}
                </div>
                <span
                  className="hidden w-2 self-stretch rounded-full sm:block"
                  style={{ background: lane.accent, boxShadow: `0 0 16px ${lane.accent}` }}
                />
              </div>
            )
          })}
        </div>
      </motion.div>

      <div className="mt-12 flex justify-center">
        <CtaButton href="#contact" variant="primary">
          Explore an AI Growth Opportunity →
        </CtaButton>
      </div>
    </Section>
  )
}
