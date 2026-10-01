'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Sparkle, CtaArrow, GradientRule, Illustrative } from './brand'
import { useReducedMotion } from './hooks'
import { ShimmerButton } from '@/components/ui/shimmer-button'
import { BorderBeam } from '@/components/ui/border-beam'

/**
 * PageHero — the top-of-page hero band for subpages.
 * Gives every subpage a consistent, on-brand entry: breadcrumb + eyebrow +
 * large H1 + lead + optional CTA row, on the dark stage with a subtle
 * infinity-ribbon glow backdrop.
 *
 * Tone is always dark (the cinematic stage) so subpages feel continuous
 * with the homepage journey.
 *
 * Also emits a BreadcrumbList JSON-LD script (Master Prompt §9) for SEO
 * rich results, derived from the `breadcrumb` prop.
 */

const SITE_URL = typeof process !== 'undefined'
  ? (process.env.NEXT_PUBLIC_SITE_URL || 'https://digiartha.com')
  : 'https://digiartha.com'

function BreadcrumbJsonLd({ items }: { items: { label: string; href?: string }[] }) {
  const list = items.map((it, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: it.label,
    ...(it.href ? { item: `${SITE_URL}${it.href}` } : {}),
  }))
  const json = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL }, ...list],
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  )
}
export function PageHero({
  breadcrumb,
  eyebrow,
  h1,
  lead,
  ctas,
  accent = '#2E4BFE',
  children,
}: {
  breadcrumb?: { label: string; href?: string }[]
  eyebrow?: string
  h1: React.ReactNode
  lead?: React.ReactNode
  ctas?: { label: string; href: string; variant?: 'primary' | 'ghost' }[]
  accent?: string
  children?: React.ReactNode
}) {
  const reduced = useReducedMotion()
  return (
    <section className="relative overflow-hidden stage-ink pt-32 pb-16 sm:pt-36 sm:pb-20" data-tone="dark">
      {/* BreadcrumbList JSON-LD for SEO rich results (Master Prompt §9) */}
      {breadcrumb && breadcrumb.length > 0 && <BreadcrumbJsonLd items={breadcrumb} />}
      <div className="pointer-events-none absolute inset-0 mesh-grid opacity-30" aria-hidden="true" />
      {/* Soft accent glow */}
      <div
        className="pointer-events-none absolute -top-32 left-1/2 h-64 w-[60%] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
        style={{ background: `radial-gradient(circle, ${accent}, transparent 70%)` }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {breadcrumb && (
          <nav className="mb-6 flex flex-wrap items-center gap-2 text-xs text-mist/50" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-mist">Home</Link>
            {breadcrumb.map((b, i) => (
              <React.Fragment key={i}>
                <span aria-hidden="true">/</span>
                {b.href ? (
                  <Link href={b.href} className="hover:text-mist">{b.label}</Link>
                ) : (
                  <span className="text-mist/80">{b.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}
        {eyebrow && (
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-cyan">
            <Sparkle size={12} />
            {eyebrow}
          </p>
        )}
        <motion.h1
          initial={reduced ? undefined : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mt-4 text-balance text-4xl font-extrabold leading-[1.05] text-mist sm:text-5xl lg:text-6xl"
        >
          {h1}
        </motion.h1>
        {lead && (
          <motion.p
            initial={reduced ? undefined : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            className="mt-5 max-w-2xl text-base leading-relaxed text-mist/70 sm:text-lg"
          >
            {lead}
          </motion.p>
        )}
        {ctas && ctas.length > 0 && (
          <div className="mt-8 flex flex-wrap items-center gap-3">
            {ctas.map((c) =>
              c.variant === 'primary' ? (
                <ShimmerButton key={c.href + c.label} href={c.href}>
                  <span>{c.label}</span>
                  <CtaArrow />
                </ShimmerButton>
              ) : (
                <Link
                  key={c.href + c.label}
                  href={c.href}
                  className="inline-flex items-center justify-center gap-1.5 rounded-full border border-white/25 bg-white/5 px-5 py-2.5 text-sm font-semibold text-mist transition-all hover:bg-white/10 hover:scale-[1.02]"
                >
                  {c.label}
                  <CtaArrow />
                </Link>
              ),
            )}
          </div>
        )}
        {children}
        <GradientRule className="mt-10 h-px w-16" />
      </div>
    </section>
  )
}

/** A simple content section for subpages. */
export function PageSection({
  id,
  tone = 'dark',
  className,
  children,
}: {
  id?: string
  tone?: 'dark' | 'mist' | 'light'
  className?: string
  children: React.ReactNode
}) {
  const bg =
    tone === 'dark'
      ? 'stage-ink text-mist'
      : tone === 'mist'
        ? 'stage-mist text-ink'
        : 'bg-background text-foreground'
  return (
    <section id={id} data-tone={tone} className={cn('relative scroll-mt-[88px] py-16 sm:py-20 lg:py-24', bg, className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  )
}

/** Compact "next step" CTA band at the bottom of every subpage. */
export function NextStepBand({
  title = 'Your next stage of growth starts with clarity.',
  body = "Understand where you're strong. Find what's holding you back. Build the system. Measure the outcome. Scale what works.",
  primary = { label: 'Get Your Digital Growth Score →', href: '/growth-score' },
  secondary = { label: 'Talk to Digi∞Artha →', href: '/contact' },
}: {
  title?: string
  body?: string
  primary?: { label: string; href: string }
  secondary?: { label: string; href: string }
}) {
  return (
    <section className="relative overflow-hidden stage-ink py-20 text-center" data-tone="dark">
      <div className="pointer-events-none absolute inset-0 mesh-grid opacity-25" aria-hidden="true" />
      <div className="relative mx-auto max-w-4xl px-4">
        <div className="glass-dark relative overflow-hidden rounded-3xl border border-white/10 p-8 sm:p-12 shadow-[0_24px_80px_-24px_rgba(46,75,254,0.35)]">
          <BorderBeam size={280} duration={12} borderWidth={1.5} />
          <h2 className="text-balance text-3xl font-extrabold leading-tight text-mist sm:text-4xl">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-mist/75 sm:text-lg">{body}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <ShimmerButton href={primary.href}>
              <span>{primary.label}</span>
            </ShimmerButton>
            <Link
              href={secondary.href}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/5 px-6 py-3 text-sm font-semibold text-mist hover:bg-white/10 transition-all hover:scale-[1.02]"
            >
              {secondary.label}
            </Link>
          </div>
          <p className="mt-6 text-xs text-mist/40">
            Every number on this page is illustrative <Illustrative /> — we report business outcomes, not vanity metrics.
          </p>
        </div>
      </div>
    </section>
  )
}
