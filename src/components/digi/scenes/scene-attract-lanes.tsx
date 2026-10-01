'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Section, SectionHeading, CtaButton, Tag } from '@/components/digi/ui'
import { Illustrative } from '@/components/digi/brand'
import { useReducedMotion } from '@/components/digi/hooks'
import { cn } from '@/lib/utils'

/**
 * Scene 7 — Attract 3 lanes (Master Prompt §6 Scene 7 + §7)
 *
 * H2: "Reach the audiences that matter — across three lanes."
 *
 * Three lane cards in a row (stack on mobile). Clicking one lane
 * "spotlights" it — others dim to 50% opacity, the active one scales up
 * slightly + its motion intensifies. Default active = Organic.
 *
 * All timeframes + metrics carry <Illustrative />.
 *
 * Lane gradients (from globals.css):
 *  - lane-organic    cyan→royal   #02A3FE→#2E4BFE
 *  - lane-inorganic  violet→magenta #7B3FFE→#E93BF2
 *  - lane-performance coral→orange #FF544D→#FF8E2D
 *
 * Tone: dark.
 */

type LaneId = 'organic' | 'paid' | 'performance'

type Lane = {
  id: LaneId
  name: string
  tagline: string
  motion: 'compounding glow' | 'fast pulses' | 'precise measured beats'
  timeframe: string
  metrics: string[]
  gradient: string
  color: string
  colorEnd: string
  channels: string[]
}

const LANES: Lane[] = [
  {
    id: 'organic',
    name: 'Organic',
    tagline: 'Compounding visibility across search, content and social',
    motion: 'compounding glow',
    timeframe: '3–6 months to compound',
    metrics: ['Organic sessions', 'Ranked keywords', 'AI visibility'],
    gradient: 'lane-organic',
    color: '#02A3FE',
    colorEnd: '#2E4BFE',
    channels: ['SEO', 'Content', 'Social', 'Local', 'AI visibility'],
  },
  {
    id: 'paid',
    name: 'Inorganic / Paid',
    tagline: 'Fast demand activation across paid surfaces',
    motion: 'fast pulses',
    timeframe: 'weeks to first conversions',
    metrics: ['CPL', 'CPA', 'ROAS', 'Pipeline'],
    gradient: 'lane-inorganic',
    color: '#7B3FFE',
    colorEnd: '#E93BF2',
    channels: ['Google', 'Meta', 'YouTube', 'LinkedIn ads'],
  },
  {
    id: 'performance',
    name: 'Performance',
    tagline: 'Creative testing + landing-page CRO + measurement',
    motion: 'precise measured beats',
    timeframe: 'continuous',
    metrics: ['Conversion rate', 'CAC', 'LTV'],
    gradient: 'lane-performance',
    color: '#FF544D',
    colorEnd: '#FF8E2D',
    channels: ['Creative testing', 'Landing-page CRO', 'Measurement'],
  },
]

export function SceneAttractLanes() {
  const [lane, setLane] = React.useState<LaneId>('organic')
  const reduced = useReducedMotion()
  const active = LANES.find((l) => l.id === lane)!

  return (
    <Section id="scene-7-attract" scene="7" tone="dark">
      <SectionHeading
        eyebrow="SCENE 7 — ATTRACT"
        h2={<>Reach the audiences that matter — across three lanes.</>}
        lead={
          <>
            The Digi∞Artha ribbon splits into three lanes, each with its own motion: steady
            compounding glow for Organic, fast pulses for Paid, and precise measured beats
            for Performance. Spotlight the lane that fits your business today.
          </>
        }
        align="center"
        tone="dark"
        className="mx-auto items-center"
      />

      {/* Lane switcher controls */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-2" role="tablist" aria-label="Attract lane switcher">
        {LANES.map((l) => {
          const isActive = l.id === lane
          return (
            <button
              key={l.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => setLane(l.id)}
              className={cn(
                'inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all',
                isActive
                  ? 'border-transparent text-white'
                  : 'border-white/15 text-mist/65 hover:border-white/30 hover:text-mist',
              )}
              style={
                isActive
                  ? { background: l.color, boxShadow: `0 0 24px -6px ${l.color}AA` }
                  : undefined
              }
            >
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ background: isActive ? '#fff' : l.color }}
              />
              {l.name}
            </button>
          )
        })}
      </div>

      {/* Lane cards */}
      <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-3">
        {LANES.map((l) => {
          const isActive = l.id === lane
          return (
            <motion.button
              key={l.id}
              type="button"
              onClick={() => setLane(l.id)}
              initial={reduced ? undefined : { opacity: 0, y: 18 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              animate={
                reduced
                  ? undefined
                  : {
                      opacity: isActive ? 1 : 0.5,
                      scale: isActive ? 1.03 : 1,
                    }
              }
              className={cn(
                'relative flex h-full flex-col gap-4 overflow-hidden rounded-3xl p-6 text-left transition-all',
                'glass-dark',
                isActive && 'glow-ribbon',
              )}
              style={{
                boxShadow: isActive
                  ? `0 0 0 1px ${l.color}55, 0 24px 60px -16px ${l.colorEnd}88`
                  : `0 0 0 1px ${l.color}22`,
              }}
              aria-pressed={isActive}
            >
              {/* Lane motion visualisation — top stripe */}
              <LaneStripe lane={l} active={isActive} reduced={reduced} />

              {/* Header */}
              <div className="mt-2">
                <p className="font-mono text-xs tabular uppercase tracking-[0.28em]" style={{ color: l.color }}>
                  Lane {LANES.indexOf(l) + 1}
                </p>
                <h3 className="mt-1 text-2xl font-extrabold text-mist">{l.name}</h3>
                <p className="mt-1 text-sm text-mist/65">{l.tagline}</p>
              </div>

              {/* Motion type */}
              <div>
                <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-mist/45">
                  Motion
                </p>
                <p className="text-sm text-mist/80">{l.motion}</p>
              </div>

              {/* Timeframe */}
              <div>
                <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-mist/45">
                  Typical timeframe
                </p>
                <p className="flex items-center gap-2 text-sm font-semibold text-mist">
                  {l.timeframe}
                  <Illustrative />
                </p>
              </div>

              {/* Metrics */}
              <div>
                <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-mist/45">
                  Metrics
                </p>
                <ul className="flex flex-wrap gap-1.5">
                  {l.metrics.map((m) => (
                    <li key={m}>
                      <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-mist/85" style={{ background: `${l.color}1A`, border: `1px solid ${l.color}33` }}>
                        {m}
                        <Illustrative className="!px-1.5 !py-0 !text-[9px]" />
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Channels */}
              <div className="mt-auto pt-2">
                <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-mist/45">
                  Channels
                </p>
                <p className="text-sm text-mist/70">{l.channels.join(' · ')}</p>
              </div>

              {/* Spotlight hint when active */}
              {isActive && (
                <span
                  className="pointer-events-none absolute right-4 top-4 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white"
                  style={{ background: l.color }}
                >
                  Spotlight
                </span>
              )}
            </motion.button>
          )
        })}
      </div>

      {/* Footnote */}
      <p className="mt-10 flex items-center justify-center gap-2 text-xs text-mist/50">
        <Illustrative /> Timeframes and metrics are illustrative. Actual performance depends
        on industry, budget and maturity.
      </p>

      {/* CTA tied to the active lane */}
      <div className="mt-6 flex justify-center">
        <CtaButton href="#contact" variant="primary">
          Build My Attract Strategy ({active.name}) →
        </CtaButton>
      </div>
    </Section>
  )
}

function LaneStripe({ lane, active, reduced }: { lane: Lane; active: boolean; reduced: boolean }) {
  // Three motion styles
  if (reduced) {
    return (
      <div
        className={cn('h-1.5 w-full rounded-full', lane.gradient)}
        aria-hidden="true"
      />
    )
  }

  if (lane.id === 'organic') {
    // Compounding glow — slow pulsing intensity
    return (
      <motion.div
        className={cn('h-1.5 w-full rounded-full', lane.gradient)}
        animate={{
          opacity: active ? [0.6, 1, 0.6] : [0.4, 0.6, 0.4],
          boxShadow: active
            ? [`0 0 8px ${lane.color}`, `0 0 24px ${lane.color}`, `0 0 8px ${lane.color}`]
            : [`0 0 4px ${lane.color}55`, `0 0 8px ${lane.color}55`, `0 0 4px ${lane.color}55`],
        }}
        transition={{ duration: active ? 2.4 : 4, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />
    )
  }

  if (lane.id === 'paid') {
    // Fast pulses
    return (
      <div className="flex h-1.5 w-full items-center gap-1" aria-hidden="true">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.span
            key={i}
            className={cn('h-full flex-1 rounded-full', lane.gradient)}
            animate={{
              opacity: active ? [0.3, 1, 0.3] : [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.07,
            }}
          />
        ))}
      </div>
    )
  }

  // Performance — precise measured beats (single stripe with crisp ticks)
  return (
    <div className="flex h-1.5 w-full items-center gap-0.5" aria-hidden="true">
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.span
          key={i}
          className={cn('h-full flex-1 rounded-[2px]', lane.gradient)}
          animate={{
            opacity: active ? (i % 3 === 0 ? 1 : 0.35) : 0.25,
            scaleY: active ? (i % 3 === 0 ? 1 : 0.6) : 0.5,
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeOut',
            delay: i * 0.04,
          }}
        />
      ))}
    </div>
  )
}
