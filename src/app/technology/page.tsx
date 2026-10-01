import type { Metadata } from 'next'
import { SectionTechnology } from '@/components/digi/sections/technology'
import { NextStepBand } from '@/components/digi/page-hero'

export const metadata: Metadata = {
  title: 'Technology',
  description: 'The technology behind measurable growth — advertising, analytics, CRM, automation, commerce, AI. Real platforms, no inflated partner claims.',
  alternates: { canonical: '/technology' },
}

export default function TechnologyPage() {
  return (
    <>
      <SectionTechnology />
      <NextStepBand
        title="Want the right stack for your growth stage?"
        body="We don't push platforms — we pick what fits your customer journey and measurement needs."
        primary={{ label: 'Talk to Digi∞Artha →', href: '/contact' }}
        secondary={{ label: 'Get Your Digital Growth Score →', href: '/growth-score' }}
      />
    </>
  )
}
