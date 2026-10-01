'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import {
  Section,
  SectionHeading,
  GlassNode,
  SidePanel,
  CtaButton,
  Tag,
} from '@/components/digi/ui'
import { Illustrative } from '@/components/digi/brand'
import { useReducedMotion } from '@/components/digi/hooks'

/**
 * Scene 3 — Growth System (Content Pack Source A §5 Section 3)
 *
 * H2: "One connected system. Every critical growth touchpoint."
 * Eyebrow: "THE GROWTH SYSTEM"
 * Renders the 7-stage × 3-column table as a 7-card grid of <GlassNode>s.
 * Stage colors: Discover #02A3FE, Attract #2E4BFE, Engage #7B3FFE,
 *                Convert #E93BF2, Measure #FF544D, Nurture #FF8E2D, Grow #FFB020
 * Each card opens a <SidePanel> with capabilities expanded + a CTA.
 *
 * Tone: dark.
 */

type Stage = {
  index: string
  name: string
  message: string
  capabilities: string[]
  color: string
  cta: string
}

const STAGES: Stage[] = [
  {
    index: '01',
    name: 'Discover',
    message: 'Understand demand and become discoverable.',
    capabilities: ['Market intelligence', 'SEO', 'AI Search', 'Local', 'Content'],
    color: '#02A3FE',
    cta: 'Build My Discovery Plan →',
  },
  {
    index: '02',
    name: 'Attract',
    message: 'Reach the audiences that matter.',
    capabilities: ['Google', 'Meta', 'YouTube', 'LinkedIn', 'Social', 'Creators'],
    color: '#2E4BFE',
    cta: 'Plan My Acquisition →',
  },
  {
    index: '03',
    name: 'Engage',
    message: 'Earn attention and trust.',
    capabilities: ['Creative', 'Content', 'Video', 'Social', 'Reputation'],
    color: '#7B3FFE',
    cta: 'Build My Engagement Plan →',
  },
  {
    index: '04',
    name: 'Convert',
    message: 'Turn attention into action.',
    capabilities: ['Web', 'Landing pages', 'CRO', 'Funnels', 'Lead systems'],
    color: '#E93BF2',
    cta: 'Improve My Conversion Journey →',
  },
  {
    index: '05',
    name: 'Measure',
    message: 'Know what actually drives value.',
    capabilities: ['Analytics', 'Attribution', 'CRM', 'Revenue'],
    color: '#FF544D',
    cta: 'Fix My Measurement →',
  },
  {
    index: '06',
    name: 'Nurture',
    message: 'Turn leads into customers and relationships.',
    capabilities: ['Email', 'WhatsApp', 'CRM', 'Automation'],
    color: '#FF8E2D',
    cta: 'Build My Lead-to-Customer System →',
  },
  {
    index: '07',
    name: 'Grow',
    message: 'Optimise and scale what works.',
    capabilities: ['AI', 'Automation', 'Experimentation', 'Expansion'],
    color: '#FFB020',
    cta: 'Scale What Works →',
  },
]

export function SceneGrowthSystem() {
  const [open, setOpen] = React.useState<string | null>(null)
  const reduced = useReducedMotion()
  const active = STAGES.find((s) => s.name === open) || null

  return (
    <Section id="scene-3-growth-system" scene="3" tone="dark">
      <SectionHeading
        eyebrow="THE GROWTH SYSTEM"
        h2={<>One connected system. Every critical growth touchpoint.</>}
        lead={
          <>
            Seven stages. One continuous loop. Discover → Attract → Engage → Convert →
            Measure → Nurture → Grow → <span className="text-ribbon">∞</span>.
          </>
        }
        align="center"
        tone="dark"
        className="mx-auto items-center"
      />

      <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {STAGES.map((stage) => (
          <GlassNode
            key={stage.name}
            index={stage.index}
            title={stage.name}
            accent={stage.color}
            onClick={() => setOpen(stage.name)}
          >
            <p className="text-sm text-mist/75">{stage.message}</p>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {stage.capabilities.map((cap) => (
                <li key={cap}>
                  <Tag color={stage.color}>{cap}</Tag>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex items-center gap-1 text-xs font-semibold" style={{ color: stage.color }}>
              View stage
              <ArrowUpRight className="h-3.5 w-3.5" />
            </div>
          </GlassNode>
        ))}

        {/* Infinity card — the loop closes back to the start */}
        <motion.div
          initial={reduced ? undefined : { opacity: 0, y: 18 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="relative flex min-h-[180px] items-center justify-center rounded-2xl border border-white/10 bg-ink-deep/60 p-6 text-center"
          style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.04), 0 12px 40px -12px rgba(46,75,254,0.4)' }}
        >
          <div>
            <p className="font-mono text-xs tabular uppercase tracking-[0.28em] text-mist/55">
              Stage ∞
            </p>
            <p className="mt-3 text-4xl font-extrabold text-ribbon">∞</p>
            <p className="mt-2 text-xs text-mist/60">
              The loop compounds. Growth feeds back into Discovery.
            </p>
          </div>
        </motion.div>
      </div>

      <p className="mt-8 flex items-center justify-center gap-2 text-xs text-mist/50">
        <Illustrative /> Click any stage to view capabilities. Channel mix is illustrative.
      </p>

      {/* Side panel — single shared, switches content based on which stage opened */}
      <SidePanel
        open={!!active}
        onClose={() => setOpen(null)}
        title={active ? `${active.index} — ${active.name}` : ''}
        accent={active?.color || '#2E4BFE'}
      >
        {active && (
          <div className="flex flex-col gap-5">
            <p className="text-base font-semibold text-mist">{active.message}</p>

            <div>
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-mist/50">
                Capabilities
              </p>
              <ul className="flex flex-wrap gap-2">
                {active.capabilities.map((cap) => (
                  <li key={cap}>
                    <Tag color={active.color}>{cap}</Tag>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-white/10 bg-ink/40 p-4">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-mist/50">
                How this stage connects
              </p>
              <p className="mt-1.5 text-sm text-mist/75">
                This stage is part of one connected growth loop. The output of{' '}
                <strong>{active.name}</strong> feeds the next stage, and the loop returns to
                Discover as <span className="text-ribbon">∞</span>.
              </p>
            </div>

            <CtaButton href="#contact" variant="primary">
              {active.cta}
            </CtaButton>
          </div>
        )}
      </SidePanel>
    </Section>
  )
}
