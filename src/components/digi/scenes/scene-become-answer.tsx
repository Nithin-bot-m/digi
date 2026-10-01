'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Search, Sparkles, Quote, ArrowUpRight } from 'lucide-react'
import { Section, SectionHeading, CtaButton, Tag } from '@/components/digi/ui'
import { Illustrative } from '@/components/digi/brand'
import { useReducedMotion } from '@/components/digi/hooks'

/**
 * Scene 5 — Become the Answer
 * (Master Prompt §6 Scene 5 + Source A §9 + Source C "Don't just rank.
 *  Become the answer.")
 *
 * H2: "Don't just rank. Become the answer."
 * Lead (paraphrase of Source A §9): explains search spans, foundations, etc.
 * Verbatim positioning caveat from Source A §9 MUST appear.
 *
 * 3D set-piece: a search box that transforms into an answer card with cited
 * sources on whileInView. Add an <Illustrative /> tag on any example query.
 *
 * Tone: dark. Accent: royal #2E4BFE.
 */

const ACCENT = '#2E4BFE'

const CITATIONS = [
  { label: 'Your brand — entity page', color: '#02A3FE' },
  { label: 'Third-party authority article', color: '#7B3FFE' },
  { label: 'Structured-data schema', color: '#FF8E2D' },
] as const

const VIEWPORT = { once: true, margin: '-15% 0px -10% 0px' } as const

export function SceneBecomeAnswer() {
  const reduced = useReducedMotion()
  return (
    <Section id="scene-5-become-answer" scene="5" tone="dark">
      <SectionHeading
        eyebrow="SCENE 5 — BECOME THE ANSWER"
        h2={<>Don&rsquo;t just rank. Become the answer.</>}
        lead={
          <>
            Search now spans traditional results, AI features, local results, images, video
            and other discovery surfaces. We build the foundations that help search systems
            understand your business — entity clarity, structured content, schema,
            citation-ready content, third-party authority.
          </>
        }
        align="center"
        tone="dark"
        className="mx-auto items-center"
      />

      {/* 3D set-piece: search box → answer card with cited sources */}
      <AnswerTransform reduced={reduced} />

      {/* Positioning caveat — VERBATIM from Source A §9 */}
      <motion.div
        initial={reduced ? undefined : { opacity: 0, y: 16 }}
        whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
        viewport={VIEWPORT}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
        className="mx-auto mt-12 max-w-3xl rounded-2xl border border-amber/30 bg-amber/5 p-5"
        role="note"
      >
        <p className="text-[11px] font-semibold uppercase tracking-wider text-amber">
          Positioning caveat
        </p>
        <p className="mt-2 text-sm leading-relaxed text-mist/85">
          Do not promise guaranteed ChatGPT/AI rankings. Position AI Search Visibility as
          improving discoverability, clarity, authority and the availability of useful brand
          information across modern search experiences.
        </p>
      </motion.div>

      {/* Foundations tags */}
      <div className="mx-auto mt-8 flex max-w-3xl flex-wrap items-center justify-center gap-2">
        <Tag color="#02A3FE">Entity clarity</Tag>
        <Tag color="#2E4BFE">Structured content</Tag>
        <Tag color="#7B3FFE">Schema</Tag>
        <Tag color="#FF8E2D">Citation-ready content</Tag>
        <Tag color="#FF544D">Third-party authority</Tag>
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <CtaButton href="#solutions" variant="primary">
          Improve My Search Visibility →
        </CtaButton>
      </div>
    </Section>
  )
}

function AnswerTransform({ reduced }: { reduced: boolean }) {
  return (
    <div className="relative mx-auto mt-12 max-w-3xl">
      {/* Search box */}
      <motion.div
        initial={reduced ? undefined : { opacity: 0, y: 14 }}
        whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
        viewport={VIEWPORT}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        className="glass-dark relative flex items-center gap-3 rounded-2xl px-4 py-3.5"
        style={{ boxShadow: `0 0 0 1px ${ACCENT}33, 0 12px 40px -16px ${ACCENT}55` }}
      >
        <Search className="h-4 w-4 text-mist/60" />
        <p className="text-sm text-mist/80">
          <span className="text-mist/55">example query — </span>
          best growth marketing partner for b2b saas
        </p>
        <Illustrative className="ml-auto" />
      </motion.div>

      {/* Transform arrow / shimmer */}
      {!reduced && (
        <motion.div
          className="relative mx-auto my-3 h-6 w-px overflow-hidden"
          initial={{ height: 0 }}
          whileInView={{ height: 24 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
        >
          <div className="absolute inset-0 bg-ribbon" />
        </motion.div>
      )}

      {/* Answer card */}
      <motion.div
        initial={reduced ? { opacity: 1 } : { opacity: 0, y: 24, scale: 0.96 }}
        whileInView={reduced ? undefined : { opacity: 1, y: 0, scale: 1 }}
        viewport={VIEWPORT}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.55 }}
        className="glass-dark rounded-3xl p-5 sm:p-6"
        style={{
          boxShadow: `0 0 0 1px ${ACCENT}33, 0 24px 80px -24px ${ACCENT}66`,
        }}
      >
        {/* AI label */}
        <div className="mb-3 flex items-center gap-2">
          <span
            className="inline-flex h-7 w-7 items-center justify-center rounded-full"
            style={{ background: `${ACCENT}22`, border: `1px solid ${ACCENT}55` }}
          >
            <Sparkles className="h-3.5 w-3.5" style={{ color: ACCENT }} />
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-mist/55">
            AI-generated answer
          </span>
          <Illustrative className="ml-auto" />
        </div>

        {/* The answer — references "your brand" as a cited source */}
        <p className="text-sm leading-relaxed text-mist/85">
          A modern growth partner connects performance marketing, search, AI visibility,
          creative, conversion, data and automation into one continuous growth system — and
          measures it against business outcomes rather than platform metrics.
          <sup className="ml-0.5 font-mono text-[10px] text-cyan">[1]</sup>
          <sup className="ml-0.5 font-mono text-[10px] text-violet">[2]</sup>
          <sup className="ml-0.5 font-mono text-[10px] text-orange">[3]</sup>
        </p>

        {/* Citation chips */}
        <div className="mt-4 border-t border-white/10 pt-4">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-mist/55">
            Cited sources
          </p>
          <ul className="flex flex-col gap-2">
            {CITATIONS.map((c, i) => (
              <li
                key={c.label}
                className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2 text-xs text-mist/80"
              >
                <span
                  className="font-mono text-[10px]"
                  style={{ color: c.color }}
                >
                  [{i + 1}]
                </span>
                <span className="flex-1">{c.label}</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-mist/50" />
              </li>
            ))}
          </ul>
        </div>

        {/* Footer of the card */}
        <p className="mt-4 flex items-center gap-1.5 text-[11px] text-mist/50">
          <Quote className="h-3.5 w-3.5" />
          Citation-ready brand content + third-party authority increase the chance of being
          surfaced in modern search experiences.
        </p>
      </motion.div>

      {/* Hidden SR text mirror */}
      <p className="sr-only">
        The diagram shows an example search query transforming into an AI-generated answer
        that cites three sources: your brand entity page, a third-party authority article,
        and your structured-data schema.
      </p>
    </div>
  )
}
