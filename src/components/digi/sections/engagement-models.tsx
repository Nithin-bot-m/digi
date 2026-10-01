'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import {
  Section,
  SectionHeading,
  CtaButton,
  Tag,
} from '@/components/digi/ui'
import { Illustrative } from '@/components/digi/brand'
import { useReducedMotion } from '@/components/digi/hooks'

/**
 * SectionEngagementModels — Digi∞Artha Engagement Models
 * Source B §12 (verbatim model names + glosses).
 * Tone: dark. Accent: royal #2E4BFE.
 *
 * Renders 5 model cards in a responsive row (stack on mobile). Each card has
 * the verbatim name, gloss, a Timeline/Scope tag (Illustrative where a
 * timeframe is suggested), and a CTA linking to #contact.
 */

type Model = {
  index: string
  name: string
  gloss: string
  tag: string
  accent: string
  timeframe?: string
}

const MODELS: Model[] = [
  {
    index: '01',
    name: 'Growth Diagnostic',
    gloss: 'Digital Growth Score™ and prioritised opportunity map.',
    tag: 'Diagnostic',
    accent: '#2E4BFE',
    timeframe: 'Days',
  },
  {
    index: '02',
    name: 'Growth Sprint',
    gloss: 'A focused engagement around a defined growth problem or opportunity.',
    tag: 'Sprint',
    accent: '#02A3FE',
    timeframe: 'Weeks',
  },
  {
    index: '03',
    name: 'Performance Partner',
    gloss: 'Ongoing acquisition, creative, conversion and measurement optimisation.',
    tag: 'Ongoing',
    accent: '#7B3FFE',
  },
  {
    index: '04',
    name: 'Growth System',
    gloss:
      'A broader integrated programme across presence, visibility, conversion, data, lifecycle and automation.',
    tag: 'Programme',
    accent: '#E93BF2',
  },
  {
    index: '05',
    name: 'Enterprise',
    gloss: 'Scalable digital growth architecture across teams, markets and channels.',
    tag: 'Enterprise',
    accent: '#FF8E2D',
  },
]

export function SectionEngagementModels() {
  const reduced = useReducedMotion()

  return (
    <Section id="engagement-models" scene="E" tone="dark">
      <SectionHeading
        eyebrow="ENGAGEMENT MODELS"
        h2={
          <>
            Engage Digi∞Artha the way your{' '}
            <span className="text-ribbon">business needs</span>.
          </>
        }
        lead="Five engagement shapes, one connected growth system — from a focused diagnostic to a full enterprise architecture."
        align="left"
      />

      <motion.div
        initial={reduced ? undefined : { opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-15% 0px -10% 0px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5"
      >
        {MODELS.map((m) => (
          <motion.article
            key={m.index}
            initial={reduced ? undefined : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            whileHover={reduced ? undefined : { y: -4 }}
            className="glass-dark relative flex h-full flex-col gap-4 rounded-2xl p-5"
            style={{
              boxShadow: `0 0 0 1px ${m.accent}22, 0 14px 40px -16px ${m.accent}55`,
            }}
          >
            <div className="flex items-center justify-between">
              <span
                className="font-mono text-xs tabular"
                style={{ color: m.accent }}
              >
                {m.index}
              </span>
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ background: m.accent, boxShadow: `0 0 12px ${m.accent}` }}
                aria-hidden
              />
            </div>

            <h3 className="text-lg font-bold text-mist">{m.name}</h3>

            <p className="text-sm leading-relaxed text-mist/70">{m.gloss}</p>

            <div className="mt-auto flex flex-wrap items-center gap-2 pt-2">
              <Tag color={m.accent}>{m.tag}</Tag>
              {m.timeframe && (
                <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-mist/55">
                  <span>Typically {m.timeframe}</span>
                  <Illustrative label="Illustrative" />
                </span>
              )}
            </div>

            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 text-sm font-semibold transition hover:opacity-80"
              style={{ color: m.accent }}
            >
              Start the Conversation
              <span aria-hidden>→</span>
            </a>
          </motion.article>
        ))}
      </motion.div>

      <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <CtaButton href="#contact" variant="primary">
          Start the Conversation →
        </CtaButton>
        <p className="text-xs text-mist/50">
          Every engagement begins with the Digital Growth Score™ diagnostic.
        </p>
      </div>
    </Section>
  )
}
