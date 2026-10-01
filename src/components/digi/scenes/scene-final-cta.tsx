'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Section, SectionHeading, CtaButton } from '@/components/digi/ui'
import { InfinityLogo } from '@/components/digi/brand'
import { useReducedMotion } from '@/components/digi/hooks'

/**
 * Scene 18 — Final CTA
 * H2: "Your next stage of growth starts with clarity." (Source A §7 Section 11)
 * Body (verbatim): "Understand where you're strong. Find what's holding you back.
 * Build the system. Measure the outcome. Scale what works."
 *
 * Primary CTA: "Get Your Digital Growth Score →" (→ #growth-score)
 * Secondary CTA: "Talk to Digi∞Artha →" (→ #contact)
 *
 * Set-piece (Master Prompt §6 Scene 18): a large InfinityLogo with glow sits
 * behind the CTA, the ribbon "closing" into ∞ around the CTA buttons.
 * Reduced motion: static halo (no shimmer).
 */

export function SceneFinalCta() {
  const reduced = useReducedMotion()

  return (
    <Section id="scene-18-final-cta" scene="18" tone="dark">
      <div className="relative mx-auto max-w-4xl py-8 text-center sm:py-16">
        {/* Large InfinityLogo backdrop — ribbon "closing" into ∞ around the CTA */}
        <motion.div
          initial={reduced ? { opacity: 0.25 } : { opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 0.3, scale: 1 }}
          viewport={{ once: true, margin: '-15% 0px -10% 0px' }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="pointer-events-none absolute left-1/2 top-1/2 -z-0 w-[420px] -translate-x-1/2 -translate-y-1/2 sm:w-[640px] lg:w-[820px]"
          aria-hidden="true"
        >
          <InfinityLogo strokeWidth={14} withSparkle withArrowhead glow />
          {/* Halo — ribbon closing */}
          {!reduced && (
            <div
              className="absolute inset-0 blur-3xl"
              style={{
                background:
                  'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(123,63,254,0.35), transparent 70%)',
              }}
            />
          )}
        </motion.div>

        <div className="relative z-10 flex flex-col items-center">
          <SectionHeading
            eyebrow="SCENE 18 · YOUR NEXT STAGE"
            align="center"
            h2={
              <>
                Your next stage of growth starts with{' '}
                <span className="text-ribbon">clarity.</span>
              </>
            }
            lead={
              <span className="mx-auto max-w-2xl">
                Understand where you&apos;re strong. Find what&apos;s holding you back. Build the system. Measure the
                outcome. Scale what works.
              </span>
            }
          />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-15% 0px -10% 0px' }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className="mt-10 flex flex-col items-center gap-3 sm:flex-row"
          >
            <CtaButton href="#growth-score" variant="primary" className="px-6 py-3 text-base">
              Get Your Digital Growth Score →
            </CtaButton>
            <CtaButton href="#contact" variant="ghost" className="px-6 py-3 text-base">
              Talk to Digi∞Artha →
            </CtaButton>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-15% 0px -10% 0px' }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 font-mono text-[11px] uppercase tracking-[0.28em] text-mist/50"
          >
            Digital. Measurable. Growth.
          </motion.p>
        </div>
      </div>
    </Section>
  )
}
