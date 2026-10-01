import type { Metadata } from 'next'
import { PageHero, PageSection } from '@/components/digi/page-hero'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Digi∞Artha handles personal data submitted through this website.',
  alternates: { canonical: '/privacy' },
}

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: 'Privacy' }]}
        eyebrow="LEGAL"
        h1={<>Privacy <span className="text-ribbon-diag">Policy</span></>}
        lead="Digi∞Artha handles personal data submitted through this website solely to respond to enquiries, provide the Digital Growth Score™, and improve our services."
      />
      <PageSection tone="mist">
        <div className="prose prose-lg max-w-2xl text-ink/80">
          <h2 className="text-2xl font-bold text-ink">What we collect</h2>
          <p className="mt-2">
            Information you submit through our forms — name, work email, phone, company, website,
            industry, the topic you need help with, and your message. We also capture basic
            analytics (sessions, device type, country) and UTM parameters when you arrive from a
            campaign link.
          </p>
          <h2 className="mt-8 text-2xl font-bold text-ink">How we use it</h2>
          <p className="mt-2">
            To respond to your enquiry, to generate and improve your Digital Growth Score™ report,
            and to improve our services. We do not sell personal data.
          </p>
          <h2 className="mt-8 text-2xl font-bold text-ink">Data retention</h2>
          <p className="mt-2">
            Lead records are retained for the duration of any active conversation and a reasonable
            period thereafter for audit and improvement purposes. Specific retention windows are
            documented per the markets we serve.
          </p>
          <h2 className="mt-8 text-2xl font-bold text-ink">Your rights</h2>
          <p className="mt-2">
            You may request access to, correction of, or deletion of your personal data by emailing{' '}
            <a href="mailto:hello@digiartha.com" className="text-royal underline">hello@digiartha.com</a>.
            We respond within the timelines required by the applicable market.
          </p>
          <h2 className="mt-8 text-2xl font-bold text-ink">Specific markets</h2>
          <p className="mt-2">
            Specific data-handling details — including consent mechanisms, cookie preferences, and
            cross-border transfer mechanisms — are documented per the markets we serve. We do not
            claim legal compliance or certification without verification.
          </p>
          <p className="mt-8 text-sm text-ink/50">
            For full legal documents or specific data requests, contact{' '}
            <a href="mailto:hello@digiartha.com" className="underline">hello@digiartha.com</a>.
          </p>
        </div>
      </PageSection>
    </>
  )
}
