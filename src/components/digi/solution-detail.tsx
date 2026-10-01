'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import { PageHero, PageSection, NextStepBand } from '@/components/digi/page-hero'
import { Sparkle } from '@/components/digi/brand'
import { useReducedMotion } from '@/components/digi/hooks'
import { getSolution, type SolutionDetail, SOLUTION_CARDS } from '@/components/digi/solutions-data'
import { SceneAttractLanes } from '@/components/digi/scenes/scene-attract-lanes'
import { SceneBeFound } from '@/components/digi/scenes/scene-be-found'
import { SceneBecomeAnswer } from '@/components/digi/scenes/scene-become-answer'
import { SceneConvert } from '@/components/digi/scenes/scene-convert'
import { SceneNurture } from '@/components/digi/scenes/scene-nurture'
import { SceneMeasure } from '@/components/digi/scenes/scene-measure'
import { SceneOptimise } from '@/components/digi/scenes/scene-optimise'

/**
 * SolutionDetailPage — the full solution page for a given slug.
 *
 * Renders: PageHero (H1 + lead + CTA) → embedded 3D journey scene (the
 * solution's signature set-piece) → full service categories → positioning /
 * market notes (verbatim) → "What's next" band → NextStepBand.
 */
export function SolutionDetailPage({ slug }: { slug: string }) {
  const s: SolutionDetail = getSolution(slug)
  const reduced = useReducedMotion()

  return (
    <>
      <PageHero
        breadcrumb={[{ label: s.title }]}
        eyebrow={s.eyebrow}
        h1={<span className="text-ribbon-diag">{s.h1}</span>}
        lead={s.lead}
        accent={s.accent}
        ctas={[{ label: s.cta, href: s.ctaHref, variant: 'primary' }]}
      />

      {/* Embedded 3D journey scene — the solution's signature set-piece.
          Each scene already renders its own <Section>, so we drop it in
          directly (no PageSection wrapper, to avoid nested sections). */}
      {s.embedScene && (
        <EmbeddedScene scene={s.embedScene} accent={s.accent} />
      )}

      {/* Full service categories */}
      <PageSection tone="mist">
        <div className="mb-10 max-w-2xl">
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-cyan">
            <Sparkle size={12} /> What we cover
          </p>
          <h2 className="mt-4 text-3xl font-extrabold text-ink sm:text-4xl">{s.title}</h2>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {s.sections.map((sec) => (
            <motion.div
              key={sec.heading}
              initial={reduced ? undefined : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="rounded-2xl border border-ink/10 bg-white p-6"
              style={{ boxShadow: `0 0 0 1px ${s.accent}22` }}
            >
              <h3 className="text-lg font-bold text-ink">{sec.heading}</h3>
              <ul className="mt-3 space-y-2">
                {sec.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm text-ink/75">
                    <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: s.accent }} />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {s.positioningNote && (
          <div className="mt-10 rounded-2xl border border-amber/30 bg-amber/5 p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-amber">Important positioning</p>
            <p className="mt-2 text-sm text-ink/80">{s.positioningNote}</p>
          </div>
        )}
        {s.marketNote && (
          <div className="mt-6 rounded-2xl border border-ink/10 bg-ink/[0.02] p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-ink/50">Current-market note</p>
            <p className="mt-2 text-sm text-ink/70">{s.marketNote}</p>
          </div>
        )}

        <div className="mt-10">
          <Link
            href={s.ctaHref}
            className="inline-flex items-center gap-1.5 rounded-full bg-ribbon px-5 py-2.5 text-sm font-semibold text-white glow-ribbon hover:scale-[1.02]"
          >
            {s.cta}
          </Link>
        </div>
      </PageSection>

      {/* Other solutions cross-link */}
      <PageSection tone="dark">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-mist sm:text-3xl">Other solutions in the system</h2>
        </div>
        <OtherSolutions currentSlug={slug} />
      </PageSection>

      <NextStepBand />
    </>
  )
}

/* ------------------------------------------------------------------ */

function EmbeddedScene({
  scene,
  accent,
}: {
  scene: NonNullable<SolutionDetail['embedScene']>
  accent: string
}) {
  // Each embedded scene was originally authored as a full <Section>; we render
  // them inside a PageSection so they don't double-wrap. The scene components
  // already include their own H2 + copy + 3D set-piece + reduced-motion fallback.
  switch (scene) {
    case 'attract-lanes':
      return <SceneAttractLanes />
    case 'be-found':
      return <SceneBeFound />
    case 'become-answer':
      return <SceneBecomeAnswer />
    case 'convert':
      return <SceneConvert />
    case 'nurture':
      return <SceneNurture />
    case 'measure':
      return <SceneMeasure />
    case 'optimise':
      return <SceneOptimise />
    default:
      return null
  }
}

/* ------------------------------------------------------------------ */

function OtherSolutions({ currentSlug }: { currentSlug: string }) {
  const others = SOLUTION_CARDS.filter((c) => c.slug !== currentSlug)
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {others.map((c) => (
        <Link key={c.slug} href={`/solutions/${c.slug}`} className="group block">
          <div
            className="glass-dark relative flex h-full flex-col gap-3 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/20"
            style={{
              boxShadow: `0 0 0 1px ${c.accent}22, 0 16px 40px -16px ${c.accent}33`,
            }}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold tabular tracking-wider" style={{ color: c.accent }}>
                {c.index}
              </span>
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ background: c.accent, boxShadow: `0 0 10px ${c.accent}` }}
              />
            </div>
            <h3 className="mt-1 text-lg font-bold text-mist">{c.title}</h3>
            <p className="flex-1 text-xs leading-relaxed text-mist/65">{c.oneLiner}</p>
            <p
              className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider transition-transform duration-200 group-hover:translate-x-1"
              style={{ color: c.accent }}
            >
              <span>Explore Solution</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </p>
          </div>
        </Link>
      ))}
    </div>
  )
}
