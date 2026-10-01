'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { Section, SectionHeading } from '@/components/digi/ui'
import { GradientRule } from '@/components/digi/brand'
import { useReducedMotion } from '@/components/digi/hooks'

/**
 * SectionAbout — Digi∞Artha About (Source A §18, verbatim)
 * Tone: mist. Accent: royal #2E4BFE.
 *
 * Layout: 2-col on desktop — left = belief + approach + growth loop,
 * right = 7 differentiators as a checklist.
 */

const DIFFERENTIATORS = [
  'Strategy before execution',
  'Performance and creative working together',
  'Search and AI visibility treated as part of one discovery system',
  'Conversion considered alongside acquisition',
  'Measurement connected to business outcomes',
  'CRM and lifecycle growth beyond the first lead',
  'AI and automation applied where they create practical value',
]

const LOOP_STAGES = [
  'Discover',
  'Attract',
  'Convert',
  'Measure',
  'Optimise',
  'Grow',
  '∞',
]

const ACCENT = '#2E4BFE'

export function SectionAbout() {
  const reduced = useReducedMotion()

  return (
    <Section id="about" scene="A" tone="mist" className="pt-28 sm:pt-36">
      <SectionHeading
        eyebrow="ABOUT DIGI∞ARTHA"
        h2={
          <>
            We engineer <span className="text-ribbon">digital growth</span>.
          </>
        }
        lead="Digi∞Artha is a digital growth and performance company connecting strategy, marketing, technology and data to help businesses grow in a more measurable and connected way."
        align="left"
        tone="light"
      />

      <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
        {/* LEFT — belief + approach + loop */}
        <motion.div
          initial={reduced ? undefined : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15% 0px -10% 0px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex flex-col gap-8"
        >
          {/* Belief — large pull quote with gradient text */}
          <blockquote className="relative">
            <p className="text-2xl font-extrabold leading-tight sm:text-3xl">
              <span aria-hidden className="mr-1 text-ink/30">
                &ldquo;
              </span>
              <span className="text-ribbon-diag">
                Digital activity should create business value.
              </span>
              <span aria-hidden className="ml-1 text-ink/30">
                &rdquo;
              </span>
            </p>
          </blockquote>

          <GradientRule className="h-px w-24" />

          {/* Approach */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-ink/55">
              Our approach
            </p>
            <p className="mt-3 text-base leading-relaxed text-ink/80">
              We don&rsquo;t begin with a platform. We begin with the business problem,
              the customer journey and the data required to make decisions.
            </p>
          </div>

          {/* Growth loop — horizontal pill row */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-ink/55">
              Our growth loop
            </p>
            <ol className="mt-3 flex flex-wrap items-center gap-2">
              {LOOP_STAGES.map((s, i) => (
                <li key={s} className="flex items-center gap-2">
                  <span
                    className={
                      s === '∞'
                        ? 'rounded-full bg-ribbon px-3 py-1 text-sm font-bold text-white glow-ribbon'
                        : 'rounded-full border border-ink/15 bg-white px-3 py-1 text-sm font-semibold text-ink/85'
                    }
                    style={
                      s !== '∞'
                        ? { boxShadow: `inset 0 0 0 1px ${ACCENT}11` }
                        : undefined
                    }
                  >
                    {s}
                  </span>
                  {i < LOOP_STAGES.length - 1 && (
                    <span aria-hidden className="text-ink/30">
                      →
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </motion.div>

        {/* RIGHT — 7 differentiators as checklist */}
        <motion.div
          initial={reduced ? undefined : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15% 0px -10% 0px' }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
          className="flex flex-col gap-6"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-ink/55">
              What makes us different
            </p>
          </div>

          <ul className="flex flex-col gap-3">
            {DIFFERENTIATORS.map((d, i) => (
              <motion.li
                key={d}
                initial={reduced ? undefined : { opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 0.4, ease: 'easeOut', delay: i * 0.05 }}
                className="flex items-start gap-3 rounded-xl border border-ink/8 bg-white/80 p-3.5"
              >
                <span
                  className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                  style={{ background: `${ACCENT}15`, color: ACCENT }}
                  aria-hidden
                >
                  <Check size={14} strokeWidth={3} />
                </span>
                <span className="text-sm font-medium leading-relaxed text-ink/85">
                  {d}
                </span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Parent relationship — subtle footer-style line */}
      <motion.p
        initial={reduced ? undefined : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="mt-12 border-t border-ink/8 pt-6 text-xs text-ink/45"
      >
        Digi∞Artha is a digital growth venture under ISD.
      </motion.p>
    </Section>
  )
}
