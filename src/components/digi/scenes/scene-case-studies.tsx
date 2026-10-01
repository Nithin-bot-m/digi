'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Section, SectionHeading, CtaButton } from '@/components/digi/ui'
import { Illustrative } from '@/components/digi/brand'

/**
 * Scene 16 — Case Studies  (MIST TONE)
 * H2: "Growth you can measure." (Source A §17 + §7 §9)
 *
 * Two parts:
 *  (a) The required 8-block case-study schema (Client, Challenge, Insight,
 *      Strategy, Execution, Measurement, Outcome, Learning, CTA) shown as a
 *      labelled "template" preview card.
 *  (b) The fallback (Source A §17): use Projects / Pilots / Experiments /
 *      Selected Work — NOT fabricated case studies. Three placeholder cards:
 *        - Project: Performance Marketing Pilot
 *        - Experiment: AI Search Visibility
 *        - Selected Work: Conversion Journey Redesign
 *      each carrying an <Illustrative /> tag and "Outcome: To be published
 *      once verified." No fabricated metrics.
 *
 * CTA: "Solve a Similar Growth Challenge →" (Source A §17 CTA).
 */

const SCHEMA_BLOCKS = [
  { label: 'Client', hint: 'Company name, industry and context' },
  { label: 'Challenge', hint: 'The business problem before engagement' },
  { label: 'Insight', hint: 'What the data / research revealed' },
  { label: 'Strategy', hint: 'The chosen growth approach' },
  { label: 'Execution', hint: 'Channels, creative, website, CRM and technology used' },
  { label: 'Measurement', hint: 'KPIs and measurement system' },
  { label: 'Outcome', hint: 'Verified results only' },
  { label: 'Learning', hint: 'What changed or what was learned' },
  { label: 'CTA', hint: 'Talk to Digi∞Artha about a similar challenge' },
]

const PLACEHOLDERS = [
  {
    kind: 'Project',
    title: 'Performance Marketing Pilot',
    blurb:
      'A scoped paid-acquisition pilot to validate funnel economics and conversion readiness before scaling spend.',
  },
  {
    kind: 'Experiment',
    title: 'AI Search Visibility',
    blurb:
      'A short experiment testing entity clarity, structured content and citation potential across AI search surfaces.',
  },
  {
    kind: 'Selected Work',
    title: 'Conversion Journey Redesign',
    blurb:
      'A landing-to-lead-to-CRO redesign benchmarked against qualified-lead rate and downstream pipeline impact.',
  },
]

export function SceneCaseStudies() {
  return (
    <Section id="scene-16-case-studies" scene="16" tone="mist" className="pt-28 sm:pt-36">
      <SectionHeading
        eyebrow="SCENE 16 · CASE STUDIES"
        tone="light"
        h2={
          <>
            Growth you can <span className="text-ribbon">measure.</span>
          </>
        }
        lead={
          <>
            Every Digi∞Artha case study follows the same eight-block structure — client context, challenge, insight,
            strategy, execution, measurement, outcome and learning — so the result is auditable, not anecdotal.
          </>
        }
      />

      {/* (a) Schema preview card */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-15% 0px -10% 0px' }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        className="mt-12 overflow-hidden rounded-3xl border border-ink/10 bg-white p-6 shadow-[0_24px_80px_-32px_rgba(46,75,254,0.35)] sm:p-8"
      >
        <div className="mb-4 flex items-center justify-between gap-3">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-ink/50">Case-study schema preview</h3>
          <span className="font-mono text-[11px] uppercase tracking-wider text-ink/40">8 blocks + CTA</span>
        </div>
        <ol className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {SCHEMA_BLOCKS.map((b, i) => (
            <li
              key={b.label}
              className="rounded-xl border border-ink/5 bg-mist-soft p-3"
              style={{ boxShadow: `inset 4px 0 0 #2E4BFE` }}
            >
              <p className="font-mono text-[10px] text-ink/40">0{i + 1}</p>
              <p className="text-sm font-bold text-ink">{b.label}</p>
              <p className="mt-0.5 text-[11px] leading-snug text-ink/60">{b.hint}</p>
            </li>
          ))}
        </ol>
        <p className="mt-4 text-xs italic text-ink/50">
          Prefer outcome metrics such as qualified-lead rate, CAC, revenue, conversion rate, pipeline and retention where
          reliably available. Avoid publishing unsupported percentage claims.
        </p>
      </motion.div>

      {/* (b) Fallback — Projects / Pilots / Experiments / Selected Work */}
      <div className="mt-8">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-ink/50">In flight</h3>
          <span className="rounded-full border border-ink/15 bg-mist-soft px-2.5 py-0.5 text-[11px] font-medium text-ink/60">
            Projects
          </span>
          <span className="rounded-full border border-ink/15 bg-mist-soft px-2.5 py-0.5 text-[11px] font-medium text-ink/60">
            Pilots
          </span>
          <span className="rounded-full border border-ink/15 bg-mist-soft px-2.5 py-0.5 text-[11px] font-medium text-ink/60">
            Experiments
          </span>
          <span className="rounded-full border border-ink/15 bg-mist-soft px-2.5 py-0.5 text-[11px] font-medium text-ink/60">
            Selected Work
          </span>
          <span className="ml-auto text-[11px] italic text-ink/50">No fabricated results.</span>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {PLACEHOLDERS.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-15% 0px -10% 0px' }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
              className="shine-sweep group relative flex h-full flex-col gap-3 rounded-2xl border border-ink/10 bg-white p-5 shadow-[0_16px_48px_-24px_rgba(46,75,254,0.35)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_60px_-15px_rgba(46,75,254,0.3)] hover:border-royal/30"
              style={{ boxShadow: `inset 0 0 0 1px #2E4BFE14` }}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="rounded-full bg-ink px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-mist">
                  {p.kind}
                </span>
                <Illustrative />
              </div>
              <h4 className="text-lg font-bold leading-tight text-ink">{p.title}</h4>
              <p className="text-sm leading-relaxed text-ink/70">{p.blurb}</p>
              <p className="mt-auto rounded-lg bg-mist-soft px-3 py-2 text-xs font-medium text-ink/60">
                <span className="font-bold text-ink/80">Outcome:</span> To be published once verified.
              </p>
            </motion.article>
          ))}
        </div>
      </div>

      <div className="mt-12 flex justify-center">
        <CtaButton href="#contact" variant="light">
          Solve a Similar Growth Challenge →
        </CtaButton>
      </div>
    </Section>
  )
}
