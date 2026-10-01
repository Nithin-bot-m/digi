import type { Metadata } from 'next'
import { SceneHowWeWork } from '@/components/digi/scenes/scene-how-we-work'
import { NextStepBand } from '@/components/digi/page-hero'

export const metadata: Metadata = {
  title: 'How We Work',
  description: 'Diagnose → Strategise → Build → Activate → Optimise → Scale. Six steps from clarity to compounding growth.',
  alternates: { canonical: '/how-we-work' },
}

export default function HowWeWorkPage() {
  return (
    <>
      <SceneHowWeWork />
      <NextStepBand
        title="Start with Diagnose."
        body="Understand your business, audience, market and current digital footprint. From there, the roadmap writes itself."
        primary={{ label: 'Get Your Digital Growth Score →', href: '/growth-score' }}
        secondary={{ label: 'Talk to Digi∞Artha →', href: '/contact' }}
      />
    </>
  )
}
