import type { Metadata } from 'next'
import { PageHero, PageSection } from '@/components/digi/page-hero'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Use of this site and any engagement with Digi∞Artha is governed by a separate services agreement.',
  alternates: { canonical: '/terms' },
}

export default function TermsPage() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: 'Terms' }]}
        eyebrow="LEGAL"
        h1={<>Terms of <span className="text-ribbon-diag">Service</span></>}
        lead="Use of this site and any engagement with Digi∞Artha is governed by a separate services agreement."
      />
      <PageSection tone="mist">
        <div className="prose prose-lg max-w-2xl text-ink/80">
          <h2 className="text-2xl font-bold text-ink">Site use</h2>
          <p className="mt-2">
            This website is provided for informational and diagnostic purposes. You may use it to
            learn about Digi∞Artha, run the Digital Growth Score™, and contact us about potential
            engagements.
          </p>
          <h2 className="mt-8 text-2xl font-bold text-ink">The Digital Growth Score™</h2>
          <p className="mt-2">
            The Digital Growth Score™ is a diagnostic framework, not an official ranking or a
            guarantee of future performance. AI-search scoring is directional because AI visibility
            and citation behaviour can be variable. The score is intended to identify observable
            digital opportunities, not to predict revenue.
          </p>
          <h2 className="mt-8 text-2xl font-bold text-ink">Engagements</h2>
          <p className="mt-2">
            Any paid engagement with Digi∞Artha is governed by a separate services agreement that
            supersedes anything on this site. We do not guarantee rankings, leads, ROAS, or AI
            recommendations — outcomes depend on market conditions, category, and execution.
          </p>
          <h2 className="mt-8 text-2xl font-bold text-ink">Intellectual property</h2>
          <p className="mt-2">
            The Digi∞Artha wordmark, infinity symbol, and gradient are brand assets. The site copy
            is © Digi∞Artha. Third-party trademarks referenced on this site belong to their
            respective owners; we display no third-party logos unless the relationship is real and
            current.
          </p>
          <p className="mt-8 text-sm text-ink/50">
            For full legal documents, contact{' '}
            <a href="mailto:hello@digiartha.com" className="underline">hello@digiartha.com</a>.
          </p>
        </div>
      </PageSection>
    </>
  )
}
