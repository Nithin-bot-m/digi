import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { PageHero, PageSection, NextStepBand } from '@/components/digi/page-hero'
import { SOLUTION_CARDS } from '@/components/digi/solutions-data'
import { SpotlightCard } from '@/components/ui/spotlight-card'

export const metadata: Metadata = {
  title: 'Solutions',
  description:
    'One growth system. Multiple capabilities. Performance Marketing, Search & AI Visibility, Creative & Content, Web & Conversion, Data & Analytics, CRM & Automation, AI Growth.',
  alternates: { canonical: '/solutions' },
}

export default function SolutionsIndexPage() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: 'Solutions' }]}
        eyebrow="SOLUTIONS"
        h1={<>Everything your growth engine <span className="text-ribbon-diag">needs.</span></>}
        lead="One growth system. Multiple capabilities. Open any pillar for the full page — the verbatim scope, services, performance creative loop, measurement, and the CTA."
      />
      <PageSection tone="mist">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SOLUTION_CARDS.map((s) => (
            <Link key={s.slug} href={`/solutions/${s.slug}`} className="group block h-full">
              <SpotlightCard
                spotlightColor={`${s.accent}22`}
                className="flex h-full flex-col gap-4 rounded-2xl border border-ink/10 bg-white p-7 transition-all duration-300 group-hover:border-ink/20 group-hover:shadow-[0_24px_50px_-20px_rgba(46,75,254,0.18)]"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold tabular tracking-wider" style={{ color: s.accent }}>
                    {s.index}
                  </span>
                  <span
                    className="inline-block h-2.5 w-2.5 rounded-full"
                    style={{ background: s.accent, boxShadow: `0 0 12px ${s.accent}` }}
                  />
                </div>
                <h2 className="text-xl font-bold text-ink">{s.title}</h2>
                <p className="flex-1 text-sm leading-relaxed text-ink/75">{s.oneLiner}</p>
                <div
                  className="mt-auto flex items-center gap-1.5 pt-2 text-xs font-bold uppercase tracking-wider transition-transform duration-200 group-hover:translate-x-1"
                  style={{ color: s.accent }}
                >
                  <span>Explore Solution</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </SpotlightCard>
            </Link>
          ))}
        </div>
      </PageSection>
      <NextStepBand
        title="Not sure where to start?"
        body="Run the Digital Growth Score™ first — a 10-dimension diagnostic that surfaces your top five growth opportunities in under a minute."
        primary={{ label: 'Get Your Digital Growth Score →', href: '/growth-score' }}
        secondary={{ label: 'Talk to a Growth Strategist →', href: '/contact' }}
      />
    </>
  )
}
