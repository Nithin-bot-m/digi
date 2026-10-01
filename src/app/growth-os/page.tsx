import type { Metadata } from 'next'
import { SectionOperatingSystem } from '@/components/digi/sections/operating-system'
import { NextStepBand } from '@/components/digi/page-hero'

export const metadata: Metadata = {
  title: 'Digital Growth Operating System',
  description: 'Discover / Acquire / Convert → Measure → Nurture → Retain → Scale. One operating system for digital growth.',
  alternates: { canonical: '/growth-os' },
}

export default function GrowthOsPage() {
  return (
    <>
      <SectionOperatingSystem />
      <NextStepBand
        title="Build the system, not just the campaign."
        body="If you want connected growth infrastructure rather than isolated tactics, talk to us."
        primary={{ label: 'Talk to Digi∞Artha →', href: '/contact' }}
        secondary={{ label: 'Get Your Digital Growth Score →', href: '/growth-score' }}
      />
    </>
  )
}
