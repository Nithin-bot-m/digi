'use client'

import Link from 'next/link'
import { BrandLogo, Wordmark, Tagline, GradientRule } from './brand'
import { InfinityRibbon } from './infinity-ribbon'

const COLS = [
  {
    title: 'Solutions',
    links: [
      { href: '/solutions/performance-marketing', label: 'Performance Marketing' },
      { href: '/solutions/search-ai-visibility', label: 'Search & AI Visibility' },
      { href: '/solutions/creative-content', label: 'Creative & Content' },
      { href: '/solutions/web-conversion', label: 'Web & Conversion' },
      { href: '/solutions/data-analytics', label: 'Data & Analytics' },
      { href: '/solutions/crm-automation', label: 'CRM & Automation' },
      { href: '/solutions/ai-growth', label: 'AI Growth' },
    ],
  },
  {
    title: 'Company',
    links: [
      { href: '/about', label: 'About' },
      { href: '/how-we-work', label: 'How We Work' },
      { href: '/industries', label: 'Industries' },
      { href: '/case-studies', label: 'Case Studies' },
      { href: '/insights', label: 'Insights' },
      { href: '/contact', label: 'Contact' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { href: '/growth-score', label: 'Digital Growth Score™' },
      { href: '/growth-os', label: 'Growth OS' },
      { href: '/pillars', label: '13 Pillars' },
      { href: '/engagement-models', label: 'Engagement Models' },
      { href: '/technology', label: 'Technology' },
    ],
  },
]

const LEGAL = [
  { href: '/privacy', label: 'Privacy' },
  { href: '/terms', label: 'Terms' },
  { href: '/cookies', label: 'Cookie Policy' },
]

export function SiteFooter() {
  return (
    <footer className="relative mt-auto overflow-hidden stage-ink text-mist/80">
      {/* Ambient Infinity Ribbon Loop in Footer - transparent, ethereal, positioned down so whole loop is framed */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-4 top-20 sm:top-24 z-0 flex items-center justify-center opacity-20 sm:opacity-25"
        aria-hidden="true"
      >
        <div className="relative w-full max-w-4xl sm:max-w-5xl h-[280px] sm:h-[340px]">
          <InfinityRibbon className="absolute inset-0 h-full w-full" intensity={0.3} />
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <BrandLogo variant="dark" size="lg" glow />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-mist/60">
              Digi∞Artha connects performance marketing, search, creative, conversion, data and
              automation into one continuous digital growth system.
            </p>
            <Tagline variant="dark" className="mt-4" />
            <Link
              href="/growth-score"
              className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-ribbon px-4 py-2 text-sm font-semibold text-white glow-ribbon"
            >
              Get Your Digital Growth Score →
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-8 lg:col-span-6 lg:grid-cols-3">
            {COLS.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-mist/50">{col.title}</h3>
                <ul className="mt-3 space-y-2">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-sm text-mist/70 transition hover:text-mist">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-mist/50">Contact</h3>
            <ul className="mt-3 space-y-2 text-sm text-mist/70">
              <li>
                <Link href="/contact" className="hover:text-mist">
                  Start a conversation
                </Link>
              </li>
              <li>
                <Link href="/growth-score" className="hover:text-mist">
                  Request a proposal
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <GradientRule className="my-10 h-px w-full opacity-40" />

        <div className="flex flex-col items-start justify-between gap-4 text-xs text-mist/50 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Digi∞Artha. Digital. Measurable. Growth.</p>
          <nav className="flex items-center gap-5">
            {LEGAL.map((l) => (
              <Link key={l.href} href={l.href} className="transition hover:text-mist">
                {l.label}
              </Link>
            ))}
          </nav>
          <p className="text-mist/40">A digital venture under ISD.</p>
        </div>
      </div>
    </footer>
  )
}
