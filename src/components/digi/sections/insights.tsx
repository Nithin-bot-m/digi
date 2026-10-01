'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'
import { Section, SectionHeading, CtaButton } from '@/components/digi/ui'
import { Illustrative } from '@/components/digi/brand'
import { useReducedMotion } from '@/components/digi/hooks'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'

/**
 * SectionInsights — Digi∞Artha Insights (Source A §20 verbatim)
 * Tone: mist. Accent: violet #7B3FFE.
 *
 * 8 category pill tags + 8 content-format outline pills + editorial principle
 * pull quote + 3 coming-soon placeholder cards with email capture input
 * (visual only — uses the existing useToast hook to confirm).
 */

const CATEGORIES = [
  'Performance Marketing',
  'SEO & Search',
  'AI Search',
  'Creative & Content',
  'CRO',
  'Analytics & Attribution',
  'CRM & Automation',
  'AI & Growth',
] as const

const FORMATS = [
  'Guides',
  'Research',
  'Case studies',
  'Playbooks',
  'Checklists',
  'Market analysis',
  'Glossary',
  'FAQs',
] as const

const COMING_SOON = [
  {
    title: 'Coming soon — Performance Marketing Playbook',
    note: 'A practical playbook for paid acquisition across Google, Meta and beyond.',
  },
  {
    title: 'Coming soon — AI Search Visibility Guide',
    note: 'How to be discovered, cited and recommended by AI search systems.',
  },
  {
    title: 'Coming soon — Measurement & Attribution Checklist',
    note: 'A working checklist for clean tracking, attribution and dashboards.',
  },
] as const

const ACCENT = '#7B3FFE'

export function SectionInsights() {
  const reduced = useReducedMotion()
  const { toast } = useToast()
  const [email, setEmail] = React.useState('')

  const onNotify = (e: React.FormEvent) => {
    e.preventDefault()
    const v = email.trim()
    if (!v || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) {
      toast({
        title: 'Enter a valid email',
        description: 'We need a valid email address to notify you when Insights publishes.',
      })
      return
    }
    toast({
      title: 'You are on the list.',
      description: 'We will email you when the first Digi∞Artha Insights pieces publish.',
    })
    setEmail('')
  }

  return (
    <Section id="insights" scene="I" tone="mist" className="pt-28 sm:pt-36">
      <SectionHeading
        eyebrow="INSIGHTS"
        h2={
          <>
            Ideas for the next era of{' '}
            <span className="text-ribbon">digital growth</span>.
          </>
        }
        lead="Original, useful content from Digi∞Artha — built to demonstrate expertise, not to fill a feed."
        align="left"
        tone="light"
      />

      {/* Categories — filled pills */}
      <motion.div
        initial={reduced ? undefined : { opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-15% 0px -10% 0px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="mt-10"
      >
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-ink/55">
          Categories
        </p>
        <ul className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <li
              key={c}
              className="rounded-full px-3 py-1.5 text-xs font-semibold"
              style={{
                color: ACCENT,
                background: `${ACCENT}12`,
                border: `1px solid ${ACCENT}33`,
              }}
            >
              {c}
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Formats — outline pills */}
      <motion.div
        initial={reduced ? undefined : { opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-15% 0px -10% 0px' }}
        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
        className="mt-8"
      >
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-ink/55">
          Content formats
        </p>
        <ul className="flex flex-wrap gap-2">
          {FORMATS.map((f) => (
            <li
              key={f}
              className="rounded-full border border-ink/15 bg-white px-3 py-1.5 text-xs font-medium text-ink/75"
            >
              {f}
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Editorial principle — pull quote */}
      <motion.blockquote
        initial={reduced ? undefined : { opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-15% 0px -10% 0px' }}
        transition={{ duration: 0.55, ease: 'easeOut', delay: 0.15 }}
        className="mt-12 rounded-2xl border-l-4 bg-white/70 p-6"
        style={{ borderColor: ACCENT }}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-ink/55">
          Editorial principle
        </p>
        <p className="mt-3 text-lg font-bold leading-snug text-ink/90 sm:text-xl">
          <span aria-hidden className="mr-1 text-ink/30">
            &ldquo;
          </span>
          Publish original, useful content that demonstrates expertise. Avoid
          producing large volumes of generic AI-generated articles simply to fill
          the blog.
          <span aria-hidden className="ml-1 text-ink/30">
            &rdquo;
          </span>
        </p>
      </motion.blockquote>

      {/* Coming soon — 3 placeholder cards */}
      <div className="mt-12">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-ink/55">
          Coming soon
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {COMING_SOON.map((cs) => (
            <motion.article
              key={cs.title}
              initial={reduced ? undefined : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="flex h-full flex-col gap-3 rounded-2xl border border-dashed border-ink/15 bg-white/60 p-5"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold leading-tight text-ink">{cs.title}</h3>
                <Illustrative />
              </div>
              <p className="text-sm leading-relaxed text-ink/70">{cs.note}</p>
              <p className="mt-auto text-xs text-ink/55">Subscribe to be notified.</p>
            </motion.article>
          ))}
        </div>

        {/* Email capture — visual / toast-only */}
        <form
          onSubmit={onNotify}
          className="mt-6 flex flex-col items-stretch gap-2 sm:flex-row sm:items-center"
          aria-label="Subscribe to be notified when Insights publishes"
        >
          <label htmlFor="insights-email" className="sr-only">
            Email address
          </label>
          <div className="relative flex-1">
            <Mail
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink/40"
              aria-hidden
            />
            <Input
              id="insights-email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="you@work.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button
            type="submit"
            className="bg-ribbon text-white glow-ribbon hover:scale-[1.02]"
          >
            Notify me
          </Button>
        </form>
      </div>

      <div className="mt-10">
        <CtaButton href="#contact" variant="primary">
          Talk to Digi∞Artha about Insights →
        </CtaButton>
      </div>
    </Section>
  )
}
