import type { Metadata } from 'next'
import { SectionEngagementModels } from '@/components/digi/sections/engagement-models'
import { NextStepBand } from '@/components/digi/page-hero'

export const metadata: Metadata = {
  title: 'Engagement Models',
  description: 'Growth Diagnostic, Growth Sprint, Performance Partner, Growth System, Enterprise. Five ways to engage Digi∞Artha.',
  alternates: { canonical: '/engagement-models' },
}

export default function EngagementModelsPage() {
  return (
    <>
      <SectionEngagementModels />
      <NextStepBand
        title="Pick the model that fits where you are."
        body="Not sure? Start with the Growth Diagnostic — the Digital Growth Score™ plus a prioritised opportunity map."
        primary={{ label: 'Get Your Digital Growth Score →', href: '/growth-score' }}
        secondary={{ label: 'Talk to a Growth Strategist →', href: '/contact' }}
      />
    </>
  )
}
