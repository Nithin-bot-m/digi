import type { Metadata } from 'next'
import { SceneCaseStudies } from '@/components/digi/scenes/scene-case-studies'
import { NextStepBand } from '@/components/digi/page-hero'

export const metadata: Metadata = {
  title: 'Case Studies',
  description: 'Growth you can measure. Verified outcomes only — pilots and experiments are labelled accurately.',
  alternates: { canonical: '/case-studies' },
}

export default function CaseStudiesPage() {
  return (
    <>
      <SceneCaseStudies />
      <NextStepBand
        title="Solve a similar growth challenge."
        body="If you have a measurable growth problem and want a structured diagnostic + strategy + execution, talk to us."
        primary={{ label: 'Solve a Similar Growth Challenge →', href: '/contact' }}
        secondary={{ label: 'Get Your Digital Growth Score →', href: '/growth-score' }}
      />
    </>
  )
}
