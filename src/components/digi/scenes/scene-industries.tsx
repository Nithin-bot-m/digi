'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Section, SectionHeading, CtaButton } from '@/components/digi/ui'
import { useReducedMotion } from '@/components/digi/hooks'

/**
 * Scene 15 — Industries
 * H2: "Growth strategies built around your business model." (Source A §7 + §16)
 * Six industries, each with verbatim headline + capabilities from Source A §16.
 * Active sector relabels the customer journey (Master Prompt §7).
 * Industry-page rule (Source A §16) shown as small print.
 */

type Industry = {
  id: string
  label: string
  shortLabel: string
  accent: string
  headline: string
  capabilities: string
  journey: [string, string, string]
}

const INDUSTRIES: Industry[] = [
  {
    id: 'edtech',
    label: 'Education & EdTech',
    shortLabel: 'EdTech',
    accent: '#02A3FE',
    headline: 'Acquire the right learners. Build trust. Improve enrolment journeys.',
    capabilities:
      'student acquisition, performance marketing, SEO, local visibility, content, lead generation, CRM, WhatsApp follow-up, conversion optimisation.',
    journey: ['Enquiry', 'Counselling', 'Admission'],
  },
  {
    id: 'b2b',
    label: 'B2B & SaaS',
    shortLabel: 'B2B / SaaS',
    accent: '#2E4BFE',
    headline: 'Turn digital demand into qualified pipeline.',
    capabilities:
      'B2B SEO, Google Ads, LinkedIn, content, landing pages, lead qualification, CRM, automation, pipeline attribution.',
    journey: ['Lead', 'MQL', 'SQL → Opportunity'],
  },
  {
    id: 'ecom',
    label: 'E-commerce & Retail',
    shortLabel: 'E-com',
    accent: '#7B3FFE',
    headline: 'Turn product discovery into profitable transactions.',
    capabilities:
      'Shopping, Performance Max, Meta, Merchant Center, product SEO, catalogue, CRO, retargeting, cart recovery.',
    journey: ['Product view', 'Cart', 'Repeat purchase'],
  },
  {
    id: 'realestate',
    label: 'Real Estate',
    shortLabel: 'Real Estate',
    accent: '#E93BF2',
    headline: 'Build demand, capture intent and improve lead quality.',
    capabilities:
      'local search, paid acquisition, creative, landing pages, lead qualification, CRM and WhatsApp journeys.',
    journey: ['Enquiry', 'Site visit', 'Booking'],
  },
  {
    id: 'healthcare',
    label: 'Healthcare & Professional Services',
    shortLabel: 'Healthcare',
    accent: '#FF544D',
    headline: 'Build trust before conversion.',
    capabilities: 'search visibility, local presence, reputation, content, paid acquisition, conversion and CRM.',
    journey: ['Search', 'Consult', 'Appointment'],
  },
  {
    id: 'tech',
    label: 'Technology & Enterprise',
    shortLabel: 'Technology',
    accent: '#FF8E2D',
    headline: 'Build digital demand and scalable growth infrastructure.',
    capabilities: 'enterprise SEO, paid acquisition, digital experience, analytics, CRM, automation and AI.',
    journey: ['Discovery', 'Evaluation', 'Deployment'],
  },
]

export function SceneIndustries() {
  const reduced = useReducedMotion()
  const [activeId, setActiveId] = React.useState<string>('edtech')
  const active = INDUSTRIES.find((i) => i.id === activeId)!

  return (
    <Section id="scene-15-industries" scene="15" tone="dark">
      <SectionHeading
        eyebrow="SCENE 15 · INDUSTRIES"
        h2={
          <>
            Growth strategies built around <span className="text-ribbon">your business model.</span>
          </>
        }
        lead="The same connected growth system — tuned for the realities of your industry's customer journey, acquisition model and measurement."
      />

      {/* Sector tabs */}
      <div
        className="no-scrollbar mt-10 flex gap-2 overflow-x-auto pb-2"
        role="tablist"
        aria-label="Industries"
      >
        {INDUSTRIES.map((ind) => {
          const isActive = ind.id === activeId
          return (
            <button
              key={ind.id}
              role="tab"
              aria-selected={isActive}
              aria-controls={`industry-panel-${ind.id}`}
              onClick={() => setActiveId(ind.id)}
              className="flex-none rounded-full px-3 py-1.5 text-xs font-semibold transition-all sm:px-4 sm:text-sm"
              style={{
                color: isActive ? '#fff' : ind.accent,
                background: isActive ? ind.accent : `${ind.accent}1A`,
                border: `1px solid ${isActive ? ind.accent : `${ind.accent}55`}`,
                boxShadow: isActive ? `0 0 24px -4px ${ind.accent}` : 'none',
              }}
            >
              {ind.shortLabel}
            </button>
          )
        })}
      </div>

      {/* Active industry panel */}
      <div id={`industry-panel-${active.id}`} role="tabpanel" className="mt-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
            animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: -16 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur sm:p-8"
            style={{ boxShadow: `inset 0 0 0 1px ${active.accent}14, 0 24px 80px -32px ${active.accent}55` }}
          >
            {/* accent glow */}
            <div
              className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full blur-3xl"
              style={{ background: `${active.accent}22` }}
            />

            <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
              {/* Left — headline + capabilities */}
              <div>
                <p
                  className="mb-2 font-mono text-[11px] font-semibold uppercase tracking-wider"
                  style={{ color: active.accent }}
                >
                  {active.label}
                </p>
                <h3 className="text-balance text-2xl font-extrabold leading-tight text-mist sm:text-3xl">
                  {active.headline}
                </h3>
                <div className="mt-5">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-mist/50">Capabilities</p>
                  <p className="text-sm leading-relaxed text-mist/80">{active.capabilities}</p>
                </div>
              </div>

              {/* Right — customer journey */}
              <div className="flex flex-col justify-center gap-3 rounded-2xl border border-white/10 bg-ink-deep/60 p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-mist/50">
                  {active.shortLabel} customer journey
                </p>
                <div className="flex items-center gap-2">
                  {active.journey.map((step, i) => (
                    <React.Fragment key={step}>
                      <motion.span
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: i * 0.1 }}
                        className="rounded-full px-3 py-1.5 text-xs font-semibold"
                        style={{
                          color: active.accent,
                          background: `${active.accent}1A`,
                          border: `1px solid ${active.accent}55`,
                        }}
                      >
                        {step}
                      </motion.span>
                      {i < active.journey.length - 1 && (
                        <span className="font-mono text-mist/40" aria-hidden="true">
                          →
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
                <p className="mt-2 text-xs text-mist/50">
                  The growth system is tuned to the moments that actually decide {active.shortLabel} outcomes.
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <p className="text-xs text-mist/50">
                Switch sectors above to see how the journey and capabilities relabel.
              </p>
              <CtaButton href="#contact" variant="primary">
                Talk to Digi∞Artha about {active.shortLabel} →
              </CtaButton>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Industry-page rule — small print */}
      <p className="mx-auto mt-8 max-w-2xl text-center text-[11px] italic leading-relaxed text-mist/40">
        Only publish detailed industry pages where Digi∞Artha has sufficient expertise, evidence, relevant examples or
        useful original content.
      </p>
    </Section>
  )
}
