'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Section, SectionHeading, CtaButton, Table } from '@/components/digi/ui'
import { Illustrative } from '@/components/digi/brand'
import { useReducedMotion } from '@/components/digi/hooks'

/**
 * Scene 11 — Measure  (MIST TONE)
 * H2: "Don't just generate traffic. Generate business outcomes." (Source A §6 Section 6)
 * Subhead: "Measure what actually matters."
 * Vanity vs Business table — verbatim from Source A §6.
 * Big gradient callout: "We don't report clicks. We report business outcomes." (Source B §3)
 * Set-piece: a stylised "dashboard" card with 4 KPI tiles (CPL, CAC, ROAS, Pipeline)
 * and a tiny bar chart made of divs. Accent coral.
 * Reduced motion: static dashboard (no animated bars).
 */

const VANITY_ROWS: [string, React.ReactNode][] = [
  ['Vanity metric', 'Impressions → Reach quality / demand'],
  ['Vanity metric', 'Clicks → Qualified visits'],
  ['Vanity metric', 'Leads → Qualified leads'],
  ['Vanity metric', 'CPL → CAC / cost per qualified opportunity'],
  ['Vanity metric', 'ROAS → Revenue / contribution'],
  ['Vanity metric', 'Engagement → Conversion / retention'],
]

// Reshape into the verbatim two-column table the content pack shows
const TABLE_ROWS: [string, string][] = [
  ['Vanity metric', 'Business metric'],
  ['Impressions', 'Reach quality / demand'],
  ['Clicks', 'Qualified visits'],
  ['Leads', 'Qualified leads'],
  ['CPL', 'CAC / cost per qualified opportunity'],
  ['ROAS', 'Revenue / contribution'],
  ['Engagement', 'Conversion / retention'],
]

// First row of TABLE_ROWS is a header — render with the Table primitive (no header support built-in),
// so we just include it as the first row and visually style it via ordering.

const KPIS = [
  { label: 'CPL', value: '₹214', delta: '−18%', accent: '#FF544D' },
  { label: 'CAC', value: '₹4.2k', delta: '−11%', accent: '#FF8E2D' },
  { label: 'ROAS', value: '3.4×', delta: '+22%', accent: '#FFB020' },
  { label: 'Pipeline', value: '₹86L', delta: '+34%', accent: '#FF544D' },
]

const BAR_HEIGHTS = [38, 52, 44, 68, 60, 82, 74, 96]

export function SceneMeasure() {
  const reduced = useReducedMotion()

  return (
    <Section id="scene-11-measure" scene="11" tone="mist">
      <SectionHeading
        eyebrow="SCENE 11 · MEASURE"
        tone="light"
        h2={
          <>
            Don&apos;t just generate traffic. Generate <span className="text-ribbon">business outcomes.</span>
          </>
        }
        lead={
          <>
            <span className="block font-semibold text-ink">Measure what actually matters.</span>
            Move from platform vanity metrics to the numbers your CFO cares about: qualified visits, qualified leads,
            customer acquisition cost, revenue contribution and retention.
          </>
        }
      />

      <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:items-start">
        {/* Vanity vs Business table */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15% 0px -10% 0px' }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-ink/50">
            Vanity metric → Business metric
          </h3>
          <Table
            tone="light"
            rows={TABLE_ROWS.map(([k, v], i) => [
              i === 0 ? k : `→ ${k}`,
              i === 0 ? <span className="font-bold text-ink">{v}</span> : v,
            ])}
          />
          {/* Hidden semantic row mapping for the verbatim table header to keep markup clean */}
          <div className="sr-only">
            <table>
              <thead>
                <tr>
                  <th>Vanity metric</th>
                  <th>Business metric</th>
                </tr>
              </thead>
              <tbody>
                {VANITY_ROWS.map((r, i) => (
                  <tr key={i}>
                    <td>{r[0]}</td>
                    <td>{r[1]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* 3D dashboard mock */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15% 0px -10% 0px' }}
          transition={{ duration: 0.55, ease: 'easeOut', delay: 0.1 }}
          className="relative"
        >
          <DashboardMock reduced={reduced} />
        </motion.div>
      </div>

      {/* Big gradient callout */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-15% 0px -10% 0px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="mt-14 rounded-3xl border border-ink/10 bg-white p-8 text-center shadow-[0_24px_80px_-32px_rgba(255,84,77,0.45)] sm:p-12"
      >
        <p className="text-balance text-2xl font-extrabold leading-tight sm:text-3xl lg:text-4xl">
          <span className="text-ribbon">We don&apos;t report clicks.</span>{' '}
          <span className="text-ink">We report business outcomes.</span>
        </p>
        <p className="mx-auto mt-3 max-w-xl text-sm text-ink/60">
          Every report is tied back to qualified leads, CAC, revenue, pipeline and retention — wherever the data allows.
        </p>
      </motion.div>

      <div className="mt-10 flex justify-center">
        <CtaButton href="#contact" variant="light">
          Fix My Measurement →
        </CtaButton>
      </div>
    </Section>
  )
}

function DashboardMock({ reduced }: { reduced: boolean }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-ink/10 bg-mist-soft p-5 shadow-[0_24px_80px_-32px_rgba(46,75,254,0.35)]">
      {/* header strip */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-coral glow-coral" />
          <span className="font-mono text-xs uppercase tracking-wider text-ink/70">growth dashboard</span>
        </div>
        <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-ink/50">
          <Illustrative label="Sample" /> · last 30d
        </span>
      </div>

      {/* KPI tiles */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {KPIS.map((k) => (
          <div
            key={k.label}
            className="rounded-2xl border border-ink/5 bg-white p-3"
            style={{ boxShadow: `inset 0 0 0 1px ${k.accent}14, 0 4px 16px -8px ${k.accent}33` }}
          >
            <p className="text-[10px] font-semibold uppercase tracking-wider text-ink/50">{k.label}</p>
            <p className="mt-1 font-mono text-xl font-bold tabular text-ink">{k.value}</p>
            <p className="mt-0.5 text-[11px] font-semibold" style={{ color: k.accent }}>
              {k.delta} <span className="text-ink/40">vs prev</span>
            </p>
          </div>
        ))}
      </div>

      {/* Tiny bar chart */}
      <div className="mt-4 rounded-2xl border border-ink/5 bg-white p-4">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-xs font-semibold text-ink/70">Revenue contribution by week</p>
          <span className="font-mono text-[10px] text-ink/40">₹ in lakhs</span>
        </div>
        <div className="flex h-28 items-end gap-2" role="img" aria-label="Bar chart of weekly revenue contribution — illustrative">
          {BAR_HEIGHTS.map((h, i) => (
            <motion.div
              key={i}
              initial={reduced ? { height: `${h}%` } : { height: '0%' }}
              whileInView={{ height: `${h}%` }}
              viewport={{ once: true, margin: '-15% 0px -10% 0px' }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: 'easeOut' }}
              className="flex-1 rounded-t-md bg-ribbon"
              style={{ boxShadow: '0 0 16px -4px rgba(255,84,77,0.55)' }}
            />
          ))}
        </div>
      </div>

      {/* scan sweep overlay — kept subtle so the dashboard reads at rest */}
      {!reduced && (
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl"
          style={{
            background: 'linear-gradient(180deg, transparent 0%, rgba(255,84,77,0.08) 50%, transparent 100%)',
            animation: 'scan-sweep 4s ease-in-out infinite',
          }}
        />
      )}
    </div>
  )
}
