import type { Metadata } from 'next'
import { SceneGrowthScore } from '@/components/digi/scenes/scene-growth-score'
import { InteractiveGrowthCalculator } from '@/components/digi/interactive-growth-calculator'
import { NextStepBand } from '@/components/digi/page-hero'

export const metadata: Metadata = {
  title: 'Digital Growth Score™',
  description:
    'Analyse your website and digital presence across 10 dimensions — website health, search visibility, AI search visibility, local presence, social, content, paid readiness, conversion, reputation and measurement.',
  alternates: { canonical: '/growth-score' },
}

export default function GrowthScorePage() {
  return (
    <>
      <SceneGrowthScore />
      <section className="relative stage-ink py-20 border-t border-white/10">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan">
              REAL-TIME SIMULATION
            </p>
            <h2 className="mt-3 text-3xl font-extrabold text-mist sm:text-4xl">
              Model your <span className="text-ribbon">growth velocity</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-mist/70">
              Adjust your monthly budget, primary growth constraint, and target multiplier to calculate your estimated scale efficiency and CAC reduction.
            </p>
          </div>
          <InteractiveGrowthCalculator />
        </div>
      </section>
      <NextStepBand
        title="Turn the score into a plan."
        body="Book a 30-minute Growth Blueprint session. We turn the diagnostic into a prioritised 90-day plan with the highest-impact moves first."
        primary={{ label: 'Book a Strategy Session →', href: '/contact' }}
        secondary={{ label: 'Explore Solutions →', href: '/solutions' }}
      />
    </>
  )
}
