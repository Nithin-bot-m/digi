'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Shield, FileText, Cookie } from 'lucide-react'
import { Section, SectionHeading } from '@/components/digi/ui'
import { useReducedMotion } from '@/components/digi/hooks'

/**
 * SectionLegal — Privacy / Terms / Cookie Policy (Source A §25 guardrail)
 * Tone: mist. Accent: muted.
 *
 * Renders 3 policy sub-cards. Each card has the policy name as an
 * <h3 id="privacy|terms|cookies"> so footer links (#privacy, #terms, #cookies)
 * jump here. Short, honest summaries only — no fake compliance claims.
 */

const POLICIES = [
  {
    id: 'privacy',
    name: 'Privacy',
    icon: Shield,
    summary:
      'Digi∞Artha handles personal data submitted through this website solely to respond to enquiries, provide the Digital Growth Score™, and improve our services. We do not sell personal data. Specific data-handling details are documented per the markets we serve.',
    accent: '#2E4BFE',
  },
  {
    id: 'terms',
    name: 'Terms',
    icon: FileText,
    summary:
      'Use of this site and any engagement with Digi∞Artha is governed by a separate services agreement. The Digital Growth Score™ is a diagnostic framework, not an official ranking or a guarantee of future performance.',
    accent: '#7B3FFE',
  },
  {
    id: 'cookies',
    name: 'Cookie Policy',
    icon: Cookie,
    summary:
      'This site uses essential cookies for core functionality and analytics cookies to understand how visitors use the site. Consent is requested where required by the visitor\u2019s market.',
    accent: '#02A3FE',
  },
] as const

export function SectionLegal() {
  const reduced = useReducedMotion()

  return (
    <Section id="legal" scene="L" tone="mist">
      <SectionHeading
        eyebrow="LEGAL"
        h2={
          <>
            Privacy, terms &amp; <span className="text-ribbon">cookies</span>.
          </>
        }
        lead="Short, honest summaries. Full legal documents are available on request."
        align="left"
        tone="light"
      />

      <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {POLICIES.map((p) => {
          const Icon = p.icon
          return (
            <motion.article
              key={p.id}
              initial={reduced ? undefined : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="flex h-full scroll-mt-[88px] flex-col gap-4 rounded-2xl border border-ink/10 bg-white/80 p-6"
              style={{ boxShadow: `0 12px 32px -18px ${p.accent}40` }}
            >
              <div className="flex items-center gap-3">
                <span
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{ background: `${p.accent}14`, color: p.accent }}
                  aria-hidden
                >
                  <Icon size={20} strokeWidth={2} />
                </span>
                <h3
                  id={p.id}
                  className="scroll-mt-[88px] text-lg font-bold text-ink"
                >
                  {p.name}
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-ink/75">{p.summary}</p>
            </motion.article>
          )
        })}
      </div>

      <motion.p
        initial={reduced ? undefined : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="mt-8 text-xs text-ink/55"
      >
        For full legal documents or specific data requests, contact{' '}
        <a
          href="mailto:hello@digiartha.com"
          className="font-semibold text-royal underline underline-offset-2 hover:text-violet"
        >
          hello@digiartha.com
        </a>
        .
      </motion.p>
    </Section>
  )
}
