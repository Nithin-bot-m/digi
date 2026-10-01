import type { Metadata } from 'next'
import { SceneIndustries } from '@/components/digi/scenes/scene-industries'
import { NextStepBand } from '@/components/digi/page-hero'

export const metadata: Metadata = {
  title: 'Industries',
  description:
    'Growth strategies built around your business model. Education & EdTech, B2B & SaaS, E-commerce & Retail, Real Estate, Healthcare & Professional Services, Technology & Enterprise.',
  alternates: { canonical: '/industries' },
}

export default function IndustriesPage() {
  return (
    <>
      <SceneIndustries />
      <NextStepBand
        title="Want the growth system mapped to your industry?"
        body="Talk to Digi∞Artha about your customer journey, acquisition model and the measurable outcomes that matter for your sector."
        primary={{ label: 'Talk to Digi∞Artha →', href: '/contact' }}
        secondary={{ label: 'Get Your Digital Growth Score →', href: '/growth-score' }}
      />
    </>
  )
}
