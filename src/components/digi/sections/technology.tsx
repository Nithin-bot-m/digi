'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Megaphone, BarChart3, Users, Workflow, ShoppingBag, Bot } from 'lucide-react'
import { Section, SectionHeading } from '@/components/digi/ui'
import { useReducedMotion } from '@/components/digi/hooks'

/**
 * SectionTechnology — Digi∞Artha Technology & Platforms (Source A §19 verbatim)
 * Tone: mist. Accent: cyan #02A3FE.
 *
 * 6 platform cards in a 2x3 / 3x2 grid. Text-only with abstract Lucide icons
 * per category — no third-party logos. Trust rule rendered as a small note.
 */

type Category = {
  name: string
  platforms: string[]
  icon: React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>
  accent: string
}

const CATEGORIES: Category[] = [
  {
    name: 'Advertising',
    platforms: ['Google Ads', 'Meta Ads', 'LinkedIn Ads', 'YouTube', 'Shopping', 'Demand Gen'],
    icon: Megaphone,
    accent: '#02A3FE',
  },
  {
    name: 'Analytics',
    platforms: ['GA4', 'Google Tag Manager', 'Search Console', 'Dashboarding'],
    icon: BarChart3,
    accent: '#2E4BFE',
  },
  {
    name: 'CRM',
    platforms: ['HubSpot', 'Salesforce', 'Zoho', 'LeadSquared', 'Other client-selected CRM systems'],
    icon: Users,
    accent: '#7B3FFE',
  },
  {
    name: 'Automation',
    platforms: ['WhatsApp', 'Email', 'Workflow automation', 'CRM automation', 'AI workflows'],
    icon: Workflow,
    accent: '#E93BF2',
  },
  {
    name: 'Commerce',
    platforms: ['Shopify', 'WooCommerce', 'Google Merchant Center', 'Marketplaces'],
    icon: ShoppingBag,
    accent: '#FF544D',
  },
  {
    name: 'AI',
    platforms: ['AI agents', 'AI workflows', 'AI analytics', 'AI content systems', 'AI search monitoring'],
    icon: Bot,
    accent: '#FF8E2D',
  },
]

export function SectionTechnology() {
  const reduced = useReducedMotion()

  return (
    <Section id="technology" scene="T" tone="mist" className="pt-28 sm:pt-36">
      <SectionHeading
        eyebrow="TECHNOLOGY & PLATFORMS"
        h2={
          <>
            The technology behind{' '}
            <span className="text-ribbon">measurable growth</span>.
          </>
        }
        lead="Digi∞Artha works across the platforms and systems required to build a measurable digital growth ecosystem."
        align="left"
        tone="light"
      />

      <motion.div
        initial={reduced ? undefined : { opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-15% 0px -10% 0px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5"
      >
        {CATEGORIES.map((c) => {
          const Icon = c.icon
          return (
            <motion.article
              key={c.name}
              initial={reduced ? undefined : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              whileHover={reduced ? undefined : { y: -3 }}
              className="flex h-full flex-col gap-4 rounded-2xl border border-ink/10 bg-white/80 p-5"
              style={{ boxShadow: `0 12px 32px -16px ${c.accent}40` }}
            >
              <div className="flex items-center gap-3">
                <span
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{ background: `${c.accent}14`, color: c.accent }}
                  aria-hidden
                >
                  <Icon size={20} strokeWidth={2} />
                </span>
                <h3 className="text-base font-bold text-ink">{c.name}</h3>
              </div>

              <ul className="flex flex-wrap gap-1.5">
                {c.platforms.map((p) => (
                  <li
                    key={p}
                    className="rounded-full border border-ink/10 bg-mist-soft px-2.5 py-1 text-[11px] font-medium text-ink/75"
                  >
                    {p}
                  </li>
                ))}
              </ul>
            </motion.article>
          )
        })}
      </motion.div>

      {/* Trust rule */}
      <motion.p
        initial={reduced ? undefined : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="mt-8 max-w-3xl text-xs leading-relaxed text-ink/55"
      >
        Trust rule: Only display logos, certifications, partner badges or &ldquo;official
        partner&rdquo; language where the relationship is real and current.
      </motion.p>
    </Section>
  )
}
