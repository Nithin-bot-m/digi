import type { Metadata } from 'next'
import { SectionPillars } from '@/components/digi/sections/pillars'
import { NextStepBand } from '@/components/digi/page-hero'

export const metadata: Metadata = {
  title: '13 Pillars',
  description: 'The depth behind the growth system: Growth Intelligence, Digital Presence Architecture, Search & AI Visibility, Paid Growth, Content Intelligence, Social, Conversion, Revenue, Lifecycle, Reputation, Commerce, Creator, AI Growth Automation.',
  alternates: { canonical: '/pillars' },
}

export default function PillarsPage() {
  return (
    <>
      <SectionPillars />
      <NextStepBand
        title="Depth is the differentiator."
        body="These 13 pillars sit underneath the 7 public solutions. Talk to us about the depth your business actually needs."
        primary={{ label: 'Talk to Digi∞Artha →', href: '/contact' }}
        secondary={{ label: 'Explore Solutions →', href: '/solutions' }}
      />
    </>
  )
}
