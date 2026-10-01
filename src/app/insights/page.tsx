import type { Metadata } from 'next'
import { SectionInsights } from '@/components/digi/sections/insights'
import { NextStepBand } from '@/components/digi/page-hero'

export const metadata: Metadata = {
  title: 'Insights',
  description: 'Ideas for the next era of digital growth. Original, useful content across performance, SEO, AI search, creative, CRO, analytics, CRM and AI growth.',
  alternates: { canonical: '/insights' },
}

export default function InsightsPage() {
  return (
    <>
      <SectionInsights />
      <NextStepBand
        title="Want a growth insight applied to your business?"
        body="Talk to us about your specific growth question — we'll point you at the right diagnostic or engagement."
        primary={{ label: 'Talk to Digi∞Artha →', href: '/contact' }}
        secondary={{ label: 'Get Your Digital Growth Score →', href: '/growth-score' }}
      />
    </>
  )
}
