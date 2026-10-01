'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, Mail, Smartphone, Target, UserPlus, TrendingUp, Heart, Users } from 'lucide-react'
import { Section, SectionHeading, CtaButton, GlassNode, SidePanel } from '@/components/digi/ui'
import { Illustrative } from '@/components/digi/brand'
import { useReducedMotion } from '@/components/digi/hooks'

/**
 * Scene 10 — Nurture
 * H2: "Turn leads into relationships." (Source A §13 H1)
 * Accent: orange #FF8E2D (lane-performance end)
 *
 * Set-piece: a horizontal "lifecycle track" of 8 stops. The track pulses
 * left-to-right with the lane-performance gradient (coral → orange) to evoke
 * the ribbon flowing through the customer lifecycle. Each stop is a GlassNode
 * with a Lucide icon, the channel label, and a one-line gloss paraphrased
 * from Source A §13 Lifecycle section.
 */

type Stop = {
  label: string
  icon: React.ComponentType<{ className?: string }>
  gloss: string
}

const STOPS: Stop[] = [
  { label: 'WhatsApp', icon: MessageCircle, gloss: 'Conversational follow-up and qualification where customers already chat.' },
  { label: 'Email', icon: Mail, gloss: 'Nurture sequences that move leads from interest to decision.' },
  { label: 'SMS', icon: Smartphone, gloss: 'Time-sensitive nudges for offers, appointments and reminders.' },
  { label: 'Retargeting', icon: Target, gloss: 'Re-engage visitors who showed intent but did not convert.' },
  { label: 'Onboarding', icon: UserPlus, gloss: 'Welcome flows that turn first-time customers into active users.' },
  { label: 'Upsell', icon: TrendingUp, gloss: 'Identify expansion moments and present the next relevant offer.' },
  { label: 'Loyalty', icon: Heart, gloss: 'Reward repeat behaviour and deepen lifetime value.' },
  { label: 'Referral', icon: Users, gloss: 'Turn satisfied customers into a new acquisition channel.' },
]

export function SceneNurture() {
  const [open, setOpen] = React.useState<string | null>(null)
  const reduced = useReducedMotion()

  return (
    <Section id="scene-10-nurture" scene="10" tone="dark">
      <SectionHeading
        eyebrow="SCENE 10 · NURTURE"
        h2={<>Turn leads into <span className="text-ribbon">relationships.</span></>}
        lead={
          <>
            Acquisition is only the beginning. We connect follow-up, qualification, nurturing and retention into the growth
            system — across WhatsApp, email, SMS, retargeting, onboarding, upsell, loyalty and referral.
          </>
        }
      />

      {/* Lifecycle track */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-15% 0px -10% 0px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="mt-14"
      >
        {/* The flowing ribbon — pulses left-to-right */}
        <div className="relative mb-6 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
          <div
            className="lane-performance absolute inset-0 rounded-full"
            style={reduced ? undefined : { animation: 'ribbon-flow 6s linear infinite', backgroundSize: '200% 100%' }}
          />
        </div>

        <ol
          className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8"
          aria-label="Lifecycle stages: WhatsApp, Email, SMS, Retargeting, Onboarding, Upsell, Loyalty, Referral"
        >
          {STOPS.map((s, i) => {
            const Icon = s.icon
            return (
              <li key={s.label}>
                <GlassNode
                  index={`0${i + 1}`}
                  title={s.label}
                  accent="#FF8E2D"
                  onClick={() => setOpen(s.label)}
                >
                  <div className="flex flex-col gap-2">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-orange/10 text-orange glow-orange">
                      <Icon className="h-4 w-4" />
                    </span>
                    <p className="text-xs leading-relaxed text-mist/70">{s.gloss}</p>
                  </div>
                </GlassNode>
              </li>
            )
          })}
        </ol>

        <p className="mt-4 text-center text-xs text-mist/50">
          Tap a stop to see how it plugs into the lead-to-customer system. <Illustrative />
        </p>
      </motion.div>

      <div className="mt-12 flex justify-center">
        <CtaButton href="#contact" variant="primary">
          Build My Lead-to-Customer System →
        </CtaButton>
      </div>

      <SidePanel open={open === 'WhatsApp'} onClose={() => setOpen(null)} title="WhatsApp Follow-up" accent="#FF8E2D">
        <p className="mb-3">
          Conversational follow-up where customers already spend their time. Lead qualification, booking links and
          automated routing can all live inside the same WhatsApp thread, with handoff to a human when intent crosses a
          threshold.
        </p>
        <p className="text-mist/60">Part of the CRM &amp; Automation solution — Source A §13.</p>
      </SidePanel>

      <SidePanel open={open === 'Email'} onClose={() => setOpen(null)} title="Email Marketing" accent="#FF8E2D">
        <p className="mb-3">
          Segmented nurture sequences that move leads from interest to decision, with reporting tied back to pipeline and
          revenue rather than open rate alone.
        </p>
        <p className="text-mist/60">Part of the CRM &amp; Automation solution — Source A §13.</p>
      </SidePanel>

      <SidePanel open={open === 'SMS'} onClose={() => setOpen(null)} title="SMS" accent="#FF8E2D">
        <p className="mb-3">
          Time-sensitive nudges for offers, appointments and reminders — opt-in first, frequency capped, and tracked to
          downstream conversion.
        </p>
        <p className="text-mist/60">Part of the CRM &amp; Automation solution — Source A §13.</p>
      </SidePanel>

      <SidePanel open={open === 'Retargeting'} onClose={() => setOpen(null)} title="Retargeting" accent="#FF8E2D">
        <p className="mb-3">
          Re-engage visitors who showed intent but did not convert — segmented by stage, with creative matched to the
          last action they took.
        </p>
        <p className="text-mist/60">Part of the CRM &amp; Automation solution — Source A §13.</p>
      </SidePanel>

      <SidePanel open={open === 'Onboarding'} onClose={() => setOpen(null)} title="Onboarding" accent="#FF8E2D">
        <p className="mb-3">
          Welcome flows that turn first-time customers into active users — product tours, milestones and early value
          moments sequenced to reduce time-to-outcome.
        </p>
        <p className="text-mist/60">Part of the CRM &amp; Automation solution — Source A §13.</p>
      </SidePanel>

      <SidePanel open={open === 'Upsell'} onClose={() => setOpen(null)} title="Upsell" accent="#FF8E2D">
        <p className="mb-3">
          Identify expansion moments from behaviour and lifecycle stage, then present the next relevant offer — measured
          by incremental revenue, not by impressions.
        </p>
        <p className="text-mist/60">Part of the CRM &amp; Automation solution — Source A §13.</p>
      </SidePanel>

      <SidePanel open={open === 'Loyalty'} onClose={() => setOpen(null)} title="Loyalty" accent="#FF8E2D">
        <p className="mb-3">
          Reward repeat behaviour and deepen lifetime value — tiers, milestones, earned privileges — connected to CRM
          data so recognition is personal, not generic.
        </p>
        <p className="text-mist/60">Part of the CRM &amp; Automation solution — Source A §13.</p>
      </SidePanel>

      <SidePanel open={open === 'Referral'} onClose={() => setOpen(null)} title="Referral" accent="#FF8E2D">
        <p className="mb-3">
          Turn satisfied customers into a new acquisition channel — shareable links, tracked attribution and a thank-you
          flow that closes the loop back to the top of the growth system.
        </p>
        <p className="text-mist/60">Part of the CRM &amp; Automation solution — Source A §13.</p>
      </SidePanel>
    </Section>
  )
}
