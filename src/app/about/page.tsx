import type { Metadata } from 'next'
import { SectionAbout } from '@/components/digi/sections/about'
import { NextStepBand } from '@/components/digi/page-hero'

export const metadata: Metadata = {
  title: 'About',
  description: 'We engineer digital growth. Digi∞Artha is a digital growth and performance company connecting strategy, marketing, technology and data.',
  alternates: { canonical: '/about' },
}

export default function AboutPage() {
  return (
    <>
      <SectionAbout />
      <NextStepBand
        title="Want to see how we'd engineer your growth?"
        body="Start with the Digital Growth Score™, or talk to us directly."
        primary={{ label: 'Get Your Digital Growth Score →', href: '/growth-score' }}
        secondary={{ label: 'Talk to Digi∞Artha →', href: '/contact' }}
      />
    </>
  )
}
