import type { Metadata } from 'next'
import { SectionContact } from '@/components/digi/sections/contact'

export const metadata: Metadata = {
  title: 'Contact',
  description: "Let's build your next growth engine. Tell us what you're trying to achieve, what is currently holding growth back and which part of the customer journey you want to improve.",
  alternates: { canonical: '/contact' },
}

export default function ContactPage() {
  return <SectionContact />
}
